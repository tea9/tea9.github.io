---
layout: post
title: "启动docker_sqli-labs_命令"
date: 2018-06-13
category: web安全
tags: docker sqli-labs
---
	
	docker images

	docker run -dt --name sqli -p 90:80 --rm acgpiano/sqli-labs

	docker ps -a

	docker exec -it <id> /bin/bash

	mysql -uroot // 进入 mysql


	docker ps -a 
	docker stop <id> // 停止容器
	docker rm </sqli> // 删除容器	
	docker rmi <image id> 删除镜像

	cd /var/www/html

## LINKS

[Docker删除容器与镜像](https://blog.csdn.net/qq_32447301/article/details/79387649)  