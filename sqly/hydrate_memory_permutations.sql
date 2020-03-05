SELECT 'drop db kakuro_static';
DROP DATABASE IF EXISTS kakuro_static;
SELECT 'create db kakuro_static';
CREATE DATABASE kakuro_static;
SELECT 'use db kakuro_static';
USE kakuro_static;

/*source /var/www/html/kakuroGame/sqly/kakuro_static_dump.sql*/

SELECT 'drop all_perms';
DROP TABLE IF EXISTS all_perms;


SELECT 'create all_perms from permperms';
CREATE TABLE all_perms ENGINE=MEMORY AS SELECT * FROM kakuro.permperms;

SELECT 'drop db kakuro_puzzle';
DROP DATABASE IF EXISTS kakuro_puzzle;
SELECT 'create db kakuro_puzzle';
CREATE DATABASE kakuro_puzzle;
SELECT 'use db kakuro_puzzle';
USE kakuro_puzzle;

SELECT 'drop puzzle_perms';
DROP TABLE IF EXISTS puzzle_perms;
SELECT 'create and add indexes to puzzle_perms';
CREATE TABLE puzzle_perms ENGINE=MEMORY AS SELECT * FROM kakuro_static.all_perms;
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

SELECT 'create puzzle_grid';
CREATE TABLE puzzle_grid ENGINE=MEMORY LIKE kakuro.grid;
SELECT 'create puzzle_cellsets';
CREATE TABLE puzzle_cellsets ENGINE=MEMORY LIKE kakuro.cellsets;
SELECT 'create puzzle_cells';
CREATE TABLE puzzle_cells ENGINE=MEMORY LIKE kakuro.cells;