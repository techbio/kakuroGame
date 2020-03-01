SELECT 'save memory tables';
DROP TABLE all_perms; CREATE TABLE all_perms ENGINE = InnoDB AS SELECT * FROM mem_all_perms;
DROP TABLE combinations; CREATE TABLE combinations ENGINE = InnoDB AS SELECT * FROM mem_combinations;
DROP TABLE permutations; CREATE TABLE permutations ENGINE = InnoDB AS SELECT * FROM mem_permutations;
DROP TABLE perms; CREATE TABLE perms ENGINE = InnoDB AS SELECT * FROM mem_perms;
DROP TABLE all_sets; CREATE TABLE all_sets ENGINE = MEMORY AS SELECT * FROM mem_all_sets;
DROP TABLE digits; CREATE TABLE digits ENGINE = MEMORY AS SELECT * FROM mem_digits;
