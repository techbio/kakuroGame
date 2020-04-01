<?php

class SolvePuzzles
{
    $solved = false;
    // load puzzle(s) to solve into memory tables
    // search for a solution

    public function __construct()
    {
    }

    public function run()
    {
	while (!this->solved)
	{
	    prune();
	    propagate();
	}
    }

    private function prune()
    {
        $sql = "DELETE FROM TMP_combinations c "
                . "JOIN TMP_permutations p ON (p.combo = c.cellset) "
                . "WHERE c.cellset NOT IN ("
                . "SELECT DISTINCT cellset FROM TMP_cellsets"
                . ")"
        ;
	$this->solved = true;
    }

    private function propagate()
    {
        $sql = "UPDATE cells c "
                . "JOIN cellsets row ON (c.rowId = row.id)"
                . "JOIN cellsets col ON (c.colId = col.id)"
                . "SET c.bitmap = (row.bitmap & col.bitmap) "
                . ", SET row.bitmap = (row.bitmap & c.bitmap) "
                . ", SET col.bitmap = (col.bitmap & c.bitmap) "
        ;

    }
}
