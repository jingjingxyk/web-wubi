#!/bin/bash

set -exu
__DIR__=$(
  cd "$(dirname "$0")"
  pwd
)
cd ${__DIR__}

test -d dist && rm -rf dist
mkdir -p dist/
cd ${__DIR__}/dist

test -f web-wubi.zip && rm -f web-wubi.zip


cd ${__DIR__}

# 打包 manifest v3 支持chromium 内核系列
zip -r ./dist/web-wubi.zip . \
  -x ".git/*" \
  -x ".idea/*" \
  -x "_metadata/*" \
  -x "node_modules/*" \
  -x "tools/*" \
  -x ".github/*" \
  -x "dist/*" \
  -x "release-archive.sh"

cd ${__DIR__}

cd ${__DIR__}/dist
# 核验打包结果
unzip web-wubi.zip -d web-wubi

cd ${__DIR__}
