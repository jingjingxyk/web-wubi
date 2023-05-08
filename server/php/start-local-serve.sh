#!/bin/bash

set -exu
__DIR__=$(
  cd "$(dirname "$0")"
  pwd
)

cd ${__DIR__}

export PATH="${__DIR__}/bin/runtime:$PATH"

test -f cacert.pem  || wget https://curl.se/ca/cacert.pem  -O cacert.pem

# php -dswoole.use_shortname=Off ${__DIR__}/bootstrap.php
# composer dump-autoload
php -c ${__DIR__}/php.ini  ${__DIR__}/bootstrap.php


#

