-- built from all_sets.csv data
USE kakuro;
SELECT 'create combinations';
DROP TABLE IF EXISTS combinations;
CREATE TABLE IF NOT EXISTS combinations (
    cellset VARCHAR(9)
    , setInt INT(9) UNSIGNED NOT NULL DEFAULT 0
    , setBin BINARY(9) NOT NULL DEFAULT b'000000000'
    , numCells TINYINT(1) NOT NULL DEFAULT 0
    , setsum TINYINT(2) NOT NULL DEFAULT 0
    , bitmap BINARY(9) NOT NULL DEFAULT b'000000000'
) ENGINE = MEMORY;

INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 3, cellset FROM (SELECT NULL cellset UNION SELECT '12') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 4, cellset FROM (SELECT NULL cellset UNION SELECT '13') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 5, cellset FROM (SELECT NULL cellset UNION SELECT '14' UNION SELECT '23') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 6, cellset FROM (SELECT NULL cellset UNION SELECT '15' UNION SELECT '24') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 7, cellset FROM (SELECT NULL cellset UNION SELECT '16' UNION SELECT '25' UNION SELECT '34') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 8, cellset FROM (SELECT NULL cellset UNION SELECT '17' UNION SELECT '26' UNION SELECT '35') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 9, cellset FROM (SELECT NULL cellset UNION SELECT '18' UNION SELECT '27' UNION SELECT '36' UNION SELECT '45') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 10, cellset FROM (SELECT NULL cellset UNION SELECT '19' UNION SELECT '28' UNION SELECT '37' UNION SELECT '46') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 11, cellset FROM (SELECT NULL cellset UNION SELECT '29' UNION SELECT '38' UNION SELECT '47' UNION SELECT '56') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 12, cellset FROM (SELECT NULL cellset UNION SELECT '39' UNION SELECT '48' UNION SELECT '57') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 13, cellset FROM (SELECT NULL cellset UNION SELECT '49' UNION SELECT '58' UNION SELECT '67') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 14, cellset FROM (SELECT NULL cellset UNION SELECT '59' UNION SELECT '68') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 15, cellset FROM (SELECT NULL cellset UNION SELECT '69' UNION SELECT '78') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 16, cellset FROM (SELECT NULL cellset UNION SELECT '79') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 2, 17, cellset FROM (SELECT NULL cellset UNION SELECT '89') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 6, cellset FROM (SELECT NULL cellset UNION SELECT '123') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 7, cellset FROM (SELECT NULL cellset UNION SELECT '124') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 8, cellset FROM (SELECT NULL cellset UNION SELECT '125' UNION SELECT '134') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 9, cellset FROM (SELECT NULL cellset UNION SELECT '126' UNION SELECT '135' UNION SELECT '234') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 10, cellset FROM (SELECT NULL cellset UNION SELECT '127' UNION SELECT '136' UNION SELECT '145' UNION SELECT '235') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 11, cellset FROM (SELECT NULL cellset UNION SELECT '128' UNION SELECT '137' UNION SELECT '146' UNION SELECT '236' UNION SELECT '245') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 12, cellset FROM (SELECT NULL cellset UNION SELECT '129' UNION SELECT '138' UNION SELECT '147' UNION SELECT '156' UNION SELECT '237' UNION SELECT '246' UNION SELECT '345') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 13, cellset FROM (SELECT NULL cellset UNION SELECT '139' UNION SELECT '148' UNION SELECT '157' UNION SELECT '238' UNION SELECT '247' UNION SELECT '256' UNION SELECT '346') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 14, cellset FROM (SELECT NULL cellset UNION SELECT '149' UNION SELECT '158' UNION SELECT '167' UNION SELECT '239' UNION SELECT '248' UNION SELECT '257' UNION SELECT '347' UNION SELECT '356') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 15, cellset FROM (SELECT NULL cellset UNION SELECT '159' UNION SELECT '168' UNION SELECT '249' UNION SELECT '258' UNION SELECT '267' UNION SELECT '348' UNION SELECT '357' UNION SELECT '456') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 16, cellset FROM (SELECT NULL cellset UNION SELECT '169' UNION SELECT '178' UNION SELECT '259' UNION SELECT '268' UNION SELECT '349' UNION SELECT '358' UNION SELECT '367' UNION SELECT '457') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 17, cellset FROM (SELECT NULL cellset UNION SELECT '179' UNION SELECT '269' UNION SELECT '278' UNION SELECT '359' UNION SELECT '368' UNION SELECT '458' UNION SELECT '467') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 18, cellset FROM (SELECT NULL cellset UNION SELECT '189' UNION SELECT '279' UNION SELECT '369' UNION SELECT '378' UNION SELECT '459' UNION SELECT '468' UNION SELECT '567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 19, cellset FROM (SELECT NULL cellset UNION SELECT '289' UNION SELECT '379' UNION SELECT '469' UNION SELECT '478' UNION SELECT '568') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 20, cellset FROM (SELECT NULL cellset UNION SELECT '389' UNION SELECT '479' UNION SELECT '569' UNION SELECT '578') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 21, cellset FROM (SELECT NULL cellset UNION SELECT '489' UNION SELECT '579' UNION SELECT '678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 22, cellset FROM (SELECT NULL cellset UNION SELECT '589' UNION SELECT '679') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 23, cellset FROM (SELECT NULL cellset UNION SELECT '689') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 3, 24, cellset FROM (SELECT NULL cellset UNION SELECT '789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 10, cellset FROM (SELECT NULL cellset UNION SELECT '1234') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 11, cellset FROM (SELECT NULL cellset UNION SELECT '1235') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 12, cellset FROM (SELECT NULL cellset UNION SELECT '1236' UNION SELECT '1245') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 13, cellset FROM (SELECT NULL cellset UNION SELECT '1237' UNION SELECT '1246' UNION SELECT '1345') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 14, cellset FROM (SELECT NULL cellset UNION SELECT '1238' UNION SELECT '1247' UNION SELECT '1256' UNION SELECT '1346' UNION SELECT '2345') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 15, cellset FROM (SELECT NULL cellset UNION SELECT '1239' UNION SELECT '1248' UNION SELECT '1257' UNION SELECT '1347' UNION SELECT '1356' UNION SELECT '2346') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 16, cellset FROM (SELECT NULL cellset UNION SELECT '1249' UNION SELECT '1258' UNION SELECT '1267' UNION SELECT '1348' UNION SELECT '1357' UNION SELECT '1456' UNION SELECT '2347' UNION SELECT '2356') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 17, cellset FROM (SELECT NULL cellset UNION SELECT '1259' UNION SELECT '1268' UNION SELECT '1349' UNION SELECT '1358' UNION SELECT '1367' UNION SELECT '1457' UNION SELECT '2348' UNION SELECT '2357' UNION SELECT '2456') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 18, cellset FROM (SELECT NULL cellset UNION SELECT '1269' UNION SELECT '1278' UNION SELECT '1359' UNION SELECT '1368' UNION SELECT '1458' UNION SELECT '1467' UNION SELECT '2349' UNION SELECT '2358' UNION SELECT '2367' UNION SELECT '2457' UNION SELECT '3456') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 19, cellset FROM (SELECT NULL cellset UNION SELECT '1279' UNION SELECT '1369' UNION SELECT '1378' UNION SELECT '1459' UNION SELECT '1468' UNION SELECT '1567' UNION SELECT '2359' UNION SELECT '2368' UNION SELECT '2458' UNION SELECT '2467' UNION SELECT '3457') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 20, cellset FROM (SELECT NULL cellset UNION SELECT '1289' UNION SELECT '1379' UNION SELECT '1469' UNION SELECT '1478' UNION SELECT '1568' UNION SELECT '2369' UNION SELECT '2378' UNION SELECT '2459' UNION SELECT '2468' UNION SELECT '2567' UNION SELECT '3458' UNION SELECT '3467') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 21, cellset FROM (SELECT NULL cellset UNION SELECT '1389' UNION SELECT '1479' UNION SELECT '1569' UNION SELECT '1578' UNION SELECT '2379' UNION SELECT '2469' UNION SELECT '2478' UNION SELECT '2568' UNION SELECT '3459' UNION SELECT '3468' UNION SELECT '3567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 22, cellset FROM (SELECT NULL cellset UNION SELECT '1489' UNION SELECT '1579' UNION SELECT '1678' UNION SELECT '2389' UNION SELECT '2479' UNION SELECT '2569' UNION SELECT '2578' UNION SELECT '3469' UNION SELECT '3478' UNION SELECT '3568' UNION SELECT '4567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 23, cellset FROM (SELECT NULL cellset UNION SELECT '1589' UNION SELECT '1679' UNION SELECT '2489' UNION SELECT '2579' UNION SELECT '2678' UNION SELECT '3479' UNION SELECT '3569' UNION SELECT '3578' UNION SELECT '4568') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 24, cellset FROM (SELECT NULL cellset UNION SELECT '1689' UNION SELECT '2589' UNION SELECT '2679' UNION SELECT '3489' UNION SELECT '3579' UNION SELECT '3678' UNION SELECT '4569' UNION SELECT '4578') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 25, cellset FROM (SELECT NULL cellset UNION SELECT '1789' UNION SELECT '2689' UNION SELECT '3589' UNION SELECT '3679' UNION SELECT '4579' UNION SELECT '4678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 26, cellset FROM (SELECT NULL cellset UNION SELECT '2789' UNION SELECT '3689' UNION SELECT '4589' UNION SELECT '4679' UNION SELECT '5678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 27, cellset FROM (SELECT NULL cellset UNION SELECT '3789' UNION SELECT '4689' UNION SELECT '5679') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 28, cellset FROM (SELECT NULL cellset UNION SELECT '4789' UNION SELECT '5689') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 29, cellset FROM (SELECT NULL cellset UNION SELECT '5789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 4, 30, cellset FROM (SELECT NULL cellset UNION SELECT '6789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 15, cellset FROM (SELECT NULL cellset UNION SELECT '12345') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 16, cellset FROM (SELECT NULL cellset UNION SELECT '12346') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 17, cellset FROM (SELECT NULL cellset UNION SELECT '12347' UNION SELECT '12356') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 18, cellset FROM (SELECT NULL cellset UNION SELECT '12348' UNION SELECT '12357' UNION SELECT '12456') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 19, cellset FROM (SELECT NULL cellset UNION SELECT '12349' UNION SELECT '12358' UNION SELECT '12367' UNION SELECT '12457' UNION SELECT '13456') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 20, cellset FROM (SELECT NULL cellset UNION SELECT '12359' UNION SELECT '12368' UNION SELECT '12458' UNION SELECT '12467' UNION SELECT '13457' UNION SELECT '23456') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 21, cellset FROM (SELECT NULL cellset UNION SELECT '12369' UNION SELECT '12378' UNION SELECT '12459' UNION SELECT '12468' UNION SELECT '12567' UNION SELECT '13458' UNION SELECT '13467' UNION SELECT '23457') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 22, cellset FROM (SELECT NULL cellset UNION SELECT '12379' UNION SELECT '12469' UNION SELECT '12478' UNION SELECT '12568' UNION SELECT '13459' UNION SELECT '13468' UNION SELECT '13567' UNION SELECT '23458' UNION SELECT '23467') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 23, cellset FROM (SELECT NULL cellset UNION SELECT '12389' UNION SELECT '12479' UNION SELECT '12569' UNION SELECT '12578' UNION SELECT '13469' UNION SELECT '13478' UNION SELECT '13568' UNION SELECT '14567' UNION SELECT '23459' UNION SELECT '23468' UNION SELECT '23567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 24, cellset FROM (SELECT NULL cellset UNION SELECT '12489' UNION SELECT '12579' UNION SELECT '12678' UNION SELECT '13479' UNION SELECT '13569' UNION SELECT '13578' UNION SELECT '14568' UNION SELECT '23469' UNION SELECT '23478' UNION SELECT '23568' UNION SELECT '24567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 25, cellset FROM (SELECT NULL cellset UNION SELECT '12589' UNION SELECT '12679' UNION SELECT '13489' UNION SELECT '13579' UNION SELECT '13678' UNION SELECT '14569' UNION SELECT '14578' UNION SELECT '23479' UNION SELECT '23569' UNION SELECT '23578' UNION SELECT '24568' UNION SELECT '34567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 26, cellset FROM (SELECT NULL cellset UNION SELECT '12689' UNION SELECT '13589' UNION SELECT '13679' UNION SELECT '14579' UNION SELECT '14678' UNION SELECT '23489' UNION SELECT '23579' UNION SELECT '23678' UNION SELECT '24569' UNION SELECT '24578' UNION SELECT '34568') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 27, cellset FROM (SELECT NULL cellset UNION SELECT '12789' UNION SELECT '13689' UNION SELECT '14589' UNION SELECT '14679' UNION SELECT '15678' UNION SELECT '23589' UNION SELECT '23679' UNION SELECT '24579' UNION SELECT '24678' UNION SELECT '34569' UNION SELECT '34578') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 28, cellset FROM (SELECT NULL cellset UNION SELECT '13789' UNION SELECT '14689' UNION SELECT '15679' UNION SELECT '23689' UNION SELECT '24589' UNION SELECT '24679' UNION SELECT '25678' UNION SELECT '34579' UNION SELECT '34678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 29, cellset FROM (SELECT NULL cellset UNION SELECT '14789' UNION SELECT '15689' UNION SELECT '23789' UNION SELECT '24689' UNION SELECT '25679' UNION SELECT '34589' UNION SELECT '34679' UNION SELECT '35678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 30, cellset FROM (SELECT NULL cellset UNION SELECT '15789' UNION SELECT '24789' UNION SELECT '25689' UNION SELECT '34689' UNION SELECT '35679' UNION SELECT '45678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 31, cellset FROM (SELECT NULL cellset UNION SELECT '16789' UNION SELECT '25789' UNION SELECT '34789' UNION SELECT '35689' UNION SELECT '45679') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 32, cellset FROM (SELECT NULL cellset UNION SELECT '26789' UNION SELECT '35789' UNION SELECT '45689') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 33, cellset FROM (SELECT NULL cellset UNION SELECT '36789' UNION SELECT '45789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 34, cellset FROM (SELECT NULL cellset UNION SELECT '46789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 5, 35, cellset FROM (SELECT NULL cellset UNION SELECT '56789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 21, cellset FROM (SELECT NULL cellset UNION SELECT '123456') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 22, cellset FROM (SELECT NULL cellset UNION SELECT '123457') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 23, cellset FROM (SELECT NULL cellset UNION SELECT '123458' UNION SELECT '123467') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 24, cellset FROM (SELECT NULL cellset UNION SELECT '123459' UNION SELECT '123468' UNION SELECT '123567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 25, cellset FROM (SELECT NULL cellset UNION SELECT '123469' UNION SELECT '123478' UNION SELECT '123568' UNION SELECT '124567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 26, cellset FROM (SELECT NULL cellset UNION SELECT '123479' UNION SELECT '123569' UNION SELECT '123578' UNION SELECT '124568' UNION SELECT '134567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 27, cellset FROM (SELECT NULL cellset UNION SELECT '123489' UNION SELECT '123579' UNION SELECT '123678' UNION SELECT '124569' UNION SELECT '124578' UNION SELECT '134568' UNION SELECT '234567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 28, cellset FROM (SELECT NULL cellset UNION SELECT '123589' UNION SELECT '123679' UNION SELECT '124579' UNION SELECT '124678' UNION SELECT '134569' UNION SELECT '134578' UNION SELECT '234568') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 29, cellset FROM (SELECT NULL cellset UNION SELECT '123689' UNION SELECT '124589' UNION SELECT '124679' UNION SELECT '125678' UNION SELECT '134579' UNION SELECT '134678' UNION SELECT '234569' UNION SELECT '234578') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 30, cellset FROM (SELECT NULL cellset UNION SELECT '123789' UNION SELECT '124689' UNION SELECT '125679' UNION SELECT '134589' UNION SELECT '134679' UNION SELECT '135678' UNION SELECT '234579' UNION SELECT '234678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 31, cellset FROM (SELECT NULL cellset UNION SELECT '124789' UNION SELECT '125689' UNION SELECT '134689' UNION SELECT '135679' UNION SELECT '145678' UNION SELECT '234589' UNION SELECT '234679' UNION SELECT '235678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 32, cellset FROM (SELECT NULL cellset UNION SELECT '125789' UNION SELECT '134789' UNION SELECT '135689' UNION SELECT '145679' UNION SELECT '234689' UNION SELECT '235679' UNION SELECT '245678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 33, cellset FROM (SELECT NULL cellset UNION SELECT '126789' UNION SELECT '135789' UNION SELECT '145689' UNION SELECT '234789' UNION SELECT '235689' UNION SELECT '245679' UNION SELECT '345678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 34, cellset FROM (SELECT NULL cellset UNION SELECT '136789' UNION SELECT '145789' UNION SELECT '235789' UNION SELECT '245689' UNION SELECT '345679') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 35, cellset FROM (SELECT NULL cellset UNION SELECT '146789' UNION SELECT '236789' UNION SELECT '245789' UNION SELECT '345689') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 36, cellset FROM (SELECT NULL cellset UNION SELECT '156789' UNION SELECT '246789' UNION SELECT '345789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 37, cellset FROM (SELECT NULL cellset UNION SELECT '256789' UNION SELECT '346789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 38, cellset FROM (SELECT NULL cellset UNION SELECT '356789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 6, 39, cellset FROM (SELECT NULL cellset UNION SELECT '456789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 28, cellset FROM (SELECT NULL cellset UNION SELECT '1234567') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 29, cellset FROM (SELECT NULL cellset UNION SELECT '1234568') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 30, cellset FROM (SELECT NULL cellset UNION SELECT '1234569' UNION SELECT '1234578') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 31, cellset FROM (SELECT NULL cellset UNION SELECT '1234579' UNION SELECT '1234678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 32, cellset FROM (SELECT NULL cellset UNION SELECT '1234589' UNION SELECT '1234679' UNION SELECT '1235678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 33, cellset FROM (SELECT NULL cellset UNION SELECT '1234689' UNION SELECT '1235679' UNION SELECT '1245678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 34, cellset FROM (SELECT NULL cellset UNION SELECT '1234789' UNION SELECT '1235689' UNION SELECT '1245679' UNION SELECT '1345678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 35, cellset FROM (SELECT NULL cellset UNION SELECT '1235789' UNION SELECT '1245689' UNION SELECT '1345679' UNION SELECT '2345678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 36, cellset FROM (SELECT NULL cellset UNION SELECT '1236789' UNION SELECT '1245789' UNION SELECT '1345689' UNION SELECT '2345679') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 37, cellset FROM (SELECT NULL cellset UNION SELECT '1246789' UNION SELECT '1345789' UNION SELECT '2345689') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 38, cellset FROM (SELECT NULL cellset UNION SELECT '1256789' UNION SELECT '1346789' UNION SELECT '2345789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 39, cellset FROM (SELECT NULL cellset UNION SELECT '1356789' UNION SELECT '2346789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 40, cellset FROM (SELECT NULL cellset UNION SELECT '1456789' UNION SELECT '2356789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 41, cellset FROM (SELECT NULL cellset UNION SELECT '2456789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 7, 42, cellset FROM (SELECT NULL cellset UNION SELECT '3456789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 8, 36, cellset FROM (SELECT NULL cellset UNION SELECT '12345678') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 8, 37, cellset FROM (SELECT NULL cellset UNION SELECT '12345679') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 8, 38, cellset FROM (SELECT NULL cellset UNION SELECT '12345689') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 8, 39, cellset FROM (SELECT NULL cellset UNION SELECT '12345789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 8, 40, cellset FROM (SELECT NULL cellset UNION SELECT '12346789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 8, 41, cellset FROM (SELECT NULL cellset UNION SELECT '12356789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 8, 42, cellset FROM (SELECT NULL cellset UNION SELECT '12456789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 8, 43, cellset FROM (SELECT NULL cellset UNION SELECT '13456789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 8, 44, cellset FROM (SELECT NULL cellset UNION SELECT '23456789') A WHERE cellset IS NOT NULL;
INSERT INTO combinations (numCells, setsum, cellset) SELECT 9, 45, cellset FROM (SELECT NULL cellset UNION SELECT '123456789') A WHERE cellset IS NOT NULL;

UPDATE combinations SET bitmap = toBitmap(cellset);
UPDATE combinations SET setInt = CAST(cellset AS UNSIGNED);
UPDATE combinations SET setBin = CAST(cellset AS BINARY);
ALTER TABLE combinations ADD CONSTRAINT PRIMARY KEY setIntPK (setInt);
