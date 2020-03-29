<pre>
<?php

function readPuzzle($puzzleFilePath)
{
	$puzzleJson = file_get_contents($puzzleFilePath);

	echo $puzzleJson;

	return json_decode($puzzleJson, true);
}

function dbConnect()
{
	$database = 'kakuro';
	$host = '127.0.0.1';
	$username = 'root';
	$password = 'root';
	$db = null;

	try
	{
		$db = new PDO("mysql:host=$host;dbname=$database", $username, $password); // mysqli_connect($host, $user, $password, $database);
	}
	catch (PDOException $e)
	{
		echo 'Could not connect, error: ' . $e->getMessage() . "\n";
		die();
	}
	if ($db)
	{
		return $db;
	}
	return false;
}

function insertPuzzle($cells, $sets, $puzzle)
{
	$gridSql = "INSERT INTO grid (height, width) VALUES (:height, :width)";
	$puzzleSql = "INSERT INTO puzzle (gridId) VALUES (:gridId)";
	$setSql = "INSERT INTO cellsets (numCells, setsum, sumcellX, sumcellY, isRow) VALUES (:numCells, :setsum, :sumcellX, :sumcellY, :isRow)";
	$cellSql = "INSERT INTO cells (X, Y, digit, colset, rowset) VALUES (:X, :Y, :digit, :colset, :rowset)";

	// get database connection
	$db = dbConnect();
	if ($statement = $db->prepare($gridSql))
	{
		$statement->execute( [ ':height' => count($puzzle), ':width' => count($puzzle[0]) ] );
		$gridId = $db->lastInsertId();
	}

	if ($statement = $db->prepare($puzzleSql))
	{
		$statement->execute([':gridId' => $gridId]);
		$puzzleId = $db->lastInsertId();
	}

	// $sets[$y][$x]['c']['cells'][] = $cells[$currCol][$currRow];
	foreach ($sets as $y=>$currRow)
	{
		foreach ($currRow as $x=>$currColumn)
		{
            $numCells = null;
            $isRow = null;
            $setSum = null;

            if (is_array($sets[$y][$x]))
            {
                if (is_array($sets[$y][$x]['r'])
                        && 1 <= count($sets[$y][$x]['r'])
                        && is_array($sets[$y][$x]['r']['cells']))
                {
                    if ( 1 >= ($numCells = count($sets[$y][$x]['r']['cells'])) ) // two-cell minimum per set in Kakuro
                    {
                        echo "row inner\n";
                        $isRow = true;
                        $setSum = $sets[$y][$x]['r']['sum'];
                    }
                }

                if (is_array($sets[$y][$x]['c'])
                        && 1 <= count($sets[$y][$x]['c'])
                        && is_array($sets[$y][$x]['c']['cells']))
                {
                    if ( 1 >= ($numCells = count($sets[$y][$x]['c']['cells'])) )
                    {
                        echo "column inner\n";
                        $isRow = false;
                        $setSum = $sets[$y][$x]['c']['sum'];
                    }
                }

                if ($numCells != null
                        && ($isRow == true || $isRow == false)
                        && $setSum != null
                        )
                {
                    if ($statement = $db->prepare($setSql))
                    {
                        echo "statement inner\n";
                        $statement->execute(
                                [
                                    ':numCells' => $numCells
                                    , ':setsum' => $setSum
                                    , ':sumcellX' => $x
                                    , ':sumcellY' => $y
                                    , ':isRow' => $isRow
                                ]);
                        $setId = $db->lastInsertId();
                        echo "setId $setId";
                    }
                }
            }
            else
            {
                echo "not an array\n";
                print_r($sets);
            }
		}
	}

	// close connection
	$statement = null;
	$db = null;
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
            else{
                echo "elsewhere\n";
            }
		}
	}
	// echo 'puzzle:';
	// print_r($puzzle);
	// echo 'sets:';
	// print_r($sets);
	// echo 'cells:';
	// print_r($cells);

	// load puzzle definition into db tables
	insertPuzzle($cells, $sets, $puzzle);
}

?>
</pre>