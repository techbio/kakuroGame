<?php


class Partitions
{
    private $partitions;

    public function __construct()
    {
	$this->partitions = array();
        $this->loadPartitions();
	print_r($this->partitions);
    }

    private function loadPartitions()
    {
        $partitionLines = file('partitions.csv');
        foreach ($partitionLines as $line) {
            $line = trim($line);
            if (count($line) > 0)
	    {
                list($numCells, $sum, $combination) = preg_split('/,/', $line);
                $this->partitions[$numCells][$sum] = preg_split('/\+/', $combination);
            }
        }
    }
}

$partitions = new Partitions();

?>
