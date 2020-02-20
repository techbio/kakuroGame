<?php

require_once('Set.php');
require_once('Cell.php');
require_once('Digit.php');
require_once('Combination.php');
require_once('Permutations.php');

class Puzzle
{
    private $height;
    private $width;
    private $sets;

    public function __construct()
    {
        $this->height = 3;
        $this->width = 3;
        $this->sets = [];

        $currSet = new Set();
        $currSet->setIsColumn();
        $currSet->setSum(3);
        $currSet->setX(0);
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

        $currSet = new Set();
        $currSet->setIsColumn();
        $currSet->setSum(5);
        $currSet->setX(1);
        $currSet->setY(-1);
        $currCells = [];
        $currCells[] = new Cell(
                [
                    'x'=> 1
                    , 'y'=> 0
                    , 'digit'=> new Digit(['intVal' => 2])
                ]
            );
        $currCells[] = new Cell(
                [
                    'x'=> 1
                    , 'y'=> 1
                    , 'digit'=> new Digit(['intVal' => 3])
                ]
            );

        $currSet->setCells($currCells);
        $this->sets[] = $currSet;

        $currSet = new Set();
        $currSet->setIsRow();
        $currSet->setSum(3);
        $currSet->setX(-1);
        $currSet->setY(0);
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
                    'x'=> 1
                    , 'y'=> 0
                    , 'digit'=> new Digit(['intVal' => 2])
                ]
            );

        $currSet->setCells($currCells);
        $this->sets[] = $currSet;

        $currSet = new Set();
        $currSet->setIsRow();
        $currSet->setSum(5);
        $currSet->setX(-1);
        $currSet->setY(1);
        $currCells = [];
        $currCells[] = new Cell(
                [
                    'x'=> 0
                    , 'y'=> 1
                    , 'digit'=> new Digit(['intVal' => 2])
                ]
            );
        $currCells[] = new Cell(
                [
                    'x'=> 1
                    , 'y'=> 1
                    , 'digit'=> new Digit(['intVal' => 3])
                ]
            );

        $currSet->setCells($currCells);
        $this->sets[] = $currSet;
    }

    // possible values of $sortColumn include:
    // size, countPossible, isSolved, sum, ...
    public function getSetsSorted($sortColumn = 'size')
    {

    }

    public function getSets()
    {
        return $this->sets;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function getWidth()
    {
        return $this->width;
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

    public function getPuzzleAsString()
    {
        $gridArr = [];
        // initialize 2D temporary array
        for ($i = 0; $i < $this->height; $i++)
        {
            for ($j = 0; $j < $this->width; $j++)
            {
                $gridArr[$i][$j] = 0;
            }
        }

        $sets = $this->getSets();
        foreach ($sets as $set)
        {

        }

        return $gridArr;
    }
}

?>