<?php

namespace Jingjingxyk\WebWubiServer\Controller;

trait ControllerTrait
{
    public mixed $server;
    public function setServer(mixed $server)
    {
        $this->server=$server;
        return $this;
    }
}