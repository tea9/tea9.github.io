---
layout: post
title: "solidity基本代码"
date: 2018-09-16
category: 区块链
tags: 区块链
---

## 类&函数

	pragma solidity ^0.4.25;

	contract Demo1{
	    
	    // 创建一个函数
	    function shwo(int num) public returns(int,int){
	        return (num,num+1);
	    }
	}


## int&uint

	pragma solidity ^0.4.25;

	contract IntDemo{
	    
	    // 主要演示 int uint 的相关特性 ，如果没有指定步长默认是 int --> int256
	    function demo01() returns (int,uint,int){
	        int8 num = -128; // 1个字节8位，最高位为符号位 128～127
	        uint8 num2 = 255; // 1个字节8位，都是用来存储数据 0～255 0000 0000 - 1111 1111
	        
	        var num3 = num;
	        return (num,num2,num3);
	    }
	}

## 属性&函数

		pragma solidity ^0.4.25;

	// 属性、函数、访问修饰符
	contract AttrFnDemo{
	    
	    // 属性的默认访问修饰符：internal，但是函数默认访问修饰符public
	    uint private _age; // private 仅仅当前合约可以访问
	    
	    string internal _name; // 当前合约和子合约可以访问
	    
	    int public _num; // 外部可以直接调用
	    
	    function AttrFnDemo(uint age,string name,int num){
	        // this 代表当前合约（地址），但是不能直接和属性名称使用
	        _age = age;
	        _name = name;
	        _num = num;
	    }
	    // 构造函数在智能合约中不支持多态（重载）
	    // function AttrFnDemo() {}
	    
	    function age() private returns (uint){
	        return _age;
	    }
	    
	    function name() internal returns (string){
	        return _name;
	    }
	    
	    function num() public returns (int) {
	        return _num;
	    }
	    // 没有指定访问修饰符，默认为public
	    function show() returns (uint,string,int){
	        return (_age,name(),_num);
	    }
	    // solidity 默认普通的函数是支持多态性（重载）
	    // function show(int x) returns (uint,string,int){
	    //     return (_age,name(),_num);
	    // }
	    
	}

## 继承&接口

	pragma solidity ^0.4.25;

	interface Wifi{ // 定义接口，函数只有声明，没有实现
	    function wifi() public returns(string);
	}

	interface BlueTooth{
	    function blue() public returns(string);
	}
	// solidity中，没有abstract，拥有抽象函数的合约就是抽象合约（不能够实例化）
	contract Phone{
	    
	    // 抽象合约是不能够实例化
	    function start() internal returns (string){
	        return "start phone";
	    }
	    
	    // 实现手机关机的功能
	    function close() internal returns (string){
	        return "close phone";
	    }
	    
	    // 由于闹钟每个手机实现不相同，因此定义为抽象函数
	    function alarm() internal returns (string);
	}

	// Mi手机，实现闹钟，Wifi功能
	contract Mi is Phone,Wifi{ // 继承与实现都可以使用is
	    
	    function wifi() public returns(string){
	        return "Mi is show wifi";
	    }
	    
	    function alarm() internal returns(string){
	        return "Mi is show alarm";
	    }
	    
	    function show() returns (string,string){
	        return (wifi(),alarm());
	    }
	    
	}

	// Iphone手机，实现全部功能
	contract Iphone is Phone,Wifi,BlueTooth{
	    
	    function wifi() public returns(string){
	        return "Iphone is show wifi";
	    }
	    
	    function alarm() internal returns(string){
	        return "Iphone is show alarm";
	    }
	    
	    function blue() public returns(string){
	        return "Iphone is show blue";
	    }
	    
	    function show() returns (string,string){
	        return (start(),close());
	    }
	}
