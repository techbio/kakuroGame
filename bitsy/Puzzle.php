<?php

require_once('Set.php');

class Puzzle
{
    private $height;
    private $width;
    private $sets;

    public function __construct()
    {

    }

    public function getRows()
    {
        $rows = [];
        foreach ($sets as $set)
        {
            if ($set->isRow())
            {
                $rows[] = $set;
            }
        }
    }

    public function getColumns()
    {
        $columns = [];
        foreach ($sets as $set)
        {
            if ($set->isColumn())
            {
                $columns[] = $set;
            }
        }
    }
}

?>