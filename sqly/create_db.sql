SET FOREIGN_KEY_CHECKS = 0;

SELECT 'create a database of solution space of all kakuro puzzles';

-- DROP DATABASE IF EXISTS kakuro;
-- CREATE DATABASE kakuro;
-- CREATE USER IF NOT EXISTS 'kakuro'@'localhost' identified by '1Kakuro.';
-- GRANT ALL PRIVILEGES ON kakuro.* TO 'kakuro'@'localhost';
-- FLUSH PRIVILEGES;

USE kakuro;

DROP TABLE IF EXISTS digits;
DROP TABLE IF EXISTS perms;
DROP TABLE IF EXISTS all_perms;
DROP TABLE IF EXISTS grid;
DROP TABLE IF EXISTS puzzle;
DROP TABLE IF EXISTS all_sets;
DROP TABLE IF EXISTS all_cells;

DROP TABLE IF EXISTS combinations;
DROP TABLE IF EXISTS permutations;

SELECT 'create grid';
CREATE TABLE grid (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE = MEMORY;

SELECT 'create puzzle';
CREATE TABLE puzzle (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , width TINYINT(4) DEFAULT 5
    , height TINYINT(4) DEFAULT 5
) ENGINE = MEMORY;

SELECT 'create all_cells';
CREATE TABLE all_cells (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE = MEMORY;

SELECT 'create combinations';
CREATE TABLE combinations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT NOT NULL DEFAULT 0
    , setsum TINYINT NOT NULL DEFAULT 0
    , cellset CHAR(9)
) ENGINE = MEMORY;

SELECT 'create permutations';
CREATE TABLE permutations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT NOT NULL DEFAULT 0
    , setsum TINYINT NOT NULL DEFAULT 0
    , cellset CHAR(9)
    , combo CHAR(9)
    , comboId INT DEFAULT 0
) ENGINE = MEMORY;

SELECT 'create all_sets';
CREATE TABLE all_sets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT NOT NULL DEFAULT 0
    , setsum TINYINT NOT NULL DEFAULT 0
    , cellsets VARCHAR(80)
    , alwaysUsed CHAR(9) DEFAULT '.........'
    , neverUsed CHAR(9) DEFAULT '.........'
    , alwaysBitmap BINARY(9) DEFAULT b'000000000'
    , neverBitmap BINARY(9) DEFAULT b'000000000'
) ENGINE = MEMORY;

SELECT 'load all_sets.csv';
LOAD DATA LOCAL
    INFILE 'all_sets.csv'
    INTO TABLE all_sets
    FIELDS 
        TERMINATED BY ','
        ENCLOSED BY "'"
    IGNORE 2 LINES
    (numCells, setsum, cellsets, alwaysUsed, neverUsed)
;

SELECT 'create digits';
CREATE TABLE digits (
    id TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , bitmap BINARY(9) DEFAULT 0b000000000
) ENGINE = MEMORY;

SELECT 'populate digits';
INSERT INTO digits (id) VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9);
UPDATE digits SET bitmap = POW(2, id - 1);

SELECT 'create perms';
CREATE TABLE perms ENGINE = MEMORY AS
    (SELECT a.id 'a', b.id 'b', c.id 'c'
        , d.id 'd', e.id 'e', f.id 'f'
        , g.id 'g', h.id 'h', i.id 'i'
        , CONCAT(a.id, b.id, c.id
            , d.id, e.id, f.id
            , g.id, h.id, i.id) perm
        FROM digits a
            CROSS JOIN digits b
            CROSS JOIN digits c
            CROSS JOIN digits d
            CROSS JOIN digits e
            CROSS JOIN digits f
            CROSS JOIN digits g
            CROSS JOIN digits h
            CROSS JOIN digits i
        WHERE a.id NOT IN (b.id,c.id,d.id,e.id,f.id,g.id,h.id,i.id)
            AND b.id NOT IN (a.id,c.id,d.id,e.id,f.id,g.id,h.id,i.id)
            AND c.id NOT IN (a.id,b.id,d.id,e.id,f.id,g.id,h.id,i.id)
            AND d.id NOT IN (a.id,b.id,c.id,e.id,f.id,g.id,h.id,i.id)
            AND e.id NOT IN (a.id,b.id,c.id,d.id,f.id,g.id,h.id,i.id)
            AND f.id NOT IN (a.id,b.id,c.id,d.id,e.id,g.id,h.id,i.id)
            AND g.id NOT IN (a.id,b.id,c.id,d.id,e.id,f.id,h.id,i.id)
            AND h.id NOT IN (a.id,b.id,c.id,d.id,e.id,f.id,g.id,i.id)
            AND i.id NOT IN (a.id,b.id,c.id,d.id,e.id,f.id,g.id,h.id)
);
-- 9, 45, '^[123456789]{9}$'
-- 3, 3, '^[12]{2}$'
-- SELECT a,b,c,d,e,f,g,h,i/*,SUBSTR(perm,1,9) permd*/, (a+b+c+d+e+f+g+h+i) setsum/*, 9 numCells*/
--         FROM perms
--         WHERE
--             (a < b
--                 AND b < c
--                 AND c < d
--                 AND d < e
--                 AND e < f
--                 AND f < g
--                 AND g < h
--                 AND h < i)
            
--             OR (a < b
--                 AND b < c
--                 AND c < d
--                 AND d < e
--                 AND e < f
--                 AND f < g
--                 AND g < h)
            
--             OR (a < b
--                 AND b < c
--                 AND c < d
--                 AND d < e
--                 AND e < f
--                 AND f < g)
            
--             OR (a < b
--                 AND b < c
--                 AND c < d
--                 AND d < e
--                 AND e < f)
            
--             OR (a < b
--                 AND b < c
--                 AND c < d
--                 AND d < e)
            
--             OR (a < b
--                 AND b < c
--                 AND c < d)

--             OR (a < b
--                 AND b < c)

--             OR (a < b)
--         /*GROUP BY a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,9)*/
--         ORDER BY 
--             setsum DESC
--             , a DESC, b DESC, c DESC, d DESC
--             , e DESC, f DESC, g DESC, h DESC, i DESC
-- ;
SELECT 'create all_perms, 9 cell';
CREATE TABLE all_perms ENGINE = MEMORY AS
    (SELECT a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,9) permd, (a+b+c+d+e+f+g+h+i) setsum, 9 numCells
        FROM perms
        GROUP BY a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,9)
        HAVING setsum=45
        ORDER BY setsum DESC
            , a DESC, b DESC, c DESC, d DESC
            , e DESC, f DESC, g DESC, h DESC, i DESC
     )
;
SELECT 'populate all_perms, 8 cell';
INSERT INTO all_perms (a,b,c,d,e,f,g,h,permd,setsum,numCells)
    SELECT a,b,c,d,e,f,g,h,SUBSTR(perm,1,8) permd, (a+b+c+d+e+f+g+h) setsum, 8 numCells
        FROM perms
        GROUP BY a,b,c,d,e,f,g,h,SUBSTR(perm,1,8)
        ORDER BY setsum DESC
        , a DESC, b DESC, c DESC, d DESC
        , e DESC, f DESC, g DESC, h DESC
;
SELECT 'populate all_perms, 7 cell';
INSERT INTO all_perms (a,b,c,d,e,f,g,permd,setsum,numCells)
    SELECT a,b,c,d,e,f,g,SUBSTR(perm,1,7) permd, (a+b+c+d+e+f+g) setsum, 7 numCells
        FROM perms
        GROUP BY a,b,c,d,e,f,g,SUBSTR(perm,1,7)
        ORDER BY setsum DESC
        , a DESC, b DESC, c DESC, d DESC
        , e DESC, f DESC, g DESC
;
SELECT 'populate all_perms, 6 cell';
INSERT INTO all_perms (a,b,c,d,e,f,permd,setsum,numCells)
    SELECT a,b,c,d,e,f,SUBSTR(perm,1,6) permd, (a+b+c+d+e+f) setsum, 6 numCells
        FROM perms
        GROUP BY a,b,c,d,e,f,SUBSTR(perm,1,6)
        ORDER BY setsum DESC
        , a DESC, b DESC, c DESC, d DESC
        , e DESC, f DESC
;
SELECT 'populate all_perms, 5 cell';
INSERT INTO all_perms (a,b,c,d,e,permd,setsum,numCells)
    SELECT a,b,c,d,e,SUBSTR(perm,1,5) permd, (a+b+c+d+e) setsum, 5 numCells
        FROM perms
        GROUP BY a,b,c,d,e,SUBSTR(perm,1,5)
        ORDER BY setsum DESC
        , a DESC, b DESC, c DESC, d DESC
        , e DESC
;
SELECT 'populate all_perms, 4 cell';
INSERT INTO all_perms (a,b,c,d,permd,setsum,numCells)
    SELECT a,b,c,d,SUBSTR(perm,1,4) permd, (a+b+c+d) setsum, 4 numCells
        FROM perms
        GROUP BY a,b,c,d,SUBSTR(perm,1,4)
        ORDER BY setsum DESC, a DESC, b DESC, c DESC, d DESC
;
SELECT 'populate all_perms, 3 cell';
INSERT INTO all_perms (a,b,c,permd,setsum,numCells)
    SELECT a,b,c,SUBSTR(perm,1,3) permd, (a+b+c) setsum, 3 numCells
        FROM perms
        GROUP BY a,b,c,SUBSTR(perm,1,3)
        ORDER BY setsum DESC, a DESC, b DESC, c DESC
;
SELECT 'populate all_perms, 2 cell';
INSERT INTO all_perms (a,b,permd,setsum,numCells)
    SELECT a,b,SUBSTR(perm,1,2) permd, (a+b) setsum, 2 numCells
        FROM perms
        GROUP BY a,b,SUBSTR(perm,1,2)
        ORDER BY setsum DESC, a DESC, b DESC
;

SELECT 'get combinations from permutations';
ALTER TABLE all_perms ADD COLUMN bitmap BIT(9) DEFAULT 0b111111111;
UPDATE all_perms
    SET bitmap = CONVERT(
            CONCAT(LOCATE(1, permd) > 0
                , LOCATE(2, permd) > 0
                , LOCATE(3, permd) > 0
                , LOCATE(4, permd) > 0
                , LOCATE(5, permd) > 0
                , LOCATE(6, permd) > 0
                , LOCATE(7, permd) > 0
                , LOCATE(8, permd) > 0
                , LOCATE(9, permd) > 0
            ), BINARY);

SELECT 'get combination bitmaps';
CREATE TABLE combo_map ENGINE = MEMORY AS
    (SELECT numCells, setsum, cellset, CONCAT(LOCATE(1, cellset) > 0
                , LOCATE(2, cellset) > 0
                , LOCATE(3, cellset) > 0
                , LOCATE(4, cellset) > 0
                , LOCATE(5, cellset) > 0
                , LOCATE(6, cellset) > 0
                , LOCATE(7, cellset) > 0
                , LOCATE(8, cellset) > 0
                , LOCATE(9, cellset) > 0
            ) bitmap
        FROM combinations
    )
;

DROP FUNCTION toBitmap;
SELECT 'create function toBitmap';
CREATE FUNCTION toBitmap (cellset CHAR(9))
    RETURNS BINARY(9)
    RETURN BINARY TRIM(CONCAT(
                LOCATE(1, cellset) > 0
                , LOCATE(2, cellset) > 0
                , LOCATE(3, cellset) > 0
                , LOCATE(4, cellset) > 0
                , LOCATE(5, cellset) > 0
                , LOCATE(6, cellset) > 0
                , LOCATE(7, cellset) > 0
                , LOCATE(8, cellset) > 0
                , LOCATE(9, cellset) > 0
            ));
UPDATE mem_all_perms SET bitmap = toBitmap(permd);
        
SELECT 'get bitmaps from combinations';
UPDATE all_perms ap
    , (
        SELECT
            cellset
            , CONCAT(LOCATE(1, cellset) > 0
                , LOCATE(2, cellset) > 0
                , LOCATE(3, cellset) > 0
                , LOCATE(4, cellset) > 0
                , LOCATE(5, cellset) > 0
                , LOCATE(6, cellset) > 0
                , LOCATE(7, cellset) > 0
                , LOCATE(8, cellset) > 0
                , LOCATE(9, cellset) > 0
            ) bitmap
        FROM combinations
    ) a
    SET ap.bitmap = a.bitmap
    WHERE p.combo = a.cellset
        AND ap.permd = a.cellset;
-- UPDATE permutations p
--     SET p.bitmap = c.bitmap
--     WHERE p.cellset = c.cellset
SET FOREIGN_KEY_CHECKS = 1;