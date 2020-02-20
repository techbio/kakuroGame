<?php

require_once('Set.php');
require_once('Cell.php');
require_once('Digit.php');
require_once('Combination.php');
require_once('Permutation.php');

class Puzzle
{
    private $height;
    private $width;
    private $sets;

    public function __construct()
    {
        $this->height = 0;
        $this->width = 0;
        $this->sets = [];

        $currSet = new Set();
        $currSet->setIsRow();
        $currSet->setSum(3);
        $currSet->setX(-1);
        $currSet->setY(-1);
        $currCells = [];
        $currCells[] = new Cell(
                [
                    'x'=> 0
                    , 'y'=> 0
                    , 'digit'=> new Digit(['intVal' => 1])
                ]
            );
        $currCells[] = new Cell(
                [
                    'x'=> 0
                    , 'y'=> 1
                    , 'digit'=> new Digit(['intVal' => 2])
                ]
            );
        
        $currSet->setCells($currCells);
        $this->sets[] = $currSet;
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

    public function solve()
    {
        foreach ($this->sets as $set)
        {
            $set->solve();
        }
        echo "Puzzle solved.\n";
    }
}

?>