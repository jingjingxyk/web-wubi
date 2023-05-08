# 用途

> 把码表处理成 需要的格式

## 准备资源

```bash 
# 准备资源
sh tools/update-library.sh

# 准备资源 使用代理
sh tools/update-library.sh --proxy http://127.0.0.1:8015

```

## 生成需要的资源

```bash 
# 进入虚拟环境
pipeenv shell
# 安装依赖库
pipenv install

# 执行
python3 main.py 

```