cat create_db.sql | mysql kakuro -uroot -p
cat setup_kakuro.sql | mysql kakuro -uroot -p
mysql kakuro -uroot -p < generate_combinations_inserts.sql | tail -n +7 > combinations_inserts.sql 
cat combinations_inserts.sql | mysql kakuro -uroot -p
