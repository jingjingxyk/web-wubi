# php 实现 查码 服务端

## 准备 PHP 运行环境

```bash
  sh setup-php-runtime.sh
  composer install

```

## 准备码表数据

> 执行 python 脚本

```bash
cd tools/python3
pipenv shell

python3 main.py

```

## 运行服务

```bash

sh  start-local-serve.sh

```

## 备注

> 先试试，如果效果不好，那就 用 C 给他写一个扩展
