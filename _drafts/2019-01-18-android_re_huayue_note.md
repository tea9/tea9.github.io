---
layout: post
title: "android_re_huayue_note"
date: 2019-01-18
category: 
tags: 
---

## 20190130
重新调整思路
打算先跟着 AlipayQRHook去摘取需要的，然后根据反编译的代码去调整逻辑。

http://132.232.133.220

重新整理了AlipayQR的方法然后交易受限 
---

然后查找hy的AliPayHook所有带money的方法分析
money

---
## 目的：

1.绕过登录
2.获取qrcode
3.传输qrcode
---

[unicode工具](http://tool.chinaz.com/tools/unicode.aspx)

## PLAN A 修改smali代码 绕过登录

## 登录的字符串

	{"flag":1,"message":"登录成功","platform_merchant_no":"201901111051021942","platform_key":"E21D3E91AF9A443145E47E07C7018ABE","notify_url":"http:\/\/api.hypay.xyz\/index.php\/Api\/PayNotify\/ReturnMsg","penetration_ip":"122.14.195.188","penetration_domain":"hypay.xyz"}

	E: {"flag":1,"message":"登录成功","platform_merchant_no":"201901040156014034","platform_key":"ACB3CFADFA9343C163879550C6CC37AC","notify_url":"http:\/\/api.hypay.xyz\/index.php\/Api\/PayNotify\/ReturnMsg","penetration_ip":"122.14.195.188","penetration_domain":"hypay.xyz"}

---

	.line 160
	new-instance v0, Landroid/content/Intent;

    const-class v1, Lcom/sytpay/paytimework/MainActivity;

    invoke-direct {v0, p0, v1}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    const-string v1, "platform_merchant_no"

    .line 179
    invoke-virtual {p0, v0}, Lcom/sytpay/paytimework/LoginActivity;->startActivity(Landroid/content/Intent;)V


    160
    Intent intent = new Intent(this, MainActivity.class);
    179
    startActivity(intent);
---
	/Users/shaomiao/Documents/shaomiaocode/tools/android/hueyue20190114
	/Users/shaomiao/Documents/shaomiaocode/tools/android/hueyue20190114/smali/com/sytpay/paytimework
	cd /Users/shaomiao/Downloads/SmaliDebug1/src/com/sytpay/paytimework/ 

---

	cp  /Users/shaomiao/Downloads/SmaliDebug1/src/com/sytpay/paytimework/LoginActivity.smali  /Users/shaomiao/Documents/shaomiaocode/tools/android/hueyue20190114/smali/com/sytpay/paytimework/LoginActivity.smali 

	java -jar apktool_2.3.3.jar b hueyue20190114
	cp hueyue20190114/dist/hueyue20190114.apk signapk/hueyue.apk
	java -jar signapk/signapk.jar signapk/testkey.x509.pem signapk/testkey.pk8 signapk/hueyue.apk signapk/huiyue_test.apk
	adb uninstall com.hypay.pay.pkg
	adb install signapk/huiyue_test.apk


---

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

	adb shell am start -D -n com.sytpay.paytimework/.MainActivity
	adb shell dumpsys window w |grep \/ |grep name=
	io.va.exposed/io.virtualapp.home.LoadingActivity
	io.va.exposed/io.virtualapp.home.NewHomeActivity
	com.hypay.pay.pkg/com.sytpay.paytimework.LoginActivity

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

---

## 修改

	尝试修改了 LoginActivity 然后打包运行会报一个错误
	hueyue20190114/smali/com/sytpay/paytimework/LoginActivity.smali

	.method protected onCreate(Landroid/os/Bundle;)V
    .registers 3

    .line 186
    invoke-super {p0, p1}, Landroid/support/v7/app/AppCompatActivity;->onCreate(Landroid/os/Bundle;)V

    const p1, 0x7f0b001e

    .line 187
    invoke-virtual {p0, p1}, Lcom/sytpay/paytimework/LoginActivity;->setContentView(I)V

    const p1, 0x7f08005d
	###########
    #.line 160
    #new-instance v0, Landroid/content/Intent;

    #const-class v1, Lcom/sytpay/paytimework/MainActivity;

    #invoke-direct {v0, p0, v1}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    #const-string v1, "platform_merchant_no"

    #.line 179
    #invoke-virtual {p0, v0}, Lcom/sytpay/paytimework/LoginActivity;->startActivity(Landroid/content/Intent;)V
	#########
    .line 188


	java.lang.VerifyError: Verifier rejected class com.sytpay.paytimework.LoginActivity: void com.sytpay.paytimework.LoginActivity.onCreate(android.os.Bundle) failed to verify: void com.sytpay.paytimework.LoginActivity.onCreate(android.os.Bundle): [0x7] register v1 has type Precise Reference: java.lang.Class but expected Reference: android.content.Context (declaration of 'com.sytpay.paytimework.LoginActivity' appears in /data/app/com.hypay.pay.pkg-pL9ASid_Y58ss7nJ8T4D3Q==/base.apk)
	 at java.lang.Class.newInstance(Native Method)
	 at android.app.Instrumentation.newActivity(Instrumentation.java:1174)
	 at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2747)
	 at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2931)
	 at android.app.ActivityThread.-wrap11(Unknown Source:0)
	 at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1620)
	 at android.os.Handler.dispatchMessage(Handler.java:105)
	 at android.os.Looper.loop(Looper.java:173)
	 at android.app.ActivityThread.main(ActivityThread.java:6698)
	 at java.lang.reflect.Method.invoke(Native Method)
	 at com.android.internal.os.Zygote$MethodAndArgsCaller.run(Zygote.java:240)
	 at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:782)

也尝试了CustomApplcation.smali也会报这个错误  

## PLAN B 分析huayue反编译代码

新建 Main implements IXposedHookLoadPackage

关键方法handleLoadPackage()  

