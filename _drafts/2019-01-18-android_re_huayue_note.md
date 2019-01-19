---
layout: post
title: "android_re_huayue_note"
date: 2019-01-18
category: 
tags: 
---
[unicode工具](http://tool.chinaz.com/tools/unicode.aspx)

命令：

	java -jar apktool_2.3.3.jar d hueyue20190114.apk 
	java -jar apktool_2.3.3.jar b hueyue20190114
	java -jar apktool_2.3.3.jar -r -f d hueyue20190114.apk -o hueyue20190114
	java -jar apktool_2.3.3.jar b hueyue20190114
	java -jar apktool_2.3.3.jar d hueyue20190114.apk -o xx
	java -jar apktool_2.3.3.jar b hueyue20190114

包名：

com.sytpay.paytimework.SplashActivity
com.hypay.pay.pkg provider
com.sytpay.paytimework.AutoTransferActivity
com.azhon.appupdate.service.DownloadService

0x00
修改
com.sytpay.paytimework.MainActivity
对应的smali
的字符串判断位置
当前登录微信账号 replace 当前登录微信账号hacked
当前登录支付宝账号 replace 当前登录支付宝账号hacked

smali位置
hueyue/smali/com/paytimework/MainActivity.smali

java

	class BillReceived extends BroadcastReceiver {

smali
	
	search
	unicode
	\u5f53\u524d\u767b\u5f55\u5fae\u4fe1\u8d26\u53f7
	当前登录微信账号

	后来发现个问题 我改了首页 不登录进去不
	所有改了登录页的提示

	用户名不可为空
	\u7528\u6237\u540d\u4e0d\u53ef\u4e3a\u7a7a

	邵淼hacked
	\u90b5\u6dfc\u0068\u0061\u0063\u006b\u0065\u0064


	const-string v3, "SN"

    invoke-static {v3,v0} , Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

重新打包测试 是否修改成功

测试成功 可以

然后修改逻辑绕过登录

	
LoginActivity

checkFrp()

	new OkHttpUtil().postMessageWithHeaders(string, null, null, new AsyncResponseCallback<String>() {
            public void onSuccess(String str) {
                if (str.contains("Hello World!") != null) {
                    LoginActivity.this.showInfoTipDialog("账号已经在其他地方登陆，请先退出再登陆");
                    return;
                }
                try {
                    LoginActivity.this.proceedLogin(jSONObject);
                } catch (String str2) {
                    str2.printStackTrace();
                }
            }

            public void onFaile(String str) {
                LoginActivity.this.showInfoTipDialog("登陆失败");
            }
        });

LoginActivity.java 144行

	LoginActivity.this.proceedLogin(jSONObject);

对应smali

LoginActivity$3.smali 找到跳转MainActivity逻辑

	iget-object p1, p0, Lcom/sytpay/paytimework/LoginActivity$3;->this$0:Lcom/sytpay/paytimework/LoginActivity;

    iget-object v0, p0, Lcom/sytpay/paytimework/LoginActivity$3;->val$jo:Lorg/json/JSONObject;

    invoke-static {p1, v0}, Lcom/sytpay/paytimework/LoginActivity;->access$200(Lcom/sytpay/paytimework/LoginActivity;Lorg/json/JSONObject;)V

想直接跳过登录 然而 他在本地存了一个key 然后在首页也会使用

	private void proceedLogin(JSONObject jSONObject) throws JSONException {
        Intent intent = new Intent(this, MainActivity.class);
        String string = jSONObject.getString("platform_merchant_no");
        String string2 = jSONObject.getString("platform_key");
        String string3 = jSONObject.getString("notify_url");
        String string4 = jSONObject.getString("penetration_ip");
        String string5 = jSONObject.getString("penetration_domain");
        XposedBridge.log(jSONObject.toString());
        Realm.setDefaultConfiguration(new Builder().name(string).build());
        AbSharedUtil.putString(getApplicationContext(), "login_account", this.edtUsername.getText().toString().trim());
        AbSharedUtil.putString(getApplicationContext(), "login_password", this.edtPassword.getText().toString().trim());
        AbSharedUtil.putString(getApplicationContext(), "signkey", string2);
        AbSharedUtil.putString(getApplicationContext(), "partner", string);
        AbSharedUtil.putString(getApplicationContext(), "notifyurl", string3);
        AbSharedUtil.putString(getApplicationContext(), "frpIp", string4);
        AbSharedUtil.putString(getApplicationContext(), "frpCustomDomain", string5);
        jSONObject = new StringBuilder();
        jSONObject.append("partenr id is ");
        jSONObject.append(string);
        XposedBridge.log(jSONObject.toString());
        startActivity(intent);
        finish();
    }

我判断signkey是比较重要的 然后查找都在那里调用了 signkey

LoginActivity.java  173行
MainActivity.java 459行
SettingActivity.java 47行 107行

MainActivity.java 
521行
BillReceived.this.update(str4, str);
578行

	private void update(String str, String str2) {
            LocalDatabaseManager localDatabaseManager = new LocalDatabaseManager();
            localDatabaseManager.updateOrderByMark(str, str2);
            localDatabaseManager.close();
        }

com.sytpay.paytimework.utils.databse.impl.LocalDatabaseManager


	bundle2 = new IntentFilter();
        bundle2.addAction(StringConstant.BILLRECEIVED_ACTION);
        bundle2.addAction(StringConstant.MSGRECEIVED_ACTION);
        bundle2.addAction(StringConstant.QRCODERECEIVED_ACTION);
        bundle2.addAction(StringConstant.LOGINIDRECEIVED_ACTION);
        registerReceiver(this.billReceived, bundle2);

com.sytpay.paytimework.utils.PayHelperUtils

    PayHelperUtils.sendmsg

     public static void sendmsg(Context context, String str) {
        Intent intent = new Intent();
        intent.putExtra(NotificationCompat.CATEGORY_MESSAGE, str);
        intent.setAction(StringConstant.MSGRECEIVED_ACTION);
        context.sendBroadcast(intent);
    }

Main 方法