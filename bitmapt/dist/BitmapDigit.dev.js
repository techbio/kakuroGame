"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
filename: BitmapDigit.js
description: functions to manipulate bitmaps of digits for Kakuro
author: cwmoore
date: 7/14/21
*/
// generate data structure, booleans for digits 1-9
var emptyBitmap = function emptyBitmap() {
  var bitmap = [[0, 0, 0], // 1,2,3
  [0, 0, 0], // 4,5,6
  [0, 0, 0] // 7,8,9
  ];
  return bitmap; // obviously this could be more compactly written as stored as 000000000, as a string, or boolean with each index 2^^digit
}; // get bitmap row/column for a digit


var digitToIndices = function digitToIndices(digit) {
  var row, column;
  row = Math.floor((digit - 1) / 3);
  column = (digit - 1) % 3;
  return [row, column];
}; // switch 0s to 1s and vice versa


var invertBitmap = function invertBitmap(bitmap) {
  var invertedBitmap = emptyBitmap();

  for (row in invertedBitmap) {
    for (column in invertedBitmap[row]) {
      invertedBitmap[row][column] = bitmap[row][column] === 1 ? 0 : 1;
    }
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
    var _digitToIndices = digitToIndices(digit),
        _digitToIndices2 = _slicedToArray(_digitToIndices, 2),
        _row = _digitToIndices2[0],
        _column = _digitToIndices2[1];

    bitmap[_row][_column] = 1;
  }

  return bitmap;
}; // get bitmap from array of digits


var digitsToBitmap = function digitsToBitmap(digits) {
  var bitmap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (bitmap === false) {
    bitmap = emptyBitmap();
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = digits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      digit = _step.value;
      bitmap = digitToBitmap(digit, bitmap);
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

  return bitmap;
}; // set digit positions to 0


var removeDigitsFromBitmap = function removeDigitsFromBitmap() {
  var digits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var bitmap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (bitmap === false) {
    bitmap = emptyBitmap();
  }

  var row, column;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = digits[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      digit = _step2.value;

      var _digitToIndices3 = digitToIndices(digit);

      var _digitToIndices4 = _slicedToArray(_digitToIndices3, 2);

      row = _digitToIndices4[0];
      column = _digitToIndices4[1];
      bitmap[row][column] = 0;
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
}; // given a bitmap, which digits are represented


var digitsFromBitmap = function digitsFromBitmap(bitmap) {
  var digits = [];
  var digit = 1;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (bitmap[i][j]) {
        digits.push(digit);
      }

      digit += 1;
    }
  }

  return digits;
}; // calculate the sum of the digits in the bitmap (max 45)


var sumOfDigitsInBitmap = function sumOfDigitsInBitmap(bitmap) {
  var sum = 0;
  var digits = digitsFromBitmap(bitmap);
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = digits[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      digit = _step3.value;
      sum += digit;
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

  return sum;
}; // create a bitmap from an array of bitmaps OR'd


var orBitmaps = function orBitmaps(bitmaps) {
  var mergedBitmap = emptyBitmap();
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = bitmaps[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      bitmap = _step4.value;
      mergedBitmap = orTwoBitmaps(mergedBitmap, bitmap);
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

  return mergedBitmap;
}; // create a bitmap from two bitmaps OR'd


var orTwoBitmaps = function orTwoBitmaps(bitmap1, bitmap2) {
  var mergedBitmap = emptyBitmap();

  for (var _i2 = 0, _arr2 = [0, 1, 2]; _i2 < _arr2.length; _i2++) {
    row = _arr2[_i2];

    for (var _i3 = 0, _arr3 = [0, 1, 2]; _i3 < _arr3.length; _i3++) {
      column = _arr3[_i3];
      //if (mergedBitmap[row][column] && bitmap[row][column]) return false; // overlapping
      mergedBitmap[row][column] = bitmap1[row][column] || bitmap2[row][column];
    }
  }

  return mergedBitmap;
}; // create a bitmap from an array of bitmaps AND'd


var andBitmaps = function andBitmaps(bitmaps) {
  var mergedBitmap = emptyBitmap();
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = bitmaps[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      bitmap = _step5.value;
      mergedBitmap = andTwoBitmaps(mergedBitmap, bitmap);
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
}; // create a bitmap from two bitmaps AND'd


var andTwoBitmaps = function andTwoBitmaps(bitmap1, bitmap2) {
  var mergedBitmap = emptyBitmap();

  for (var _i4 = 0, _arr4 = [0, 1, 2]; _i4 < _arr4.length; _i4++) {
    row = _arr4[_i4];

    for (var _i5 = 0, _arr5 = [0, 1, 2]; _i5 < _arr5.length; _i5++) {
      column = _arr5[_i5];
      //if (mergedBitmap[row][column] && bitmap[row][column]) return false; // overlapping
      mergedBitmap[row][column] = bitmap1[row][column] && bitmap2[row][column];
    }
  }

  return mergedBitmap;
}; // true if no bitmaps in array have the same digits set, false if any digit is set twice


var nonOverlappingBitmaps = function nonOverlappingBitmaps(bitmaps) {
  var mergedBitmap = emptyBitmap();
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = bitmaps[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      bitmap = _step6.value;

      for (var _i6 = 0, _arr6 = [0, 1, 2]; _i6 < _arr6.length; _i6++) {
        row = _arr6[_i6];

        for (var _i7 = 0, _arr7 = [0, 1, 2]; _i7 < _arr7.length; _i7++) {
          column = _arr7[_i7];
          if (mergedBitmap[row][column] && bitmap[row][column]) return false;
          mergedBitmap[row][column] = mergedBitmap[row][column] || bitmap[row][column];
        }
      }
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

  return true; //mergedBitmap;
}; // get bitmap as an HTML table


var bitmapToHTML = function bitmapToHTML(bitmap) {
  var blankBitmap = emptyBitmap();
  var html = '<table class="digitsbitmap_table">\n';

  for (row in blankBitmap) {
    html += "\t<tr class=\"digitsbitmap_row\">\n";

    for (column in blankBitmap[row]) {
      if (bitmap[row][column] === 1) {
        html += "\t\t<td class=\"digit_present\">".concat(bitmap[row][column], "</td>\n");
      } else {
        html += "\t\t<td class=\"digit_absent\"></td>\n";
      }
    }

    html += "\t</tr>\n";
  }

  html += "</table>\n";
  html += "<div>N: ".concat(digitsFromBitmap().length, ", Sum: ").concat(sumOfDigitsInBitmap(bitmap), "</div>\n");
  return html;
};
/* not in nodejs
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
};

tests(); // const ?digits = {
//     1: '100000000',
//     2: '010000000',
//     3: '001000000',
//     4: '000100000',
//     5: '000010000',
//     6: '000001000',
//     7: '000000100',
//     8: '000000010',
//     9: '000000001',
// };
// const ?digits = {
//     9: '100000000',
//     8: '010000000',
//     7: '001000000',
//     6: '000100000',
//     5: '000010000',
//     4: '000001000',
//     3: '000000100',
//     2: '000000010',
//     1: '000000001',
// };
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
}; // mirroring breakDownComboArr with a bitmap for all combined combos of set-length/sum


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
}; // breakdownCombosBitmaps = buildBreakdownComboBitmaps(solver.breakDownComboArr);
// console.table(breakdownCombosBitmaps[4][10][0]);
// sumCombosBitmaps = buildSumComboBitmaps(solver.breakDownComboArr);
// console.table(sumCombosBitmaps[4][10]);