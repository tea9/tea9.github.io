---
layout: post
title: "设计模式-策略模式（strategy）"
date: 2018-08-10
category: 设计模式
tags: 设计模式
---

## 策略模式

视频地址  
http://www.imooc.com/video/3213

策略模式  ：  

将可变的部分  从程序中抽象分离成算法接口在该接口下分别封装一系列的算法实现
并使他们可以相互等候，从而导致客户端程序独立于算法的改变。  
 
不变更代码架构  
通过开发与重构  
拥抱需求的变化  
使用策略模式  

虚拟应用：  鸭子应用  
飞行的能力    
更多鸭子类型  
每六个月发布一款产品  

原有功能  

鸭子的鸣叫功能  
鸭子的显示功能  

需求：  
加入飞行能力  

原有项目：  
鸭子基类  
Duck.class

	/*
	 * 超类，所有的鸭子都要继承此类
	 * 抽象了鸭子的行为：显示和鸣叫
	 */
	public abstract class Duck {
	  
		/*
		 * 鸭子发出叫声
		 * 通用行为，由超类实现
		 */
		public void quack(){
			System.out.println("嘎嘎嘎");
		}
		
		/*
		 * 显示鸭子的外观
		 * 鸭子的外观各不相同，声明为abstract， 由子类实现
		 */
		public abstract void display();
		
			
	}

需求:让鸭子飞起来？  


方案一：继承  
    在父类中提供实现方法，子类通过继承获得父类中的飞行行为  
    
    Duck.class

	public void fly(){
		System.out.println("用翅膀飞行");
	}


优点  
  简单易用(粗暴丑陋)，已用应用可以快速添加飞行的能力  
缺点  
  不具有灵活性，对未来变更支持差  
  需要通过在子类中覆写飞行的方法以提供新的飞行行为。这很容易造成错误(粗心的程序员忘记覆写)。  

-----------------------------------pass----------------------------------  

方案二：抽象方法  
  在父类中提供抽象方法，强迫子类实现自己的飞行行为  

	public abstract void fly();

优点  
  足够灵活。  

缺点  
  累死  
  每个子类都要实现一遍代码，即使是相同的行为也不例外。  
  代码重复，没有复用代码。  

-------------------------pass-------------------------------------  

######继承是重用代码的利器  
######但继承并不总是最好的工具  

***

#####复合优先于继承
#####多用组合，少用继承

组合  
has-a     
#use  

组合：  
 在类中增加一个私有域，引用另一个已有的类的实例，通过调用引用实例的方法从而获得新的功能，这种设计称作组合(复合)  


方案三：组合  
  将飞行行为抽象为接口，在父类中持有该接口，并由该接口代理飞行行为。  

	/*
	 * 策略接口，实现鸭子的飞行行为
	 */
	public interface FlyingStragety {

		void performFly();
	}

	private FlyingStragety flyingStragety;


	public void setFlyingStragety(FlyingStragety flyingStragety) {
		this.flyingStragety = flyingStragety;
	}

	public void fly(){
		flyingStragety.performFly();
	}

优点：  
  足够灵活  
  复用代码，更易于维护  

缺点：  
  


策略模式中的设计原则：  
  找出应用中需要变化的部分，把他们独立出来，不要和那些不需要变化的代码混在一起。  
  面向接口编程，而不是面向实现编程。  
  多用组合，少用继承。  

策略模式的实现：  
  （1） 通过分离变化得出的策略接口Strategy  
  （2） Strategy的实现类  
  （3） 客户程序"有一个"Stategy  
  （4） 客户程序中选择/组装正确的Strategy实现  
