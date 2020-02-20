<?php

class Combination
{
    private $valueBitmap;
    private $prohibitedBitmap;
    private $permutations;

    public function __construct()
    {
        $this->initValueBitmap();
        $this->initProhibitedBitmap();
        $this->initPermutations();
    }

    private function initValueBitmap()
    {
        $this->valueBitmap = [];
        $this->valueBitmap[0] = 0; // completed flag
        for ($i = 1; $i <= 9; $i++)
        {
            $this->valueBitmap[$i] = 1;
        }

        $this->prohibitedBitmap = [];
        $this->valueBitmap[0] = 0; // completed flag
    }

    private function initProhibitedBitmap()
    {
        for ($i = 1; $i <= 9; $i++)
        {
            $this->prohibitedBitmap[$i] = 1;
        }
    }

    private function initPermutations()
    {
        $this->permutations = [];
        $this->permutations = new Permutations($this->valueBitmap);
    }

    public function removeFromValueBitmap($index)
    {
        if ($index >= 1 && $index <= 9)
        {
            $this->valueBitmap[$index] = 1;
        }
    }

    // add a prohibited digit
    public function addToProhibitedBitmap($index)
    {
        if ($index >= 1 && $index <= 9)
        {
            $this->prohibitedBitmap[$index] = 0;
        }
    }

    // apply prohibited mask onto values bitmap
    public function maskValueBitmapWithProhibited()
    {
        for ($i = 1; $i <= 9; $i++)
        {
            // truth table: 0,0:0 | 1,0:1 | 0,1:1 | 1,1:0
            $this->valueBitmap[$i] =
                    ($this->valueBitmap[$i] + $this->prohibitedBitmap[$i]) % 2;
        }
        initProhibitedBitmap(); // reset after applying mask
    }
}

?>