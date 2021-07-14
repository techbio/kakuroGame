<?php

require_once('includes.inc');

class Row extends Set
{
    public function __construct()
    {
        parent::__construct();
        $this->setIsRow();
    }

}

?>