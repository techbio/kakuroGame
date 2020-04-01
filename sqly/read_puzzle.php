<pre>
<?php


$puzzle_dir = 'puzzles/to_solve/';
$puzzle_filenames = [
		//'4x3.json'
        // ,
        '4x4.json'
        //'4x4.annot.json'
		//, '5x5.json'
		//, '9x8.json'
	];

function readPuzzle($puzzleFilePath)
{
    echo $puzzleFilePath;

	$puzzleJson = file_get_contents($puzzleFilePath);

	//echo $puzzleJson;

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
		echo "store grid";
		print_r($statement->errorInfo());
		$gridId = $db->lastInsertId();
	}

	if ($statement = $db->prepare($puzzleSql))
	{
		$statement->execute([':gridId' => $gridId]);
		echo "store puzzle";
		print_r($statement->errorInfo());
		$puzzleId = $db->lastInsertId();
	}

	foreach ($sets as $y=>$currRow)
	{
		foreach ($currRow as $x=>$currCell)
		{
            $numCells = null;
            $isRow = null;
            $setSum = null;

			if ($currCell == -1)
			{
				echo "$x, $y not an array, play cell";
				if ($statement = $db->prepare($cellSql))
				{
					echo "cell statement inner\n";
					$statement->execute(
							[
								':X' => $x
								, ':Y' => $y
								, ':digit' => 0
								, ':colset' => 1 // TODO use actual colset
								, ':rowset' =>  1 // TODO use actual rowset
							]);
					echo "store cell";
					print_r($statement->errorInfo());
					$cellId = $db->lastInsertId();
					echo "cellId $cellId";
				}
			}
			elseif (is_array($currCell)
				&& 
				(is_array($currCell['r']) && count($currCell['r']) > 0)
				|| 
				(is_array($currCell['c']) && count($currCell['c']) > 0)
				)
            {
				echo '*************';
				echo "$x, $y is array, cellset";
				print_r($currCell['r']);
				print_r($currCell['c']);
				echo '*************';


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
						echo "store cellset";
						print_r($statement->errorInfo());
                        $setId = $db->lastInsertId();
                        echo "setId $setId";
                    }
                }
            }
		}
	}

	// close connection
	$statement = null;
	$db = null;
}

foreach ($puzzle_filenames as $puzzle_filename)
{
	$sets = [];
	$cells = [];
    $puzzle = readPuzzle($puzzle_dir . $puzzle_filename);
    print_r($puzzle);

	$height = count($puzzle);
	$width = count($puzzle[0]);
	foreach ($puzzle as $y => $row)
	{
		$cells[$y] = [];
		$sets[$y] = [];
		foreach ($row as $x => $cell)
		{
            echo "\n$x, $y";
            if ($cell == [-1, -1])
            {
                echo "\nfound 'blank' -> blank cell";
            }
            elseif ($cell == -1)
            {
                echo "\nfound -1 -> play cell";
            }
            elseif (is_array($cell))
            {
                $colSum = $cell[0];// != -1 ? $cell[0] : 0;
                $rowSum = $cell[1];// != -1 ? $cell[1] : 0;
                echo "\nfound gamecell data: colSum: $colSum rowSum: $rowSum";
            }
            // if game cell: insert cellset
            // always: insert cell
            continue;

			$sets[$y][$x] = [];
			$sets[$y][$x]['r'] = []; // row set
			$sets[$y][$x]['c'] = []; // column set
			$cells[$y][$x] = 0; // init it

			//echo "\nrow:$y, col:$x ";

			if (is_array($cell))
			{
				// game cell
				if ($cell[0] < 1 && $cell[1] < 1)
				{
					// blank cell
					//echo "blank\n";
				}
				else
				{
					if ($cell[0] >= 3 && $cell[0] <= 45) // game set cell
					{
						// column set sum
						//echo "column sum cell\n";
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
						//echo "row sum cell\n";
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
				//echo "empty play cell\n";
				$cells[$currCol][$currRow] = -1;
				
			}
			elseif ($cell <= 9 && $cell >= 1)
			{
				// finished
				//echo "set play cell\n";
            }
			else
			{
                //echo "elsewhere\n";
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