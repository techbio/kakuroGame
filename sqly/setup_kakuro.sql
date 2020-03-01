-- add text data to memory tables
USE kakuro;
LOAD DATA LOCAL
    INFILE 'all_sets.csv'
    INTO TABLE all_sets
    FIELDS 
        TERMINATED BY ','
        ENCLOSED BY "'"
    IGNORE 2 LINES
    (numCells, setsum, cellsets, alwaysUsed, neverUsed)
;
