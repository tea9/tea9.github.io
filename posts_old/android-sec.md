title: app安全监测指南学习笔记
abbrlink: 3981860732
category:
  - android安全
tags:
  - android安全
date: 2019-04-12 13:51:34
---
## 客户端程序安全

1. 安装包签名

2. 反编译保护
- 判断是否能反编译为源代码，是否存在代码保护
- 是否能通过用反编译工具查看源代码
- 建议客户端进行加壳处理防止攻击者反编译客户端，同时混淆客户端代码，并且一定要对核心代码进行代码混淆

3. 应用完整性校验
4. 组件安全 - 组件安全测试工具
5. webview - web安全

## 敏感信息安全
1. 数据文件
2. Logcat日志

## 密码安全
1. 键盘劫持
2. 随机布局软键盘
3. 屏幕录像
4. 手势密码

## 安全策略
1. 密码复杂度检测
2. 账号登录限制
3. 账户锁定策略
4. 问题验证 - 密保问题
5. 会话安全  
6. 界面切换保护 - 防止钓鱼界面 activity劫持
7. UI信息泄露
8. 验证码安全 PKAVHttpFuzzer
9. 安全退出 - 退出时是否正常终止会话
10. 密码修改验证 - 验证旧密码
11. Activity界面劫持 - activity 界面劫持工具

## 进程保护
1. 内存访问和修改 - MemSpector
2. 动态注入 - hook

## 通信安全
1. 通信加密
2. 证书有效性
3. 关键数据加密和校验
4. 访问控制
5. 客户端更新安全性
6. 短信重放攻击

## 业务安全
1. 越权操作
2. 交易篡改
3. 重放攻击
4. 用户枚举
5. 暴力破解
6. 注入/XSS/CSRF

## pdf

[链接: ](https://pan.baidu.com/s/1iKgET4n-21MMukb8xmP2Yw)  
提取码: dwnc  

## LINKS

[android全套源码](http://pan.baidu.com/s/1ngsZs)  
[Android应用审计checklist整理
](https://github.com/guanchao/AndroidChecklist)  
[Android App Security Checklist
](https://github.com/b-mueller/android_app_security_checklist)   
[android-security-awesome tools list](https://github.com/ashishb/android-security-awesome)  
[Collection of Android security related resources
](https://github.com/wtsxDev/android-security-list)  
[Android安全防护](https://blog.csdn.net/u013409903/article/details/76686155)  
[Mobile-Security-Checklist](https://github.com/M31N99/Mobile-Security-Checklist)  