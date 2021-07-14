<?php

require_once('includes.inc');

class Column extends Set
{
    public function __construct()
    {
        parent::__construct();
        $this->setIsColumn();
    }

}

?>