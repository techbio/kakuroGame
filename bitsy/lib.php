<?php

require_once('includes.inc');

$BITMAP_DECODER = initValueBitmapDecoder(); // global

function initValueBitmapDecoder()
{
    $valueBitmapDecoder = [];
    $valueBitmapDecoder[0] = 0; // completed flag
    for ($i = 1; $i <= 9; $i++)
    {
        $valueBitmapDecoder[$i] = $i;
    }

    return $valueBitmapDecoder;
}

function decodeBitmap($bitmap)
{
    $possibleValues = [];

    foreach ($bitmap as $i=>$bit)
    {
        if ($i >= 1 && $bit)
        {
            $possibleValues[] = $i;
        }
    }

    return $possibleValues;
}
// tests
// print_r(decodeBitmap([1,0,1,0,1,0,0]));
// print_r(decodeBitmap([0,0,0,0,1,0,0,0,0,0]));
// print_r(decodeBitmap([0,0,0,0,0,0,0,0,0,0]));
// print_r(decodeBitmap([1,1,1,1,1,1,1,1,1,1]));
// print_r(decodeBitmap([0,1,1,1,1,1,1,1,1,1]));
// print_r(decodeBitmap([]));
// print_r(decodeBitmap([1]));
// print_r(decodeBitmap([0]));
// print_r(decodeBitmap([0, 1]));


// width and height include first row and first column of only game/blank cells
// (eg a 10x10 puzzle has at most 9x9 play cell area)
function stringToPuzzle($puzzleString, $width, $height)
{
    // two digits define each cell:
        // a game (sum) cell:
            // _\d or \d\d (range 3-45)
        // a play cell:
            // 0\d (range 1-9)
        // a blank cell
            // 00


    if (count($puzzleString) == 2 * $width * $height)
    {
        for ($j = 0; $j < $height; $j++)
        {
            for ($i = 0; $i < $width; $i++)
            {
                $next = substr($puzzleString, 2 * $i, 2);
                if (substr($next, 0, 1) === '0')
                {
                    if (substr($next, 1, 1) === '0')
                    {
                        // blank cell
                    }
                    elseif (substr($next, 1, 1) >= '1' && substr($next, 1, 1) <= '9')
                    {
                        // play cell
                        substr($next, 1, 1); // value of play cell digit as string
                    }
                }
                elseif (substr($next, 0, 1) === '_')
                {
                    // single digit sum
                    if (substr($next, 1, 1) >= '3' && substr($next, 1, 1) <= '9')
                    {
                        substr($next, 1, 1); // value of game cell sum as string
                    }
                }
                elseif (substr($next, 0, 2) >= '10' && substr($next, 0, 2) <= '45')
                {
                    // double digit sum
                    substr($next, 0, 2); // value of game cell sum as string
                }
            }
        }
    } // end size check
}

function puzzleToString($puzzle)
{
    $outputGrid = [];
    for ($i = 0; $i < $puzzle->getHeight(); $i++)
    {
        if (!isset($outputGrid[$i]))
        {
            $outputGrid[$i] = [];
        }
        for ($j = 0; $j < $puzzle->getHeight(); $j++)
        {
            $outputGrid[$i][$j] = '00';
        }
    }
    $outputGrid[0][0] = '  ';

    $outputString = '';
    foreach ($outputGrid as $i=>$arr)
    {
        foreach ($arr as $j=>$val)
        {
            $outputString .= $val;
        }
        $outputString .= "\n";
    }
    return $outputString;
}

function permuteCombination($combination)
{
    $permutations = [];
    foreach ($combination as $i=>$digit)
    {
        $possibilities = $digit->getPossibleValues();

        $permutations[$i] = $possibilities;
    }
    return $permutations;
}
// test
// $combination = new Combination();
// print_r(permuteCombination($combination));
$combination = new Combination(['size'=>4]);
print_r(permuteCombination($combination));

?>