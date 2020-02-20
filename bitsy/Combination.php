<?php

class Combination
{
    private $size;
    private $digits;
    private $permutations;

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
}

?>