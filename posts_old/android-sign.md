---
title: android签名/打包
tags:
  - android安全
abbrlink: 1412609823
date: 2019-07-10 16:43:18
---

## 生成签名

```
keytool -genkey -alias <别名> -keyalg RSA -validity 2000 -keystore newandroid.keystore

> keytool -genkey -alias xx -keyalg RSA -validity 2000 -keystore xx.keystore

Enter keystore password:  
Re-enter new password: 
What is your first and last name?
  [Unknown]:  test
What is the name of your organizational unit?
  [Unknown]:  www.test.com
What is the name of your organization?
  [Unknown]:  test
What is the name of your City or Locality?
  [Unknown]:  wuhan
What is the name of your State or Province?
  [Unknown]:  hubei
What is the two-letter country code for this unit?
  [Unknown]:  86
Is CN=test, OU=www.test.com, O=test, L=wuhan, ST=hubei, C=86 correct?
  [no]:  y

Enter key password for <xx>
	(RETURN if same as keystore password):  
Re-enter new password: 

Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore xx.keystore -destkeystore xx.keystore -deststoretype pkcs12".


当使用这个命令生成后，会有个警告，不符合pkcs12标准，需要消除掉（也可以不消除），使用如下命名：
keytool -importkeystore -srckeystore android.keystore -destkeystore newandroid.keystore -deststoretype pkcs12


```

## 查看签名文件

```
> keytool -list -v -keystore xxxx.keystore

Enter keystore password:  
Keystore type: PKCS12
Keystore provider: SUN

Your keystore contains 1 entry

Alias name: xx
Creation date: Jul 10, 2019
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=test, OU=www.test.com, O=test, L=wuhan, ST=hubei, C=86
Issuer: CN=test, OU=www.test.com, O=test, L=wuhan, ST=hubei, C=86
Serial number: 2a05152c
Valid from: Wed Jul 10 16:54:19 CST 2019 until: Mon Dec 30 16:54:19 CST 2024
Certificate fingerprints:
	 MD5:  9A:81:9C:B9:FD:82:4F:98:E1:5E:9E:4F:4B:6B:45:2B
	 SHA1: 74:DD:F7:6A:BF:35:FD:FE:26:47:25:66:9E:F8:5C:D5:FD:E5:06:BF
	 SHA256: D8:22:7B:39:A0:67:0B:EB:1F:B6:26:13:0D:A4:3B:17:A1:61:91:22:D2:E6:5B:A0:A5:AD:BB:49:D9:18:5B:4D
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3

Extensions: 

#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: F2 4B 25 9D B9 29 F7 43   C4 5C 3E 8F 8D ED B3 9F  .K%..).C.\>.....
0010: 6B 92 DE 72                                        k..r
]
]



*******************************************
*******************************************
```
## 查看apk签名信息

```
解压apk 查看META-INF 文件夹的xx.RSA
keytool -printcert -file xxx.RSA

```

## 反编译apk/获取没签名的apk
```
apktool -r -f d xx.apk -o xx 
apktool b xx 
xx文件夹dist有生成没签名的apk
```


## 重新签名
```
> apksigner sign --verbose --ks <keystore> --ks-key-alias <别名> --ks-pass <pass:123456> --key-pass <pass:123456> --in <待签名的apk> --out <签名后输出的apk>

> apksigner sign --verbose  --ks test.jks --ks-key-alias test --ks-pass pass:123456 --key-pass pass:123456 --in app-debug.apk  --out appsigned.apk 

> apksigner sign --verbose  --ks bition --ks-key-alias bition --ks-pass pass:123456 --key-pass pass:123456 --in app-debug.apk  --out appsignn.apk 
Signed



参数：
--verbose 签名/验证时输出详细信息
--ks 密钥库位置
--ks-key-alias 别名
--ks-pass KeyStore密码
--key-pass 签署者的密码，即生成jks时指定alias对应的密码
--in 被签名的apk
--out 签名过的apk
```

```
> apksigner -h
USAGE: apksigner <command> [options]
       apksigner --version
       apksigner --help

EXAMPLE:
       apksigner sign --ks release.jks app.apk
       apksigner verify --verbose app.apk

apksigner is a tool for signing Android APK files and for checking whether
signatures of APK files will verify on Android devices.


        COMMANDS

sign                  Sign the provided APK

verify                Check whether the provided APK is expected to verify on
                      Android

version               Show this tool's version number and exit

help                  Show this usage page and exit
```

```
> apksigner sign   
USAGE: apksigner sign [options] apk

This signs the provided APK, stripping out any pre-existing signatures. Signing
is performed using one or more signers, each represented by an asymmetric key
pair and a corresponding certificate. Typically, an APK is signed by just one
signer. For each signer, you need to provide the signer's private key and
certificate.


        GENERAL OPTIONS

--in                  Input APK file to sign. This is an alternative to
                      specifying the APK as the very last parameter, after all
                      options. Unless --out is specified, this file will be
                      overwritten with the resulting signed APK.

--out                 File into which to output the signed APK. By default, the
                      APK is signed in-place, overwriting the input file.

-v, --verbose         Verbose output mode

--v1-signing-enabled  Whether to enable signing using JAR signing scheme (aka v1
                      signing scheme) used in Android since day one. By default,
                      signing using this scheme is enabled based on min and max
                      SDK version (see --min-sdk-version and --max-sdk-version).

--v2-signing-enabled  Whether to enable signing using APK Signature Scheme v2
                      (aka v2 signing scheme) introduced in Android Nougat,
                      API Level 24. By default, signing using this scheme is
                      enabled based on min and max SDK version (see
                      --min-sdk-version and --max-sdk-version).

--min-sdk-version     Lowest API Level on which this APK's signatures will be
                      verified. By default, the value from AndroidManifest.xml
                      is used. The higher the value, the stronger security
                      parameters are used when signing.

--max-sdk-version     Highest API Level on which this APK's signatures will be
                      verified. By default, the highest possible value is used.

--debuggable-apk-permitted  Whether to permit signing android:debuggable="true"
                      APKs. Android disables some of its security protections
                      for such apps. For example, anybody with ADB shell access
                      can execute arbitrary code in the context of a debuggable
                      app and can read/write persistently stored data of the
                      app. It is a good security practice to not sign
                      debuggable APKs with production signing keys, because
                      such APKs puts users at risk once leaked.
                      By default, signing debuggable APKs is permitted, for
                      backward compatibility with older apksigner versions.

-h, --help            Show help about this command and exit


        PER-SIGNER OPTIONS
These options specify the configuration of a particular signer. To delimit
options of different signers, use --next-signer.

--next-signer         Delimits options of two different signers. There is no
                      need to use this option when only one signer is used.

--v1-signer-name      Basename for files comprising the JAR signature scheme
                      (aka v1 scheme) signature of this signer. By default,
                      KeyStore key alias or basename of key file is used.

        PER-SIGNER SIGNING KEY & CERTIFICATE OPTIONS
There are two ways to provide the signer's private key and certificate: (1) Java
KeyStore (see --ks), or (2) private key file in PKCS #8 format and certificate
file in X.509 format (see --key and --cert).

--ks                  Load private key and certificate chain from the Java
                      KeyStore initialized from the specified file. NONE means
                      no file is needed by KeyStore, which is the case for some
                      PKCS #11 KeyStores.

--ks-key-alias        Alias under which the private key and certificate are
                      stored in the KeyStore. This must be specified if the
                      KeyStore contains multiple keys.

--ks-pass             KeyStore password (see --ks). The following formats are
                      supported:
                          pass:<password> password provided inline
                          env:<name>      password provided in the named
                                          environment variable
                          file:<file>     password provided in the named
                                          file, as a single line
                          stdin           password provided on standard input,
                                          as a single line
                      A password is required to open a KeyStore.
                      By default, the tool will prompt for password via console
                      or standard input.
                      When the same file (including standard input) is used for
                      providing multiple passwords, the passwords are read from
                      the file one line at a time. Passwords are read in the
                      order in which signers are specified and, within each
                      signer, KeyStore password is read before the key password
                      is read.

--key-pass            Password with which the private key is protected.
                      The following formats are supported:
                          pass:<password> password provided inline
                          env:<name>      password provided in the named
                                          environment variable
                          file:<file>     password provided in the named
                                          file, as a single line
                          stdin           password provided on standard input,
                                          as a single line
                      If --key-pass is not specified for a KeyStore key, this
                      tool will attempt to load the key using the KeyStore
                      password and, if that fails, will prompt for key password
                      and attempt to load the key using that password.
                      If --key-pass is not specified for a private key file key,
                      this tool will prompt for key password only if a password
                      is required.
                      When the same file (including standard input) is used for
                      providing multiple passwords, the passwords are read from
                      the file one line at a time. Passwords are read in the
                      order in which signers are specified and, within each
                      signer, KeyStore password is read before the key password
                      is read.

--pass-encoding       Additional character encoding (e.g., ibm437 or utf-8) to
                      try for passwords containing non-ASCII characters.
                      KeyStores created by keytool are often encrypted not using
                      the Unicode form of the password but rather using the form
                      produced by encoding the password using the console's
                      character encoding. apksigner by default tries to decrypt
                      using several forms of the password: the Unicode form, the
                      form encoded using the JVM default charset, and, on Java 8
                      and older, the form encoded using the console's charset.
                      On Java 9, apksigner cannot detect the console's charset
                      and may need to be provided with --pass-encoding when a
                      non-ASCII password is used. --pass-encoding may also need
                      to be provided for a KeyStore created by keytool on a
                      different OS or in a different locale.

--ks-type             Type/algorithm of KeyStore to use. By default, the default
                      type is used.

--ks-provider-name    Name of the JCA Provider from which to request the
                      KeyStore implementation. By default, the highest priority
                      provider is used. See --ks-provider-class for the
                      alternative way to specify a provider.

--ks-provider-class   Fully-qualified class name of the JCA Provider from which
                      to request the KeyStore implementation. By default, the
                      provider is chosen based on --ks-provider-name.

--ks-provider-arg     Value to pass into the constructor of the JCA Provider
                      class specified by --ks-provider-class. The value is
                      passed into the constructor as java.lang.String. By
                      default, the no-arg provider's constructor is used.

--key                 Load private key from the specified file. If the key is
                      password-protected, the password will be prompted via
                      standard input unless specified otherwise using
                      --key-pass. The file must be in PKCS #8 DER format.

--cert                Load certificate chain from the specified file. The file
                      must be in X.509 PEM or DER format.


        JCA PROVIDER INSTALLATION OPTIONS
These options enable you to install additional Java Crypto Architecture (JCA)
Providers, such as PKCS #11 providers. Use --next-provider to delimit options of
different providers. Providers are installed in the order in which they appear
on the command-line.

--provider-class      Fully-qualified class name of the JCA Provider.

--provider-arg        Value to pass into the constructor of the JCA Provider
                      class specified by --provider-class. The value is passed
                      into the constructor as java.lang.String. By default, the
                      no-arg provider's constructor is used.

--provider-pos        Position / priority at which to install this provider in
                      the JCA provider list. By default, the provider is
                      installed as the lowest priority provider.
                      See java.security.Security.insertProviderAt.


        EXAMPLES

1. Sign an APK, in-place, using the one and only key in keystore release.jks:
$ apksigner sign --ks release.jks app.apk

1. Sign an APK, without overwriting, using the one and only key in keystore
   release.jks:
$ apksigner sign --ks release.jks --in app.apk --out app-signed.apk

3. Sign an APK using a private key and certificate stored as individual files:
$ apksigner sign --key release.pk8 --cert release.x509.pem app.apk

4. Sign an APK using two keys:
$ apksigner sign --ks release.jks --next-signer --ks magic.jks app.apk

5. Sign an APK using PKCS #11 JCA Provider:
$ apksigner sign --provider-class sun.security.pkcs11.SunPKCS11 \
    --provider-arg token.cfg --ks NONE --ks-type PKCS11 app.apk

6. Sign an APK using a non-ASCII password KeyStore created on English Windows.
   The --pass-encoding parameter is not needed if apksigner is being run on
   English Windows with Java 8 or older.
$ apksigner sign --ks release.jks --pass-encoding ibm437 app.apk

7. Sign an APK on Windows using a non-ASCII password KeyStore created on a
   modern OSX or Linux machine:
$ apksigner sign --ks release.jks --pass-encoding utf-8 app.apk
```

## 验证签名
```
apksigner verify -v <test.apk>

Verifies
Verified using v1 scheme (JAR signing): true
Verified using v2 scheme (APK Signature Scheme v2): true
Number of signers: 1
```

## LINKS
[Android 对apk进行重签名和查看签名(window 和mac)及生成签名](https://blog.csdn.net/willba/article/details/79476904)  
[用apksigner进行批量签名的脚本](https://blog.csdn.net/lxlmycsdnfree/article/details/80801719)  
[安卓重签名脚本——AndroidResigner.bat](https://blog.csdn.net/a709560839/article/details/82787897)  