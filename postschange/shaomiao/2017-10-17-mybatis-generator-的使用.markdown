---
layout:     post
title:      "mybatis-generator-的使用"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/home-bg-art.jpg"
tags:
    - "java"
---

![jar截图](http://upload-images.jianshu.io/upload_images/2590671-59c38c404b3f61c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

jar工具链接
http://pan.baidu.com/s/1qYGp2zy


generatro.xml文件

	<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
			"http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
	<generatorConfiguration>
		<!-- 数据库驱动包位置 (需要根据自己的路径修改)-->
		<classPathEntry location="/Users/zsq/Desktop/generator/mysql-connector-java-5.1.26-bin.jar"/>
		<context id="Tables" targetRuntime="MyBatis3">
			<commentGenerator>
				<property name="suppressAllComments" value="true"/>
			</commentGenerator>
			<!-- 数据库链接URL、用户名、密码 （定制修改）-->
			<jdbcConnection driverClass="com.mysql.jdbc.Driver" connectionURL="jdbc:mysql://t7:3306/meituancrm"
							userId="q3boy" password="q3girl"></jdbcConnection>
			<javaTypeResolver>
				<property name="forceBigDecimals" value="false"/>
			</javaTypeResolver>
			<!-- 生成模型的包名和位置 （targetPackage和targetProject根据自己要求修改）-->
			<javaModelGenerator targetPackage="com.sankuai.meituan.crm.domain.zerosale"
								targetProject="/Users/zsq/Desktop/generator/src">
				<property name="enableSubPackages" value="true"/>
				<property name="trimStrings" value="true"/>
			</javaModelGenerator>
			<!-- 生成的映射文件包名和位置 （targetPackage和targetProject根据自己要求修改）-->
			<sqlMapGenerator targetPackage="com.sankuai.meituan.crm.mapper.zerosale"
							 targetProject="/Users/zsq/Desktop/generator/src">
				<property name="enableSubPackages" value="true"/>
			</sqlMapGenerator>
			<!-- 生成DAO的包名和位置 （targetPackage和targetProject根据自己要求修改）-->
			<javaClientGenerator type="XMLMAPPER" targetPackage="com.sankuai.meituan.crm.dao.mapper.zerosale"
								 targetProject="/Users/zsq/Desktop/generator/src">
				<property name="enableSubPackages" value="true"/>
			</javaClientGenerator>
			<!-- 要生成那些表(更改tableName和domainObjectName就可以，多个表的话复制table标签在后边排列即可) -->
			<table tableName="zero_sale_clue" domainObjectName="ZeroSaleClue" enableCountByExample="false"
				   enableUpdateByExample="false" enableDeleteByExample="false" enableSelectByExample="false"
				   selectByExampleQueryId="false"/>
		</context>
	</generatorConfiguration>


到generatror所在目录
执行命令

java -jar mybatis-generator-core-1.3.2.jar -configfile generator.xml -overwrite
