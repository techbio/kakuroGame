DROP DATABASE IF EXISTS kakuro_static;
CREATE DATABASE kakuro_static;
USE kakuro_static;

source /var/www/html/kakuroGame/sqly/kakuro_static_dump.sql




-- CREATE TABLE all_perms ENGINE=MEMORY AS SELECT * FROM permperms;
-- ALTER TABLE all_perms ADD CONSTRAINT PRIMARY KEY pk (permd);
-- ALTER TABLE all_perms ADD INDEX combination (cellset);
-- ALTER TABLE all_perms ADD INDEX bits (bitmap);
-- ALTER TABLE all_perms ADD INDEX ax (a);
-- ALTER TABLE all_perms ADD INDEX bx (b);
-- ALTER TABLE all_perms ADD INDEX cx (c);
-- ALTER TABLE all_perms ADD INDEX dx (d);
-- ALTER TABLE all_perms ADD INDEX ex (e);
-- ALTER TABLE all_perms ADD INDEX fx (f);
-- ALTER TABLE all_perms ADD INDEX gx (g);
-- ALTER TABLE all_perms ADD INDEX hx (h);
-- ALTER TABLE all_perms ADD INDEX ix (i);
