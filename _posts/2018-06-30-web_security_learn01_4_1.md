---
layout: post
title: "1.4.1-SQL注入防御绕过-宽字节注入"
date: 2018-06-30
category: web安全
tags: sql注入
---

## 01 宽字节注入原理

>> 什么是宽字节
>> GB2312、GBK、GB8030、BIG5、Shift_JIS等这些都是常说的宽字节，实际为两字节。

站点可能为了防止SQL注入，会加\转义'，最后变成\'  

[]
MySQL在使用GBK编码的时候，会认为两个字符为一个汉字。
使用%df'进行编码，两个字符组合，认为是一个汉字。  
注：前一个Ascii码大于128才能到汉字的范围
[]

## 02 宽字节注入方法

	http://127.0.0.1/sqli-labs/Less-32/?id=%df' union select 1,(select user()),3--+

【】































