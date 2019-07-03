---
layout:     post
title:      "android-drawable子类"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
参考 http://blog.csdn.net/yuzhiyuxia/article/details/8806488

Android内置了如下几种Drawable类型：
BitmapDrawable [Drawable子类之—— BitmapDrawable （可控制对齐平铺的图像）](http://www.jianshu.com/p/59ca59808317)
ColorDrawable
GradientDrawable
NinePatchDrawable
InsetDrawable [Drawable子类之——InsetDrawable （嵌入）](http://www.jianshu.com/p/b1c2d2d3dfb5)
ClipDrawable [Drawable子类之——ClipDrawable （裁剪图像）](http://www.jianshu.com/p/9e3a021288f9)
ScaleDrawable
RotateDrawable
AnimationDrawable
LayerDrawable [Drawable子类之——LayoutDrawable （图层叠加）](http://www.jianshu.com/p/f1de437f4b3d)
LevelListDrawable [Drawable子类之——LevelListDrawable （等级列表图片）](http://www.jianshu.com/p/aa87c41182b7)
StateListDrawable [Drawable子类之—— ShapeDrawable （图形定义）](http://www.jianshu.com/p/6d8db552d3b9)
TransitionDrawable [Drawable子类之——TransitionDrawable （渐变）](http://www.jianshu.com/p/27fb18e0afc1)

**StateListDrawable (背景图片)<selector />**

当StatListDrawable资源作为组件的背景或者前景Drawable资源时，可以随着组件状态的变更而自动切换相对应的资源，例如，一个Button可以处于不同的状态(按钮按下、获取焦点)

我们可以使用一个StateListDrawable资源，来提供不同的背景图片对于每一个状态。，当组件的状态变更时，会自定向下遍历StateListDrawable对应的xml文件来查找第一个匹配的Item

	<?xml version="1.0" encoding="utf-8"?>
	<selector xmlns:android="http://schemas.android.com/apk/res/android">
		<!--android:state_pressed 是否按下，如一个按钮触摸或者点击。-->
		<item android:state_pressed="true"
			  android:drawable="@drawable/button_pressed" /> <!-- pressed -->
		<!--android:state_focused 是否取得焦点，比如用户选择了一个文本框。-->
		<item android:state_focused="true"
			  android:drawable="@drawable/button_focused" /> <!-- focused -->
		<!--android:state_hovered 光标是否悬停-->
		<item android:state_hovered="true"
			  android:drawable="@drawable/button_focused" /> <!-- hovered -->
		<!--默认-->
		<item android:drawable="@drawable/button_normal" /> <!-- default -->
	</selector>
	以下是Button的Layout文件：

	<Button
		android:layout_height="wrap_content"
		android:layout_width="wrap_content"
		android:background="@drawable/button" />
	当然我们也可以通过代码来设置Button的背景图片：

	Button imageButton=(Button)findViewById(R.id.imageButton);

	imageButton.setBackgroundResource(com.jeriffe.app.R.drawable.button_statelist);


android:state_pressed 是否按下，如一个按钮触摸或者点击。
android:state_focused 是否取得焦点，比如用户选择了一个文本框。
android:state_hovered 光标是否悬停，通常与focused state相同，它是4.0的新特性android:state_selected 被选中，它与focus state并不完全一样，如一个list view 被选中的时候，它里面的各个子组件可能通过方向键，被选中了。
android:state_checkable 组件是否能被check。如：RadioButton是可以被check的。
android:state_checked 被checked了，如：一个RadioButton可以被check了。android:state_enabled 能够接受触摸或者点击事件android:state_activated 被激活(这个麻烦举个例子，不是特明白)android:state_window_focused 应用程序是否在前台，当有通知栏被拉下来或者一个对话框弹出的时候应用程序就不在前台了

 

注意:如果有多个item，那么程序将自动从上到下进行匹配，最先匹配的将得到应用。（不是通过最佳匹配）如果一个item没有任何的状态说明，那么它将可以被任何一个状态匹配。

**ShapeDrawable(圆角)<shape />**

ShapeDrawable资源绘制一个特定的形状，比如矩形、椭圆等。如果你想自己动态的绘制二位图形，那么我们就可以使用ShapeDrawable资源对象，用ShapeDrawable,我们可以绘制我们所能想象的形状。。一个ShapeDrawable 需要一个Shape对象来管理呈现资源到UI Screen,如果没有Shape设置，那么会默认使用RectShape对象。
ShapeDrawable 被定义在一个XML文件中，以 <shape>
 元素起始。其内部的每一个Drawable资源内嵌在<item>元素中

	<?xml version="1.0" encoding="UTF-8"?>
	<shape xmlns:android="http://schemas.android.com/apk/res/android" 
		android:shape="oval">
		<!-- 定义填充渐变颜色 -->
		<gradient 
			android:startColor="#00f" 
			android:endColor="#00f" 
			android:angle="45"
			android:type="sweep"/> 
		<!-- 设置内填充 -->
		<padding android:left="7dp" 
			android:top="7dp" 
			android:right="7dp" 
			android:bottom="7dp" />
		<!-- 设置圆角矩形 -->
		<corners android:radius="8dp" /> 
	</shape>

**ClipDrawable(裁剪)<clip />**

ClipDrawable资源定义在一个XML中，表示裁剪(Clips)一个其他资源基于ClipDrawable资源的Level。你可以控制裁剪的Drawable的宽度高度及gravity属性，ClipDrawable常常被用来作为一个progressbars的实现。

	<?xml version="1.0" encoding="utf-8"?>

	<clip xmlns:android="http://schemas.android.com/apk/res/android"

	android:drawable="@drawable/android"

	android:clipOrientation="horizontal"

	android:gravity="left" />
	下面的ImageView布局文件应用Clipdrawable资源：

	 

	<ImageView

	android:id="@+id/image"

	android:background="@drawable/clip"

	android:layout_height="wrap_content"

	android:layout_width="wrap_content" />

**AnimationDrawable(动画)<animation-list/>**

	<animation-list xmlns:android="http://schemas.android.com/apk/res/android"
		android:oneshot="true">
		<item android:drawable="@drawable/rocket_thrust1" android:duration="200" />
		<item android:drawable="@drawable/rocket_thrust2" android:duration="200" />
		<item android:drawable="@drawable/rocket_thrust3" android:duration="200" />
	</animation-list>

我们可以看到，AnimationDrawable资源文件以<animation-list>元素为根，包含一系列的<Item>节点，每一个节点定义了一个帧(frame)及持续时常。

上述动画运行了3个帧，通过设置android:oneshot 属性(attribute)为true，动画会循环一次并停留在最后一帧，如果为false那么会轮询(loop)的运行动画

我们可以通过编码来加载播放动画：



	 // Load the ImageView that will host the animation and
	 // set its background to our AnimationDrawable XML resource.
	 ImageView img = (ImageView)findViewById(R.id.spinning_wheel_image);
	 img.setBackgroundResource(R.drawable.spin_animation);

	 // Get the background, which has been compiled to an AnimationDrawable object.
	 AnimationDrawable frameAnimation = (AnimationDrawable) img.getBackground();

	 // Start the animation (looped playback by default).
	 frameAnimation.start();
	 

注意：AnimationDrawable. start()方法不能够在Activity的onCreate()方法中调用，因为AnimationDrawable还未完全的附加(attached)到Window,如果你不需要交互而立即播放动画，那么可以在onWindowFocusChanged() 方法中，这个方法会在你的Activity Windows获取焦点是触发。
