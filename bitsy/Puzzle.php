<?php

require_once('includes.inc');

class Puzzle
{
    private $height;
    private $width;
    private $sets;
    private $grid;

    public function __construct()
    {
        $this->height = 6;
        $this->width = 5;
        $this->sets = [];

        for ($x = -1; $x < $this->width; $x++)
        {
            for ($y = -1; $y < $this->height; $y++)
            {
                if ($x < 0 || $y < 0) continue;

                $this->grid[$x][$y] = new Cell(
                    [
                        'x'=> 0
                        , 'y'=> 0
                        , 'row'=> new Row()
                        , 'column'=> new Column()
                        , 'digit'=> new Digit()
                    ]
                );
                $this->grid[$x][$y]->getRow()->addCell($this->grid[$x][$y]);
            }
        }
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