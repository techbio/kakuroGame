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
