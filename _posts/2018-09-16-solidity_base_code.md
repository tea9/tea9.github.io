---
layout: post
title: "solidity的代码"
date: 2018-09-16
category: 区块链
tags: 区块链
---

[在线solidityIDE](https://remix.ethereum.org)  
[solidity](https://solidity.readthedocs.io)  

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

## 实现一个转账功能

    pragma solidity ^0.4.25;

    // 此智能合约可以实现向合约的所有者转账的功能
    contract PayableDemo{
        
        address public _owner; // 存储合约的所有者
        
        // 只有合约所有者才会调用构造函数
        function PayableDemo() {
            _owner = msg.sender; // sender：获取函数调用者的地址
            
        }
        
        // 创建一个函数，实现转账功能，转账函数必须有payable关键字
        function transfer() payable{
            _owner.transfer(msg.value); // value：在调用当前函数时，传入value值
        }
        
        function showBalance() returns(address,uint256){
            address _account = msg.sender;
            return (_account,_account.balance);
        }
    }


## 修改器&合约自毁

    pragma solidity ^0.4.24;

    // 此智能合约可以实现向合约的所有者转账的功能
    contract PayableDemo{
        
        address public _owner; // 存储合约的所有者
        // unint256 public _money;
        
        // 只有合约所有者才会调用构造函数
        function PayableDemo() {
            _owner = msg.sender; // sender：获取函数调用者的地址
            // 合约创建者在创建合约时输入一定的金额
            msg.value;
        }
        
        // 创建一个函数，实现转账功能，转账函数必须有payable关键字
        function transfer() payable{
            _owner.transfer(msg.value); // value：在调用当前函数时，传入value值
        }
        
        function showBalance() returns(address,uint256){
            address _account = msg.sender;
            return (_account,_account.balance);
        }
        
        // 判断合约所有者的修改器（Java AOP）
        modifier onlyOwner{
            if (msg.sender!=_owner)
                throw;
            _; // 代表执行函数内部语句
        }
        
        // 编写函数，实现合约自毁的功能
        function kill(address addr) onlyOwner{
            // 判断是否为合约所有者
            selfdestruct(addr); // 销毁合约并且发送金额到指定地址
        }
    }

## 重写修改器&打印日志

    pragma solidity ^0.4.24;

    contract PaySuper{
        
        // 属于默认缺省值：internal
        address internal _owner; // 存储合约的所有者
        
        // 判断合约所有者的修改其（Java  Aop）
        modifier onlyOwner{
            if(msg.sender!=_owner)
                throw;
            _;
        }
    }

    // 此智能合约可以实现向合约的所有者转账的功能
    contract PayableDemo is PaySuper{
        
        event showMsg(string);
        
        // 只有合约所有者才会调用构造函数
        function PayableDemo() payable{
            _owner = msg.sender; // sender：获取函数调用者的地址
            // 合约创建者在创建合约时输入一定的金额
            msg.value;
        }   
        
        // 创建一个函数，实现转账功能，转账函数必须有payable关键字
        function transfer() payable{
            _owner.transfer(msg.value); // value：在调用当前函数时，传入value值
        }
        
        function showBalance() returns (address,uint256){
            address _account = msg.sender;
            return (_account,_account.balance);
        }
        
        modifier onlyOwner{
            showMsg('rewrite super class modifier');
            if(msg.sender!=_owner)
                throw;
            _; // _代表执行函数内部语句
        }
        
        // 编写函数，实现合约自毁的功能
        function kill(address addr) onlyOwner{
            // 判断是否为合约所有者
            selfdestruct(addr);  // 销毁合约并且发送金额到指定地址
        }
        
    }

## 结构体&映射

    pragma solidity ^0.4.24;

    contract StructMapping{
        
        // 定义一个结构体
        struct Product{
            string name;
            uint num;
        }
        
        // 定义一个映射，来确定地址与产品的关系
        mapping(address => Product) public proMap;
        
        // 定义一个函数，来实现产品初始化功能
        function init01(string _name,uint _num) {
            // 创建一个结构体对象（不需要new）
            // proMap[msg.sender] = Product(name,num);
            proMap[msg.sender] = Product({name:_name,num:_num});
        }
        
        // 默认情况不能返回结构体类型
        function show() returns(string,uint){
            Product p = proMap[msg.sender];
            return (p.name,p.num);
        }
    }


## 众筹代码

	pragma solidity ^0.4.24;

    //主要完成产品的众筹
    contract CrowdFunding{
        
        // 投资者是结构体
        struct Funder{
            address addr; // 投资者地址
            uint amount; // 投资金额
        }
        // 采用结构体来描述众筹产品
        struct Product{
            address addr; // 如果众筹成功,则金额会转到当前地址
            uint goal; // 预期众筹的目标,如果达到此目标则说明众筹成功
            uint amount; // 实际众筹的金额
            uint funderNum; // 统计投资者的人数,缺省值为0
            // 映射类型,统计当前产品的投资者
            mapping(uint => Funder) funders;
        }
        
         // 平台要统计众筹的产品数量
        uint count;
         // 此映射主要记录平台的众筹产品
        mapping (uint => Product) public products;
        // 添加众筹产品信息
        function candidate(address addr, uint goal) returns (uint compaingnID){
            // 结构体是不需要new,此处按照结构体声明的变量顺序进行赋值
            products[count++] = Product(addr,goal*10**18,0,0);
        }
        
         // 此函数实现对产品进行众筹功能
        function vote(uint index) payable {
            // 通过索引获取要众筹产品信息
            Product p = products[index];
            // 创建投资者,并且存储到产品众筹映射中
            // msg.sender:当前函数调用者,就是众筹者, msg.value：众筹金额是调用函数时传入的value值
            p.funders[p.funderNum++] = Funder({addr:msg.sender,amount:msg.value});
            // 把当前众筹金额追加到amount中
            p.amount += msg.value;
        }
        
        // 检测当前产品众筹是否成功(如果成功则众筹金额转到产品提供的地址)
        function check(uint index) payable returns (bool) {
            Product p = products[index];
            // 判断当前众筹金额是否大于设置金额
            if (p.amount < p.goal) {
                return false;
            }
            // 众筹成功,当前金额要转给产品地址
            uint amount = p.amount;
            // 初始化amount
            p.amount = 0;
            p.addr.transfer(amount); // 如果失败则返回为false
            // transfer equal send 
            // if(!p.addr.send(amount)){
            //     throw;
            // }
            return true;
        }
            
        
    }

