-- puzzle possible solutions
DROP TABLE IF EXISTS puzzle_perms;
DROP TABLE IF EXISTS puzzle_combinations;
DROP TABLE IF EXISTS puzzle_puzzle;
DROP TABLE IF EXISTS puzzle_grid;
DROP TABLE IF EXISTS puzzle_cells;
DROP TABLE IF EXISTS puzzle_cellsets;

CREATE TABLE puzzle_perms LIKE all_perms;
ALTER TABLE puzzle_perms DROP COLUMN a;
ALTER TABLE puzzle_perms DROP COLUMN b;
ALTER TABLE puzzle_perms DROP COLUMN c;
ALTER TABLE puzzle_perms DROP COLUMN d;
ALTER TABLE puzzle_perms DROP COLUMN e;
ALTER TABLE puzzle_perms DROP COLUMN f;
ALTER TABLE puzzle_perms DROP COLUMN g;
ALTER TABLE puzzle_perms DROP COLUMN h;
ALTER TABLE puzzle_perms DROP COLUMN i;
ALTER TABLE puzzle_perms ADD COLUMN setInt INT UNSIGNED NOT NULL DEFAULT 0;
INSERT INTO puzzle_perms (permd, cellset, numCells, setsum, bitmap, setInt)
    (
        SELECT permd, cellset, numCells, setsum, bitmap, CAST(cellset AS UNSIGNED) setInt
            FROM all_perms
            WHERE 
                (numCells = 2 AND setsum = 3)
                OR (numCells = 2 AND setsum = 4)
                OR (numCells = 2 AND setsum = 6)
                OR (numCells = 2 AND setsum = 10)
                OR (numCells = 2 AND setsum = 12)
                OR (numCells = 2 AND setsum = 13)
                OR (numCells = 3 AND setsum = 9)
    )
;

CREATE TABLE puzzle_combinations LIKE combinations;
INSERT INTO puzzle_combinations (setInt, cellset, numCells, setsum, bitmap)
    (
        SELECT DISTINCT setInt, cellset, numCells, setsum, bitmap FROM puzzle_perms
    )
;

CREATE TABLE puzzle_puzzle LIKE puzzle;
CREATE TABLE puzzle_grid LIKE grid;
CREATE TABLE puzzle_cells LIKE cells;
CREATE TABLE puzzle_cellsets LIKE cellsets;
