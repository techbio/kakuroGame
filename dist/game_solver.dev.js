"use strict";

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
function Solver() {
  "use strict"; // breakDownCombos[numberOfElements][sumOfElements][0...#matches][intValueIndex]

  this.breakDownComboArr = breakDownCombos();

  this.initialize = function () {
    //removed console.log('in initialize()');
    for (var setId in game.rowSets) {
      if (!game.rowSets.hasOwnProperty(setId)) {
        continue;
      }

      var set = game.rowSets[setId];

      if (!set.cells || !set.gameCellId || !set.cells.length || !set.setType.length) {
        //removed console.log('something missing in set', set);
        continue;
      }

      var gameCell = set.getCell(set.gameCellId);
      var sum = void 0;

      if (set.setType === 'row') {
        sum = gameCell.rowSum;
      } else if (set.setType === 'col') {
        sum = gameCell.colSum;
      } // let playCells = [];
      // for (let cellId of set.cells) {
      //     playCells.push(set.getCell(cellId));
      // }


      set.possibleCombos = this.breakDownComboArr[set.cells.length][sum];
    }

    for (var _setId in game.colSets) {
      if (!game.colSets.hasOwnProperty(_setId)) {
        continue;
      }

      var _set = game.colSets[_setId];

      if (!_set.cells || !_set.gameCellId || !_set.cells.length || !_set.setType.length) {
        //removed console.log('something missing in set', set);
        continue;
      }

      var _gameCell = _set.getGameCell();

      var _sum = void 0;

      if (_set.setType === 'row') {
        _sum = _gameCell.rowSum;
      } else if (_set.setType === 'col') {
        _sum = _gameCell.colSum;
      } // let playCells = [];
      // for (let cellId of set.cells) {
      //     playCells.push(set.getCell(cellId));
      // }


      _set.possibleCombos = this.breakDownComboArr[_set.cells.length][_sum];
    }
  };

  this.solve = function () {
    console.time('all'); // check for unique values in set and in every possible crossing set
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
    console.timeEnd('genPerms'); // console.time('genPermes
    // console.log("game.rowSets['set1,0']", game.rowSets['set1,0']);

    console.time('prunePerms'); // speed up game solution by pruning largest sets first?
    // this.pruneImpossiblePermutationsInSet(game.colSets['set1,3']);
    // this.pruneImpossiblePermutationsInSet(game.colSets['set0,7']);

    this.pruneAllImpossiblePermutations(); // makes more sense to use a variable time limit, but:
    // number of times to iterate over pruneImpossiblePermutations

    var ceiling = 10;

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

  this.solveBitmap = function () {
    console.time('all'); // initialize all cells to any-possible bitmap (111111111)
    // for each game cell set, set all cells to possible bitmap from combinations for setLength/sum
    // AND with each cell in each crossing set

    console.time('initialize');
    this.initialize(); // generates combinations

    console.timeEnd('initialize');
    console.time('pruneCombos'); //this.pruneAllImpossibleCombos();

    this.allPossibleCombos();
    console.timeEnd('pruneCombos');
    console.time('genPerms');
    this.generatePermutations();
    console.timeEnd('genPerms'); // console.time('genPermes
    // console.log("game.rowSets['set1,0']", game.rowSets['set1,0']);

    console.time('prunePerms'); // speed up game solution by pruning largest sets first?
    // this.pruneImpossiblePermutationsInSet(game.colSets['set1,3']);
    // this.pruneImpossiblePermutationsInSet(game.colSets['set0,7']);

    this.allPossiblePermutations(); // makes more sense to use a variable time limit, but:
    // number of times to iterate over pruneImpossiblePermutations

    var ceiling = 10;

    while (ceiling-- > 0 && this.hasMultipleSolutions()) {
      //this.updateCellValues();
      this.updateCellBitmaps();
      this.allPossiblePermutations();
    }

    console.timeEnd('prunePerms');
    console.log('# pruning iterations:', 10 - ceiling); //this.updateCellValues();

    this.updateCellBitmaps();
    this.printPermutations();
    game.checkSolution();
    console.timeEnd('all');
  };

  this.explore = function () {
    this.initialize(); //removed console.log(game.rowSets);
    //removed console.log(game.colSets);

    this.pruneAllImpossibleCombos(); //removed console.log(game.rowSets);
    //removed console.log(game.colSets);

    this.generatePermutations(); //removed console.log(game.rowSets);
    //removed console.log(game.colSets);

    return; // TODO call this before return? this.pruneAllImpossiblePermutations();
    //removed console.log(game.rowSets);
    //removed console.log(game.colSets);
  };

  this.hasMultipleSolutions = function () {
    // returns true if there exists a set with more than one possible permutations
    //removed console.log('in hasMultipleSolutions');
    var colIds = Object.keys(game.colSets);
    var rowIds = Object.keys(game.rowSets); //for (let setId in colIds) {

    for (var setId in game.colSets) {
      if (!game.colSets.hasOwnProperty(setId)) {
        continue;
      }

      if (game.colSets[setId].possiblePermutations.length > 1) {
        return true;
      } else {//removed console.log(setId + ' solved');
      }
    } //for (let setId in rowIds) {


    for (var _setId2 in game.rowSets) {
      if (!game.rowSets.hasOwnProperty(_setId2)) {
        continue;
      }

      if (game.rowSets[_setId2].possiblePermutations.length > 1) {
        return true;
      } else {//removed console.log(setId + ' solved');
      }
    }

    return false;
  };

  this.updateCellValues = function () {
    //removed console.log('in updateCellValues');
    for (var setId in game.rowSets) {
      if (!game.rowSets.hasOwnProperty(setId)) {
        continue;
      }

      var ndx = 0; //console.log(game.cells);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = game.rowSets[setId].cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cellId = _step.value;

          if (game.rowSets[setId].possiblePermutations.length > 1) {
            //removed console.log('not a unique solution, exiting updateCellValues');
            continue;
          } // .setValue() not working--'cell' does not know it is a PlayCell object?


          var cell = game.findCell(cellId);
          var permutation = game.rowSets[setId].possiblePermutations[0]; // only one left

          cell.setValue(permutation[ndx++]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  };

  this.printPermutations = function () {
    // print out remaining permutations
    for (var setId in game.rowSets) {
      if (!game.rowSets.hasOwnProperty(setId)) {
        continue;
      } //removed console.log(setId);


      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = game.rowSets[setId].possiblePermutations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {//removed console.log(setId, perm);

          var perm = _step2.value;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    for (var _setId3 in game.colSets) {
      if (!game.colSets.hasOwnProperty(_setId3)) {
        continue;
      } //removed console.log(setId);


      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = game.colSets[_setId3].possiblePermutations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {//removed console.log(setId, perm);

          var _perm = _step3.value;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  };

  this.generatePermutations = function () {
    // for every combination in every set, create permutations and assign to set.possiblePermutations
    //removed console.log('in generatePermutations');
    for (var setId in game.rowSets) {
      if (!game.rowSets.hasOwnProperty(setId)) {
        continue;
      }

      game.rowSets[setId].possiblePermutations = [];
      var permutations = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = game.rowSets[setId].possibleCombos[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var combo = _step4.value;
          // for (comboId = 0, len = game.rowSets[setId].possibleCombos.length; comboId < len; comboId++) {
          //     combo = game.rowSets[setId].possibleCombos[comboId];
          // permutations = permutations.concat(permutator(combo));
          //permutations.push(permutator(combo));
          permutations = permutator(combo);
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = permutations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var perm = _step5.value;
              game.rowSets[setId].possiblePermutations.push(perm);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                _iterator5["return"]();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        } //game.rowSets[setId].possiblePermutations = permutations;

      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    for (var _setId4 in game.colSets) {
      if (!game.colSets.hasOwnProperty(_setId4)) {
        continue;
      }

      game.colSets[_setId4].possiblePermutations = [];
      var _permutations = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = game.colSets[_setId4].possibleCombos[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _combo = _step6.value;
          // for (comboId = 0, len = game.colSets[setId].possibleCombos.length; comboId < len; comboId++) {
          //     combo = game.colSets[setId].possibleCombos[comboId];
          // permutations = permutations.concat(permutator(combo));
          // permutations.push(permutator(combo));
          _permutations = permutator(_combo);
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = _permutations[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _perm2 = _step7.value;

              game.colSets[_setId4].possiblePermutations.push(_perm2);
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                _iterator7["return"]();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        } //game.colSets[setId].possiblePermutations = permutations;

      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    } // check that all permutations are created
    //removed console.log('game.rowSets', game.rowSets);
    //removed console.log('game.colSets', game.colSets);

  };

  this.generatePermutationsFast = function () {
    // for every combination in every set, create permutations and assign to set.possiblePermutations
    //removed console.log('in generatePermutations');
    // tighten execution times of inner loops
    // declare variables outside of loops
    var combo, perm, permutations, setId, combos, possiblePermutations;

    for (setId in game.rowSets) {
      if (!game.rowSets.hasOwnProperty(setId)) {
        continue;
      }

      game.rowSets[setId].possiblePermutations = []; //permutations = [];

      possiblePermutations = [];
      combos = game.rowSets[setId].possibleCombos; //for (combo of combos) {

      for (var comboId = 0; comboId < combos.length; comboId++) {
        // for (comboId = 0, len = game.rowSets[setId].possibleCombos.length; comboId < len; comboId++) {
        //     combo = game.rowSets[setId].possibleCombos[comboId];
        // permutations = permutations.concat(permutator(combo));
        //permutations.push(permutator(combo));
        permutations = permutator(combos[comboId]);
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = permutations[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            perm = _step8.value;
            possiblePermutations.push(perm);
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      } //game.rowSets[setId].possiblePermutations = permutations;


      game.rowSets[setId].possiblePermutations = possiblePermutations;
    }

    for (setId in game.colSets) {
      if (!game.colSets.hasOwnProperty(setId)) {
        continue;
      }

      game.colSets[setId].possiblePermutations = []; //permutations = [];

      possiblePermutations = [];
      combos = game.colSets[setId].possibleCombos; //for (combo of combos) {

      for (var _comboId = 0; _comboId < combos.length; _comboId++) {
        // for (comboId = 0, len = game.colSets[setId].possibleCombos.length; comboId < len; comboId++) {
        //     combo = game.colSets[setId].possibleCombos[comboId];
        // permutations = permutations.concat(permutator(combo));
        // permutations.push(permutator(combo));
        permutations = permutator(combos[_comboId]);
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = permutations[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            perm = _step9.value;
            possiblePermutations.push(perm);
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }
      }

      game.colSets[setId].possiblePermutations = possiblePermutations; //game.colSets[setId].possiblePermutations = permutations;
    } // check that all permutations are created
    //removed console.log('game.rowSets', game.rowSets);
    //removed console.log('game.colSets', game.colSets);

  };

  this.pruneAllImpossiblePermutations = function () {
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
    for (var setId in game.colSets) {
      if (!game.colSets.hasOwnProperty(setId)) {
        continue;
      } //removed console.log('--------------------------');


      this.pruneImpossiblePermutationsInSet(game.colSets[setId]);
    } //for (let setId in rowIds) {


    for (var _setId5 in game.rowSets) {
      if (!game.rowSets.hasOwnProperty(_setId5)) {
        continue;
      } //removed console.log('--------------------------');


      this.pruneImpossiblePermutationsInSet(game.rowSets[_setId5]);
    } // for (let setId of revRowSets) {
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

  this.pruneImpossiblePermutationsInSet = function (testSet) {
    // remove permutations from this set that contain values not present in that position of any crossing set permutation
    //removed console.log('in pruneImpossiblePermutations');
    //removed console.log('testSet.possiblePermutations', testSet.possiblePermutations);
    var crossingSets = this.findCrossingSets(testSet); // build a new array of possible combos, not including impossible ones

    var newPossiblePermutations = []; //let reassignPossPermsFlag = false;
    //     console.log('________________________________');
    //     console.log('________________________________');
    // get div to to display progress
    //let solutionsDiv = document.getElementById("solutionsDiv");
    // write progress
    //solutionsDiv.innerHTML += "<br><br>" + testSet.id;

    for (var permId in testSet.possiblePermutations) {
      if (!testSet.possiblePermutations.hasOwnProperty(permId)) {
        continue;
      } // write progress
      // if (permId % 1000 === 0) {
      //     solutionsDiv.innerHTML += "<br>permId " + permId + " of " + testSet.possiblePermutations.length;
      // }
      // i need to rule out every permutation that doesn't correspond to some extant permutation at each crossing set
      //removed console.time('isImpossiblePermutation');


      var isPossiblePerm = !this.isImpossiblePermutation(testSet, crossingSets, testSet.possiblePermutations[permId]); //removed console.timeEnd('isImpossiblePermutation');

      if (isPossiblePerm) {
        if (typeof newPossiblePermutations === 'undefined') {
          newPossiblePermutations = [];
        }

        newPossiblePermutations.push(testSet.possiblePermutations[permId]); //isTotallyPossible = true;
        //removed console.log('retained permutation');
        //reassignPossPermsFlag = true;
      } else {//removed console.log('discarded permutation');
        }
    } // if (false && isTotallyPossible) {
    //     console.log('  stored pairing at [permGroupId]:', permGroupId);
    //     //testSet.possiblePermutations[permGroupId] = newPossiblePermutations[permGroupId];
    //     reassignPossPermsFlag = true;
    // } else {
    //     console.log('  deleting pairing at [permGroupId]:', permGroupId);
    // }
    //}
    //if (reassignPossPermsFlag) {
    // assign current possible permutations back to set


    testSet.possiblePermutations = newPossiblePermutations; //
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
  }; // returns true for impossible as soon as it finds a cell.playValue or one crossing set that forbids this permutation


  this.isImpossiblePermutation = function (testSet, crossingSets, permutation) {
    // I wanted to check that I was working with OK data
    // if (testSet.cells.length === crossingSets.length) {
    //     console.log('correct lengths');
    // } else {
    //     console.log('!!! incorrect lengths !!!');
    //     return false; // permutation/crossing sets length mismatch
    // }
    // added tests for existing playCell.playValue's
    // the next two for loops use this length
    var len = testSet.cells.length;

    for (var ndx = 0; ndx < len; ndx++) {
      // playValue is set and rules out this permutation
      if (testSet.cells[ndx].playValue > 0 && testSet.cells[ndx].playValue !== permutation[ndx]) {
        //removed console.log('permutation conflicts with playValue:', testSet.cells[ndx].playValue);
        return true;
      }
    } // could be (?) sped up if we kept an association between combination and permutation array,
    // and checked combo.inArray(permutation[ndx] before running through that permutation group
    // requires creating an array at the same index as the combination for the return from permutator(combo) in generatePermutations()
    // and a little bit more housekeeping with combinations which are currently not pruned when permutations are removed


    for (var _ndx = 0; _ndx < len; _ndx++) {
      // needs to be a possible matched crossing permutation for every location (ndx) in this permutation
      // crossing set permutations rule out this permutation
      if (this.isImpossiblePermutationAtCell(testSet, crossingSets[_ndx], permutation, _ndx)) {
        //removed console.log('found an impossible pairing at ndx:', ndx);
        return true;
      } else {//removed console.log('found a possible pairing at ndx:', ndx);
      }
    } // got through the cells and there is a possible permutation in every crossing set


    return false;
  };

  this.isImpossiblePermutationAtCell = function (testSet, crossingSet, perm, loc) {
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
    var digit = perm[loc]; // used to compute offsets for crossing set permutations

    var offset = this.getOffset(testSet, crossingSet); // each array of permutation arrays
    //for (let testPerm of crossingSet.possiblePermutations) {

    for (var testPermNdx = 0, len = crossingSet.possiblePermutations.length; testPermNdx < len; testPermNdx++) {
      var testDigit = crossingSet.possiblePermutations[testPermNdx][offset];
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
      } else {//removed console.log('not a match');
      }
    } // tried every permutation in crossing set and none allow for this permutation


    return true;
  };

  this.getOffset = function (testSet, crossingSet) {
    // return the array index of the intersected cell in the crossing set
    // const col = testSet.col;
    // const row = testSet.row;
    // get row,col components of game cell id
    //const coords = crossingSetId.match(/(\d+,\d+)/g)[0].split(',');
    //console.log('row col coords:', row, col, coords);
    //const inCrossingColumn = (testSet.setType === "row");
    var offset; //console.log('coords', coords);
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
      offset = testSet.row - crossingSet.row - 1; //console.log('coords, row, offset', coords, row, offset);
    } else {
      offset = testSet.col - crossingSet.col - 1; //console.log('coords, col, offset', coords, col, offset);
    }

    return offset;
  };

  this.pruneAllImpossibleCombos = function () {
    //removed console.log('in pruneAllImpossibleCombos');
    //let solutionsDiv = document.getElementById('solutionsDiv');
    for (var setId in game.rowSets) {
      if (!game.rowSets.hasOwnProperty(setId)) {
        continue;
      } // check for unique values in set and in every possible crossing set
      // check for correct sum in set and in every crossing set
      // using minimum and maximum of each possible set, prune those which have unacceptable values
      // for pairs of sets that must share a value, prune sets that cannot share a value at that point
      // order sets by # possibilities, low to high
      // choose a low # set and set values, try to solve the rest
      // backtrack and try again


      this.pruneImpossibleCombos(game.rowSets[setId]);
    }

    for (var _setId6 in game.colSets) {
      // do as above but for columnar sets instead of row sets
      if (!game.colSets.hasOwnProperty(_setId6)) {
        continue;
      } //solutionsDiv.innerText += "\n" + JSON.stringify(game.colSets[setId]);
      //console.log(setId, game.colSets[setId].possibleCombos);


      this.pruneImpossibleCombos(game.colSets[_setId6]);
    }
  };

  this.pruneImpossibleCombos = function (testSet) {
    // remove combos from this set that contain values not present in any crossing set
    //removed console.log('in pruneImpossibleCombos');
    //console.log('testSet.possibleCombos', testSet.possibleCombos);
    if (testSet == null || testSet == undefined || testSet.cells == undefined || testSet.cells == null || testSet.cells.length === 0) {
      //removed console.log('zero-length set cells');
      return false;
    }

    var crossingSets = this.findCrossingSets(testSet); // build a new array of possible combos, not including impossible ones

    var newPossibleCombos = [];

    for (var comboId in testSet.possibleCombos) {
      if (!testSet.possibleCombos.hasOwnProperty(comboId)) {
        continue;
      }

      var combo = testSet.possibleCombos[comboId];

      if (!this.isImpossibleCombo(crossingSets, combo)) {
        newPossibleCombos.push(combo);
      }
    }

    testSet.possibleCombos = newPossibleCombos; //console.log('end in pruneImpossibleCombos', testSet.possibleCombos);
  };

  this.isImpossibleCombo = function (crossingSets, combo) {
    // this combo contains at least one value not present in any crossing set's possible combinations
    //removed console.log('in isImpossibleCombo', combo);
    var allPossibles = [];
    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
      for (var _iterator10 = crossingSets[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
        var set = _step10.value;
        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = set.possibleCombos[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var testCombo = _step12.value;
            //console.log(testCombo);
            // trying to rule some out early
            // if (combo[0] > testCombo[testCombo.length - 1] || combo[combo.length - 1] < testCombo[0]) {
            //     // combos don't overlap any digits
            //     continue;
            // }
            allPossibles = allPossibles.concat(testCombo);
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
              _iterator12["return"]();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError10 = true;
      _iteratorError10 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
          _iterator10["return"]();
        }
      } finally {
        if (_didIteratorError10) {
          throw _iteratorError10;
        }
      }
    }

    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
      for (var _iterator11 = combo[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
        var digit = _step11.value;

        if (!this.isInArray(allPossibles, digit)) {
          //console.log(digit + ' not available in ' + allPossibles);
          return true;
        }
      } //console.log(allPossibles + ' contains a digit of ' + combo);

    } catch (err) {
      _didIteratorError11 = true;
      _iteratorError11 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
          _iterator11["return"]();
        }
      } finally {
        if (_didIteratorError11) {
          throw _iteratorError11;
        }
      }
    }

    return false;
  };

  this.findCrossingSets = function (testSet) {
    // returns an array of all the sets intersecting testSet
    //removed console.log('in findCrossingSets');
    if (testSet == null || testSet == undefined || testSet.cells == undefined || testSet.cells == null || testSet.cells.length === 0) {
      //removed console.log('zero-length set cells');
      return false;
    }

    var crossingSets = [];

    if (testSet.setType === 'row') {
      // collect the crossing sets
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = testSet.cells[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var cellId = _step13.value;
          var cell = testSet.getCell(cellId);
          crossingSets.push(game.colSets[cell.colSet]);
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }
    } else if (testSet.setType === 'col') {
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = testSet.cells[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var _cellId = _step14.value;

          var _cell = testSet.getCell(_cellId); // console.log(cellId);


          crossingSets.push(game.rowSets[_cell.rowSet]);
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
            _iterator14["return"]();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
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


  this.isInArray = function (arr, digit) {
    // return true if digit is equal to an array item
    // better I think, to just use built in
    // array.inArray(item) which returns the first index containing item, or -1 if not found
    // console.log('in isInArray', digit);
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
      for (var _iterator15 = arr[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
        var setDigit = _step15.value;

        if (setDigit === digit) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError15 = true;
      _iteratorError15 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
          _iterator15["return"]();
        }
      } finally {
        if (_didIteratorError15) {
          throw _iteratorError15;
        }
      }
    }

    return false;
  }; // altered approach to algorithm, maybe much faster


  this.assignAllPossibleCellValues = function () {// loop through cells and run assignPossibleCellValues(cell)
  };

  this.assignPossibleCellValues = function (cell) {// set the possible values at this cell
  };

  this.pruneAllImpossibleCellValues = function () {// loop through cells and run pruneImpossibleCellValues(cell)
  };

  this.pruneImpossibleCellValues = function (cell) {
    // remove cell values where:
    //  a. they would be repeating in a row or column
    //  b. they, in combination with nearby cell values, couldn't add to the sums
    // determined by ???
    return;
  };
} // may be a fool's errand
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


var solver = new Solver(); //solver.solve();

/*solver.explore();*/