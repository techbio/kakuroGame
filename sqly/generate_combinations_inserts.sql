-- Generate INSERT for each combination
-- because combinations from table were in a space separated string,
-- split into their own columns
-- adapted from https://dba.stackexchange.com/a/57910
SELECT CONCAT('INSERT INTO combinations (numCells, setsum, cellset) SELECT '
            , numCells
            , ', '
            , setsum
            , ", cellset FROM (SELECT NULL cellset UNION SELECT '"
            , REPLACE(cellsets, ' ', "' UNION SELECT '")
            , "') A"
            , " WHERE cellset IS NOT NULL"
            , ";"
        )
    FROM all_sets
;