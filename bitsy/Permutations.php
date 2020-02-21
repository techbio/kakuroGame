<?php

require_once('includes.inc');

class Permutations
{
    private $combination;
    private $permutationsByBitmap;
    private $permutationArrays;

    public function __construct($args = false)
    {
        if ($args !== false)
        {
            if (isset($args['size'])
                    && $args['size'] >= 1
                    && $args['size'] <= 9
            )
            {
                $this->combination = [];
                for ($i = 0; $i < $args['size']; $i++)
                {
                    $this->combination[] = new Digit();
                }
            }
            else
            {
                $this->combination = [];
            }

            if (isset($args['combination']))
            {
                $this->combination = $args['combination'];
            }
            else
            {
                $this->combination = [];
            }
        }

        foreach ($this->combination as $digit)
        {

        }
    }
    
    public function prunePermutations()
    {

    }
}

?>

