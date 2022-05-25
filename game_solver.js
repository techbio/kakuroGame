
// given a JSON representation of a game
//  with game cells containing row and column sums
//  play cells containing "blank" (-1) play values
// how to correctly fill play values to match the column/row sums and unique digit constraints?

// every Set can contain permutations of length Set.cells.length that sum to row or col sum in game cell
// prune impossible permutations, those that must conflict with related Sets
// repeat pruning cycles as long as new prunings change possible permutations
// when a Set has only one possible permutation, commit those values to play cell play values
// when a Set has only two possible permutations, create a copy of game and attempt repruning with each possibility
// if it results in a conflict, remove (prune) the attempted possibility and commit the other
// otherwise continue with updating/pruning cycles on both copies

function Solver() {"use strict";
    // breakDownCombos[numberOfElements][sumOfElements][0...#matches][intValueIndex]
    this.breakDownComboArr = breakDownCombos();
    this.initialize = function() {
//removed console.log('in initialize()');
        for (let setId in game.rowSets) {
            if (!game.rowSets.hasOwnProperty(setId)) {
                continue;
            }

            let set = game.rowSets[setId];
            if (!set.cells || !set.gameCellId || !set.cells.length || !set.setType.length) {
//removed console.log('something missing in set', set);
                continue;
            }

            let gameCell = set.getCell(set.gameCellId);

            let sum;
            if (set.setType === 'row') {
                sum = gameCell.rowSum;
            } else if (set.setType === 'col') {
                sum = gameCell.colSum;
            }

            // let playCells = [];
            // for (let cellId of set.cells) {
            //     playCells.push(set.getCell(cellId));
            // }
            set.possibleCombos = this.breakDownComboArr[set.cells.length][sum];
        }
        for (let setId in game.colSets) {
            if (!game.colSets.hasOwnProperty(setId)) {
                continue;
            }
            let set = game.colSets[setId];
            if (!set.cells || !set.gameCellId || !set.cells.length || !set.setType.length) {
//removed console.log('something missing in set', set);
                continue;
            }

            let gameCell = set.getGameCell();

            let sum;
            if (set.setType === 'row') {
                sum = gameCell.rowSum;
            } else if (set.setType === 'col') {
                sum = gameCell.colSum;
            }

            // let playCells = [];
            // for (let cellId of set.cells) {
            //     playCells.push(set.getCell(cellId));
            // }
            set.possibleCombos = this.breakDownComboArr[set.cells.length][sum];
        }
    };
    this.solve = function() {
console.time('all');
        // check for unique values in set and in every possible crossing set
        // check for correct sum in set and in every crossing set
        // using minimum and maximum of each possible set, prune those which have unacceptable values
        // for pairs of sets that must share a value, prune sets that cannot share a value at that point
        // order sets by # possibilities, low to high
        // choose a low # set and set values, try to solve the rest
        // backtrack and try again

        console.time('initialize');
        this.initialize(); // generates combinations
        console.timeEnd('initialize');

        console.time('pruneCombos');
        this.pruneAllImpossibleCombos();
        console.timeEnd('pruneCombos');

        console.time('genPerms');
        this.generatePermutations();
        console.timeEnd('genPerms');
        // console.time('genPermes


        // console.log("game.rowSets['set1,0']", game.rowSets['set1,0']);

        console.time('prunePerms');
        // speed up game solution by pruning largest sets first?
        // this.pruneImpossiblePermutationsInSet(game.colSets['set1,3']);
        // this.pruneImpossiblePermutationsInSet(game.colSets['set0,7']);

        this.pruneAllImpossiblePermutations();

        // makes more sense to use a variable time limit, but:
        // number of times to iterate over pruneImpossiblePermutations
        let ceiling = 10;
        while (ceiling-- > 0 && this.hasMultipleSolutions()) {
            this.updateCellValues();
            this.pruneAllImpossiblePermutations();
        }
        console.timeEnd('prunePerms');
        console.log('# pruning iterations:', 10 - ceiling);
        this.updateCellValues();
        this.printPermutations();
        game.checkSolution();
        console.timeEnd('all');
    };

    this.solveBitmap = function() {
        console.time('all');

        // initialize all cells to any-possible bitmap (111111111)
        // for each game cell set, set all cells to possible bitmap from combinations for setLength/sum
        // AND with each cell in each crossing set

        console.time('initialize');
        this.initialize(); // generates combinations
        console.timeEnd('initialize');

        console.time('pruneCombos');
        //this.pruneAllImpossibleCombos();
        this.allPossibleCombos();
        console.timeEnd('pruneCombos');

        console.time('genPerms');
        this.generatePermutations();
        console.timeEnd('genPerms');
        // console.time('genPermes


        // console.log("game.rowSets['set1,0']", game.rowSets['set1,0']);

        console.time('prunePerms');
        // speed up game solution by pruning largest sets first?
        // this.pruneImpossiblePermutationsInSet(game.colSets['set1,3']);
        // this.pruneImpossiblePermutationsInSet(game.colSets['set0,7']);

        this.allPossiblePermutations();

        // makes more sense to use a variable time limit, but:
        // number of times to iterate over pruneImpossiblePermutations
        let ceiling = 10;
        while (ceiling-- > 0 && this.hasMultipleSolutions()) {
            //this.updateCellValues();
            this.updateCellBitmaps();
            this.allPossiblePermutations();
        }
        console.timeEnd('prunePerms');
        console.log('# pruning iterations:', 10 - ceiling);
        //this.updateCellValues();
        this.updateCellBitmaps();
        this.printPermutations();
        game.checkSolution();
        console.timeEnd('all');
    };

    this.explore = function() {
        this.initialize();
//removed console.log(game.rowSets);
//removed console.log(game.colSets);
        this.pruneAllImpossibleCombos();
//removed console.log(game.rowSets);
//removed console.log(game.colSets);
        this.generatePermutations();
//removed console.log(game.rowSets);
//removed console.log(game.colSets);
        return;
        // TODO call this before return? this.pruneAllImpossiblePermutations();
//removed console.log(game.rowSets);
//removed console.log(game.colSets);

    };
    this.hasMultipleSolutions = function() {
        // returns true if there exists a set with more than one possible permutations
//removed console.log('in hasMultipleSolutions');
        let colIds = Object.keys(game.colSets);
        let rowIds = Object.keys(game.rowSets);

        //for (let setId in colIds) {
        for (let setId in game.colSets) {
            if (!game.colSets.hasOwnProperty(setId)) {
                continue;
            }
            if (game.colSets[setId].possiblePermutations.length > 1) {
                return true;
            } else {
//removed console.log(setId + ' solved');
            }
        }
        //for (let setId in rowIds) {
        for (let setId in game.rowSets) {
            if (!game.rowSets.hasOwnProperty(setId)) {
                continue;
            }
            if (game.rowSets[setId].possiblePermutations.length > 1) {
                return true;
            } else {
//removed console.log(setId + ' solved');
            }
        }
        return false;
    };
    this.updateCellValues = function() {
//removed console.log('in updateCellValues');
        for (let setId in game.rowSets) {
            if (!game.rowSets.hasOwnProperty(setId)) {
                continue;
            }

            let ndx = 0;
            //console.log(game.cells);
            for (let cellId of game.rowSets[setId].cells) {
                if (game.rowSets[setId].possiblePermutations.length > 1) {
//removed console.log('not a unique solution, exiting updateCellValues');
                    continue;
                }
                // .setValue() not working--'cell' does not know it is a PlayCell object?
                let cell = game.findCell(cellId);
                let permutation = game.rowSets[setId].possiblePermutations[0]; // only one left
                cell.setValue(permutation[ndx++]);
            }
        }
    };
    this.printPermutations = function() {
        // print out remaining permutations
        for (let setId in game.rowSets) {
            if (!game.rowSets.hasOwnProperty(setId)) {
                continue;
            }
//removed console.log(setId);
            for (let perm of game.rowSets[setId].possiblePermutations) {
//removed console.log(setId, perm);
            }
        }
        for (let setId in game.colSets) {
            if (!game.colSets.hasOwnProperty(setId)) {
                continue;
            }
//removed console.log(setId);
            for (let perm of game.colSets[setId].possiblePermutations) {
//removed console.log(setId, perm);
            }
        }
    };
    this.generatePermutations = function() {
        // for every combination in every set, create permutations and assign to set.possiblePermutations
//removed console.log('in generatePermutations');
        for (let setId in game.rowSets) {
            if (!game.rowSets.hasOwnProperty(setId)) {
                continue;
            }

            game.rowSets[setId].possiblePermutations = [];
            let permutations = [];

            for (let combo of game.rowSets[setId].possibleCombos) {
                // for (comboId = 0, len = game.rowSets[setId].possibleCombos.length; comboId < len; comboId++) {
                //     combo = game.rowSets[setId].possibleCombos[comboId];
                // permutations = permutations.concat(permutator(combo));
                //permutations.push(permutator(combo));
                permutations = permutator(combo);
                for (let perm of permutations) {
                    game.rowSets[setId].possiblePermutations.push(perm);
                }
            }
            //game.rowSets[setId].possiblePermutations = permutations;
        }
        for (let setId in game.colSets) {
            if (!game.colSets.hasOwnProperty(setId)) {
                continue;
            }
            game.colSets[setId].possiblePermutations = [];
            let permutations = [];
            for (let combo of game.colSets[setId].possibleCombos) {
                // for (comboId = 0, len = game.colSets[setId].possibleCombos.length; comboId < len; comboId++) {
                //     combo = game.colSets[setId].possibleCombos[comboId];
                // permutations = permutations.concat(permutator(combo));
                // permutations.push(permutator(combo));
                permutations = permutator(combo);
                for (let perm of permutations) {
                    game.colSets[setId].possiblePermutations.push(perm);
                }
            }
            //game.colSets[setId].possiblePermutations = permutations;
        }

        // check that all permutations are created
//removed console.log('game.rowSets', game.rowSets);
//removed console.log('game.colSets', game.colSets);
    };
    this.generatePermutationsFast = function() {
        // for every combination in every set, create permutations and assign to set.possiblePermutations
//removed console.log('in generatePermutations');
        // tighten execution times of inner loops

        // declare variables outside of loops
        let combo, perm, permutations, setId, combos, possiblePermutations;
        for (setId in game.rowSets) {
            if (!game.rowSets.hasOwnProperty(setId)) {
                continue;
            }

            game.rowSets[setId].possiblePermutations = [];
            //permutations = [];
            possiblePermutations = [];

            combos = game.rowSets[setId].possibleCombos;
            //for (combo of combos) {
            for (let comboId = 0; comboId < combos.length; comboId++) {
                // for (comboId = 0, len = game.rowSets[setId].possibleCombos.length; comboId < len; comboId++) {
                //     combo = game.rowSets[setId].possibleCombos[comboId];
                // permutations = permutations.concat(permutator(combo));
                //permutations.push(permutator(combo));
                permutations = permutator(combos[comboId]);
                for (perm of permutations) {
                    possiblePermutations.push(perm);
                }
            }
            //game.rowSets[setId].possiblePermutations = permutations;
            game.rowSets[setId].possiblePermutations = possiblePermutations;
        }
        for (setId in game.colSets) {
            if (!game.colSets.hasOwnProperty(setId)) {
                continue;
            }
            game.colSets[setId].possiblePermutations = [];
            //permutations = [];
            possiblePermutations = [];

            combos = game.colSets[setId].possibleCombos;
            //for (combo of combos) {
            for (let comboId = 0; comboId < combos.length; comboId++) {
                // for (comboId = 0, len = game.colSets[setId].possibleCombos.length; comboId < len; comboId++) {
                //     combo = game.colSets[setId].possibleCombos[comboId];
                // permutations = permutations.concat(permutator(combo));
                // permutations.push(permutator(combo));
                permutations = permutator(combos[comboId]);
                for (perm of permutations) {
                    possiblePermutations.push(perm);
                }
            }
            game.colSets[setId].possiblePermutations = possiblePermutations;
            //game.colSets[setId].possiblePermutations = permutations;
        }

        // check that all permutations are created
//removed console.log('game.rowSets', game.rowSets);
//removed console.log('game.colSets', game.colSets);
    };
    this.pruneAllImpossiblePermutations = function() {
        // for each set in rowSets and colSets, pruneImpossiblePermutations
        // might want to order by # permutations descending (or ascending?) to get large groups out of the way early
//removed console.log('in pruneAllImpossiblePermutations()');
        //let solutionsDiv = document.getElementById('solutionsDiv');

        // let revRowSets = Object.keys(game.rowSets).reverse();
        // let revColSets = Object.keys(game.colSets).reverse();

        // let colIds = Object.keys(game.colSets).sort(function(a, b) {
        //     // sort keys by descending number of permutations, in order to process longest first
        //     return game.colSets[b].possiblePermutations.length - game.colSets[a].possiblePermutations.length
        // });
        // let rowIds = Object.keys(game.rowSets).sort(function(a, b) {
        //     // sort keys by descending number of permutations, in order to process longest first
        //     return game.rowSets[b].possiblePermutations.length - game.rowSets[a].possiblePermutations.length
        // });

        //for (let setId in colIds) {
        for (let setId in game.colSets) {
            if (!game.colSets.hasOwnProperty(setId)) {
                continue;
            }
//removed console.log('--------------------------');
            this.pruneImpossiblePermutationsInSet(game.colSets[setId]);
        }
        //for (let setId in rowIds) {
        for (let setId in game.rowSets) {
            if (!game.rowSets.hasOwnProperty(setId)) {
                continue;
            }
//removed console.log('--------------------------');
            this.pruneImpossiblePermutationsInSet(game.rowSets[setId]);
        }
        // for (let setId of revRowSets) {
        //     // do as above but reverse order
        //     //if (!revRowSets.hasOwnProperty(setId)) {
        //     //     continue;
        //     // }
        //     this.pruneImpossiblePermutations(game.rowSets[setId]);
        // }
        // for (let setId of revColSets) {
        //     // do as above but reverse order
        //     // if (!revColSets.hasOwnProperty(setId)) {
        //     //     continue;
        //     // }
        //     this.pruneImpossiblePermutations(game.colSets[setId]);
        // }
    };
    this.pruneImpossiblePermutationsInSet = function(testSet) {
        // remove permutations from this set that contain values not present in that position of any crossing set permutation
//removed console.log('in pruneImpossiblePermutations');
//removed console.log('testSet.possiblePermutations', testSet.possiblePermutations);

        let crossingSets = this.findCrossingSets(testSet);

        // build a new array of possible combos, not including impossible ones
        let newPossiblePermutations = [];
        //let reassignPossPermsFlag = false;
        //     console.log('________________________________');
        //     console.log('________________________________');

        // get div to to display progress
        //let solutionsDiv = document.getElementById("solutionsDiv");
        // write progress
        //solutionsDiv.innerHTML += "<br><br>" + testSet.id;

        for (let permId in testSet.possiblePermutations) {
            if (!testSet.possiblePermutations.hasOwnProperty(permId)) {
                continue;
            }

            // write progress
            // if (permId % 1000 === 0) {
            //     solutionsDiv.innerHTML += "<br>permId " + permId + " of " + testSet.possiblePermutations.length;
            // }

            // i need to rule out every permutation that doesn't correspond to some extant permutation at each crossing set
//removed console.time('isImpossiblePermutation');
            let isPossiblePerm = !this.isImpossiblePermutation(testSet, crossingSets, testSet.possiblePermutations[permId]);
//removed console.timeEnd('isImpossiblePermutation');

            if (isPossiblePerm) {
                if (typeof newPossiblePermutations === 'undefined') {
                    newPossiblePermutations = [];
                }
                newPossiblePermutations.push(testSet.possiblePermutations[permId]);
                //isTotallyPossible = true;
//removed console.log('retained permutation');

                //reassignPossPermsFlag = true;
            } else {
//removed console.log('discarded permutation');
            }
        }
            // if (false && isTotallyPossible) {
            //     console.log('  stored pairing at [permGroupId]:', permGroupId);
            //     //testSet.possiblePermutations[permGroupId] = newPossiblePermutations[permGroupId];
            //     reassignPossPermsFlag = true;
            // } else {
            //     console.log('  deleting pairing at [permGroupId]:', permGroupId);
            // }
        //}

        //if (reassignPossPermsFlag) {
            // assign current possible permutations back to set
            testSet.possiblePermutations = newPossiblePermutations;
            //
            //     testSet.possiblePermutations = [];
            // for (let permGroupId in newPossiblePermutations) {
            //     if (!newPossiblePermutations.hasOwnProperty(permGroupId)) {
            //         continue;
            //     }
            //
            //     testSet.possiblePermutations[permGroupId] = newPossiblePermutations[permGroupId];
            // }
        //}
//removed console.log('end in pruneImpossiblePermutations');
//removed console.log('testSet.possiblePermutations', testSet.possiblePermutations);
    };

    // returns true for impossible as soon as it finds a cell.playValue or one crossing set that forbids this permutation
    this.isImpossiblePermutation = function(testSet, crossingSets, permutation) {


        // I wanted to check that I was working with OK data
        // if (testSet.cells.length === crossingSets.length) {
        //     console.log('correct lengths');
        // } else {
        //     console.log('!!! incorrect lengths !!!');
        //     return false; // permutation/crossing sets length mismatch
        // }

        // added tests for existing playCell.playValue's

        // the next two for loops use this length
        const len = testSet.cells.length;
        for (let ndx = 0; ndx < len; ndx++) {
            // playValue is set and rules out this permutation
            if ((testSet.cells[ndx].playValue > 0 && testSet.cells[ndx].playValue !== permutation[ndx])) {
//removed console.log('permutation conflicts with playValue:', testSet.cells[ndx].playValue);
                return true;
            }
        }

        // could be (?) sped up if we kept an association between combination and permutation array,
        // and checked combo.inArray(permutation[ndx] before running through that permutation group
        // requires creating an array at the same index as the combination for the return from permutator(combo) in generatePermutations()
        // and a little bit more housekeeping with combinations which are currently not pruned when permutations are removed
        for (let ndx = 0; ndx < len; ndx++) {
            // needs to be a possible matched crossing permutation for every location (ndx) in this permutation

            // crossing set permutations rule out this permutation
            if (this.isImpossiblePermutationAtCell(testSet, crossingSets[ndx], permutation, ndx)) {
//removed console.log('found an impossible pairing at ndx:', ndx);
                return true;
            } else {
//removed console.log('found a possible pairing at ndx:', ndx);
            }

        }

        // got through the cells and there is a possible permutation in every crossing set
        return false;
    };
    this.isImpossiblePermutationAtCell = function(testSet, crossingSet, perm, loc) {
        // returns false if the crossing set contains a permutation that aligns with this perm[utation]

        // the the value of the digit at loc in this perm[utation]
        // doesn't have a matching permutation in the crossing set
        // that is equal in value at the crossing offset



        // this permutation contains at least one value in a position not present
        // in the the same row or column of a crossing set's possible permutations
//removed console.log('in isImpossiblePermutation');




        //let foundFlag = false;
//removed console.log('crossingSet', crossingSet);

        //const crossingSetId = 'set' + crossingSet.gameCellId;
        // (must? or mustn't?) build ID from game cell because there is no ID field on Set
        // const set = game.rowSets[crossingSetId] ? game.rowSets[crossingSetId] : game.colSets[crossingSetId];
        //const set = crossingSet;


        const digit = perm[loc];
        // used to compute offsets for crossing set permutations
        const offset = this.getOffset(testSet, crossingSet);

        // each array of permutation arrays
        //for (let testPerm of crossingSet.possiblePermutations) {
        for (let testPermNdx = 0, len = crossingSet.possiblePermutations.length; testPermNdx < len; testPermNdx++) {
            let testDigit = crossingSet.possiblePermutations[testPermNdx][offset];
            /*console.log('testPerm:', testPerm); // if testSet is a row, this is a column; vice versa
//removed console.log('offset:', offset);
//removed console.log('testPerm[offset]:', testPerm[offset]);
//removed console.log('perm:', perm);
//removed console.log('loc:', loc);
//removed console.log('perm[loc]:', perm[loc]);
            if (typeof testPerm[offset] === 'undefined') {
                //continue;
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('-----should not happen ------');
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('------------------------');
//removed console.log('------------------------');
                //return;
            }
*/
            if (testDigit === digit) {
                // found one that matches, so not impossible
//removed console.log('found one that matches');
                return false;
            } else {
//removed console.log('not a match');
            }
        }
        // tried every permutation in crossing set and none allow for this permutation
        return true;
    };
    this.getOffset = function(testSet, crossingSet) {
        // return the array index of the intersected cell in the crossing set

        // const col = testSet.col;
        // const row = testSet.row;

        // get row,col components of game cell id
        //const coords = crossingSetId.match(/(\d+,\d+)/g)[0].split(',');

        //console.log('row col coords:', row, col, coords);

        //const inCrossingColumn = (testSet.setType === "row");
        let offset;

        //console.log('coords', coords);

        // if (coords.length === 2) {
        //     // convert string coords to numbers
        //     coords[0] = Number(coords[0]); // row, i
        //     coords[1] = Number(coords[1]); // column, j
        // } else {
        //     // error
        //     console.log('this should not happen');
        // }

        // compute offset
        //if (inCrossingColumn) {
        if (testSet.setType === "row") {
            offset = testSet.row - crossingSet.row - 1;
            //console.log('coords, row, offset', coords, row, offset);
        } else {
            offset = testSet.col - crossingSet.col - 1;
            //console.log('coords, col, offset', coords, col, offset);
        }

        return offset;
    };
    this.pruneAllImpossibleCombos = function() {
//removed console.log('in pruneAllImpossibleCombos');
        //let solutionsDiv = document.getElementById('solutionsDiv');
        for (let setId in game.rowSets) {
            if (!game.rowSets.hasOwnProperty(setId)) {
                continue;
            }
            // check for unique values in set and in every possible crossing set
            // check for correct sum in set and in every crossing set
            // using minimum and maximum of each possible set, prune those which have unacceptable values
            // for pairs of sets that must share a value, prune sets that cannot share a value at that point
            // order sets by # possibilities, low to high
            // choose a low # set and set values, try to solve the rest
            // backtrack and try again
            this.pruneImpossibleCombos(game.rowSets[setId]);
        }
        for (let setId in game.colSets) {
            // do as above but for columnar sets instead of row sets
            if (!game.colSets.hasOwnProperty(setId)) {
                continue;
            }

            //solutionsDiv.innerText += "\n" + JSON.stringify(game.colSets[setId]);
            //console.log(setId, game.colSets[setId].possibleCombos);
            this.pruneImpossibleCombos(game.colSets[setId]);
        }
    };
    this.pruneImpossibleCombos = function(testSet) {
        // remove combos from this set that contain values not present in any crossing set
//removed console.log('in pruneImpossibleCombos');
        //console.log('testSet.possibleCombos', testSet.possibleCombos);

        if (testSet == null ||
                testSet == undefined ||
                testSet.cells == undefined ||
                testSet.cells == null ||
                testSet.cells.length === 0) {
//removed console.log('zero-length set cells');
            return false;
        }

        const crossingSets = this.findCrossingSets(testSet);

        // build a new array of possible combos, not including impossible ones
        const newPossibleCombos = [];
        for (let comboId in testSet.possibleCombos) {
            if (!testSet.possibleCombos.hasOwnProperty(comboId)) {
                continue;
            }
            let combo = testSet.possibleCombos[comboId];
            if(!this.isImpossibleCombo(crossingSets, combo)) {
                newPossibleCombos.push(combo);
            }
        }

        testSet.possibleCombos = newPossibleCombos;

        //console.log('end in pruneImpossibleCombos', testSet.possibleCombos);
    };
    this.isImpossibleCombo = function(crossingSets, combo) {
        // this combo contains at least one value not present in any crossing set's possible combinations
//removed console.log('in isImpossibleCombo', combo);

        let allPossibles = [];
        for (let set of crossingSets) {
            for (let testCombo of set.possibleCombos) {
                //console.log(testCombo);

                // trying to rule some out early
                // if (combo[0] > testCombo[testCombo.length - 1] || combo[combo.length - 1] < testCombo[0]) {
                //     // combos don't overlap any digits
                //     continue;
                // }

                allPossibles = allPossibles.concat(testCombo);
            }
        }

        for (let digit of combo) {
            if (!this.isInArray(allPossibles, digit)) {
                //console.log(digit + ' not available in ' + allPossibles);
                return true;
            }
        }
        //console.log(allPossibles + ' contains a digit of ' + combo);
        return false;
    };
    this.findCrossingSets = function(testSet) {
        // returns an array of all the sets intersecting testSet
//removed console.log('in findCrossingSets');
        if (testSet == null ||
                testSet == undefined ||
                testSet.cells == undefined ||
                testSet.cells == null ||
                testSet.cells.length === 0) {
//removed console.log('zero-length set cells');
            return false;
        }
        let crossingSets = [];
        if (testSet.setType === 'row') {
            // collect the crossing sets
            for (let cellId of testSet.cells) {
                let cell = testSet.getCell(cellId);
                crossingSets.push(game.colSets[cell.colSet]);
            }
        } else if (testSet.setType === 'col') {
            for (let cellId of testSet.cells) {
                let cell = testSet.getCell(cellId);
                // console.log(cellId);
                crossingSets.push(game.rowSets[cell.rowSet]);
            }
        }
        return crossingSets;
    };
    /*
    this.isInCrossingSet = function(testSet, digit) {
//removed console.log('in isInCrossingSet', digit);
        // for each cell in set.cells, traverse to nearest set head game cell to find crossing set, then search for digit
        for (let i = 0; i < testSet.cells.length; i++) {
            let rowSet = testSet.getCell(testSet.cells[i]).rowSet;
            let colSet = testSet.getCell(testSet.cells[i]).colSet;

            if (testSet.setType === 'row') {
//removed console.log('in row');
                // get the row and column for a crossing set
                if (!this.isInSet(game.colSets[colSet], digit)) {
                    // returns false if a single crossing set does not contain the value
                    // should instead return false only if all crossing combinations do not contain the value
                    return false;
                }
            } else if (testSet.setType === 'col') {
//removed console.log('in col');
                // get the row and column for a crossing set
                if (!this.isInSet(game.rowSets[rowSet], digit)) {
                    //
                    return false;
                }
            }
        }
        return true;
    };
    this.isNotInAnyOf = function(sets, digit) {
//removed console.log('in isNotInAnyOf', sets, digit);
        for (let set of sets) {
            if (this.isInSet(set, digit)) {
                return false;
            }
        }
        return true;
    };
    this.isInAnyOf = function(sets, digit) {
//removed console.log('in isInAnyOf', digit);
        for (let set of sets) {
            if (this.isInSet(set, digit)) {
                return true;
            }
        }
        return false;
    };
    this.isInSet = function(set, digit) {
//removed console.log('in isInSet', set.possibleCombos, digit);
        for (let combo of set.possibleCombos) {
            if (!this.isInArray(combo, digit)) {
                return false;
            }
        }
        return true;
    };*/
    this.isInArray = function(arr, digit) {
        // return true if digit is equal to an array item
        // better I think, to just use built in
        // array.inArray(item) which returns the first index containing item, or -1 if not found

        // console.log('in isInArray', digit);
        for (let setDigit of arr) {
            if (setDigit === digit) {
                return true;
            }
        }
        return false;
    };

// altered approach to algorithm, maybe much faster
    this.assignAllPossibleCellValues = function() {
        // loop through cells and run assignPossibleCellValues(cell)
    };
    this.assignPossibleCellValues = function(cell) {
        // set the possible values at this cell
    };
    this.pruneAllImpossibleCellValues = function() {
        // loop through cells and run pruneImpossibleCellValues(cell)
    };
    this.pruneImpossibleCellValues = function(cell) {
        // remove cell values where:
        //  a. they would be repeating in a row or column
        //  b. they, in combination with nearby cell values, couldn't add to the sums
        // determined by ???
        return;
    };
}

// may be a fool's errand
// recreating objects in high-performance procedural code object
// to clock time efficiently search for permutation conflicts
// const SetPermutations = function() {
//     this.current = [];
//
//     // array of 9 arrays for possible positions of 9 unique digits, 1-9
//     // each index will correspond to the permutation's index in setPossiblePermutations[]
//     this.digits = [];
//     // init 9 possible indexes, -1 stands for "not an index"
//
//     // creates parallel arrays to all set's possiblePermutations; run after generatePermutations()
//     this.create = function () {
//         for (let objectOfSets of [game.rowSets, game.colSets]) {
//             for (let setId in objectOfSets) {
//                 if (!objectOfSets.hasOwnProperty(setId)) {
//                     continue;
//                 }
//
//                 // set the coords of the set's permutations arrays
//                 //const coords = setId.match(/(\d+,\d+)/g).split(',');
//                 let row = objectOfSets[setId].row;//coords[0];
//                 let col = objectOfSets[setId].col;//coords[1];
//
//
//                 // initialize current row if not already
//                 if (typeof this.current === 'undefined') {
//                     this.current = [];
//                 } else if (typeof this.current[row] === 'undefined') {
//                     this.current[row] = [];
//                 }
//
//                 this.current[row][col] = objectOfSets[setId].possiblePermutations;
//
//
//                 // initialize digits row if not already
//                 if (typeof this.digits === 'undefined') {
//                     this.digits = [];
//                 } else if (typeof this.digits[row] === 'undefined') {
//                     this.digits[row] = [];
//                 } else if (typeof this.digits[row][col] === 'undefined') {
//                     this.digits[row][col] = [];
//                 }
//
//                 for (let permId in this.current[row][col]) { // perm = current[i][j]
//                     let perm = this.current[row][col][permId];
//                     this.digits[row][col][permId] = [];
//
//                     let ndx = 0;
//                     for (let digit = 0; digit < 9; digit++) {
//                         if (typeof perm[ndx] === 'number') {
//                             this.digits[row][col][permId][digit] = perm[ndx];
//                         } else {
//                             this.digits[row][col][permId][digit] = -1;
//                         }
//                     }
//                 }
//             }
//         }
//     };
//     this.digitsAreEqual = function(testPermRow, testPermCol, testPermIndex, digit, testPerm2Row, testPerm2Col, testPerm2Index, offset) {
//         return this.digits[testPermRow][testPermCol][testPermIndex][digit] === this.digits[testPerm2Row][testPerm2Col][testPerm2Index][offset];
//     };
// };

const solver = new Solver();
//solver.solve();
/*solver.explore();*/
