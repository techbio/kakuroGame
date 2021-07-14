SET FOREIGN_KEY_CHECKS = 0;
SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));

SELECT 'create a database of solution space of all kakuro puzzles';
USE kakuro;

DROP TABLE IF EXISTS all_cells;
DROP TABLE IF EXISTS all_sets;
DROP TABLE IF EXISTS digits;
DROP TABLE IF EXISTS perms;
DROP TABLE IF EXISTS all_perms;
DROP TABLE IF EXISTS permperms;
DROP TABLE IF EXISTS grid;
DROP TABLE IF EXISTS puzzle;
DROP TABLE IF EXISTS cells;
DROP TABLE IF EXISTS cellsets;

source functions.sql
source combinations_inserts.sql

SELECT 'create digits';
CREATE TABLE digits (
    id TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
    , bitmap BINARY(9) DEFAULT 0b000000000
) ENGINE = InnoDB;

SELECT 'populate digits';
INSERT INTO digits (id) VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9);
UPDATE digits SET bitmap = POW(2, id - 1);


SELECT 'create grid';
CREATE TABLE grid (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
    , width TINYINT(2) UNSIGNED DEFAULT 3
    , height TINYINT(2) UNSIGNED DEFAULT 3
) ENGINE = InnoDB;

/* TODO: create a reusable puzzle mask table? */

SELECT 'create puzzle';
CREATE TABLE puzzle (
    id TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
    , gridId BIGINT UNSIGNED NOT NULL
    , CONSTRAINT FOREIGN KEY gridIdFK (gridId) REFERENCES grid(id)
) ENGINE = InnoDB;

SELECT 'create cellsets';
CREATE TABLE cellsets (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT(1) NOT NULL DEFAULT 0
    , setsum TINYINT(2) NOT NULL DEFAULT 0
    , sumcellX TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
    , sumcellY TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
    , isRow BIT(1) NOT NULL DEFAULT 0
    , CONSTRAINT FOREIGN KEY puzzleIdFK (puzzleId) REFERENCES puzzle(id)
) ENGINE = InnoDB;

SELECT 'create cells';
CREATE TABLE cells (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
    , X TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
    , Y TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
    , digit TINYINT(1) UNSIGNED NOT NULL
    , bitmap BINARY(9) DEFAULT b'111111111'
    , rowset BIGINT UNSIGNED NOT NULL /* every cell has both a row and... */
    , colset BIGINT UNSIGNED NOT NULL /* ...a column set crossing it */
    , CONSTRAINT FOREIGN KEY colsetFK (colset) REFERENCES cellsets(id)
    , CONSTRAINT FOREIGN KEY rowsetFK (rowset) REFERENCES cellsets(id)
    , CONSTRAINT FOREIGN KEY digitFK (digit) REFERENCES digits(id)
) ENGINE = InnoDB;

-- SELECT 'skip perms';
SELECT 'create perms';
source create_permutations.sql

SELECT 'get combinations from permutations';
UPDATE perms SET bitmap = toBitmap(perm), cellset = fromBitmap(toBitmap(perm));

SELECT 'add indexes to perms';
ALTER TABLE perms ADD CONSTRAINT PRIMARY KEY pk (perm);
ALTER TABLE perms ADD INDEX combination (cellset);
ALTER TABLE perms ADD INDEX bits (bitmap);
ALTER TABLE perms ADD INDEX ax (a);
ALTER TABLE perms ADD INDEX bx (b);
ALTER TABLE perms ADD INDEX cx (c);
ALTER TABLE perms ADD INDEX dx (d);
ALTER TABLE perms ADD INDEX ex (e);
ALTER TABLE perms ADD INDEX fx (f);
ALTER TABLE perms ADD INDEX gx (g);
ALTER TABLE perms ADD INDEX hx (h);
ALTER TABLE perms ADD INDEX ix (i);

-- DROP TABLE all_sets;
-- DROP TABLE perms;

SET SESSION sql_mode=(SELECT CONCAT(@@sql_mode, ',ONLY_FULL_GROUP_BY'));
SET FOREIGN_KEY_CHECKS = 1;