---
layout:     post
title:      "manifest-xml"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-nextgen-web-pwa.jpg"
tags:
    - "安卓代码段"
---
	<?xml version="1.0" encoding="utf-8"?>
	<manifest xmlns:android="http://schemas.android.com/apk/res/android"
			  package="com.app.demos">
		<!---基础配置-->
			<!--<uses-permission />-->
			<!--<permission />-->
			<!--<permission-tree />-->
			<!--<permission-group />-->
			<!--<instrumentation/>-->
			<!--<uses-sdk/>-->
			<!--<uses-configuration/>-->
			<!--<uses-feature/>-->
			<!--<supports-screens/>-->
			<!--<compatible-screens/>-->
			<!--<supports-gl-texture />-->

		<!--应用配置-->
		<application
			android:allowBackup="true"
			android:icon="@mipmap/ic_launcher"
			android:label="@string/app_name"
			android:supportsRtl="true"
			android:theme="@style/AppTheme">
			<!--Activity配置-->
			<activity android:name=".MainActivity">
				<intent-filter>
					<action android:name="android.intent.action.MAIN"/>

					<category android:name="android.intent.category.LAUNCHER"/>
				</intent-filter>
			</activity>
			<!--Activity配置-->
			<!--<activity>-->
				<!--<intent-filter>-->
					<!--<action/>-->
					<!--<category/>-->
					<!--<data/>-->
				<!--</intent-filter>-->
			<!--</activity>-->

			<!--<activity-alias>-->
				<!--<intent-filter></intent-filter>-->
				<!--<meta-data/>-->
			<!--</activity-alias>-->

			<!--Service配置-->
			<!--<service >-->
				<!--<intent-filter></intent-filter>-->
				<!--<meta-data/>-->
			<!--</service>-->

			<!--Receiver配置-->
			<!--<receiver >-->
				<!--<intent-filter></intent-filter>-->
				<!--<<meta-data/>-->
			<!--</receiver>-->

			<!--Provider配置-->
			<!--<provider>-->
				<!--<grant-uri-permission/>-->
				<!--<meta-data/>-->
			<!--</provider>-->

			<!--所需类库配置-->
			<!--<uses-library />-->

		</application>

	</manifest>
