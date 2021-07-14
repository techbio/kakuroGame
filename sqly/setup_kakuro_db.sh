#!/bin/sh

# drop database, user and create again
cat reset_db.sql | mysql -uroot -p

# create schema and populate initial tables
cat create_db.sql | mysql kakuro -ukakuro -p

