---
layout: post
title: jekyll添加文章流程
category: 
  - jekyll
tags: 
	- blog
  - jekyll
abbrlink: 2293620199
date: 2018-05-28 00:00:00
---

## 前提
需要在jekyll博客下生产[rakefile.rb](https://github.com/tea9/blog_v2/blob/master/rakefile.rb)文件    

## 1.创建文章

使用命令  
	
	rake post title="文章名称"

## 2.编辑文章
使用编辑器编写文章

## 3.本地预览
运行命令

	jekyll serve

访问浏览器
	
	http://127.0.0.1:4000/

## 4.把新建的文章上传到github
运行命令
	
	git init
	git add --all
	git commit -m "add post"
	git push -u origin master

## 5.在线预览
访问网址
	
	https://tea9.github.io

## rakefile.rb代码

```
require 'rake'
require 'yaml'

SOURCE = "."
CONFIG = {
  'posts' => File.join(SOURCE, "_posts"),
  'drafts' => File.join(SOURCE, "_drafts"),
  'post_ext' => "md",
}

# Usage: rake post title="A Title"
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  filename = File.join(CONFIG['posts'], "#{Time.now.strftime('%Y-%m-%d')}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"


  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    # post.puts "subtitle: \"\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d')}"
    # post.puts "cover: "
    post.puts "category: "
    post.puts "tags: "
    post.puts "---"
  end

  
end # task :post

## 第二个命令
desc "Begin a new post in #{CONFIG['drafts']}"
task :draft do
  abort("rake aborted: '#{CONFIG['drafts']}' directory not found.") unless FileTest.directory?(CONFIG['drafts'])
  title = ENV["title"] || "new-post"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  filename = File.join(CONFIG['drafts'], "#{Time.now.strftime('%Y-%m-%d')}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"


  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    # post.puts "subtitle: \"\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d')}"
    # post.puts "cover: "
    post.puts "category: "
    post.puts "tags: "
    post.puts "---"
  end
end
```

CONFIG 配置的路径  
desc 命令行输出信息  
task 命令
在后面ruby是生成文件的相关逻辑  
