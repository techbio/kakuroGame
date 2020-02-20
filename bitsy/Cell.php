<?php

class Cell
{
    private $x; // location in grid
    private $y;
    private $row; // crossing row
    private $column; // crossing column
    private $digit;


    public function __construct($args = false)
    {
        $this->setX();
        $this->setY();
        $this->setRow();
        $this->setColumn();
        $this->setDigit();
        
        if ($args != false)
        {
            if (isset($args['x']))
            {
                $this->setX($args['x']);
            }

            if (isset($args['y']))
            {
                $this->setY($args['y']);
            }

            if (isset($args['row']))
            {
                $this->setRow($args['row']);
            }

            if (isset($args['column']))
            {
                $this->setColumn($args['column']);
            }

            if (isset($args['digit']))
            {
                $this->setDigit($args['digit']);
            }
        }
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
}

?>