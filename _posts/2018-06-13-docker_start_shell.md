---
layout: post
title: "启动docker_sqli-labs_命令"
date: 2018-06-13
category: docker
tags: docker sqli-labs web安全
---
	
	docker images

	docker run -dt --name sqli -p 90:80 --rm acgpiano/sqli-labs

	docker ps -a

	docker exec -it <id> /bin/bash

	mysql
