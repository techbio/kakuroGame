<?php

require_once('Set.php');
require_once('Cell.php');
require_once('Digit.php');
require_once('Combination.php');
require_once('Permutation.php');

class Digit
{
    private $valueBitmapDecodeTable;
    private $intVal;
    private $valueBitmap;
    private $prohibitedBitmap;

    public function __construct($args = [])
    {
        if (count($args) > 0)
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

        $this->initValueBitmap();
        $this->initValueBitmapDecoder();
        $this->initProhibitedBitmap();
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

    private function initValueBitmap()
    {
        $this->valueBitmap = [];
        $this->valueBitmap[0] = 0; // completed flag
        for ($i = 1; $i <= 9; $i++)
        {
            $this->valueBitmap[$i] = 1;
        }
    }

    private function initValueBitmapDecoder()
    {
        $this->valueBitmapDecoder = [];
        $this->valueBitmapDecoder[0] = 0; // completed flag
        for ($i = 1; $i <= 9; $i++)
        {
            $this->valueBitmapDecodeTable[$i] = $i;
        }
    }

    public function setIntVal($intVal)
    {
        $this->intVal = $intVal;
        for ($i = 1; $i <= 9; $i++)
        {
            if ($i != $this->intVal)
            {
                $this->addToProhibitedBitmap($i);
            }
        }
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