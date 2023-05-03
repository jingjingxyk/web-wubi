<?PHP

namespace Jingjingxyk\WebWubiServer;

use Swoole\Coroutine\Http\Server;
use function Swoole\Coroutine\run;
use Swoole\Table;

require_once dirname(__DIR__) . '/vendor/autoload.php';

//高性能共享内存 Table  https://wiki.swoole.com/#/memory/table
$table = new Table(WUBI_FILE_DATA_SIZE);
for ($i = 0; $i < 16; $i++) {
    $table->column($i, Table::TYPE_STRING, 16);
}

$table->create();


$max_len = 0;
$f = fopen(WUBI_FILE_DATA, 'r');
while ($line = fgets($f)) {
    //echo $line;
    $position = mb_strpos($line, ' ');
    if ($position !== false) {
        $key = mb_substr($line, 0, $position);
        $word = mb_substr($line, $position + 1);
        $len_t = mb_strlen($word);
        $keyword_arr = explode(' ', $word);
        $keyword_arr = array_map(function ($x) {
            return trim($x);
        }, $keyword_arr);
        $len_t = count($keyword_arr);
        if ($len_t > $max_len) {
            $max_len = $len_t;
        }
    }
    //echo PHP_EOL;
    //echo $key. '======='.$word . PHP_EOL;
    //var_dump($key,$keyword_arr);


}
fclose($f);
$table->set('a', ['我是谁']);
$sum = sprintf('%.2f', $table->memorySize / 8 / 1024 / 1024);
echo "码表占用内存：{$sum}MB ； 单行最长长度：{$max_len} 字节";
echo PHP_EOL;
echo 'starting web server';
echo PHP_EOL;

run(function () use ($table) {
    $server = new Server('127.0.0.1', 9502, false);
    $server->table = $table;

    $server->handle('/', function ($request, $response) {
        $response->end("<h1>Index</h1>");
    });
    $server->handle('/api', function ($request, $response) use ($server) {
        $response->header('Content-Type', 'application/json; charset=utf-8');
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
        $server->shutdown();
    });

    $server->start();
});