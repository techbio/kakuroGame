SET FOREIGN_KEY_CHECKS = 0;
source /var/www/html/kakuroGame/sqly/combinations_inserts.sql

SELECT 'create a database of solution space of all kakuro puzzles';
USE kakuro;

DROP TABLE IF EXISTS all_sets;
DROP TABLE IF EXISTS digits;
DROP TABLE IF EXISTS perms;
DROP TABLE IF EXISTS all_perms;
DROP TABLE IF EXISTS grid;
DROP TABLE IF EXISTS puzzle;
DROP TABLE IF EXISTS cells;
DROP TABLE IF EXISTS cellsets;


SELECT 'create digits';
CREATE TABLE digits (
    id TINYINT(1) NOT NULL AUTO_INCREMENT PRIMARY KEY
    , bitmap BINARY(9) DEFAULT 0b000000000
) ENGINE = MEMORY;

SELECT 'populate digits';
INSERT INTO digits (id) VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9);
UPDATE digits SET bitmap = POW(2, id - 1);


SELECT 'create grid';
CREATE TABLE grid (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , width TINYINT(2) DEFAULT 5
    , height TINYINT(2) DEFAULT 5
) ENGINE = MEMORY;

SELECT 'create puzzle';
CREATE TABLE puzzle (
    id TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
    , gridId BIGINT
    , CONSTRAINT FOREIGN KEY gridIdFK (gridId) REFERENCES grid(id)
) ENGINE = MEMORY;

SELECT 'create cells';
CREATE TABLE cells (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , digit TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , bitmap BINARY(9) DEFAULT b'111111111'
    , X TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
    , Y TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
    , cellset BIGINT
    , CONSTRAINT FOREIGN KEY cellsetFK (cellset) REFERENCES cellsets(id)
    , CONSTRAINT FOREIGN KEY digitFK (digit) REFERENCES digits(id)
) ENGINE = MEMORY;

SELECT 'create cellsets';
CREATE TABLE cellsets (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT(1) NOT NULL DEFAULT 0
    , setsum TINYINT(2) NOT NULL DEFAULT 0
    , sumcellX TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
    , sumcellY TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
) ENGINE = MEMORY;

SELECT 'create all_sets';
CREATE TABLE all_sets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , setsum TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
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

-- SELECT 'skip perms';
SELECT 'create perms';
CREATE TABLE IF NOT EXISTS perms (
    a TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , b TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , c TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , d TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , e TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , f TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , g TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , h TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , i TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , perm CHAR(9) NOT NULL DEFAULT '000000000'
) ENGINE = MEMORY;

SELECT 'populate perms (cross product)';
INSERT INTO perms
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

-- SELECT 'create perms quicker';
-- DROP IF EXISTS TABLE perms2;
-- CREATE TABLE perms2 ENGINE = MEMORY AS SELECT * FROM permperms LIMIT 1;
-- TRUNCATE perms2;
-- INSERT INTO perms2 (a, b, permd)
--     (SELECT a.id 'a', b.id 'b'
--         , CONCAT(a.id, b.id) permd
--         FROM digits a
--             CROSS JOIN digits b
--         HAVING 0 = LOCATE(a.id, permd)
--             AND  0 = LOCATE(b.id, permd)
-- );
-- INSERT INTO perms2 (a, b, c, permd)
--     (SELECT a.a, a.b, c.id 'c'
--         , CONCAT(a.permd, c.id) permd
--         FROM perms2 a
--             CROSS JOIN digits c
--         WHERE c.id NOT IN (a.a, a.b, a.d, a.e, a.f, a.g, a.h, a.i)
-- );
-- INSERT INTO perms2 (a, b, c, d, permd)
--     (SELECT a.a, a.b, a.c, d.id 'd'
--         , CONCAT(a.permd, d.id) permd
--         FROM perms2 a
--             CROSS JOIN digits d
--         WHERE d.id NOT IN (a.a, a.b, a.c, a.e, a.f, a.g, a.h, a.i)
-- );
-- INSERT INTO perms2 (a, b, c, d, e, permd)
--     (SELECT a.a, a.b, a.c, a.d, e.id 'e'
--         , CONCAT(a.permd, e.id) permd
--         FROM perms2 a
--             CROSS JOIN digits e
--         WHERE e.id NOT IN (a.a, a.b, a.c, a.d, a.f, a.g, a.h, a.i)
-- );
-- INSERT INTO perms2 (a, b, c, d, e, f, permd)
--     (SELECT a.a, a.b, a.c, a.d, a.e, f.id 'f'
--         , CONCAT(a.permd, f.id) permd
--         FROM perms2 a
--             CROSS JOIN digits f
--         WHERE f.id NOT IN (a.a, a.b, a.c, a.d, a.e, a.g, a.h, a.i)
-- );
-- INSERT INTO perms2 (a, b, c, d, e, f, g, permd)
--     (SELECT a.a, a.b, a.c, a.d, a.e, a.f, g.id 'g'
--         , CONCAT(a.permd, g.id) permd
--         FROM perms2 a
--             CROSS JOIN digits g
--         WHERE g.id NOT IN (a.a, a.b, a.c, a.d, a.e, a.f, a.h, a.i)
-- );
-- INSERT INTO perms2 (a, b, c, d, e, f, g, h, permd)
--     (SELECT a.a, a.b, a.c, a.d, a.e, a.f, a.g, h.id 'h'
--         , CONCAT(a.permd, h.id) permd
--         FROM perms2 a
--             CROSS JOIN digits h
--         WHERE h.id NOT IN (a.a, a.b, a.c, a.d, a.e, a.f, a.g, a.i)
-- );
-- INSERT INTO perms2 (a, b, c, d, e, f, g, h, i, permd)
--     (SELECT a.a, a.b, a.c, a.d, a.e, a.f, a.g, a.h, i.id 'i'
--         , CONCAT(a.permd, i.id) permd
--         FROM perms2 a
--             CROSS JOIN digits i
--         WHERE i.id NOT IN (a.a, a.b, a.c, a.d, a.e, a.f, a.g, a.h)
-- );


SELECT 'create all_perms';
CREATE TABLE IF NOT EXISTS all_perms (
    a TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , b TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , c TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , d TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , e TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , f TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , g TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , h TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , i TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
    , permd VARCHAR(9) NOT NULL DEFAULT '0'
    , setsum TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
    , numCells TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
) ENGINE = MEMORY;

SELECT 'populate all_perms, 9 cell';
INSERT INTO all_perms (a,b,c,d,e,f,g,h,i,permd,setsum,numCells)
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
    (SELECT a,b,c,d,e,f,g,h,SUBSTR(perm,1,8) permd, (a+b+c+d+e+f+g+h) setsum, 8 numCells
        FROM perms
        GROUP BY a,b,c,d,e,f,g,h,SUBSTR(perm,1,8)
        ORDER BY setsum DESC
        , a DESC, b DESC, c DESC, d DESC
        , e DESC, f DESC, g DESC, h DESC
    )
;
SELECT 'populate all_perms, 7 cell';
INSERT INTO all_perms (a,b,c,d,e,f,g,permd,setsum,numCells)
    (SELECT a,b,c,d,e,f,g,SUBSTR(perm,1,7) permd, (a+b+c+d+e+f+g) setsum, 7 numCells
        FROM perms
        GROUP BY a,b,c,d,e,f,g,SUBSTR(perm,1,7)
        ORDER BY setsum DESC
        , a DESC, b DESC, c DESC, d DESC
        , e DESC, f DESC, g DESC
    )
;
SELECT 'populate all_perms, 6 cell';
INSERT INTO all_perms (a,b,c,d,e,f,permd,setsum,numCells)
    (SELECT a,b,c,d,e,f,SUBSTR(perm,1,6) permd, (a+b+c+d+e+f) setsum, 6 numCells
        FROM perms
        GROUP BY a,b,c,d,e,f,SUBSTR(perm,1,6)
        ORDER BY setsum DESC
        , a DESC, b DESC, c DESC, d DESC
        , e DESC, f DESC
    )
;
SELECT 'populate all_perms, 5 cell';
INSERT INTO all_perms (a,b,c,d,e,permd,setsum,numCells)
    (SELECT a,b,c,d,e,SUBSTR(perm,1,5) permd, (a+b+c+d+e) setsum, 5 numCells
        FROM perms
        GROUP BY a,b,c,d,e,SUBSTR(perm,1,5)
        ORDER BY setsum DESC
        , a DESC, b DESC, c DESC, d DESC
        , e DESC
    )
;
SELECT 'populate all_perms, 4 cell';
INSERT INTO all_perms (a,b,c,d,permd,setsum,numCells)
    (SELECT a,b,c,d,SUBSTR(perm,1,4) permd, (a+b+c+d) setsum, 4 numCells
        FROM perms
        GROUP BY a,b,c,d,SUBSTR(perm,1,4)
        ORDER BY setsum DESC, a DESC, b DESC, c DESC, d DESC
    )
;
SELECT 'populate all_perms, 3 cell';
INSERT INTO all_perms (a,b,c,permd,setsum,numCells)
    (SELECT a,b,c,SUBSTR(perm,1,3) permd, (a+b+c) setsum, 3 numCells
        FROM perms
        GROUP BY a,b,c,SUBSTR(perm,1,3)
        ORDER BY setsum DESC, a DESC, b DESC, c DESC
    )
;
SELECT 'populate all_perms, 2 cell';
INSERT INTO all_perms (a,b,permd,setsum,numCells)
    (SELECT a,b,SUBSTR(perm,1,2) permd, (a+b) setsum, 2 numCells
        FROM perms
        GROUP BY a,b,SUBSTR(perm,1,2)
        ORDER BY setsum DESC, a DESC, b DESC
    )
;
-- end good stuff

DROP FUNCTION IF EXISTS toBitmap;
SELECT 'create function toBitmap';
CREATE FUNCTION toBitmap (cellset VARCHAR(9))
    RETURNS BINARY(9)
    RETURN CAST(
            TRIM(CONCAT(
                LOCATE(1, cellset) > 0
                , LOCATE(2, cellset) > 0
                , LOCATE(3, cellset) > 0
                , LOCATE(4, cellset) > 0
                , LOCATE(5, cellset) > 0
                , LOCATE(6, cellset) > 0
                , LOCATE(7, cellset) > 0
                , LOCATE(8, cellset) > 0
                , LOCATE(9, cellset) > 0
            ))
            AS BINARY(9));


DROP FUNCTION IF EXISTS fromBitmap;
SELECT 'create function fromBitmap';
CREATE FUNCTION fromBitmap (bitmap BINARY(9))
    RETURNS VARCHAR(9)
    RETURN TRIM(CONCAT(
                IF(SUBSTR(bitmap, 1, 1) = 0, '', '1')
                , IF(SUBSTR(bitmap, 2, 1) = 0, '', '2')
                , IF(SUBSTR(bitmap, 3, 1) = 0, '', '3')
                , IF(SUBSTR(bitmap, 4, 1) = 0, '', '4')
                , IF(SUBSTR(bitmap, 5, 1) = 0, '', '5')
                , IF(SUBSTR(bitmap, 6, 1) = 0, '', '6')
                , IF(SUBSTR(bitmap, 7, 1) = 0, '', '7')
                , IF(SUBSTR(bitmap, 8, 1) = 0, '', '8')
                , IF(SUBSTR(bitmap, 9, 1) = 0, '', '9')
            ));

SELECT 'get combinations from permutations';
ALTER TABLE all_perms ADD COLUMN cellset VARCHAR(9) NOT NULL DEFAULT '000000000';
ALTER TABLE all_perms ADD COLUMN bitmap BINARY(9) NOT NULL DEFAULT 0b000000000;
UPDATE all_perms SET bitmap = toBitmap(permd);
UPDATE all_perms SET cellset = fromBitmap(bitmap);

SELECT 'add indexes to all_perms';
ALTER TABLE all_perms ADD CONSTRAINT PRIMARY KEY pk (permd);
ALTER TABLE all_perms ADD INDEX combination (cellset);
ALTER TABLE all_perms ADD INDEX bits (bitmap);
ALTER TABLE all_perms ADD INDEX ax (a);
ALTER TABLE all_perms ADD INDEX bx (b);
ALTER TABLE all_perms ADD INDEX cx (c);
ALTER TABLE all_perms ADD INDEX dx (d);
ALTER TABLE all_perms ADD INDEX ex (e);
ALTER TABLE all_perms ADD INDEX fx (f);
ALTER TABLE all_perms ADD INDEX gx (g);
ALTER TABLE all_perms ADD INDEX hx (h);
ALTER TABLE all_perms ADD INDEX ix (i);

SELECT 'create and add indexes to permperms';
DROP TABLE IF EXISTS permperms;
CREATE TABLE permperms ENGINE=InnoDB AS SELECT * FROM all_perms;
ALTER TABLE permperms ADD CONSTRAINT PRIMARY KEY pk (permd);
ALTER TABLE permperms ADD INDEX combination (cellset);
ALTER TABLE permperms ADD INDEX bits (bitmap);
ALTER TABLE permperms ADD INDEX ax (a);
ALTER TABLE permperms ADD INDEX bx (b);
ALTER TABLE permperms ADD INDEX cx (c);
ALTER TABLE permperms ADD INDEX dx (d);
ALTER TABLE permperms ADD INDEX ex (e);
ALTER TABLE permperms ADD INDEX fx (f);
ALTER TABLE permperms ADD INDEX gx (g);
ALTER TABLE permperms ADD INDEX hx (h);
ALTER TABLE permperms ADD INDEX ix (i);

SELECT 'create and add indexes to puzzle_perms';
DROP TABLE IF EXISTS puzzle_perms;
CREATE TABLE puzzle_perms ENGINE=MEMORY AS SELECT * FROM all_perms;
ALTER TABLE puzzle_perms ADD CONSTRAINT PRIMARY KEY pk (permd);
ALTER TABLE puzzle_perms ADD INDEX combination (cellset);
ALTER TABLE puzzle_perms ADD INDEX bits (bitmap);
ALTER TABLE puzzle_perms ADD INDEX ax (a);
ALTER TABLE puzzle_perms ADD INDEX bx (b);
ALTER TABLE puzzle_perms ADD INDEX cx (c);
ALTER TABLE puzzle_perms ADD INDEX dx (d);
ALTER TABLE puzzle_perms ADD INDEX ex (e);
ALTER TABLE puzzle_perms ADD INDEX fx (f);
ALTER TABLE puzzle_perms ADD INDEX gx (g);
ALTER TABLE puzzle_perms ADD INDEX hx (h);
ALTER TABLE puzzle_perms ADD INDEX ix (i);

-- DROP TABLE all_sets;
-- DROP TABLE perms;

SET FOREIGN_KEY_CHECKS = 1;
