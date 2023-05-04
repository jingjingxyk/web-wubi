<?PHP

namespace Jingjingxyk\WebWubiServer;

use Swoole\Coroutine\Http\Server;
use function Swoole\Coroutine\run;
use Swoole\Table;
use Swoole\ConnectionPool;

require_once dirname(__DIR__) . '/vendor/autoload.php';

//高性能共享内存 Table  https://wiki.swoole.com/#/memory/table
$table = new Table(WUBI_DATA_FILE_SIZE);


$table->column('key', Table::TYPE_STRING, 2);
$table->column('line_no', Table::TYPE_INT);
$table->column('cursor', Table::TYPE_INT);

$table->create();


$max_len = 0;
$fp = new \SplFileObject(WUBI_DATA_FILE, 'r');


while (!$fp->eof()) {
    $line = $fp->current();
    $position = mb_strpos($line, ' ');
    if ($position !== false) {
        $key = mb_substr($line, 0, $position);
        $word = mb_substr($line, $position + 1);
        $len_t = mb_strlen($word);
        $keyword_arr = explode(' ', $word);
        $keyword_arr = array_map(function ($x) {
            return trim($x);
        }, $keyword_arr);
        //$len_t = count($keyword_arr);
        if ($len_t > $max_len) {
            $max_len = $len_t;
        }
        if ($len_t > 10) {
            $max[] = $keyword_arr;
        }
        $table->set($key, ['key' => $key, 'line_no' => $fp->key(), 'cursor' => $fp->ftell()]);
    }
    $fp->next();
}
$fp->rewind();

$max_count = count($max);
$key_sum = sprintf('%.2f', $table->count());
$memory_size = sprintf('%.2f', $table->memorySize / 8 / 1024 / 1024);
echo "码表 key数量：{$key_sum} ;码表占用内存：{$memory_size}MB ；";
echo PHP_EOL;
echo "码表单行中最长长度：{$max_len} 字节；";
echo PHP_EOL;
echo 'starting web server';
echo PHP_EOL;

$fileHandlerPool = null;
/*
# https://github.com/swoole/library/blob/master/src/core/ConnectionPool.php
$fileHandlerPool=new ConnectionPool(function(){
    return  new \SplFileObject(WUBI_DATA_FILE, 'r');
},10);
*/
run(function () use ($table, $fp, $fileHandlerPool) {
    $server = new Server('0.0.0.0', 9502, false);
    $server->table = $table;
    $server->fp = $fp;
    $server->fileHandlerPool = $fileHandlerPool;

    $server->handle('/', function ($request, $response) {
        $response->end("<h1>Index</h1>");
    });
    $server->handle('/api', function ($request, $response) use ($server) {
        $response->header('Content-Type', 'application/json; charset=utf-8');
        $response->header('access-control-allow-credentials', 'true');
        $response->header('access-control-allow-methods', 'GET,HEAD,POST,OPTIONS');
        $response->header('access-control-allow-headers', 'content-type,Authorization');
        $origin = empty($request->header['origin']) ? '*' : $request->header['origin'];
        $response->header('access-control-allow-origin', $origin);
        $request_method = empty($request->header['request_method']) ? '' : $request->header['request_method'];
        if ($request_method == "OPTIONS") {
            $response->header->status(200);
            $response->end();
            return null;
        }

        list($controller, $action) = explode('/', trim($request->server['request_uri'], '/'));

        $controller = empty($controller) ? 'api' : $controller;
        $controller = preg_match('/\w+/', $controller) ? $controller : 'api';
        $controller = ucfirst($controller) . 'Controller';

        $action = empty($action) ? 'index' : $action;
        $action = preg_match('/\w+/', $action) ? $action : 'index';
        $action = lcfirst($action) . 'Action';

        try {
            $controller = 'Jingjingxyk\\WebWubiServer\\Controller\\' . $controller;
            (new $controller())->setServer($server)->$action($request, $response);
        } catch (\RuntimeException $e) {
            echo $e->getMessage();
            $response->end(json_encode(["code" => 500, 'msg' => 'system error' . $e->getMessage()]));
        }
    });
    $server->handle('/stop', function ($request, $response) use ($server) {
        $response->end("<h1>Stop</h1>");
        $server->fp->fclose();
        $server->shutdown();
    });

    $server->start();
});