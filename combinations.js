/* retrieved from https://gist.github.com/axelpale/3118596 2018-05-08 */

/**
 * Copyright 2012 Akseli Palén.
 * Created 2012-07-15.
 * Licensed under the MIT license.
 *
 * <license>
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * </lisence>
 *
 * Implements functions to calculate combinations of elements in JS Arrays.
 *
 * Functions:
 *   k_combinations(set, k) -- Return all k-sized combinations in a set
 *   combinations(set) -- Return all combinations of the set
 */


/**
 * K-combinations
 *
 * Get k-sized combinations of elements in a set.
 *
 * Usage:
 *   k_combinations(set, k)
 *
 * Parameters:
 *   set: Array of objects of any type. They are treated as unique.
 *   k: size of combinations to search for.
 *
 * Return:
 *   Array of found combinations, size of a combination is k.
 *
 * Examples:
 *
 *   k_combinations([1, 2, 3], 1)
 *   -> [[1], [2], [3]]
 *
 *   k_combinations([1, 2, 3], 2)
 *   -> [[1,2], [1,3], [2, 3]
 *
 *   k_combinations([1, 2, 3], 3)
 *   -> [[1, 2, 3]]
 *
 *   k_combinations([1, 2, 3], 4)
 *   -> []
 *
 *   k_combinations([1, 2, 3], 0)
 *   -> []
 *
 *   k_combinations([1, 2, 3], -1)
 *   -> []
 *
 *   k_combinations([], 0)
 *   -> []
 */
function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;

    // There is no way to take e.g. sets of 5 elements from
    // a set of 4.
    if (k > set.length || k <= 0) {
        return [];
    }

    // K-sized set has only one K-sized subset.
    if (k == set.length) {
        return [set];
    }

    // There is N 1-sized subsets in a N-sized set.
    if (k == 1) {
        combs = [];
        for (i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }

    // Assert {1 < k < set.length}

    // Algorithm description:
    // To get k-combinations of a set, we want to join each element
    // with all (k-1)-combinations of the other elements. The set of
    // these k-sized sets would be the desired result. However, as we
    // represent sets with lists, we need to take duplicates into
    // account. To avoid producing duplicates and also unnecessary
    // computing, we use the following approach: each element i
    // divides the list into three: the preceding elements, the
    // current element i, and the subsequent elements. For the first
    // element, the list of preceding elements is empty. For element i,
    // we compute the (k-1)-computations of the subsequent elements,
    // join each with the element i, and store the joined to the set of
    // computed k-combinations. We do not need to take the preceding
    // elements into account, because they have already been the i:th
    // element so they are already computed and stored. When the length
    // of the subsequent list drops below (k-1), we cannot find any
    // (k-1)-combs, hence the upper limit for the iteration:
    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
        // head is a list that includes only our current element.
        head = set.slice(i, i + 1);
        // We take smaller combinations from the subsequent elements
        tailcombs = k_combinations(set.slice(i + 1), k - 1);
        // For each (k-1)-combination we join it with the current
        // and store it to the set of k-combinations.
        for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}


/**
 * Combinations
 *
 * Get all possible combinations of elements in a set.
 *
 * Usage:
 *   combinations(set)
 *
 * Examples:
 *
 *   combinations([1, 2, 3])
 *   -> [[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
 *
 *   combinations([1])
 *   -> [[1]]
 */
function combinations(set) {
    var k, i, combs, k_combs;
    combs = [];

    // Calculate all non-empty k-combinations
    for (k = 1; k <= set.length; k++) {
        k_combs = k_combinations(set, k);
        for (i = 0; i < k_combs.length; i++) {
            combs.push(k_combs[i]);
        }
    }
    return combs;
}

/**
 * ...and permutations
 * added 2018-05-08
 * retrieved same day from source: https://stackoverflow.com/a/20871714/6254147
 *
 * @param inputArr
 * @returns {Array}
 */
function permutator(inputArr) {
    const results = [];

    function permute(arr, memoIn) {
        let cur, memo = memoIn || [];

        for (let i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}


/**
 * For use with Kakuro Game -- kakuroGame/game_solver.js
 * Added 2018-05-08, techbio
 */
function breakDownCombos() {
    const combos = combinations([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const comboData = [];
    let sumVal;

    for (let set of combos) {
        if (set.length === 1) continue;
        if (typeof comboData[set.length] === 'undefined') {
            comboData[set.length] = [];
        }

        sumVal = sumSet(set);
        if (typeof comboData[set.length][sumVal] === 'undefined') {
            comboData[set.length][sumVal] = [];
        }
        // append every combination-set that satisfies length and sum criteria
        comboData[set.length][sumVal].push(set);

    }
    return comboData;
}

/**
 * For use with Kakuro Game -- kakuroGame/game_solver.js
 * Added 2021-07-14, techbio
 */
function breakDownPermutations(breakDownCombosArr=false) {
    if (breakDownCombosArr === false)
    {
        breakDownCombosArr = breakDownCombos();
    }

    let breakDownPerms = {};
    for (setLength in breakDownCombosArr) {
        if (setLength < 2 || setLength > 9) continue;

        breakDownPerms[setLength] = {}; // init

        for (sumVal in breakDownCombosArr[setLength]) {
            breakDownPerms[setLength][sumVal] = {}; // init

            for (combo of breakDownCombosArr[setLength][sumVal]) {
                breakDownPerms[setLength][sumVal][combo.join('')] = {}; // init
                comboPerms = permutator(combo);
                for (perm of comboPerms) {
                    breakDownPerms[setLength][sumVal][combo.join('')][perm.join('')] = perm;
                }
            }
        }
    }

    return breakDownPerms;
}

function itemsAreUnique(numArr) {
    //let unique = [...new Set(numArr)]; // TODO can use if change Set object name/space
    let unique = {};
    for (num of numArr) {
        unique[num] = 1;
    }

    return Object.keys(unique).length === numArr.length;
}

function reorderComboByPermutation(
        combo = [2, 3, 4, 5, 7, 8],
        permPattern = [1, 2, 6, 5, 4, 3] // TODO needs to match length of combination, and cover every index
) {
    let newPerm = [];

    if (
        combo.length === permPattern.length
        && combo.length === Math.max(...permPattern)
        && itemsAreUnique(combo) && itemsAreUnique(permPattern)
    ) {

        for (order of permPattern) {
            newPerm.push(combo[order - 1]);
        }
    }

    return newPerm;
}

function sumSet(set) {
    let sum = 0;
    for (let intVal of set) {
        sum += intVal;
    }
    return sum;
}


// breakDownCombos[numberOfElements][sumOfElements][0...#matches][intValueIndex]
//const breakDownComboArr = breakDownCombos();
//console.log(permutator(breakDownComboArr[5][18][2]));
