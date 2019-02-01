---
layout: post
title: "android_re_huayue_note"
date: 2019-01-18
category: 
tags: 
---
 Attempt to invoke virtual method 'java.lang.Class java.lang.Object.getClass()' on a null object reference
 
---
hy mainactivity.java

package com.sytpay.paytimework;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.NotificationCompat;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ScrollView;
import android.widget.TextView;
import com.hypay.pay.pkg.R;
import com.sytpay.paytimework.entity.OrderBean;
import com.sytpay.paytimework.entity.QrCodeBean;
import com.sytpay.paytimework.event.FrpEvent;
import com.sytpay.paytimework.utils.AESCrypt;
import com.sytpay.paytimework.utils.AbSharedUtil;
import com.sytpay.paytimework.utils.FrpUtil;
import com.sytpay.paytimework.utils.LogUtil;
import com.sytpay.paytimework.utils.MD5;
import com.sytpay.paytimework.utils.ParamsUtil;
import com.sytpay.paytimework.utils.PayAccountManager;
import com.sytpay.paytimework.utils.RequestParams;
import com.sytpay.paytimework.utils.SettingSpUtil;
import com.sytpay.paytimework.utils.StringConstant;
import com.sytpay.paytimework.utils.accountimpl.PayAccountImpl;
import com.sytpay.paytimework.utils.databse.impl.LocalDatabaseManager;
import com.sytpay.paytimework.utils.httptools.AsyncResponseCallback;
import com.sytpay.paytimework.utils.httptools.impl.OkHttpUtil;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.callbacks.XCallback;
import java.io.IOException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

public class MainActivity extends Activity {
    public static int WEBSEERVER_PORT = 8086;
    public static TextView console;
    private BillReceived billReceived;
    private String currentAlipay = "";
    private String currentQQ = "";
    private String currentWechat = "";
    Handler frpHandler = new C04879();
    public Handler handler = new C04868();
    Object lock = new Object();
    private WebServer mVideoServer;
    String mark_temp = "";
    BroadcastReceiver netChangeReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            if ("android.net.conn.CONNECTIVITY_CHANGE".equals(intent.getAction()) != null) {
                context = ((ConnectivityManager) MainActivity.this.getSystemService("connectivity")).getActiveNetworkInfo();
                MainActivity.this.consoleLog("网络环境变化 重新发起穿透");
                if (context == null || context.isConnected() == null) {
                    MainActivity.this.consoleLog("网络环境变化 重新发起穿透");
                    return;
                }
                MainActivity.this.consoleLog(context.getExtraInfo());
                FrpUtil.getInstance().stopFrp();
                MainActivity.this.frpHandler.sendEmptyMessageDelayed(null, 500);
            }
        }
    };

    /* renamed from: com.sytpay.paytimework.MainActivity$1 */
    class C04791 implements OnClickListener {
        C04791() {
        }

        public void onClick(View view) {
            view = new Intent();
            view.setAction(StringConstant.QQSTART_ACTION);
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append(System.currentTimeMillis() / 10000);
            stringBuilder.append("");
            String stringBuilder2 = stringBuilder.toString();
            StringBuilder stringBuilder3 = new StringBuilder();
            stringBuilder3.append("test");
            stringBuilder3.append(stringBuilder2);
            view.putExtra("mark", stringBuilder3.toString());
            view.putExtra("money", "0.01");
            MainActivity.this.sendBroadcast(view);
        }
    }

    /* renamed from: com.sytpay.paytimework.MainActivity$2 */
    class C04802 implements OnClickListener {
        C04802() {
        }

        public void onClick(View view) {
            view = new Intent();
            view.setAction(StringConstant.ALIPAYSTART_ACTION);
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append(System.currentTimeMillis() / 10000);
            stringBuilder.append("");
            String stringBuilder2 = stringBuilder.toString();
            StringBuilder stringBuilder3 = new StringBuilder();
            stringBuilder3.append("test");
            stringBuilder3.append(stringBuilder2);
            view.putExtra("mark", stringBuilder3.toString());
            view.putExtra("money", "0.01");
            MainActivity.this.sendBroadcast(view);
        }
    }

    /* renamed from: com.sytpay.paytimework.MainActivity$3 */
    class C04813 implements OnClickListener {
        C04813() {
        }

        public void onClick(View view) {
            view = new Intent();
            view.setAction(StringConstant.WECHATSTART_ACTION);
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append(System.currentTimeMillis() / 10000);
            stringBuilder.append("");
            String stringBuilder2 = stringBuilder.toString();
            StringBuilder stringBuilder3 = new StringBuilder();
            stringBuilder3.append("test");
            stringBuilder3.append(stringBuilder2);
            view.putExtra("mark", stringBuilder3.toString());
            view.putExtra("money", "0.01");
            MainActivity.this.sendBroadcast(view);
        }
    }

    /* renamed from: com.sytpay.paytimework.MainActivity$4 */
    class C04824 implements OnClickListener {
        C04824() {
        }

        public void onClick(View view) {
            MainActivity.this.startActivity(new Intent(MainActivity.this, SettingActivity.class));
        }
    }

    /* renamed from: com.sytpay.paytimework.MainActivity$5 */
    class C04835 implements OnClickListener {
        C04835() {
        }

        public void onClick(View view) {
            MainActivity.this.mockInsert();
        }
    }

    /* renamed from: com.sytpay.paytimework.MainActivity$6 */
    class C04846 implements OnClickListener {
        C04846() {
        }

        public void onClick(View view) {
            MainActivity.this.mockQuery();
        }
    }

    /* renamed from: com.sytpay.paytimework.MainActivity$7 */
    class C04857 extends Thread {
        C04857() {
        }

        public void run() {
            if (FrpUtil.getInstance().state == 1) {
                MainActivity.this.consoleLog("穿透服务运行中...");
                return;
            }
            EventBus eventBus = EventBus.getDefault();
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("Current thread ");
            stringBuilder.append(Thread.currentThread().getName());
            eventBus.post(new FrpEvent(stringBuilder.toString()));
            synchronized (MainActivity.this.lock) {
                FrpUtil.getInstance().init(MainActivity.this);
                try {
                    FrpUtil.getInstance().run(MainActivity.this);
                } catch (IOException e) {
                    FrpUtil.getInstance().stopFrp();
                    EventBus.getDefault().post(new FrpEvent("穿透服务出错，请重启APP。"));
                    e.printStackTrace();
                }
            }
            eventBus = EventBus.getDefault();
            StringBuilder stringBuilder2 = new StringBuilder();
            StringBuilder stringBuilder3 = new StringBuilder();
            stringBuilder3.append("Current thread ");
            stringBuilder3.append(Thread.currentThread().getName());
            stringBuilder2.append(new FrpEvent(stringBuilder3.toString()));
            stringBuilder2.append("  end");
            eventBus.post(stringBuilder2.toString());
        }
    }

    /* renamed from: com.sytpay.paytimework.MainActivity$8 */
    class C04868 extends Handler {
        C04868() {
        }

        public void handleMessage(Message message) {
            CharSequence string = message.getData().getString("log");
            ScrollView scrollView = (ScrollView) MainActivity.this.findViewById(R.id.scroll);
            MainActivity mainActivity = MainActivity.this;
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("\n\n");
            stringBuilder.append(string);
            mainActivity.writeLog(stringBuilder.toString());
            if (MainActivity.console != null) {
                if (MainActivity.console.getText() != null) {
                    if (MainActivity.console.getText().toString().length() > XCallback.PRIORITY_HIGHEST) {
                        TextView textView = MainActivity.console;
                        StringBuilder stringBuilder2 = new StringBuilder();
                        stringBuilder2.append("日志定时清理完成...\n\n");
                        stringBuilder2.append(string);
                        textView.setText(stringBuilder2.toString());
                    } else {
                        TextView textView2 = MainActivity.console;
                        stringBuilder = new StringBuilder();
                        stringBuilder.append("\n\n");
                        stringBuilder.append(string);
                        textView2.append(stringBuilder.toString());
                        scrollView.fullScroll(130);
                    }
                    try {
                        LogUtil.getInstance().writeLog(MainActivity.console.getText().toString(), LogUtil.SCREEN_LOG, true);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                } else {
                    MainActivity.console.setText(string);
                }
            }
            super.handleMessage(message);
        }
    }

    /* renamed from: com.sytpay.paytimework.MainActivity$9 */
    class C04879 extends Handler {
        C04879() {
        }

        public void handleMessage(Message message) {
            super.handleMessage(message);
            if (message.what == null) {
                if (MainActivity.this.mVideoServer == null || MainActivity.this.mVideoServer.wasStarted() == null || FrpUtil.getInstance().state != null) {
                    MainActivity.this.frpHandler.sendEmptyMessageDelayed(0, 500);
                } else {
                    MainActivity.this.frpHandler.removeMessages(0);
                    Log.e("excuteFrp", "in handler call");
                    MainActivity.this.excuteFrp();
                }
                if (FrpUtil.getInstance().state == 1) {
                    MainActivity.this.frpHandler.removeMessages(0);
                }
            }
        }
    }

    class BillReceived extends BroadcastReceiver {
        BillReceived() {
        }

        public void onReceive(Context context, Intent intent) {
            try {
                StringBuilder stringBuilder;
                MainActivity mainActivity;
                StringBuilder stringBuilder2;
                if (intent.getAction().contentEquals(StringConstant.BILLRECEIVED_ACTION)) {
                    context = intent.getStringExtra("bill_no");
                    String stringExtra = intent.getStringExtra("bill_money");
                    String stringExtra2 = intent.getStringExtra("bill_mark");
                    intent = intent.getStringExtra("bill_type");
                    stringBuilder = new StringBuilder();
                    stringBuilder.append(System.currentTimeMillis());
                    stringBuilder.append("");
                    String stringBuilder3 = stringBuilder.toString();
                    XposedBridge.log(new OrderBean(stringExtra, stringExtra2, intent, context, stringBuilder3, "", 0).toString());
                    LocalDatabaseManager localDatabaseManager = new LocalDatabaseManager();
                    localDatabaseManager.addOrder(new OrderBean(stringExtra, stringExtra2, intent, context, stringBuilder3, "", 0));
                    localDatabaseManager.close();
                    mainActivity = MainActivity.this;
                    stringBuilder2 = new StringBuilder();
                    stringBuilder2.append("收到");
                    stringBuilder2.append(intent);
                    stringBuilder2.append("订单,订单号：");
                    stringBuilder2.append(context);
                    stringBuilder2.append("金额：");
                    stringBuilder2.append(stringExtra);
                    stringBuilder2.append("备注：");
                    stringBuilder2.append(stringExtra2);
                    mainActivity.sendmsg(stringBuilder2.toString());
                    notify(intent, context, stringExtra, stringExtra2, stringBuilder3);
                } else if (intent.getAction().contentEquals(StringConstant.QRCODERECEIVED_ACTION)) {
                    context = intent.getStringExtra("money");
                    String stringExtra3 = intent.getStringExtra("mark");
                    String stringExtra4 = intent.getStringExtra("type");
                    intent = intent.getStringExtra("payurl");
                    stringBuilder = new StringBuilder();
                    stringBuilder.append(System.currentTimeMillis());
                    stringBuilder.append("");
                    String stringBuilder4 = stringBuilder.toString();
                    XposedBridge.log("QRCODERECEIVED_ACTION insert before MainActivity");
                    LocalDatabaseManager localDatabaseManager2 = new LocalDatabaseManager();
                    localDatabaseManager2.addQrCode(new QrCodeBean(context, stringExtra3, stringExtra4, intent, stringBuilder4));
                    localDatabaseManager2.close();
                    XposedBridge.log("QRCODERECEIVED_ACTION insert after MainActivity");
                    mainActivity = MainActivity.this;
                    stringBuilder2 = new StringBuilder();
                    stringBuilder2.append("生成成功,金额:");
                    stringBuilder2.append(context);
                    stringBuilder2.append("备注:");
                    stringBuilder2.append(stringExtra3);
                    stringBuilder2.append("二维码:");
                    stringBuilder2.append(intent);
                    mainActivity.sendmsg(stringBuilder2.toString());
                } else if (intent.getAction().contentEquals(StringConstant.MSGRECEIVED_ACTION)) {
                    context = intent.getStringExtra(NotificationCompat.CATEGORY_MESSAGE);
                    MainActivity.this.sendmsg(context);
                    if (context.startsWith("当前支付宝余额：") != null) {
                        MainActivity.this.autoTransfer(Float.valueOf(context.replace("当前支付宝余额：", "").replace("元", "").trim()).floatValue());
                    }
                } else if (intent.getAction().contentEquals(StringConstant.LOGINIDRECEIVED_ACTION)) {
                    String stringExtra5 = intent.getStringExtra("loginid");
                    String stringExtra6 = intent.getStringExtra("loginMobile");
                    String str = PayAccountManager.KEY_ACCOUNT;
                    StringBuilder stringBuilder5 = new StringBuilder();
                    stringBuilder5.append("login id is ");
                    stringBuilder5.append(stringExtra5);
                    stringBuilder5.append("  and mobile is ");
                    stringBuilder5.append(stringExtra6);
                    Log.e(str, stringBuilder5.toString());
                    intent = intent.getStringExtra("type");
                    if (intent.equals(PayAccountManager.TYPE_ALIPAY)) {
                        PayAccountImpl.getManager(context).setAlipayAccount(stringExtra5);
                        PayAccountImpl.getManager(context).setAlipayMobile(stringExtra6);
                    } else if (intent.equals(PayAccountManager.TYPE_WECHAT)) {
                        PayAccountImpl.getManager(context).setWechatAccount(stringExtra5);
                        PayAccountImpl.getManager(context).setWechatMobile(stringExtra6);
                    } else if (intent.equals("alipay_uuid")) {
                        PayAccountImpl.getManager(context).setAlipayUUID(stringExtra5);
                    }
                    if (TextUtils.isEmpty(stringExtra5) != null) {
                        return;
                    }
                    if (intent.equals(PayAccountManager.TYPE_WECHAT) != null && stringExtra5.equals(MainActivity.this.currentWechat) == null) {
                        context = MainActivity.this;
                        stringBuilder2 = new StringBuilder();
                        stringBuilder2.append("当前登录微信账号：");
                        stringBuilder2.append(stringExtra5);
                        context.sendmsg(stringBuilder2.toString());
                        MainActivity.this.currentWechat = stringExtra5;
                        AbSharedUtil.putString(MainActivity.this.getApplicationContext(), intent, stringExtra5);
                    } else if (intent.equals(PayAccountManager.TYPE_ALIPAY) != null && stringExtra5.equals(MainActivity.this.currentAlipay) == null) {
                        context = MainActivity.this;
                        stringBuilder2 = new StringBuilder();
                        stringBuilder2.append("当前登录支付宝账号：");
                        stringBuilder2.append(stringExtra5);
                        context.sendmsg(stringBuilder2.toString());
                        MainActivity.this.currentAlipay = stringExtra5;
                        AbSharedUtil.putString(MainActivity.this.getApplicationContext(), intent, stringExtra5);
                    } else if (intent.equals("qq") != null && stringExtra5.equals(MainActivity.this.currentQQ) == null) {
                        context = MainActivity.this;
                        stringBuilder2 = new StringBuilder();
                        stringBuilder2.append("当前登QQ账号：");
                        stringBuilder2.append(stringExtra5);
                        context.sendmsg(stringBuilder2.toString());
                        MainActivity.this.currentQQ = stringExtra5;
                        AbSharedUtil.putString(MainActivity.this.getApplicationContext(), intent, stringExtra5);
                    }
                }
            } catch (Context context2) {
                XposedBridge.log(context2.getMessage());
            }
        }

        public void notify(String str, String str2, String str3, final String str4, String str5) {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("type is ");
            stringBuilder.append(str);
            stringBuilder.append(" and no is ");
            stringBuilder.append(str2);
            stringBuilder.append(" and money is ");
            stringBuilder.append(str3);
            stringBuilder.append("  and mark is ");
            stringBuilder.append(str4);
            stringBuilder.append("  dt is ");
            stringBuilder.append(str5);
            XposedBridge.log(stringBuilder.toString());
            Object string = AbSharedUtil.getString(MainActivity.this.getApplicationContext(), "notifyurl");
            Object string2 = AbSharedUtil.getString(MainActivity.this.getApplicationContext(), "signkey");
            if (!TextUtils.isEmpty(string)) {
                if (!TextUtils.isEmpty(string2)) {
                    String account = PayAccountImpl.getManager(MainActivity.this).getAccount(str);
                    String str6 = "";
                    if (str.equals(PayAccountManager.TYPE_ALIPAY)) {
                        str6 = PayAccountImpl.getManager(MainActivity.this).getAlipayUUID();
                    }
                    if (str.equals("qq")) {
                        account = AbSharedUtil.getString(MainActivity.this.getApplicationContext(), "qq");
                    }
                    try {
                        str3 = str3.replace("￥", "");
                        StringBuilder stringBuilder2 = new StringBuilder();
                        stringBuilder2.append(str5);
                        stringBuilder2.append(str4);
                        stringBuilder2.append(str3);
                        stringBuilder2.append(str2);
                        stringBuilder2.append(str);
                        stringBuilder2.append(string2);
                        String md5 = MD5.md5(stringBuilder2.toString());
                        RequestParams requestParams = new RequestParams();
                        requestParams.addBodyParameter("type", str);
                        requestParams.addBodyParameter("no", str2);
                        requestParams.addBodyParameter("money", str3);
                        requestParams.addBodyParameter("mark", str4);
                        requestParams.addBodyParameter("dt", str5);
                        requestParams.addBodyParameter("sign", md5);
                        requestParams.addBodyParameter(PayAccountManager.KEY_ACCOUNT, account);
                        requestParams.addBodyParameter(PayAccountManager.KEY_UUID, str6);
                        requestParams.addBodyParameter("partner", AbSharedUtil.getString(MainActivity.this.getApplicationContext(), "partner"));
                        str = ParamsUtil.paramsToString(requestParams);
                        str2 = new StringBuilder();
                        str2.append(System.currentTimeMillis());
                        str2.append("");
                        str2 = str2.toString();
                        str3 = AESCrypt.transferKey(str2);
                        str = URLEncoder.encode(new AESCrypt(str2).encrypt(str), "UTF-8").replace("*", "%2A");
                        str2 = new OkHttpUtil();
                        str5 = new HashMap();
                        str5.put("no", str3);
                        str5.put("message", str);
                        str5.put("platform", PayAccountManager.KEY_MOBILE);
                        str2.postMessageWithHeaders(string, new HashMap(), str5, new AsyncResponseCallback<String>() {
                            public void onSuccess(String str) {
                                MainActivity mainActivity = MainActivity.this;
                                StringBuilder stringBuilder = new StringBuilder();
                                stringBuilder.append("onSuccess   ");
                                stringBuilder.append(str);
                                stringBuilder.append("   mark is ");
                                stringBuilder.append(str4);
                                mainActivity.consoleLog(stringBuilder.toString());
                                BillReceived.this.update(str4, str);
                            }

                            public void onFaile(String str) {
                                MainActivity mainActivity = MainActivity.this;
                                StringBuilder stringBuilder = new StringBuilder();
                                stringBuilder.append("onFailure   exception e ");
                                stringBuilder.append(str.toString());
                                mainActivity.consoleLog(stringBuilder.toString());
                                BillReceived.this.update(str4, str);
                            }
                        });
                    } catch (String str7) {
                        str2 = MainActivity.this;
                        str3 = new StringBuilder();
                        str3.append("encryption error    ");
                        str3.append(str7.getMessage());
                        str2.consoleLog(str3.toString());
                        str7.printStackTrace();
                    }
                    return;
                }
            }
            XposedBridge.log("");
            MainActivity.this.sendmsg("发送异步通知异常，异步通知地址为空");
            update(str4, "异步通知地址为空");
        }

        private void update(String str, String str2) {
            LocalDatabaseManager localDatabaseManager = new LocalDatabaseManager();
            localDatabaseManager.updateOrderByMark(str, str2);
            localDatabaseManager.close();
        }
    }

    protected void onCreate(Bundle bundle) {
        super.onCreate(bundle);
        getWindow().addFlags(128);
        setContentView(R.layout.activity_main);
        console = (TextView) findViewById(R.id.console);
        findViewById(R.id.testpart).setVisibility(8);
        try {
            this.mVideoServer = new WebServer(this, WEBSEERVER_PORT);
            this.mVideoServer.start();
            bundle = new StringBuilder();
            bundle.append("web服务器启动成功，端口:");
            bundle.append(WEBSEERVER_PORT);
            sendmsg(bundle.toString());
        } catch (Bundle bundle2) {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("web服务器启动失败，错误:");
            stringBuilder.append(bundle2.getMessage());
            sendmsg(stringBuilder.toString());
        }
        findViewById(R.id.start_qq).setOnClickListener(new C04791());
        findViewById(R.id.start_alipay).setOnClickListener(new C04802());
        findViewById(R.id.start_wechat).setOnClickListener(new C04813());
        findViewById(R.id.setting).setOnClickListener(new C04824());
        findViewById(R.id.test).setOnClickListener(new C04835());
        findViewById(R.id.test1).setOnClickListener(new C04846());
        this.billReceived = new BillReceived();
        bundle2 = new IntentFilter();
        bundle2.addAction(StringConstant.BILLRECEIVED_ACTION);
        bundle2.addAction(StringConstant.MSGRECEIVED_ACTION);
        bundle2.addAction(StringConstant.QRCODERECEIVED_ACTION);
        bundle2.addAction(StringConstant.LOGINIDRECEIVED_ACTION);
        registerReceiver(this.billReceived, bundle2);
        startService(new Intent(this, DaemonService.class));
        bundle2 = new IntentFilter();
        bundle2.addAction("android.net.ethernet.ETHERNET_STATE_CHANGED");
        bundle2.addAction("android.net.ethernet.STATE_CHANGE");
        bundle2.addAction("android.net.conn.CONNECTIVITY_CHANGE");
        bundle2.addAction("android.net.wifi.WIFI_STATE_CHANGED");
        registerReceiver(this.netChangeReceiver, bundle2);
    }

    private void mockQuery() {
        startActivity(new Intent(this, AutoTransferActivity.class));
    }

    private void mockInsert() {
        Intent intent = new Intent("android.intent.action.VIEW");
        intent.setData(Uri.parse("alipays://platformapi/startapp?appId=20000116&actionType=toAccount&account=yw@sytpay.cn"));
        startActivity(intent);
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onFrpEvent(FrpEvent frpEvent) {
        if (frpEvent.type.equals(FrpEvent.TYPE_INFO)) {
            consoleLog(frpEvent.content);
        } else {
            FrpEvent.TYPE_COMMAND.equals(frpEvent.type);
        }
    }

    protected void onStart() {
        super.onStart();
        EventBus.getDefault().register(this);
        this.frpHandler.sendEmptyMessageDelayed(0, 500);
    }

    protected void onStop() {
        super.onStop();
        EventBus.getDefault().unregister(this);
    }

    private void excuteFrp() {
        new C04857().start();
    }

    private void consoleLog(String str) {
        Message obtainMessage = this.handler.obtainMessage();
        Bundle bundle = new Bundle();
        String format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(System.currentTimeMillis()));
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(format);
        stringBuilder.append(": ");
        stringBuilder.append(str);
        bundle.putString("log", stringBuilder.toString());
        obtainMessage.setData(bundle);
        obtainMessage.sendToTarget();
    }

    private void writeLog(String str) {
        try {
            LogUtil.getInstance().writeLog(str, LogUtil.CONSOLE_LOG);
        } catch (String str2) {
            str2.printStackTrace();
        }
    }

    protected void onDestroy() {
        unregisterReceiver(this.billReceived);
        unregisterReceiver(this.netChangeReceiver);
        this.mVideoServer.stop();
        LogUtil.getInstance().flush();
        super.onDestroy();
    }

    protected void onResume() {
        super.onResume();
    }

    public void sendmsg(String str) {
        Message message = new Message();
        message.what = 1;
        Bundle bundle = new Bundle();
        String format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(System.currentTimeMillis()));
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(format);
        stringBuilder.append(":  结果:");
        stringBuilder.append(str);
        bundle.putString("log", stringBuilder.toString());
        message.setData(bundle);
        try {
            this.handler.sendMessage(message);
        } catch (String str2) {
            str2.printStackTrace();
        }
    }

    public void onBackPressed() {
        moveTaskToBack(true);
    }

    public boolean onKeyDown(int i, KeyEvent keyEvent) {
        if (keyEvent.getKeyCode() == 4) {
            moveTaskToBack(true);
        }
        return super.onKeyDown(i, keyEvent);
    }

    private void autoTransfer(float f) {
        SettingSpUtil.setTransferBalance(this, f);
        f = SettingSpUtil.getTransferBalance(this);
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("get balance is ");
        stringBuilder.append(f);
        XposedBridge.log(stringBuilder.toString());
    }
}
---

{"flag":1,"message":"登录成功","platform_merchant_no":"201901100638026632","platform_key":"83932895819DCCCBD4BD9CC7C4459057","notify_url":"http:\/\/api.hypay.xyz\/index.php\/Api\/PayNotify\/ReturnMsg","penetration_ip":"122.14.195.188","penetration_domain":"hypay.xyz"}

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

