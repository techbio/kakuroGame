DROP DATABASE IF EXISTS kakuro;
CREATE DATABASE kakuro;
CREATE USER IF NOT EXISTS 'kakuro'@'localhost' identified by '1Kakuro.';
GRANT ALL PRIVILEGES ON kakuro.* TO 'kakuro'@'localhost';
FLUSH PRIVILEGES;

USE kakuro;