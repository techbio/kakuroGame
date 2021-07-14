/*

# possible permutations for each combination of length 2-9
9: 362880
8: 40320
7: 5040
6: 720
5: 120
4: 24
3: 6
2: 2

# of permutations eliminated by eliminating a combination
TODO???
*/

SELECT pc.count_perms, cc.count_combs, pc.count_perms/cc.count_combs pc_ratio
    FROM
        (SELECT count(p.perm) AS count_perms
            FROM perms p
            WHERE LENGTH(p.perm)=2/*<9,8,7,6,5,4,3,2>*/
            ) pc
        JOIN
        (SELECT count(c.cellset) AS count_combs
            FROM combinations c
            WHERE LENGTH(c.cellset)=2/*<9,8,7,6,5,4,3,2>*/
            ) cc;
