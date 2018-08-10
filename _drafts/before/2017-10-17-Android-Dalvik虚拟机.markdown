---
layout:     post
title:      "Android-Dalvik虚拟机"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-universe.jpg"
tags:
    - "逆向"
---
Dalvik虚拟机作为Android平台的核心组件
1.体积小，占用内存空间小
2.专有的DEX可执行文件 体积更小 常量更快
3.常量池采用32位索引值 寻址类方法名 字段名 常量更快
4.基于寄存器架构 并拥有一套完整的指令系统
5.提供了对象生命周期管理 堆栈管理 线程管理 安全和异常管理以及垃圾回收等重要功能
6.所有的Android程序都运行在Android系统进程里 每个进程对应一个Dalvik虚拟机实例

Dalvik虚拟机与Java虚拟机的区别
两者不兼容

1.java虚拟机运行的是Java字节码 Dalvik虚拟机运行的是Dalvik字节码
传统的Java程序经过编译 生成Java字节码保持在class文件中 Java虚拟机通过编码class文件中的内容来运行程序
而Dalvik虚拟机运行的是Dalvik字节码 所有Dalvik字节码由Java字节码转换而来 并被打包到一个DEX可执行文件中 Dalvik虚拟机通过解释DEX文件来执行这些字节码
2. Dalvik可执行文件体积更小
dx工具对常量池的压缩 使得相同的字符串 常量 在DEX文件中只出现一次,从而减小了文件的体积
3.Java虚拟机与Dalvik虚拟机架构不同
Java虚拟机基于栈架构 程序在运行时虚拟机需要频繁的从栈上读取或写入数据 这个过程需要更多的指令与内存访问次数 会耗费不少CPU时间 对于像手机设备资源有限的设备来说这是相当大的一笔开销

Dalvik虚拟机基于寄存器架构 数据的访问通过寄存器间直接传递 这样的访问方式比基于栈方式要快很多

编写测试代码 


hello.class

	/**
	 * Created by shaomiao on 2017/9/20.
	 */

	public class Hello {
		public int foo(int a,int b) {
			return (a + b) * (a - b);
		}

		public static void main(String[] argc) {
			Hello hello = new Hello();
			System.out.println(hello.foo(5,3));
		}
	}


Hello.java 源代码
javac Hello.java
Hello.class 编译后的代码
dx --dex --output=Hello.dex Hello.class
Hello.dex dx编译后的代码 用于Dalvik运行 使用dexdump.exe查看


使用javap反编译Hello.class查看foo() 函数的Java字节码 
javap -c -classpath . Hello 

使用dexdump.exe (位于Android SDK的platform-tools目录中)
dexdump.exe -d Hello.dex

Hello.class 反编译后的代码

	public int foo(int, int);
		Code:
		   0: iload_1
		   1: iload_2
		   2: iadd
		   3: iload_1
		   4: iload_2
		   5: isub
		   6: imul
		   7: ireturn


Hello.dex 用dexdump.exe查看的代码

	000198:                                        |[000198] Hello.foo:(II)I
	0001a8: 9000 0304                              |0000: add-int v0, v3, v4
	0001ac: 9101 0304                              |0002: sub-int v1, v3, v4
	0001b0: b210                                   |0004: mul-int/2addr v0, v1
	0001b2: 0f00                                   |0005: return v0







