<?php

class ReadPuzzles
{
    /***** parameterized SQL inserts */
    // make an entry for this grid of cells
    private $gridSql = "INSERT INTO grid (height, width) VALUES (:height, :width)";
    // make an entry for this puzzle
    private $puzzleSql = "INSERT INTO puzzle (gridId) VALUES (:gridId)";
    // save cell set information
    private $setSql = "INSERT INTO cellsets (numCells, setsum, sumcellX, sumcellY, isRow) VALUES"
            . " (:numCells, :setsum, :sumcellX, :sumcellY, :isRow)";
    // save cell sinformation
    private $cellSql = "INSERT INTO cells (X, Y, digit, colset, rowset) VALUES"
            . " (:X, :Y, :digit, :colset, :rowset)";

    public function readPuzzles()
    {
        /***** read in from file system */
        $puzzle_dir = 'puzzles/to_solve/';
        $puzzle_filenames = [
                //'4x3.json'
                // ,
                '4x4.json'
                //'4x4.annot.json'
                //, '5x5.json'
                //, '9x8.json'
        ];

        foreach ($puzzle_filenames as $puzzle_filename)
        {
            // get database connection
            $db = $this->dbConnect();
            $puzzle = json_decode(file_get_contents($puzzle_dir . $puzzle_filename));
            print_r($puzzle);

            $height = count($puzzle);
            $width = count($puzzle[0]);
            
            if ($statement = $db->prepare($this->gridSql))
            {
                $statement->execute( [ ':height' => $height, ':width' => $width ] );
                echo "store grid";
                print_r($statement->errorInfo());
                $gridId = $db->lastInsertId();
            }

            if ($statement = $db->prepare($this->puzzleSql))
            {
                $statement->execute([':gridId' => $gridId]);
                echo "store puzzle";
                print_r($statement->errorInfo());
                $puzzleId = $db->lastInsertId();
            }
            foreach ($puzzle as $y => $row)
            {
                $cells[$y] = [];
                $sets[$y] = [];
                foreach ($row as $x => $cell)
                {
                    echo "\n$x, $y";

                    // always: insert cell
                    echo "$x, $y not an array, play cell";
                    if ($statement = $db->prepare($this->cellSql))
                    {
                        echo "cell statement inner\n";
                        $statement->execute(
                                [
                                    ':X' => $x
                                    , ':Y' => $y
                                    , ':digit' => 0
                                    , ':colset' => 0 // TODO use actual colset
                                    , ':rowset' =>  0 // TODO use actual rowset
                                ]);
                        echo "store cell";
                        print_r($statement->errorInfo());
                        $cellId = $db->lastInsertId();
                        echo "cellId $cellId";
                    }

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

                        if ($statement = $db->prepare($this->setSql))
                        {
                            // if game cell: insert cellset
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
// do following for each column and row in each cellset
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
                                
            // close connection
            $statement = null;
            $db = null;
        }
    }
        
    public function dbConnect()
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

}
?>

<pre>
<?php

$rp = new ReadPuzzles();
$rp->readPuzzles();

?>
</pre>