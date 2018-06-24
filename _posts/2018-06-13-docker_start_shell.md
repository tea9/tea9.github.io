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


	docker rm </sqli> // 删除容器
	docker stop // 停止容器
	docker rmi <image id> 删除镜像

	cd /var/www/html
