---
layout: post
title: "android 代码样式规范"
date: 2018-06-21
category: android
tags: android code_standard
---

原文地址 把重点记录下  
https://source.android.com/source/code-style.html


1.不要忽略异常(空的catch字句)  

  不要不捕获异常  

![推荐方式](http://upload-images.jianshu.io/upload_images/2590671-d9e8766c47552fe2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![推荐方式](http://upload-images.jianshu.io/upload_images/2590671-f182ce0036e28095.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


2.不要使用Findlizer  

Finalizer是一种在对象被垃圾回收时执行一段代码的方法。虽然他们可以方便地进行清理（特别是外部资源），但是没有保证什么时候调用终结器（甚至会被调用）。  

Android不使用finalizer。在大多数情况下，您可以从具有良好异常处理的终结器中完成所需的操作。如果你绝对需要它，定义一个close（）方法（或类似的），并准确地记录该方法需要被调用时（见InputStream的例子）。在这种情况下，只要不希望溢出日志，就可以打印来自终结器的短日志消息，但不是必需的。  


3.Java库规则  

旧的代码使用旧的库 在创建新的组件不要使用不推荐使用的库  

有使用Android的Java库和工具的约定。在某些情况下，约定以重要的方式发生了变化，较旧的代码可能使用已弃用的模式或库。当使用这样的代码，可以继续现有的风格。但是，在创建新组件时，不要使用不推荐使用的库。  


4.Java风格规则  

使用Javadoc标准注释  

每个文件应在顶部有一个版权声明，其后是package和import语句（每个块由空行分隔），最后是类或接口声明。在Javadoc注释中，描述类或接口的作用。  


![注释规范](http://upload-images.jianshu.io/upload_images/2590671-a2b0703f23b915d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

你写的每个类和公共方法必须包含一个Javadoc注释，至少有一个句子描述类或方法的作用。这句话应以第三人称描述性动词开始。  

![注释规范](http://upload-images.jianshu.io/upload_images/2590671-cf5bed56f9efa6b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![注释规范](http://upload-images.jianshu.io/upload_images/2590671-1e56e232fb5d1867.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如何为javadoc编写注释 [http://www.oracle.com/technetwork/java/javase/documentation/index-137868.html]  


5.写短的方法  

如果一个方法超过40行左右，考虑它是否可以分解而不伤害程序的结构。  


6.在标准位置定义字段  

在文件的顶部或在使用它们的方法之前定义字段。  


7.限制变量范围  

将局部变量范围保持最小  
循环变量应在for语句本身中声明  


8.次序导入语句  

  android import   
  第三方 import  
  java 和 javax  


9.使用缩进空格  
我们使用四（4）个空格缩进块，而不是制表符。当有疑问时，要与周围的代码一致。  

我们使用八（8）个空格缩进进行换行，包括函数调用和赋值。例如，这是正确的：  

![缩进](http://upload-images.jianshu.io/upload_images/2590671-f7ba99e90aa951eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


10.遵循字段命名约定  

非公共，非静态字段名以m开头。  
静态字段名称以s开头。  
其他字段以小写字母开头。  
公共静态最终字段（常量）为ALL_CAPS_WITH_UNDERSCORES。  

![命名规范](http://upload-images.jianshu.io/upload_images/2590671-bb7f60ad6182be61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


11.使用标准括号样式  
大括号不要自己一行; 大括号和代码在同一行：  

![标准括号](http://upload-images.jianshu.io/upload_images/2590671-2a03544c67f34cbf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们需要在条件语句周围添加括号。异常：如果整个条件（条件和主体）适合一行，你可以（但没有义务）把它全部放在一行上。例如，这是可以接受的：  

![括号规范](http://upload-images.jianshu.io/upload_images/2590671-851b61c733681703.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


12.限制线长度  

代码中的每行文字长度最多为100个字符。虽然许多讨论都围绕这个规则，但是决定仍然是100个字符是最大值，以下例外：  

如果注释行包含示例命令或长度超过100个字符的文字URL，则该行可能长于100个字符，以便于剪切和粘贴。  
导入行可以超过限制，因为人们很少看到它们（这也简化了工具写入）。  
使用标准Java注释  

注释应该在同一语言元素的其他修饰符之前。简单的标记注释（例如@Override）可以与语言元素列在同一行。如果有多个注释或参数化注释，它们应按字母顺序逐行列出。  


13.使用标准Java注释  

注释应该在同一语言元素的其他修饰符之前。简单的标记注释（例如@Override）可以与语言元素列在同一行。如果有多个注释或参数化注释，它们应按字母顺序逐行列出。  

Java中的三个预定义注释的Android标准实践是：  

@Deprecated：当不建议使用注释元素时，必须使用@Deprecated注释。如果使用@Deprecated注释，则还必须具有@deprecated Javadoc标记，并且应该命名替代实现。此外，请记住，一个@Deprecated方法 仍然应该工作。如果您看到旧代码带有@deprecated Javadoc标记，请添加@Deprecated注释。  
@Override：当方法从超类覆盖声明或实现时，必须使用@Override注释。例如，如果使用@inheritdocs Javadoc标记，并从类（而不是接口）派生，则还必须注释该方法@覆盖父类的方法。  
@SuppressWarnings：@SuppressWarnings注释只应在不可能消除警告的情况下使用。如果警告通过此“不可能消除”测试，则必须使用@SuppressWarnings注释，以确保所有警告都反映代码中的实际问题。  
当需要@SuppressWarnings注释时，必须以TODO注释作为前缀，解释“不可能消除”条件。这通常会识别具有尴尬界面的违规类。例如：  

// TODO: The third-party class com.third.useful.Utility.rotate() needs generics
@SuppressWarnings("generic-cast")
List<String> blix = Utility.rotate(blax);
当需要@SuppressWarnings注释时，应重构代码以隔离应用注释的软件元素。  


![注释](http://upload-images.jianshu.io/upload_images/2590671-0ed9e09a961a4e04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


14.将首字母缩略词作为词  

将缩写词和缩写词作为命名变量，方法和类中的单词，以使名称更易读：  

![命名](http://upload-images.jianshu.io/upload_images/2590671-9176c57a4abf2d68.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

由于JDK和Android代码库在首字母缩略词之间非常不一致，因此几乎不可能与周围的代码一致。因此，始终将首字母缩写作为词。  


15.使用TODO注释  

使用TODO注释代码是临时的，短期的解决方案，或者足够好但不完美的代码。TODO应在所有大写字母中包含字符串TODO，后跟冒号：  

  // TODO: Remove this code after the UrlTable2 has been checked in.

和

  // TODO: Change this to use a flag instead of a constant.

如果您的TODO的形式是“在未来的日期做某事”，请确保您包括一个非常具体的日期（“修复在2005年11月”）或一个非常具体的事件（“删除此代码之后所有生产混音师理解协议V7 。“）。  

16.日志节制  

虽然记录是必要的，但它对性能具有显着的负面影响，并且如果不保持合理的简短，则快速失去其有用性。日志记录工具提供五个不同级别的日志记录：  

ERROR：当发生致命事件时使用，即某些会有用户可见的后果，并且如果没有显式删除某些数据，卸载应用程序，擦除数据分区或重新整理整个设备（或更糟），将无法恢复。此级别始终记录。在ERROR级别上证明某些日志记录的问题通常是被报告给统计信息收集服务器的好候选。  

WARNING：在发生严重和意外事件时使用，即某些会有用户可见的后果，但可能通过执行一些明确的操作来恢复，而不会丢失数据，从等待或重新启动应用程序到重新下载新版本的应用程序或重新启动设备。此级别始终记录。在WARNING级别进行某些日志记录的问题也可能被考虑用于向统计信息收集服务器报告。  

INFORMATIVE: 使用注意到，大多数人发生了有趣的事情，即当检测到可能具有广泛影响的情况时，虽然不一定是错误。这样的条件只能由合理地认为它是该域中最具权威性的模块记录（以避免非授权组件的重复日志记录）。此级别始终记录。  

DEBUG：用于进一步注意设备上可能与调查和调试意外行为相关的内容。你应该只记录需要什么来收集有关你的组件发生什么的足够的信息。如果你的调试日志主导日志，那么你可能应该使用详细日志记录。  

此级别将被记录，即使在发布版本上，并且需要被一个if (LOCAL_LOG)或if (LOCAL_LOGD) 块包围，其中LOCAL_LOG[D]在类或子组件中定义，因此可能存在禁用所有此类日志记录的可能性。因此，在if (LOCAL_LOG)块中必须没有活动逻辑。所有用于日志的字符串构建也需要放置在if (LOCAL_LOG)块内。如果它将导致字符串构建在if (LOCAL_LOG)块之外发生，则日志调用不应该重新映射到方法调用中。  
还有一些代码仍然说if (localLOGV)。这也被认为是可接受的，虽然名称是非标准的。  

VERBOSE：用于一切。此级别将仅在调试版本上记录，并且应由if (LOCAL_LOGV)块（或等效的）包围，因此可以默认编译出来。任何字符串构建将从发布版本中删除，并需要显示在if (LOCAL_LOGV)块内。  
笔记：  

在给定的模块中，除了VERBOSE级别之外，只有在可能的情况下才应报告错误。在模块内的单个函数调用链中，只有最内层函数应该返回错误，并且同一模块中的调用者应该只添加一些日志，如果这显着帮助隔离问题。  

在一个模块链中，除了VERBOSE级别以外，当低级模块检测到来自高级模块的无效数据时，低级模块只应将此情况记录到DEBUG日志中，并且仅当日志记录提供对呼叫者不可用的信息。具体来说，不需要记录抛出异常的情况（异常应包含所有相关信息），或者记录的唯一信息包含在错误代码中。这在框架和应用程序之间的交互中尤其重要，由框架正确处理的第三方应用程序引起的条件不应该触发高于DEBUG级别的日志记录。  

当通常证明某些日志记录可能发生多次的条件时，实施一些速率限制机制以防止用相同（或非常相似）信息的许多重复副本来溢出日志是一个好主意。  

网络连接的损失被认为是常见的，完全预期的，不应该被无偿地记录。在应用程序中发生后果的网络连接丢失应在DEBUG或VERBOSE级别记录（取决于后果是否足够严重，并且意外足以登录到发布版本中）。
在可由第三方应用程序访问或代表第三方应用程序访问的文件系统上具有完整的文件系统不应该记录在高于INFORMATIVE的级别。  

来自任何不受信任的源（包括共享存储上的任何文件或来自任何网络连接的数据）的无效数据被认为是预期的，并且当检测到无效时，不应该在高于DEBUG的级别触发任何日志记录日志记录应尽可能有限）。  

请记住，+在字符串上使用运算符时，隐式创建一个StringBuilder具有默认缓冲区大小（16个字符）和可能的其他临时String对象，即显式创建StringBuilders不比依赖于默认的'+'运算符更昂贵（事实上​​可以更高效）。请记住，调用的代码Log.v()在发布版本上编译和执行，包括构建字符串，即使日志没有被读取。  

任何意图被其他人读取并在发布版本中可用的日志记录应该是简洁的，而不是含糊的，并且应该是可以理解的。这包括所有登录到DEBUG级别。  

如果可能，记录应该保持在一行，如果有意义。线长度最多可达80或100个字符是完全可以接受的，如果可能，应避免长度大于约130或160个字符（包括标签的长度）。  

不应使用高于VERBOSE的级别记录报告成功的日志。  

用于诊断难以重现的问题的临时日志应该保存在DEBUG或VERBOSE级别，并且应该包含在允许在编译时完全禁用它的块。  
小心日志中的安全漏洞。应避免私人信息。必须避免有关受保护内容的信息。这在编写框架代码时尤其重要，因为事先不容易知道什么将是和不会是私人信息或受保护的内容。  

System.out.println()（或printf()本地代码）永远不要使用。System.out和System.err被重定向到/ dev / null，所以你的打印语句将没有可见的效果。然而，对于这些调用发生的所有字符串构建仍然被执行。  

记录的黄金规则是，您的日志可能不会不必要地将其他日志推出缓冲区，就像其他人可能不会推出您的日志。  



17.始终一致  

我们分开的想法：一致。如果您正在编辑代码，请花几分钟时间查看周围的代码并确定其样式。如果该代码使用if子句周围的空格，你也应该。如果代码注释在他们周围有一些星星框，那么你的评论也有一些星星。  

有风格指导的要点是有一个通用的编码词汇，所以人们可以专注于你在说什么，而不是你如何说。我们在这里提出全球风格规则，所以人们知道词汇，但本地风格也很重要。如果你添加到一个文件的代码看起来与现有的代码有很大的不同，当读者阅读它时，它会使读者脱离他们的节奏。尝试避免这一点。  


18.Javatests样式规则  
按照测试方法命名约定，使用下划线将要测试的内容与要测试的特定案例分开。这种风格使得更容易查看正在测试的案例。例如：  

testMethod_specificCase1 testMethod_specificCase2

void testIsDistinguishable_protanopia() {
    ColorMatcher colorMatcher = new ColorMatcher(PROTANOPIA)
    assertFalse(colorMatcher.isDistinguishable(Color.RED, Color.BLACK))
    assertTrue(colorMatcher.isDistinguishable(Color.X, Color.Y))
}
