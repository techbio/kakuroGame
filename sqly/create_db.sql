# create a database of solution space of 5x5 kakuros

#DROP DATABASE IF EXISTS kakuro;
CREATE DATABASE kakuro;
USE kakuro;

DROP TABLE IF EXISTS grid;
DROP TABLE IF EXISTS puzzle;
DROP TABLE IF EXISTS all_sets;
DROP TABLE IF EXISTS all_cells;
DROP TABLE IF EXISTS combinations;
DROP TABLE IF EXISTS permutations;

CREATE TABLE grid (

);

CREATE TABLE puzzle (

);

CREATE TABLE all_sets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT NOT NULL DEFAULT 0
    , sum TINYINT NOT NULL DEFAULT 0
    , sets TEXT
    , alwaysUsed CHAR(9)
    , neverUsed CHAR(9)
);

CREATE TABLE all_cells (

);

CREATE TABLE combinations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , numCells TINYINT NOT NULL DEFAULT 0
    , sum TINYINT NOT NULL DEFAULT 0
    , set CHAR(9)
    , alwaysUsed CHAR(9)
    , neverUsed CHAR(9)
);

CREATE TABLE permutations (

);
