<?PHP

namespace Jingjingxyk\WebWubiServer;

use Swoole\Coroutine\Http\Server;
use function Swoole\Coroutine\run;

require_once dirname(__DIR__) . '/vendor/autoload.php';

run(function () {

    $server = new Server('127.0.0.1', 9502, false);
    $server->handle('/', function ($request, $response) {
        $response->end("<h1>Index</h1>");
    });
    $server->handle('/api', function ($request, $response) {
        $response->header('Content-Type', 'application/json; charset=utf-8');
        list($controller, $action) = explode('/', trim($request->server['request_uri'], '/'));

        $controller=empty($controller)?'api':$controller;
        $controller= preg_match('/\w+/',$controller)?$controller:'api';
        $controller = ucfirst($controller) . 'Controller';

        $action=empty($action)?'index':$action;
        $action= preg_match('/\w+/',$action)?$action:'index';
        $action = lcfirst($action).'Action';

       try{
           $controller = 'Jingjingxyk\\WebWubiServer\\Controller\\' . $controller;
           (new $controller() )->$action($request, $response);
       }catch(\RuntimeException $e){
           echo $e->getMessage();
           $response->end(json_encode(["code"=>500,'msg'=>'system error'. $e->getMessage()]));
        }

    });
    $server->handle('/stop', function ($request, $response) use ($server) {
        $response->end("<h1>Stop</h1>");
        $server->shutdown();
    });

    $server->start();
});