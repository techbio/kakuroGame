1. Create MEMORY tables of all static data
    * digits
    * combinations
    * permutations
    * all_sets

2. Create MEMORY table of puzzle
    * grid
    * sets
    * cells

3. Recurse on solve set
    * apply a combination
    * test against crossing sets
    * if ok
        * apply permutations
        * repeat from apply a combination...

4. Output empty puzzle

5. Output finished puzzle, number of moves, time to solve
