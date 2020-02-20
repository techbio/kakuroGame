<?php


require_once('Set.php');
require_once('Cell.php');
require_once('Digit.php');
require_once('Combination.php');
require_once('Permutations.php');

class Set
{
    // if both of the following are 0, this is a blank cell, zero length set
    private $isRow; // if this is a row -> 1, if column -> 0
    private $isColumn; // if this is a column -> 1, if row -> 0

    private $x; // given x location of sum cell
    private $y; // given y location of sum cell
    private $sum; // given sum of row or column set
    private $cells;

    private $combination;
    private $Permutations;

    public function __construct($args = false)
    {
        if ($args != false)
        {

            if ($args['size'] >= 2 && $args['size'] <= 9)
            {
                $cells = [];
                for ($i = 0; $i < $args['size']; $i++)
                {
                    $cells[] = new Cell();
                }
                $this->setCells($cells);
            }

            // set Set type
            if ($args['type'] === 'blank')
            {
                $this->setIsBlank();
            }
            elseif ($args['type'] === 'row')
            {
                $this->setIsRow();
            }
            elseif ($args['type'] === 'column')
            {
                $this->setIsColumn();
            }
        }
    }

    public function getSize()
    {
        return count($this->cells);
    }

    public function setIsBlank()
    {
        $this->isRow = 0;
        $this->isColumn = 0;
    }

    public function getIsBlank()
    {
        return $this->isRow === 0 && $this->isColumn === 0;
    }

    public function setIsRow($isRow = 1)
    {
        if ($isRow == 0 || $isRow == 1)
        {
            $this->isRow = $isRow;
            $this->isColumn = ($isRow + 1 ) % 2; // to swap 0|1 instead of toggle t|f
        }
    }

    public function getIsRow()
    {
        return $this->isRow;
    }

    public function setIsColumn($isColumn = 1)
    {
        $this->setIsRow(($isColumn + 1) % 2);
    }

    public function getIsColumn()
    {
        return $this->isColumn;
    }

    public function setX($x)
    {
        $this->x = $x;
    }

    public function getX()
    {
        return $this->x;
    }

    public function setY($y)
    {
        $this->y = $y;
    }

    public function getY()
    {
        return $this->y;
    }

    public function setSum($sum)
    {
        $this->sum = $sum;
    }

    public function getSum()
    {
        return $this->sum;
    }

    public function setCells($cells = [])
    {
        $this->cells = $cells;
    }

    public function getCells()
    {
        return $this->cells;
    }

    public function solve()
    {
        $currCells = $this->getCells();
        if (count($currCells) >= 2)
        {
            foreach ($currCells as $cell)
            {
                $cell->solve();
                print_r($cell->getPossibleValues());
            }
        }

        echo "Set solved.\n";
    }
}

?>