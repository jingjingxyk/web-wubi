#!/bin/bash
set -exu

__DIR__=$(cd "$(dirname "$0")";pwd)
cd ${__DIR__}

if [ ! "$BASH_VERSION" ]; then
  echo "Please do not use sh to run this script ($0), just execute it directly" 1>&2
  exit 1
fi

# 执行脚本命令

# bash  tools/download-chromium-extension.sh  --proxy 1


# 下载 chromium 扩展，并解压

# 参考文档： https://github.com/tonystark93/crx-download/blob/master/background.js
# 参考文档： https://www.cnblogs.com/jingjingxyk/p/16821342.html



# 使用代理下载源码
#  bash tools/update-library.sh --proxy http://192.168.3.26:8015

PROXY_URL=''
while [ $# -gt 0 ]; do
  case "$1" in
  --proxy)
    PROXY_URL="$2"
    shift
    ;;
  --*)
    echo "Illegal option $1"
    ;;
  esac
  shift $(($# > 0 ? 1 : 0))
done

if [ -n $PROXY_URL ] ; then
  export http_proxy=$PROXY_URL
  export https_proxy=$PROXY_URL
  export no_proxy='0.0.0.0/8,10.0.0.0/8,100.64.0.0/10,127.0.0.0/8,169.254.0.0/16,172.16.0.0/12,192.0.0.0/24,192.0.2.0/24,192.88.99.0/24,192.168.0.0/16,198.18.0.0/15,198.51.100.0/24,203.0.113.0/24,224.0.0.0/4,233.252.0.0/24,240.0.0.0/4,255.255.255.255/32,localhost,.npmmirror.com,.aliyuncs.com,.taobao.org,.tsinghua.edu.cn,.ustc.edu.cn,.aliyun.com'

fi

test -d temp && rm -rf temp
mkdir -p temp
cd ${__DIR__}/temp

# Google 输入工具
extension_id=mclkkofklkfljcocdinagocijmpgbhab
file_name='google-input-tools'

chrome_version="114.0.0.0"
download_url="https://clients2.google.com/service/update2/crx?response=redirect&prodversion=114.0.0.0&acceptformat=crx2,crx3&x=id%3D${extension_id}%26uc&nacl_arch=x86-64"

curl -Lo "${file_name}.crx" $download_url

unset http_proxy
unset https_proxy
unset no_proxy


# 使用不同的代理方式
# proxychains curl -Lo "${file_name}.crx" $download_url
# curl -x "socks5h://127.0.0.1:2000" -Lo "${file_name}.crx" $download_url
# curl --proxy "socks5h://127.0.0.1:2000" -Lo "${file_name}.crx" $download_url

set +e
unzip -d ${file_name} "${file_name}.crx"
set -e

cd ${__DIR__}/

exit 0
test -d temp && rm -rf temp