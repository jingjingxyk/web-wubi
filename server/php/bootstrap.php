<?php

define('WUBI_FILE_DATA', realpath(__DIR__ . '/../data/data.txt'));
define('WUBI_FILE_DATA_SIZE', filesize(WUBI_FILE_DATA));

/*
// 单行最长 长度

$max_len = 0;
$f = fopen(WUBI_FILE_DATA, 'r');
while ($line = fgets($f)) {
    echo $line;
    $position = mb_strpos($line, ' ');
    if ($position !== false) {
        $word = mb_substr($line, $position + 1);
        $len_t = mb_strlen($word);
        if ($len_t > $max_len) {
            $max_len = $len_t;
        }
    }

    echo PHP_EOL;
}
fclose($f);
echo $max_len;
*/

require_once 'src/Application.php';