<?php

class Combination
{
    private $size;
    private $permutations;

    public function __construct()
    {
        $this->initPermutations();
    }

    private function initPermutations()
    {
        $this->permutations = [];
        $this->permutations = new Permutations($this->size);
    }
}

?>