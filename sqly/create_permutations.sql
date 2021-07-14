USE kakuro;
-- DROP TABLE IF EXISTS perms;
-- DROP TABLE IF EXISTS digits;
-- SELECT 'create digits';
-- CREATE TABLE digits (
--     id TINYINT(1) NOT NULL AUTO_INCREMENT PRIMARY KEY
--     , bitmap BINARY(9) DEFAULT 0b000000000
-- ) ENGINE = MEMORY;

-- SELECT 'populate digits';
-- INSERT INTO digits (id) VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9);
-- UPDATE digits SET bitmap = POW(2, id - 1);

SELECT 'create perms table';
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
    , perm INT NOT NULL DEFAULT 0
    , cellset VARCHAR(9) NOT NULL DEFAULT '000000000'
    , bitmap BINARY(9) NOT NULL DEFAULT 0b000000000
) ENGINE = InnoDB;

SELECT 'populate perms (len 2)';
INSERT INTO perms (a, b, perm)
    (SELECT a.id 'a', b.id 'b'
        , CONVERT(
            CONCAT(a.id, b.id)
            , UNSIGNED INTEGER
        ) perm
        FROM digits b
            CROSS JOIN digits a
        WHERE b.id != a.id
    )
;
SELECT 'populate perms (len 3)';
INSERT INTO perms (a, b, c, perm)
    (SELECT p.a 'a', p.b 'b', d.id 'c'
        , CONVERT(
            CONCAT(d.id, p.perm)
            , UNSIGNED INTEGER
        ) perm
        FROM digits d
            CROSS JOIN perms p
        WHERE
            d.id NOT IN (p.a, p.b)
    )
;
SELECT 'populate perms (len 4)';
INSERT INTO perms (a, b, c, d, perm)
    (SELECT p.a 'a', p.b 'b', p.c 'c', d.id 'd'
        , CONVERT(
            CONCAT(d.id, p.perm)
            , UNSIGNED INTEGER
        ) perm
        FROM digits d
            CROSS JOIN perms p
        WHERE
            p.perm > POW(10, 2)
            AND d.id NOT IN (p.a, p.b, p.c)
    )
;

SELECT 'populate perms (len 5)';
INSERT INTO perms (a, b, c, d, e, perm)
    (SELECT p.a 'a', p.b 'b', p.c 'c', p.d 'd', d.id 'e'
        , CONVERT(
            CONCAT(d.id, p.perm)
            , UNSIGNED INTEGER
        ) perm
        FROM digits d
            CROSS JOIN perms p
        WHERE
            p.perm > POW(10, 3)
            AND d.id NOT IN (p.a, p.b, p.c, p.d)
    )
;

SELECT 'populate perms (len 6)';
INSERT INTO perms (a, b, c, d, e, f, perm)
    (SELECT p.a 'a', p.b 'b', p.c 'c', p.d 'd', p.e 'e', d.id 'f'
        , CONVERT(
            CONCAT(d.id, p.perm)
            , UNSIGNED INTEGER
        ) perm
        FROM digits d
            CROSS JOIN perms p
        WHERE
            p.perm > POW(10, 4)
            AND d.id NOT IN (p.a, p.b, p.c, p.d, p.e)
    )
;

SELECT 'populate perms (len 7)';
INSERT INTO perms (a, b, c, d, e, f, g, perm)
    (SELECT p.a 'a', p.b 'b', p.c 'c', p.d 'd', p.e 'e', p.f 'f', d.id 'g'
        , CONVERT(
            CONCAT(d.id, p.perm)
            , UNSIGNED INTEGER
        ) perm
        FROM digits d
            CROSS JOIN perms p
        WHERE
            p.perm > POW(10, 5)
            AND d.id NOT IN (p.a, p.b, p.c, p.d, p.e, p.f)
    )
;
SELECT 'populate perms (len 8)';
INSERT INTO perms (a, b, c, d, e, f, g, h, perm)
    (SELECT p.a 'a', p.b 'b', p.c 'c', p.d 'd', p.e 'e', p.f 'f', p.g 'g', d.id 'h'
        , CONVERT(
            CONCAT(d.id, p.perm)
            , UNSIGNED INTEGER
        ) perm
        FROM digits d
            CROSS JOIN perms p
        WHERE
            p.perm > POW(10, 6)
            AND d.id NOT IN (p.a, p.b, p.c, p.d, p.e, p.f, p.g)
    )
;
SELECT 'populate perms (len 9)';
INSERT INTO perms (a, b, c, d, e, f, g, h, i, perm)
    (SELECT p.a 'a', p.b 'b', p.c 'c', p.d 'd', p.e 'e', p.f 'f', p.g 'g', p.h 'h', d.id 'i'
        , CONVERT(
            CONCAT(d.id, p.perm)
            , UNSIGNED INTEGER
        ) perm
        FROM digits d
            CROSS JOIN perms p
        WHERE
            p.perm > POW(10, 7)
            AND d.id NOT IN (p.a, p.b, p.c, p.d, p.e, p.f, p.g, p.h)
    )
;



-- CREATE TABLE IF NOT EXISTS perms (
--     a TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , b TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , c TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , d TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , e TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , f TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , g TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , h TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , i TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , perm INT NOT NULL DEFAULT 0
-- ) ENGINE = MEMORY;

-- SELECT 'populate perms (cross product)';
-- INSERT INTO perms
--     (SELECT a.id 'a', b.id 'b', c.id 'c'
--         , d.id 'd', e.id 'e', f.id 'f'
--         , g.id 'g', h.id 'h', i.id 'i'
--         , CONVERT(
--             CONCAT(a.id, b.id, c.id, d.id, e.id, f.id, g.id, h.id, i.id)
--             , UNSIGNED INTEGER
--         ) perm
--         FROM digits a
--             CROSS JOIN digits b
--             CROSS JOIN digits c
--             CROSS JOIN digits d
--             CROSS JOIN digits e
--             CROSS JOIN digits f
--             CROSS JOIN digits g
--             CROSS JOIN digits h
--             CROSS JOIN digits i
--         WHERE a.id NOT IN (b.id,c.id,d.id,e.id,f.id,g.id,h.id,i.id)
--             AND b.id NOT IN (a.id,c.id,d.id,e.id,f.id,g.id,h.id,i.id)
--             AND c.id NOT IN (a.id,b.id,d.id,e.id,f.id,g.id,h.id,i.id)
--             AND d.id NOT IN (a.id,b.id,c.id,e.id,f.id,g.id,h.id,i.id)
--             AND e.id NOT IN (a.id,b.id,c.id,d.id,f.id,g.id,h.id,i.id)
--             AND f.id NOT IN (a.id,b.id,c.id,d.id,e.id,g.id,h.id,i.id)
--             AND g.id NOT IN (a.id,b.id,c.id,d.id,e.id,f.id,h.id,i.id)
--             AND h.id NOT IN (a.id,b.id,c.id,d.id,e.id,f.id,g.id,i.id)
--             AND i.id NOT IN (a.id,b.id,c.id,d.id,e.id,f.id,g.id,h.id)
-- );

-- SELECT 'populate perms (len 8)';
-- INSERT INTO perms a, b, c, d, e, f, g, h, perm
--     (SELECT a, b, c, d, e, f, g, h
--         , castVarcharToInt(
--             CONCAT(a, b, c, d, e, f, g, h)
--          ) perm
--         FROM perms WHERE LENGTH(perm) = 9
--         GROUP BY a, b, c, d, e, f, g, h, SUBSTR(perm, 8)
--     )
-- ;

-- SELECT 'populate perms (len 7)';
-- INSERT INTO perms a, b, c, d, e, f, g, perm
--     (SELECT a, b, c, d, e, f, g
--         , castVarcharToInt(
--             CONCAT(a, b, c, d, e, f, g)
--          ) perm
--         FROM perms WHERE LENGTH(perm) = 8
--         GROUP BY a, b, c, d, e, f, g, SUBSTR(perm, 7)
--     )
-- ;

-- SELECT 'populate perms (len 6)';
-- INSERT INTO perms a, b, c, d, e, f, perm
--     (SELECT a, b, c, d, e, f
--         , castVarcharToInt(
--             CONCAT(a, b, c, d, e, f)
--          ) perm
--         FROM perms WHERE LENGTH(perm) = 7
--         GROUP BY a, b, c, d, e, f, SUBSTR(perm, 6)
--     )
-- ;

-- SELECT 'populate perms (len 5)';
-- INSERT INTO perms a, b, c, d, e, perm
--     (SELECT a, b, c, d, e
--         , castVarcharToInt(
--             CONCAT(a, b, c, d, e)
--          ) perm
--         FROM perms WHERE LENGTH(perm) = 6
--         GROUP BY a, b, c, d, e, SUBSTR(perm, 5)
--     )
-- ;

-- SELECT 'populate perms (len 4)';
-- INSERT INTO perms a, b, c, d, perm
--     (SELECT a, b, c, d
--         , castVarcharToInt(
--             CONCAT(a, b, c, d)
--          ) perm
--         FROM perms WHERE LENGTH(perm) = 5
--         GROUP BY a, b, c, d, SUBSTR(perm, 4)
--     )
-- ;

-- SELECT 'populate perms (len 3)';
-- INSERT INTO perms a, b, c, perm
--     (SELECT a, b, c
--         , castVarcharToInt(
--             CONCAT(a, b, c)
--          ) perm
--         FROM perms WHERE LENGTH(perm) = 4
--         GROUP BY a, b, c, SUBSTR(perm, 3)
--     )
-- ;

-- SELECT 'populate perms (len 2)';
-- INSERT INTO perms a, b, perm
--     (SELECT a, b
--         , castVarcharToInt(
--             CONCAT(a, b)
--          ) perm
--         FROM perms WHERE LENGTH(perm) = 3
--         GROUP BY a, b, c, SUBSTR(perm, 2)
--     )
-- ;


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

-- SELECT 'create permperms';
-- CREATE TABLE IF NOT EXISTS permperms (
--     a TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , b TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , c TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , d TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , e TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , f TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , g TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , h TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     , i TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
--     /*, permd VARCHAR(9) NOT NULL DEFAULT '0'*/
--     , permd INT UNSIGNED NOT NULL DEFAULT 0
--     , setsum TINYINT(2) UNSIGNED NOT NULL DEFAULT 0
--     , numCells TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
-- ) ENGINE = InnoDB;

-- SELECT 'populate permperms, 9 cell';
-- INSERT INTO permperms (a,b,c,d,e,f,g,h,i,permd,setsum,numCells)
--     (SELECT a,b,c,d,e,f,g,h,i, perm permd, sumPermutation(perm) setsum, 9 numCells
--         FROM perms
--         GROUP BY a,b,c,d,e,f,g,h,i,perm
--         HAVING setsum=45
--         ORDER BY setsum DESC
--             , a DESC, b DESC, c DESC, d DESC
--             , e DESC, f DESC, g DESC, h DESC, i DESC
--      )
-- ;
-- SELECT 'populate permperms, 8 cell';
-- INSERT INTO permperms (a,b,c,d,e,f,g,h,permd,setsum,numCells)
--     (SELECT a,b,c,d,e,f,g,h,castVarcharLenToInt(perm, 8) permd, sumPermutation(SUBSTR(perm,1,8)) setsum, 8 numCells
--         FROM perms
--         GROUP BY a,b,c,d,e,f,g,h,SUBSTR(perm,1,8)
--         ORDER BY setsum DESC
--         , a DESC, b DESC, c DESC, d DESC
--         , e DESC, f DESC, g DESC, h DESC
--     )
-- ;
-- SELECT 'populate permperms, 7 cell';
-- INSERT INTO permperms (a,b,c,d,e,f,g,permd,setsum,numCells)
--     (SELECT a,b,c,d,e,f,g,castVarcharLenToInt(perm, 7) permd, sumPermutation(SUBSTR(perm,1,7)) setsum, 7 numCells
--         FROM perms
--         GROUP BY a,b,c,d,e,f,g,SUBSTR(perm,1,7)
--         ORDER BY setsum DESC
--             , a DESC, b DESC, c DESC, d DESC
--         , e DESC, f DESC, g DESC
--     )
-- ;
-- SELECT 'populate permperms, 6 cell';
-- INSERT INTO permperms (a,b,c,d,e,f,permd,setsum,numCells)
--     (SELECT a,b,c,d,e,f,castVarcharLenToInt(perm, 6) permd, sumPermutation(SUBSTR(perm,1,6)) setsum, 6 numCells
--         FROM perms
--         GROUP BY a,b,c,d,e,f,SUBSTR(perm,1,6)
--         ORDER BY setsum DESC
--             , a DESC, b DESC, c DESC, d DESC
--         , e DESC, f DESC
--     )
-- ;
-- SELECT 'populate permperms, 5 cell';
-- INSERT INTO permperms (a,b,c,d,e,permd,setsum,numCells)
--     (SELECT a,b,c,d,e,castVarcharLenToInt(perm, 5) permd, sumPermutation(SUBSTR(perm,1,5)) setsum, 5 numCells
--         FROM perms
--         GROUP BY a,b,c,d,e,SUBSTR(perm,1,5)
--         ORDER BY setsum DESC
--         , a DESC, b DESC, c DESC, d DESC, e DESC
--     )
-- ;
-- SELECT 'populate permperms, 4 cell';
-- INSERT INTO permperms (a,b,c,d,permd,setsum,numCells)
--     (SELECT a,b,c,d,castVarcharLenToInt(perm, 4) permd, sumPermutation(SUBSTR(perm,1,4)) setsum, 4 numCells
--         FROM perms
--         GROUP BY a,b,c,d,SUBSTR(perm,1,4)
--         ORDER BY setsum DESC
--            , a DESC, b DESC, c DESC, d DESC
--     )
-- ;
-- SELECT 'populate permperms, 3 cell';
-- INSERT INTO permperms (a,b,c,permd,setsum,numCells)
--     (SELECT a,b,c,castVarcharLenToInt(perm, 3) permd, sumPermutation(SUBSTR(perm,1,3)) setsum, 3 numCells
--         FROM perms
--         GROUP BY a,b,c,SUBSTR(perm,1,3)
--         ORDER BY setsum DESC
--             , a DESC, b DESC, c DESC
--     )
-- ;
-- SELECT 'populate permperms, 2 cell';
-- INSERT INTO permperms (a,b,permd,setsum,numCells)
--     (SELECT a,b,castVarcharLenToInt(perm, 2) permd, sumPermutation(SUBSTR(perm,1,2)), 2 numCells
--         FROM perms
--         GROUP BY a,b,SUBSTR(SUBSTR(perm,1,2),1,2)
--         ORDER BY setsum DESC
--             , a DESC, b DESC
--     )
-- ;
