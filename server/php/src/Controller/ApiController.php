<?php

declare(strict_types=1);

namespace Jingjingxyk\WebWubiServer\Controller;


use  Swoole\Http\Response;
use  Swoole\Http\Request;


class ApiController
{
    use ControllerTrait;

    # 使用注解 ，反射注入 完成依赖注入，会省事很多 todo
    public function queryAction(Request $request, Response $response)
    {
        $result = [
            "code" => 200,
            "data" => [],
            "msg" => 'no data'
        ];
        $parameter = $request->getContent();
        $parameter = json_decode($parameter, true);
        if (!empty($parameter)) {
            $action = $parameter['action'];
            $content = $parameter['content'];
            $namespace = $parameter['namespace'];
            $keyword = $content['keyword'];
            $query = implode('', $keyword);
            //var_dump($query);
            $res = $this->server->table->get($query);
            if ($res) {
                // $fp=$this->server->fileHandlerPool->get();
                $fp = $this->server->fp;
                $fp->seek($res['line_no']);
                $cursor = $fp->ftell();
                $line_no = $fp->key();
                $line = $fp->fgets();
                $line = $fp->current();
                var_dump($line_no, $res['line_no'], $line, $cursor);
                $position = mb_strpos($line, ' ');
                if ($position !== false) {
                    $new_line = str_replace($res['key'], '', $line);
                    $word_arr = explode(' ', $new_line);
                    foreach ($word_arr as $key => $value) {
                        $value = trim($value);
                        if (empty($value)) {
                            unset($word_arr[$key]);
                        } else {
                            $word_arr[$key] = $value;
                        }
                    }
                    $result['data'] = [
                        'keyword' => $res['key'],
                        'options' => $word_arr
                    ];
                    $result['msg'] = 'ok';
                }
            }
        }
        $response->end(json_encode($result, JSON_UNESCAPED_UNICODE));
    }

    public function __call($name, $arguments)
    {
        var_dump($arguments[0]->get);
        var_dump($arguments[0]->getContent());
        var_dump($arguments[0]->cookie);
        var_dump($arguments[0]->header);
        echo "Calling object method '$name' ";
        echo PHP_EOL;
        echo json_encode($arguments);
        echo PHP_EOL;
        $arguments[1]->end(json_encode(['code' => 404, 'msg' => 'no found error', 'data' => []]));
    }
}