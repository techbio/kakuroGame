/*

for each integer in (1-9):
    create a new combination of the integer itself, length 1

for each combination:
    for each integer in (1-9):
        if integer is not already in combination:
            create permutations of length n+1 by inserting the integer at each index
            create a new combination of length n+1 by appending the integer
*/

CREATE TABLE permbinations (
    permutation INT PRIMARY KEY DEFAULT 1,
    combination INT INDEX DEFAULT 1,
    comboBitmap INT INDEX DEFAULT 100000000,
    permPattern INT INDEX DEFAULT 123456789,
    sum TINYINT INDEX DEFAULT 1,
    setLength TINYINT INDEX DEFAULT 1
);
/*
CREATE FUNCTION SPLIT_COMBO(
  x VARCHAR(9),
  pos INT
)
RETURNS VARCHAR(9)
RETURN REPLACE(
        SUBSTRING(
            SUBSTRING(x, pos, 1), --  get one character from x at position pos
            LENGTH(
                SUBSTRING(x, pos, 1)
                ) + 1),
            '', ''
        ); */

INSERT INTO permbinations (1, 1, 100000000, 123456789, 1, 1);

INSERT INTO permbinations -- add a seecond entry
    SELECT (permutation + 1) permutation,
                (combination + 1) combination,
                SUBSTR(CONCAT('0', comboBitmap), 0, 9) comboBitmap,
                permPattern,
                (sum + 1) sum,
                setLength)
            FROM permbinations;

INSERT INTO permbinations -- begin concatenating
    SELECT CONCAT(permutation, newDigit) permutation,
                CONCAT(combination, newDigit) combination,
                /* SUBSTR(CONCAT('0', comboBitmap), 0, 9) comboBitmap,
                permPattern,
                (sum + 1) sum,
                setLength)
            FROM permbinations; */