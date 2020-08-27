---
title: 微博sdk组件导出测试
tags:
  - android
  - weibo
  - sdk
abbrlink: 3083534279
date: 2019-08-12 15:35:22
---

## 前言
测试的时候发现一个微博组件导出导致拒绝服务的问题,现测试哪个版本没有这个问题。  

## 代码

```
public class LoginActivity extends AppCompatActivity {

    private SsoHandler mSsoHandler;
    private Oauth2AccessToken mAccessToken;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        initWeiBoSDK();
        mSsoHandler = new SsoHandler(this);
        loginIn();
    }

    private void initWeiBoSDK() {
        AuthInfo mAuthInfo = new AuthInfo(this, "你的appkey", "https://api.weibo.com/oauth2/default.html",
                "email,direct_messages_read,direct_messages_write,"
                        + "friendships_groups_read,friendships_groups_write,statuses_to_me_read,"
                        + "follow_app_official_microblog," + "invitation_write");
        WbSdk.install(this,mAuthInfo);
    }

    private void loginIn() {

        mSsoHandler. authorize(new WbAuthListener());
    }

    private class WbAuthListener implements com.sina.weibo.sdk.auth.WbAuthListener{

        @Override
        public void onSuccess(final Oauth2AccessToken token) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mAccessToken = token;
                    if (mAccessToken.isSessionValid()) {

                    }
                }
            });
        }

        @Override
        public void cancel() {

        }

        @Override
        public void onFailure(WbConnectErrorMessage errorMessage) {

        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (mSsoHandler != null) {
            mSsoHandler.authorizeCallBack(requestCode, resultCode, data);
        }
    }
}
```

微博sdk本地拒绝服务影响版本`compile 'com.sina.weibo.sdk:core:4.1.0:openDefaultRelease@aar'`   
现升级到`compile 'com.sina.weibo.sdk:core:4.4.1:openDefaultRelease@aar'`  没有这个问题  

漏洞证明：  

```
adb shell am start com.demo.sinaweibosdk_test/com.sina.weibo.sdk.share.WbShareTransActivity

```

扫描打包后的apk：  
存在一处导出  

```
adb shell am start com.demo.sinaweibosdk_test/com.sina.weibo.sdk.share.WbShareResultActivity
```
测试后已经不存在崩溃了  

## CODE
[sinaweibosdk_test](https://github.com/tea9/sinaweibosdk_test)  

## LINKS

[微博开放平台](http://open.weibo.com/)  
需要认证下邮箱。  
之后创建应用。 微链接-移动应用-立即接入。  
[微博开放平台-应用信息](https://open.weibo.com/apps/1349715877/info/basic?action=review)  
[微博开放平台-控制台](https://open.weibo.com/apps/1349715877/info/basic?action=review#req)  
添加包名-签名信息。  

[weibo_android_sdk](https://github.com/sinaweibosdk/weibo_android_sdk)  


[android使用新浪微博最新SDK4.1进行第三方授权登录](https://blog.csdn.net/weixin_37577039/article/details/78632075)  

