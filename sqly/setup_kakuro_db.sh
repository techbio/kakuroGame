#!/bin/sh

cat reset_db.sql | mysql -uroot -p
cat create_db.sql | mysql kakuro -ukakuro -p
