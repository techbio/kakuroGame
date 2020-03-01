#!/bin/sh

#cat create_db.sql | mysql kakuro -uroot -p
#mysql kakuro -uroot -p < generate_combinations_inserts.sql | tail -n +7 > combinations_inserts.sql 
cat create_db.sql combinations_inserts.sql load_memory_tables.sql save_memory_tables.sql | mysql kakuro -ukakuro -p
