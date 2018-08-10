---
layout:     post
title:      "Dalvik虚拟机和ART"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-universe.jpg"
tags:
    - "逆向"
---
http://blog.csdn.net/watermusicyes/article/details/50526814

Dalvik (JIT编译器即时编译器 运行时编译) 有限内存多个虚拟机实例 JIT技术是Android2.2引入Dalvik
ART (Android Runtime) (Android Runtime) (Ahead-of-time AOT技术) 把应用程序字节码转换为机器码 Android 4.4 测试 Android5.0后续正式
ART 改善了 性能 垃圾回收机制 应用程序除错  性能分析




Dalvik和ART的区别是啥呢？
平台支持差别：
Dalvik Android 4.4 及其以下平台使用的虚拟机； ART Android4.4以上平台使用的虚拟机技术；

工作原理差别：
在应用程序启动时，JIT通过进行连续的性能分析来优化程序代码的执行，在程序运行的过程中，Dalvik虚拟机在不断的进行将字节码编译成机器码的工作。 （多次编译 一直在编译） 启动时 运行时 编译

------

Android Runtime（缩写为 ART），是一种在Android操作系统上的运行环境，由Google公司研发，并在2013年作为Android 4.4系统中的一项测试功能正式对外发布，在Android 5.0及后续Android版本中作为正式的运行时库取代了以往的Dalvik虚拟机。ART能够把应用程序的字节码转换为机器码，是Android所使用的一种新的虚拟机。它与Dalvik的主要不同在于：Dalvik采用的是JIT技术，而ART采用Ahead-of-time（AOT）技术。 ART同时也改善了性能、垃圾回收(Garbage Collection)、应用程序除错以及性能分析。

JIT最早在Android 2.2系统中引进到Dalvik虚拟机中，在应用程序启动时，JIT通过进行连续的性能分析来优化程序代码的执行，在程序运行的过程中，Dalvik虚拟机在不断的进行将字节码编译成机器码的工作。 与Dalvik虚拟机不同的是，ART引入了AOT这种预编译技术，在应用程序安装的过程中，ART就已经将所有的字节码重新编译成了机器码。应用程序运行过程中无需进行实时的编译工作，只需要进行直接调用。因此，ART极大的提高了应用程序的运行效率，同时也减少了手机的电量消耗，提高了移动设备的续航能力，在垃圾回收等机制上也有了较大的提升。 为了保证向下兼容，ART使用了相同的Dalvik字节码文件（dex），即在应用程序目录下保留了dex文件供旧程序调用然而.odex文件则替换成了可执行与可链接格式（ELF）可执行文件。一旦一个程序被ART的dex2oat命令编译，那么这个程序将会指通过ELF可执行文件来运行。因此，相对于Dalvik虚拟机模式，ART模式下Android应用程序的安装需要消耗更多的时间，同时也会占用更大的储存空间（指内部储存，用于储存编译后的代码）,但节省了很多Dalvik虚拟机用于实时编译的时间。

Google公司在Android 4.4中带来的ART模式仅仅是ART的一个预览版，系统默认仍然使用的是Dalvik虚拟机，4.4上面提供的预览版ART相对于Android 5.0以后的ART运行时库有较大的不同，尤其体现在兼容性上。

ART
优点：
提高运行效率
减少电量消耗
提高续航能力
垃圾回收机制提升
缺点：
安装时间长
占用更大的储存空间 内部储存用于储存编译后的代码


---------2019-9-18更新------

2.2之前Dalvik虚拟机没有JIT编译器 是  启动时编译  每启动一次编译一次 (全量)
2.2之后Dalvik虚拟机引入JIT编译器 是 运行时编译  每次运行都在编译(少量)
4.4 测试 5.0以后正式 ART技术  在安装时编译 只编译一次


就是程序员编译->dalvik读取编译的字节码->cup运行dalvik
