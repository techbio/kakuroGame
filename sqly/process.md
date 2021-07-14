0. Setup
    * create database
    * create digits table (1-9)...(unfilled cell, unplayable blank => 0?, -1?)
    * using combinations from all_sets.csv, populate table of valid combinations
    * from valid combinations, generate valid permutations

1. Create tables of all static data
    * digits
    * combinations
    * permutations
    * all_sets

2. Create table for this puzzle
    * grid
    * sets (sums, rows and columns)
    * cells 

3. Recurse on solve set
    * apply a combination
    * test against crossing sets
    * if ok
        * apply permutations
        * repeat from apply a combination...

4. generate (or input) puzzle mask and possible sums (from length of set)

5. Output empty puzzle

6. Output finished puzzle, number of moves, time to solve
