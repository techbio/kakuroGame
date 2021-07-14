<?php

require_once('includes.inc');

// $digit = new Digit();
// $digit->solve();


$puzzle = new Puzzle();
$puzzle->solve();
//print_r($puzzle->getSets());
print_r($puzzle->getPuzzleAsString());
echo puzzleToString($puzzle);

?>