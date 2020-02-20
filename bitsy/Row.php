<?php

require_once('Set.php');
require_once('Cell.php');
require_once('Digit.php');
require_once('Combination.php');
require_once('Permutation.php');

class Row extends Set
{
    public function __construct()
    {
        parent::__construct();
        $this->setIsRow();
    }

}

?>