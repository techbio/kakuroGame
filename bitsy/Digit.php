<?php

require_once('includes.inc');

class Digit
{
    private $intVal;

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