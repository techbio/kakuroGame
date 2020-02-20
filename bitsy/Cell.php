<?php

require_once('Set.php');
require_once('Row.php');
require_once('Column.php');
require_once('Cell.php');
require_once('Digit.php');
require_once('Combination.php');
require_once('Permutations.php');

class Cell
{
    private $type;
    private $x; // location in grid
    private $y;
    private $row; // crossing row
    private $column; // crossing column
    private $digit;


    public function __construct($args = false)
    {
        $this->setType();
        $this->setX();
        $this->setY();
        $this->setRow();
        $this->setColumn();
        $this->setDigit();

        if ($args != false)
        {
            if (isset($args['type']))
            {
                $this->setX($args['type']);
            }
            else
            {
                $this->setType('play'); // type can be: play, game, or blank cell
            }

            if (isset($args['x']))
            {
                $this->setX($args['x']);
            }
            else
            {
                $this->setX(-1);
            }

            if (isset($args['y']))
            {
                $this->setY($args['y']);
            }
            else
            {
                $this->setY(-1);
            }

            if (isset($args['row']))
            {
                $this->setRow($args['row']);
            }
            else
            {
                $this->setRow(new Row());
            }

            if (isset($args['column']))
            {
                $this->setColumn($args['column']);
            }
            else
            {
                $this->setColumn(new Column());
            }

            if (isset($args['digit']))
            {
                $this->setDigit($args['digit']);
            }
            else
            {
                $this->setDigit(new Digit());
            }
        }
    }

    public function setType($type = 'blank')
    {
        $this->type = $type;
    }

    public function getType()
    {
        return $this->type;
    }


    public function setX($x = false)
    {
        $this->x = $x;
    }

    public function getX()
    {
        return $this->x;
    }

    public function setY($y = false)
    {
        $this->y = $y;
    }

    public function getY()
    {
        return $this->y;
    }

    public function setRow($row = false)
    {
        $this->row = $row;
    }

    public function getRow()
    {
        return $this->row;
    }

    public function setColumn($column = false)
    {
        $this->column = $column;
    }

    public function getColumn()
    {
        return $this->column;
    }

    public function setDigit($digit = false)
    {
        $this->digit = $digit;
    }

    public function getDigit()
    {
        return $this->digit;
    }

    public function getPossibleValues()
    {
        return $this->digit->getPossibleValues();
    }

    public function solve()
    {
        $this->row->solve();
        $this->column->solve();

        echo "Cell solved.\n";
    }
}

?>