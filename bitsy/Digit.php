<?php

require_once('includes.inc');

class Digit
{
    private $intVal;
    private $valueBitmap;
    private $prohibitedBitmap;

    public function __construct($args = false)
    {
        $this->initValueBitmap();
        $this->initProhibitedBitmap();

        if ($args !== false)
        {
            if (
                isset($args['intVal'])
                && $args['intVal'] >= 1
                && $args['intVal'] <= 9
            )
            {
                $this->setIntVal($args['intVal']);
            }
        }
    }

    public function getPossibleValues()
    {
        $possibleValues = [];
        foreach ($this->valueBitmap as $i=>$isPossible)
        {
            if ($isPossible)
            {
                $possibleValues[] = $i;
            }
        }
        return $possibleValues;
    }

    public function countPossibleValues()
    {
        $countOfPossibleValues = 0;
        foreach ($this->valueBitmap as $i=>$isPossible)
        {
            if ($isPossible)
            {
                $countOfPossibleValues++;
            }
        }
        return $countOfPossibleValues;
    }

    public function getRandomPossibleValue()
    {
        $possibleValues = [];
        foreach ($this->valueBitmap as $i=>$isPossible)
        {
            if ($isPossible)
            {
                $possibleValues[] = $i;
            }
        }
        return array_rand($possibleValues);
    }

    private function initValueBitmap()
    {
        $this->valueBitmap = [];
        $this->valueBitmap[0] = 0; // completed flag
        for ($i = 1; $i <= 9; $i++)
        {
            $this->valueBitmap[$i] = 1;
        }
    }
    public function setIntVal($intVal)
    {
        $this->intVal = $intVal;

        // add every digit except intVal to prohibited map
        for ($i = 1; $i <= 9; $i++)
        {
            if ($i != $this->intVal)
            {
                $this->addToProhibitedBitmap($i);
            }
        }
        // remove prohibited values from bitmap
        $this->maskValueBitmapWithProhibited();
    }

    private function initProhibitedBitmap()
    {
        $this->prohibitedBitmap = [];
        $this->prohibitedBitmap[0] = 0; // applied flag

        for ($i = 1; $i <= 9; $i++)
        {
            $this->prohibitedBitmap[$i] = 0;
        }
    }

    public function removeFromValueBitmap($index)
    {
        if ($index >= 1 && $index <= 9)
        {
            $this->valueBitmap[$index] = 0;
        }
    }

    // add a prohibited digit
    public function addToProhibitedBitmap($index)
    {
        if ($index >= 1 && $index <= 9)
        {
            $this->prohibitedBitmap[$index] = 1;
        }
    }

    // apply prohibited mask onto values bitmap
    public function maskValueBitmapWithProhibited()
    {
        for ($i = 1; $i <= 9; $i++)
        {
            // truth table: 0,0:0 | 1,0:1 | 0,1:1 | 1,1:0
            $this->valueBitmap[$i] = ($this->valueBitmap[$i] + $this->prohibitedBitmap[$i]) % 2;
        }
    }

    public function solve()
    {
        echo "before mask valueBitmap\n";
        print_r($this->valueBitmap);
        print_r($this->getPossibleValues());
        $this->addToProhibitedBitmap(2);
        $this->addToProhibitedBitmap(5);
        $this->addToProhibitedBitmap(7);
        $this->maskValueBitmapWithProhibited();
        echo "after mask valueBitmap\n";
        print_r($this->valueBitmap);
        print_r($this->getPossibleValues());
    }
}

?>