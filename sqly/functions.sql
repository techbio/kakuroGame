DROP FUNCTION IF EXISTS castVarcharToInt;
DROP FUNCTION IF EXISTS castVarcharLenToInt;
DROP FUNCTION IF EXISTS sumPermutation;
DROP FUNCTION IF EXISTS sumPermutationInt;
DROP FUNCTION IF EXISTS fromBitmap;
DROP FUNCTION IF EXISTS toBitmap;

DELIMITER //

SELECT 'create function castVarcharToInt'//

CREATE FUNCTION castVarcharToInt (perm VARCHAR(9))
    RETURNS INT DETERMINISTIC
        RETURN CONVERT(TRIM(perm), UNSIGNED INTEGER);
//

SELECT 'create function castVarcharLenToInt';
CREATE FUNCTION castVarcharLenToInt (perm VARCHAR(9), len TINYINT(1))
    RETURNS INT DETERMINISTIC
        RETURN
            /* if no len, set default len to max length 9 */
            CONVERT(SUBSTR(TRIM(perm), 1, IF ((len >= 1 AND len <= 9), len, 9) ), UNSIGNED INTEGER)
            ;
//

SELECT 'create function sumPermutation'//
CREATE FUNCTION sumPermutation (perm VARCHAR(9))
    RETURNS TINYINT(2) DETERMINISTIC
        RETURN
            CAST(SUBSTR(perm, 1, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 2, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 3, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 4, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 5, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 6, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 7, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 8, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 9, 1) AS UNSIGNED)
            ;
//

SELECT 'create function sumPermutationInt'//
CREATE FUNCTION sumPermutationInt (permInt INT)
    RETURNS TINYINT(2) DETERMINISTIC
    BEGIN
        DECLARE perm CHAR(9) DEFAULT '0';
        SET perm = TRIM(CAST(permInt AS CHAR(9)));
        RETURN
            CAST(SUBSTR(perm, 1, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 2, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 3, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 4, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 5, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 6, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 7, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 8, 1) AS UNSIGNED)
            + CAST(SUBSTR(perm, 9, 1) AS UNSIGNED)
            ;
    END
//

SELECT 'create function toBitmap'//
CREATE FUNCTION toBitmap (cellset VARCHAR(9))
    RETURNS BINARY(9) DETERMINISTIC
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
                AS BINARY(9)
        );
//

SELECT 'create function fromBitmap'//
CREATE FUNCTION fromBitmap (bitmap BINARY(9))
    RETURNS VARCHAR(9) DETERMINISTIC
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
//

DELIMITER ;

