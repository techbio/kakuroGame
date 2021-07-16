"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
filename: BitmapDigit.js
description: functions to manipulate bitmaps of digits for Kakuro

            algorithm for solving: TBD
                for each row/colSet, assign a permissive default bitmap to each cell
                for every crossing set cell, restrict bitmap according to known NOTs and possibles (AND with crossing combo bitmap)

author: cwmoore
date: 7/14/21
*/
var applyBitmapToSet = function applyBitmapToSet(set, bitmap) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      cell = _step.value;

      // iterate through cells in set
      for (digit = 1; digit <= 9; digit++) {
        // iterate through digits in bitmap
        // cell.possibleBitmap[digit] |= bitmap[digit]; // TODO logic?
        cell.possibleBitmap[digit] = orTwoBitmaps(cell.possibleBitmap[digit], bitmap[digit]); // TODO this paramter is imaginary
        // cell.possibleBitmap[digit] = andTwoBitmaps(cell.possibleBitmap[digit], bitmap[digit]); // TODO again, logic...
      }
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
}; // generate data structure, booleans for digits 1-9


var emptyBitmap = function emptyBitmap() {
  return [0, // use extra bit at index 0? operator? null or marked flag?
  0, 0, 0, // 1, 2, 3
  0, 0, 0, // 4, 5, 6
  0, 0, 0 // 7, 9, 8
  ];
}; // switch 0s to 1s and vice versa


var invertBitmap = function invertBitmap(bitmap) {
  var invertedBitmap = emptyBitmap();

  for (digit in invertedBitmap) {
    invertedBitmap[digit] = bitmap[digit] ? 0 : 1;
  }

  return invertedBitmap;
}; // get bitmap for a digit 1-9


var digitToBitmap = function digitToBitmap() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var bitmap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (bitmap === false) {
    bitmap = emptyBitmap();
  }

  if (digit === -1) {
    bitmap = invertBitmap(bitmap);
  }

  if (Number.isInteger(digit) && (digit >= 1 || digit >= 9)) {
    // if (bitmap[digit]) return 'overlap alert';
    bitmap[digit] = 1;
  }

  return bitmap;
}; // get bitmap from array of digits


var digitsToBitmap = function digitsToBitmap(digits) {
  var bitmap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (bitmap === false) {
    bitmap = emptyBitmap();
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = digits[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      digit = _step2.value;
      bitmap = digitToBitmap(digit, bitmap);
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

  return bitmap;
}; // set digit positions to 0


var removeDigitsFromBitmap = function removeDigitsFromBitmap() {
  var digits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var bitmap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (bitmap === false) {
    bitmap = emptyBitmap();
  }

  var row, column;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = digits[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      digit = _step3.value;
      bitmap[digit] = 0;
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

  return bitmap;
}; // given a bitmap, which digits are represented


var digitsFromBitmap = function digitsFromBitmap(bitmap) {
  var digits = [];

  for (digit in bitmap) {
    if (digit >= 1 && digit <= 9) {
      if (bitmap[digit]) {
        digits.push(digit);
      }
    }
  }

  return digits;
}; // calculate the sum of the digits in the bitmap (max 45)


var sumOfDigitsInBitmap = function sumOfDigitsInBitmap(bitmap) {
  var sum = 0;
  var digits = digitsFromBitmap(bitmap);
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = digits[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      digit = _step4.value;
      sum += digit;
    }
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

  return sum;
}; // create a bitmap from an array of bitmaps OR'd


var orBitmaps = function orBitmaps(bitmaps) {
  var mergedBitmap = emptyBitmap();
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = bitmaps[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      bitmap = _step5.value;
      mergedBitmap = orTwoBitmaps(mergedBitmap, bitmap);
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

  return mergedBitmap;
}; // create a bitmap from two bitmaps OR'd


var orTwoBitmaps = function orTwoBitmaps(bitmap1, bitmap2) {
  var mergedBitmap = emptyBitmap();

  for (digit in mergedBitmap) {
    mergedBitmap[digit] = bitmap1[digit] || bitmap2[digit];
  }

  return mergedBitmap;
}; // create a bitmap from an array of bitmaps AND'd


var andBitmaps = function andBitmaps(bitmaps) {
  var mergedBitmap = invertBitmap(emptyBitmap());
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = bitmaps[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      bitmap = _step6.value;
      mergedBitmap = andTwoBitmaps(mergedBitmap, bitmap);
    }
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

  return mergedBitmap;
}; // create a bitmap from two bitmaps AND'd


var andTwoBitmaps = function andTwoBitmaps(bitmap1, bitmap2) {
  var mergedBitmap = emptyBitmap();

  for (digit in mergedBitmap) {
    mergedBitmap[digit] = bitmap1[digit] && bitmap2[digit];
  }

  return mergedBitmap;
}; // true if no bitmaps in array have the same digits set, false if any digit is set twice


var nonOverlappingBitmaps = function nonOverlappingBitmaps(bitmaps) {
  var markedBitmap = emptyBitmap();
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = bitmaps[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      bitmap = _step7.value;

      for (digit in bitmap) {
        if (markedBitmap[digit] && bitmap[digit]) {
          return false; // overlap detected
        }

        markedBitmap[digit] = markedBitmap[digit] || bitmap[digit]; // mark digit
      }
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

  return true; // no overlap detected
}; // for display


var empty2DBitmapArray = function empty2DBitmapArray() {
  return [[0, 0, 0], //  1, 2, 3
  [0, 0, 0], //  4, 5, 6
  [0, 0, 0] //  7, 8, 9
  ];
}; // from 10 digit array to 2D array


var bitmapTo2DArray = function bitmapTo2DArray(bitmap) {
  var bitmap2DArr = empty2DBitmapArray();
  var digit = 1;

  for (row in bitmap2DArr) {
    for (column in bitmap2DArr[row]) {
      bitmap2DArr[row][column] = bitmap[digit];
      digit += 1;
    }
  }

  return bitmap2DArr;
}; // from 2D array to 10 digit array


var bitmapFrom2DArray = function bitmapFrom2DArray(bitmap2DArr) {
  var bitmap = emptyBitmap();

  for (digit in bitmap) {
    var _digitToIndices = digitToIndices(digit);

    var _digitToIndices2 = _slicedToArray(_digitToIndices, 2);

    row = _digitToIndices2[0];
    column = _digitToIndices2[1];
    bitmap[digit] = bitmap2DArr[row][column];
  }

  return bitmap;
}; //   use digit === index instead
// get bitmap row/column for a digit


var digitToIndices = function digitToIndices(digit) {
  if (digit < 1 || digit > 9) return [false, false];
  var row, column;
  row = Math.floor((digit - 1) / 3);
  column = (digit - 1) % 3;
  return [row, column];
}; // get bitmap as an HTML table


var bitmapToHTML = function bitmapToHTML(bitmap) {
  bitmap2D = bitmapTo2DArray(bitmap);
  var html = '';
  html += '<div class="bitmap_display">\n';
  html += '\t<div class="digitsbitmap_table">\n';

  for (row in bitmap2D) {
    html += "\t\t<div class=\"digitsbitmap_row\">\n";

    for (column in bitmap2D[row]) {
      html += "\t\t\t<div class=\"digitsbitmap_column ".concat(bitmap2D[row][column] ? 'digit_present' : 'digit_absent', "\">").concat(bitmap2D[row][column], "</div>\n");
    }

    html += "\t\t</div>\n";
  }

  html += "\t</div>\n";
  html += "</div>\n";
  return html;
};

var bitmapInfo = function bitmapInfo(bitmap) {
  return {
    'length': digitsFromBitmap().length,
    'sum': sumOfDigitsInBitmap(bitmap)
  };
};
/*
// no document object in nodejs...
const bitmapToDOM = (bitmap) => {
    let blankBitmap = emptyBitmap();

    let doc, table, tr, td;
    doc = document.createElement('div');
    table = document.createElement('table');
    table.classList.push('digitsbitmap_table');

    for (row in blankBitmap) {
        tr = document.createElement('tr');
        tr.classList.push('digitsbitmap_row');

        for (column in blankBitmap[row]) {
            td = document.createElement('td');
            if (bitmap[row][column] === 1) {
                td.classList.push('digit_present');
            } else {
                td.classList.push('digit_absent');
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    doc.appendChild(table);

    return doc.innerHTML;
}
*/
// build an array mirroring breakDownCombosArr with a bitmap for avery combination array


var buildBreakdownComboBitmaps = function buildBreakdownComboBitmaps() {
  var breakDownCombos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var breakdownCombosBitmaps = [];

  for (setLength in breakDownCombos) {
    breakdownCombosBitmaps[setLength] = []; // init

    for (sumVal in breakDownCombos[setLength]) {
      breakdownCombosBitmaps[setLength][sumVal] = []; // init

      for (setNdx in breakDownCombos[setLength][sumVal]) {
        breakdownCombosBitmaps[setLength][sumVal][setNdx] = digitsToBitmap(breakDownCombos[setLength][sumVal][setNdx]);
      }
    }
  }

  return breakdownCombosBitmaps;
}; // as above, mirroring breakDownComboArr with a bitmap for all combined combos of set-length/sum


var buildSumComboBitmaps = function buildSumComboBitmaps() {
  var breakDownCombos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var sumCombosBitmaps = [];

  for (setLength in breakDownCombos) {
    sumCombosBitmaps[setLength] = []; // init array

    for (sumVal in breakDownCombos[setLength]) {
      sumCombosBitmaps[setLength][sumVal] = []; // init array

      bitmapAcc = emptyBitmap();

      for (setNdx in breakDownCombos[setLength][sumVal]) {
        // each combo
        bitmapAcc = orTwoBitmaps(bitmapAcc, digitsToBitmap(breakDownCombos[setLength][sumVal][setNdx]));
      }

      sumCombosBitmaps[setLength][sumVal] = bitmapAcc;
    }
  }

  return sumCombosBitmaps;
}; // run some development tests of early functions


var tests = function tests() {
  var bitmapForNeg1 = digitToBitmap(-1);
  console.table(bitmapForNeg1);
  var bitmapFor1 = digitToBitmap(1);
  console.table(bitmapFor1);
  var bitmapFor1Sum = sumOfDigitsInBitmap(bitmapFor1);
  console.log(digitsFromBitmap(bitmapFor1), bitmapFor1Sum);
  var bitmapForSome = digitsToBitmap([4, 5, 6]);
  console.table(bitmapForSome);
  var bitmapForSomeSum = sumOfDigitsInBitmap(bitmapForSome);
  console.log(digitsFromBitmap(bitmapForSome), bitmapForSomeSum);
  var mergedb = orBitmaps([bitmapFor1, bitmapForSome]);
  console.table(mergedb);
  var bitmapForMergedbSum = sumOfDigitsInBitmap(mergedb);
  console.log(digitsFromBitmap(mergedb), bitmapForMergedbSum);
  var editedb = removeDigitsFromBitmap([3, 6, 9], mergedb);
  console.table(editedb);
  var bitmapForEditedbSum = sumOfDigitsInBitmap(editedb);
  console.log(digitsFromBitmap(editedb), bitmapForEditedbSum);
  console.table(digitsToBitmap([7, 8, 9])); //console.log(bitmapToHTML(digitsToBitmap([7,8,9])));
  //console.log(bitmapToDOM(digitsToBitmap([7,8,9], editedb)));

  console.log(nonOverlappingBitmaps([mergedb]));
  console.log(nonOverlappingBitmaps([mergedb, mergedb]));
  console.log(nonOverlappingBitmaps([mergedb, editedb]));
  console.log(nonOverlappingBitmaps([mergedb, invertBitmap(mergedb)]));
  console.table(bitmapTo2DArray(digitsToBitmap([7, 8, 9]))); // console.table(bitmapTo2DArray(digitsToBitmap([1,2,3,4,5,6,7,8,9])));
  // console.table(digitsToBitmap([1,2,3,4,5,6,7,8,9]));
}; //tests();
//solver.initialize();
//let bigCombPermArray = solver.breakDownComboArr.map((item) => item);
// TODO this works but it is big and slow
// let breakDownPermArr = breakDownPermutations();
// console.log(breakDownPermArr);
//console.table(reorderComboByPermutation());

/*

// breakdownCombosBitmaps = buildBreakdownComboBitmaps(solver.breakDownComboArr);
// sumCombosBitmaps = buildSumComboBitmaps(solver.breakDownComboArr);
breakdownCombosBitmaps = buildBreakdownComboBitmaps(bigCombPermArray);
sumCombosBitmaps = buildSumComboBitmaps(bigCombPermArray);

let allDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let allPermutations = [];
for (len = 0; len <= 9; len++)
{
    if (typeof allPermutations[len] != 'array') {
        allPermutations[len] = [];
    }

    for (i = 0; i + len <= allDigits.length; i++)
    {
        allPermutations[len].push(permutator(allDigits.slice(i, len)));
    }
}
console.log(JSON.stringify(allPermutations, null, 2));
*/
// set possible permutations, setup indexes/objects


solver.initialize(); //solver.initialize();

var fillPuzzleBitmaps = function fillPuzzleBitmaps(currentSetCells) {
  // if (!window || !window.document) { // show bitmaps in kakuro puzzle board, not commandline
  //     console.log('skipped in BitmapDigit.js, line 436');
  //     return;
  // }
  currentSetCells.map(function (cell) {
    var rowGameCell = cell.rowSet.getGameCell();
    var lenRow = rowGameCell.rowSet.cells.length;
    var sumRow = rowGameCell.rowSum;
    var colGameCell = cell.colSet.getGameCell();
    var lenCol = colGameCell.colSet.cells.length;
    var sumCol = colGameCell.rowSum;
    var rowComboBitmap = digitsToBitmap(solver.breakDownComboArr[lenRow][sumRow]); // row [setlength][sum]

    var colComboBitmap = digitsToBitmap(solver.breakDownComboArr[lenCol][sumCol]); // column [setlength][sum]

    var overlapBitmap = andTwoBitmaps(rowComboBitmap, colComboBitmap); // update possibles

    var cellEl = document.getElementById("cell".concat(cell.row, ",").concat(cell.col));
    cellEl.innerHTML = bitmapToHTML(overlapBitmap); // draw bitmap #s
  });
}; // iterate over row sets


game.gameCells.filter(function (currentGameCell) {
  return currentGameCell.rowSum >= 1 + 2 && currentGameCell.rowSet.cells;
}) // minimum allowed sum 3
.map(function (currentGameCell) {
  return fillPuzzleBitmaps(currentGameCell.getRowSet().cells);
}); // iterate over column sets

game.gameCells.filter(function (currentGameCell) {
  return currentGameCell.colSum >= 1 + 2 && currentGameCell.colSet.cells;
}).map(function (currentGameCell) {
  return fillPuzzleBitmaps(currentGameCell.getColSet().cells);
});
/*
// Object.keys(game.rowSets).map((setKey) => console.table(game.rowSets[setKey]));
// Object.keys(game.colSets).map((setKey) => console.table(game.colSets[setKey]));



// to get to all sets:
// testGameCells = document.querySelectorAll(".gameCell:not(.noline)");
// testGameCells.filter((gameCell) => gameCell)




// console.log('show bitmaps of combos for various length/sum parameters');
// console.table(bitmapTo2DArray(sumCombosBitmaps[8][40]));
// console.table(bitmapTo2DArray(sumCombosBitmaps[3][10]));
// console.table(bitmapTo2DArray(sumCombosBitmaps[3][13]));
// console.table(bitmapTo2DArray(sumCombosBitmaps[4][17]));

// console.table(bitmapTo2DArray(sumCombosBitmaps[4][10]));
// console.table(bitmapTo2DArray(sumCombosBitmaps[5][18]));
// console.table(bitmapTo2DArray(andBitmaps([sumCombosBitmaps[4][10],sumCombosBitmaps[5][18]])));
// console.table(bitmapTo2DArray(orBitmaps([sumCombosBitmaps[4][10],sumCombosBitmaps[5][18]])));

*/

/*
solver.initialize();
let sumCombosBitmaps = solver.breakDownComboArr;


document.getElementById('cell1,5').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[3][10]), // column [setlength][sum]
        digitsToBitmap(sumCombosBitmaps[4][17]) // row [setlength][sum]
    )
);
document.getElementById('cell1,6').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[2][16]), // column
        digitsToBitmap(sumCombosBitmaps[4][17]) // row
    )
);
document.getElementById('cell1,7').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[8][40]), // column
        digitsToBitmap(sumCombosBitmaps[4][17]) // row
    )
);
document.getElementById('cell1,8').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[3][11]), // column
        digitsToBitmap(sumCombosBitmaps[4][17]) // row
    )
);
document.getElementById('cell2,5').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[3][10]), // column
        digitsToBitmap(sumCombosBitmaps[5][18]) // row
    )
);
document.getElementById('cell3,5').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[3][10]), // column
        digitsToBitmap(sumCombosBitmaps[3][13]) // row
    )
);
document.getElementById('cell2,6').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[2][16]), // column
        digitsToBitmap(sumCombosBitmaps[5][18]) // row
    )
);
document.getElementById('cell2,7').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[8][40]), // column
        digitsToBitmap(sumCombosBitmaps[5][18]) // row
    )
);
document.getElementById('cell2,8').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[3][11]), // column
        digitsToBitmap(sumCombosBitmaps[5][18]) // row
    )
);
document.getElementById('cell2,9').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[2][3]), // column
        digitsToBitmap(sumCombosBitmaps[5][18]) // row
    )
);
document.getElementById('cell3,7').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[8][40]), // column
        digitsToBitmap(sumCombosBitmaps[3][19]) // row
    )
);
document.getElementById('cell3,8').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[3][11]), // column
        digitsToBitmap(sumCombosBitmaps[3][19]) // row
    )
);
document.getElementById('cell3,9').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[2][3]), // column
        digitsToBitmap(sumCombosBitmaps[3][19]) // row
    )
);
/*
*/