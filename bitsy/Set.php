<?php


require_once('Set.php');
require_once('Cell.php');
require_once('Digit.php');
require_once('Combination.php');
require_once('Permutation.php');

class Set
{
    private $isRow; // if this is a row -> 1, if column -> 0
    private $isColumn; // if this is a column -> 1, if row -> 0
    private $x; // given x location of sum cell
    private $y; // given y location of sum cell
    private $sum; // given sum of row or column set
    private $cells;

    private $combination;
    private $permutation;

    public function __construct()
    {

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