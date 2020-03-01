<?php

require_once('includes.inc');

class Combination
{
    private $size;
    private $digits;
    private $permutations;

    private $valueBitmap;
    private $prohibitedBitmap;
    
    public function __construct($args = false)
    {
        if ($args !== false)
        {
            if (
                    isset($args['size'])
                    && $args['size'] >= 1
                    && $args['size'] <= 9
            )
            {
                $this->setSize($args['size']);
            }
            else
            {
                $this->setSize(9);
            }

            $this->initCombinations();
            $this->initPermutations();
        }
    }

    private function initCombinations()
    {
        $this->digits = [];
        for ($i = 0; $i < $this->getSize(); $i++)
        {
            $this->digits[] = new Digit();
        }
    }

    private function initPermutations()
    {
        $this->permutations = [];
        $this->permutations = new Permutations(['size'=>$this->size]);
    }

    public function pruneCombinations()
    {
        foreach ($digits as $digit)
        {

        }
    }

    public function setSize($size)
    {
        $this->size = $size;        
    }

    public function getSize()
    {
        return $this->size;   
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
}

?>