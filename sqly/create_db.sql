-- create a database of solution space of 5x5 kakuros

DROP DATABASE IF EXISTS kakuro;
CREATE DATABASE kakuro;
CREATE USER IF NOT EXISTS 'kakuro'@'localhost' identified by '1Kakuro.';
GRANT ALL PRIVILEGES ON kakuro.* TO 'kakuro'@'localhost';
FLUSH PRIVILEGES;

USE kakuro;

DROP TABLE IF EXISTS digits;
DROP TABLE IF EXISTS digits2;
DROP TABLE IF EXISTS grid;
DROP TABLE IF EXISTS puzzle;
DROP TABLE IF EXISTS all_sets;
DROP TABLE IF EXISTS all_cells;
DROP TABLE IF EXISTS combinations;
DROP TABLE IF EXISTS permutations;
DROP TABLE IF EXISTS perms;
DROP TABLE IF EXISTS perms1;
DROP TABLE IF EXISTS perms2;
DROP TABLE IF EXISTS perms_plain;


CREATE TABLE digits (
    id TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , bitmap BIT(9)
);
INSERT INTO digits (id, bitmap)
    VALUES (1, 0b100000000)
         , (2, 0b010000000)
         , (3, 0b001000000)
         , (4, 0b000100000)
         , (5, 0b000010000)
         , (6, 0b000001000)
         , (7, 0b000000100)
         , (8, 0b000000010)
         , (9, 0b000000001)
;
CREATE TABLE digits2 (
    id TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , bitmap BIT(9) DEFAULT 0b000000000
);
INSERT INTO digits2 (id) VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9);
UPDATE digits2 SET bitmap = POW(2, id - 1);

-- get all permutations of 9 digits
DROP TABLE IF NOT EXISTS perms1;
CREATE TABLE perms1
    AS SELECT a.id 'a', b.id 'b', c.id 'c'
        , d.id 'd', e.id 'e', f.id 'f'
        , g.id 'g', h.id 'h', h.id 'i'
        , CONCAT(a.id, b.id, c.id
            , d.id, e.id, f.id
            , g.id, h.id, h.id) perm
    FROM digits a
        CROSS JOIN digits b
        CROSS JOIN digits c
        CROSS JOIN digits d
        CROSS JOIN digits e
        CROSS JOIN digits f
        CROSS JOIN digits g
        CROSS JOIN digits h
        CROSS JOIN digits i
    HAVING NOT (perm REGEXP '\d*(\d)\d*\1{1}\d*')
;

-- get all permutations of 4 digits
DROP TABLE IF EXISTS perms2;
CREATE TABLE perms2
    AS SELECT a.id 'a', b.id 'b', c.id 'c', d.id 'd'
        , CONCAT(a.id, b.id, c.id, d.id) perm
    FROM digits a
        CROSS JOIN digits b
        CROSS JOIN digits c
        CROSS JOIN digits d
    HAVING perm REGEXP '(\d)\1{1}'
;

DROP TABLE IF NOT EXISTS perms;
CREATE TABLE perms
    AS SELECT a.id 'a', b.id 'b', c.id 'c'
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
;

SELECT a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,2) permd, (a+b+c+d+e+f+g+h+i) setsum
    FROM perms
    GROUP BY a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,2)
    ORDER BY setsum DESC;
SELECT a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,3) permd, (a+b+c+d+e+f+g+h+i) setsum
    FROM perms
    GROUP BY a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,3)
    ORDER BY setsum DESC;
SELECT a,b,c,d,SUBSTR(perm,1,4) permd, (a+b+c+d) setsum
    FROM perms
    GROUP BY a,b,c,d,SUBSTR(perm,1,4)
    ORDER BY setsum DESC, a DESC, b DESC, c DESC, d DESC;
SELECT a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,5) permd, (a+b+c+d+e+f+g+h+i) setsum
    FROM perms
    GROUP BY a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,5)
    ORDER BY setsum DESC;
SELECT a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,6) permd, (a+b+c+d+e+f+g+h+i) setsum
    FROM perms
    GROUP BY a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,6)
    ORDER BY setsum DESC;
SELECT a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,7) permd, (a+b+c+d+e+f+g+h+i) setsum
    FROM perms
    GROUP BY a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,7)
    ORDER BY setsum DESC;
SELECT a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,8) permd, (a+b+c+d+e+f+g+h+i) setsum
    FROM perms
    GROUP BY a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,8)
    ORDER BY setsum DESC;
SELECT a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,9) permd, (a+b+c+d+e+f+g+h+i) setsum
    FROM perms
    GROUP BY a,b,c,d,e,f,g,h,i,SUBSTR(perm,1,9)
    ORDER BY setsum DESC
        , a DESC, b DESC, c DESC, d DESC
        , e DESC, f DESC, g DESC, h DESC, i DESC;


-- single column, all permutations of 9 digits
DROP TABLE IF NOT EXISTS perms_plain;
CREATE TABLE perms_plain AS
    SELECT 
        CONCAT(a.id, b.id, c.id
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
;

-- get bitmaps from combinations
SELECT numCells, setsum, cellset, bitmap
    FROM (
        SELECT
            CONCAT(LOCATE(1, cellset) > 0
                , LOCATE(2, cellset) > 0
                , LOCATE(3, cellset) > 0
                , LOCATE(4, cellset) > 0
                , LOCATE(5, cellset) > 0
                , LOCATE(6, cellset) > 0
                , LOCATE(7, cellset) > 0
                , LOCATE(8, cellset) > 0
                , LOCATE(9, cellset) > 0
            ) bitmap
            , cellset, numCells, setsum
        FROM combinations
        WHERE numCells = 8
    ) a;
    
-- get permutations from combinations
-- SELECT bitmap FROM combinations

CREATE TABLE grid (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE puzzle (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE all_sets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT NOT NULL DEFAULT 0
    , setsum TINYINT NOT NULL DEFAULT 0
    , cellsets VARCHAR(80)
    , alwaysUsed CHAR(9) DEFAULT '.........'
    , neverUsed CHAR(9) DEFAULT '.........'
    , alwaysBitmap BINARY(9) DEFAULT b'000000000'
    , neverBitmap BINARY(9) DEFAULT b'000000000'
);
-- UPDATE all_sets SET alwaysBitmap = alwaysBitmap & 2^(9 - 1) WHERE alwaysUsed LIKE '%1%';

CREATE TABLE all_cells (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE combinations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT NOT NULL DEFAULT 0
    , setsum TINYINT NOT NULL DEFAULT 0
    , cellset CHAR(9)
);

CREATE TABLE permutations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);