<pre>
<?php

function readPuzzle($puzzleFilePath)
{
	$puzzleJson = file_get_contents($puzzleFilePath);

	echo $puzzleJson;

	return json_decode($puzzleJson, true);
}

$puzzle_dir = 'puzzles/to_solve/';
$puzzle_filenames = [
		// '4x3.json'
		// , '4x4.json'
		// , '5x5.json'
		// ,
		'9x8.json'
	];


foreach ($puzzle_filenames as $puzzle_filename)
{
	$sets = [];
	$cells = [];
	$puzzle = readPuzzle($puzzle_dir . $puzzle_filename);
	$height = count($puzzle);
	$width = count($puzzle[0]);
	foreach ($puzzle as $y => $row)
	{
		$cells[$y] = [];
		$sets[$y] = [];
		foreach ($row as $x => $cell)
		{
			$sets[$y][$x] = [];
			$sets[$y][$x]['r'] = []; // row set
			$sets[$y][$x]['c'] = []; // column set
			$cells[$y][$x] = 0;

			echo "\nrow:$y, col:$x ";

			if (is_array($cell))
			{
				// game cell
				if ($cell[0] < 1 && $cell[1] < 1)
				{
					// blank cell
					echo "blank\n";
				}
				else
				{
					if ($cell[0] >= 3 && $cell[0] <= 45)
					{
						// column set sum
						echo "column sum cell\n";
						$sets[$y][$x]['c']['sum'] = $cell[0];
						$sets[$y][$x]['c']['cells'] = [];

						// add cells from column below
						$currCol = $x;
						$currRow = $y + 1; // start with first play cell, not setcell
						while ($currRow < $height && !is_array($puzzle[$currRow][$currCol]))
						{
							$cells[$currCol][$currRow] = [
								'value' => $puzzle[$currRow][$currCol]
								, 'setRow' => $y
								, 'setCol' => $x
								, 'row' => $currRow
								, 'column' => $currCol
							];	
							$sets[$y][$x]['c']['cells'][] = $cells[$currCol][$currRow];
							$currRow++;
						}
					}
					
					if ($cell[1] >= 3 && $cell[1] <= 45)
					{
						// row set sum
						echo "row sum cell\n";
						$sets[$y][$x]['r']['sum'] = $cell[1];
						$sets[$y][$x]['r']['cells'] = [];

						// add cells from row right
						$currCol = $x + 1;  // start with first play cell, not setcell
						$currRow = $y;
						while ($currCol < $width && !is_array($puzzle[$currRow][$currCol]))
						{
							$cells[$currCol][$currRow] = [
								'value' => $puzzle[$currRow][$currCol]
								, 'setRow' => $y
								, 'setCol' => $x
								, 'row' => $currRow
								, 'column' => $currCol
							];
							$sets[$y][$x]['r']['cells'][] = $cells[$currCol][$currRow];
							$currCol++;
						}
					}
					
					// if ($cell[1] >= 3 && $cell[1] <= 45)
					// {
					// 	// row set sum
					// 	echo "row sum cell\n";
					// 	$sets[$y][$x]['r']['sum'] = $cell[1];
					// 	$sets[$y][$x]['r']['cells'] = [];

					// 	// add cells from row to right
					// 	$currCol = $x + 1; // start with first play cell, not setcell
					// 	$currRow = $y;
					// 	while (!is_array($puzzle[$currRow][$currCol]))
					// 	{
					// 		$cells[$currCol][$currRow] = $puzzle[$currRow][$currCol];
					// 		$sets[$y][$x]['r']['cells'][] = [
					// 				'value' => $puzzle[$currRow][$currCol]
					// 				, 'row' => $currRow
					// 				, 'column' => $currCol
					// 		];
					// 	}
					// 	$currCol++;
					// 	if ($currCol >= $width) break;
					// }
				}
			}
			elseif ($cell === -1)
			{
				echo "empty play cell\n";
				
			}
			elseif ($cell <= 9 && $cell >= 1)
			{
				// finished
				echo "set play cell\n";
			}
		}
	}
	echo 'puzzle:';
	print_r($puzzle);
	echo 'sets:';
	print_r($sets);
	echo 'cells:';
	print_r($cells);
}

?>
</pre>