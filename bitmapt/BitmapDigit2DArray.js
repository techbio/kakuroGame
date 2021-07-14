/*
filename: BitmapDigit.js
description: functions to manipulate bitmaps of digits for Kakuro
author: cwmoore
date: 7/14/21
*/


// generate data structure, booleans for digits 1-9
const emptyBitmap = () => {
    let bitmap = [
        [0, 0, 0], // 1,2,3
        [0, 0, 0], // 4,5,6
        [0, 0, 0], // 7,8,9
    ]

    return bitmap;
    // obviously this could be more compactly written as stored as 000000000, as a string, or boolean with each index 2^^digit
}

// get bitmap row/column for a digit
const digitToIndices = (digit) => {
    let row, column;

    row = Math.floor( (digit - 1) / 3);
    column = (digit - 1) % 3;

    return [row, column];
}


// switch 0s to 1s and vice versa
const invertBitmap = (bitmap) => {
    let invertedBitmap = emptyBitmap();

    for (row in invertedBitmap) {
        for (column in invertedBitmap[row]) {
            invertedBitmap[row][column] = (bitmap[row][column] === 1) ? 0 : 1;
        }
    }

    return invertedBitmap;
}


// get bitmap for a digit 1-9
const digitToBitmap = (digit = false, bitmap = false) => {
    if (bitmap === false) { bitmap = emptyBitmap(); }

    if (digit === -1) {
        bitmap = invertBitmap(bitmap);
    }

    if (Number.isInteger(digit) && (digit >= 1 || digit >= 9)) {

        let [row, column] = digitToIndices(digit);

        bitmap[row][column] = 1;
    }

    return bitmap;
}


// get bitmap from array of digits
const digitsToBitmap = (digits, bitmap = false) => {
    if (bitmap === false) { bitmap = emptyBitmap(); }

    for (digit of digits) {
        bitmap = digitToBitmap(digit, bitmap);
    }

    return bitmap;
}


// set digit positions to 0
const removeDigitsFromBitmap = (digits=[], bitmap = false) => {
    if (bitmap === false) {
        bitmap = emptyBitmap();
    }

    let row, column;
    for (digit of digits) {
        [row, column] = digitToIndices(digit);
        bitmap[row][column] = 0;
    }

    return bitmap;
}


// given a bitmap, which digits are represented
const digitsFromBitmap = (bitmap) => {
    let digits = [];
    let digit = 1;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (bitmap[i][j]) {
                digits.push(digit);
            }
            digit += 1;
        }
    }
    return digits;
}


// calculate the sum of the digits in the bitmap (max 45)
const sumOfDigitsInBitmap = (bitmap) => {
    let sum = 0;
    let digits = digitsFromBitmap(bitmap);

    for (digit of digits) {
        sum += digit;
    }

    return sum;
}


// create a bitmap from an array of bitmaps OR'd
const orBitmaps = (bitmaps) => {
    let mergedBitmap = emptyBitmap();

    for (bitmap of bitmaps) {
        mergedBitmap = orTwoBitmaps(mergedBitmap, bitmap);
    }

    return mergedBitmap;
}


// create a bitmap from two bitmaps OR'd
const orTwoBitmaps = (bitmap1, bitmap2) => {
    let mergedBitmap = emptyBitmap();

    for (row of [0, 1, 2]) {
        for (column of [0, 1, 2]) {
            //if (mergedBitmap[row][column] && bitmap[row][column]) return false; // overlapping
            mergedBitmap[row][column] = bitmap1[row][column] || bitmap2[row][column];
        }
    }

    return mergedBitmap;
}

// create a bitmap from an array of bitmaps AND'd
const andBitmaps = (bitmaps) => {
    let mergedBitmap = emptyBitmap();

    for (bitmap of bitmaps) {
        mergedBitmap = andTwoBitmaps(mergedBitmap, bitmap);
    }

    return mergedBitmap;
}


// create a bitmap from two bitmaps AND'd
const andTwoBitmaps = (bitmap1, bitmap2) => {
    let mergedBitmap = emptyBitmap();

    for (row of [0, 1, 2]) {
        for (column of [0, 1, 2]) {
            //if (mergedBitmap[row][column] && bitmap[row][column]) return false; // overlapping
            mergedBitmap[row][column] = bitmap1[row][column] && bitmap2[row][column];
        }
    }

    return mergedBitmap;
}


// true if no bitmaps in array have the same digits set, false if any digit is set twice
const nonOverlappingBitmaps = (bitmaps) => {
    let mergedBitmap = emptyBitmap();

    for (bitmap of bitmaps) {
        for (row of [0, 1, 2]) {
            for (column of [0, 1, 2]) {
                if (mergedBitmap[row][column] && bitmap[row][column]) return false;

                mergedBitmap[row][column] = mergedBitmap[row][column] || bitmap[row][column];
            }
        }
    }

    return true;//mergedBitmap;
}



// get bitmap as an HTML table
const bitmapToHTML = (bitmap) => {
    let blankBitmap = emptyBitmap();
    let html = '<table class="digitsbitmap_table">\n';

    for (row in blankBitmap) {
        html += `\t<tr class="digitsbitmap_row">\n`;

        for (column in blankBitmap[row]) {
            if (bitmap[row][column] === 1) {
                html += `\t\t<td class="digit_present">${ bitmap[row][column] }</td>\n`;
            } else {
                html += `\t\t<td class="digit_absent"></td>\n`;
            }
        }

        html += `\t</tr>\n`;
    }

    html += `</table>\n`;
    html += `<div>N: ${ digitsFromBitmap().length }, Sum: ${ sumOfDigitsInBitmap(bitmap) }</div>\n`;
    return html;
}
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




const tests = () => {
    let bitmapForNeg1 = digitToBitmap(-1);
    console.table(bitmapForNeg1);

    let bitmapFor1 = digitToBitmap(1);
    console.table(bitmapFor1);
    let bitmapFor1Sum = sumOfDigitsInBitmap(bitmapFor1);
    console.log(digitsFromBitmap(bitmapFor1), bitmapFor1Sum);

    let bitmapForSome = digitsToBitmap([4,5,6]);
    console.table(bitmapForSome);
    let bitmapForSomeSum = sumOfDigitsInBitmap(bitmapForSome);
    console.log(digitsFromBitmap(bitmapForSome), bitmapForSomeSum);

    let mergedb = orBitmaps([bitmapFor1, bitmapForSome]);
    console.table(mergedb);
    let bitmapForMergedbSum = sumOfDigitsInBitmap(mergedb);
    console.log(digitsFromBitmap(mergedb), bitmapForMergedbSum);

    let editedb = removeDigitsFromBitmap([3,6,9], mergedb);
    console.table(editedb);
    let bitmapForEditedbSum = sumOfDigitsInBitmap(editedb);
    console.log(digitsFromBitmap(editedb), bitmapForEditedbSum);

    console.table(digitsToBitmap([7,8,9]));
    //console.log(bitmapToHTML(digitsToBitmap([7,8,9])));
    //console.log(bitmapToDOM(digitsToBitmap([7,8,9], editedb)));

    console.log(nonOverlappingBitmaps([mergedb]));
    console.log(nonOverlappingBitmaps([mergedb, mergedb]));
    console.log(nonOverlappingBitmaps([mergedb, editedb]));
    console.log(nonOverlappingBitmaps([mergedb, invertBitmap(mergedb)]));
}
tests();




// const ?digits = {
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
const buildBreakdownComboBitmaps = (breakDownCombos=[]) => {
    let breakdownCombosBitmaps = [];
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
}

// mirroring breakDownComboArr with a bitmap for all combined combos of set-length/sum
const buildSumComboBitmaps = (breakDownCombos=[]) => {
    let sumCombosBitmaps = [];
    for (setLength in breakDownCombos) {
        sumCombosBitmaps[setLength] = []; // init array

        for (sumVal in breakDownCombos[setLength]) {
            sumCombosBitmaps[setLength][sumVal] = []; // init array

            bitmapAcc = emptyBitmap();
            for (setNdx in breakDownCombos[setLength][sumVal]) { // each combo
                bitmapAcc = orTwoBitmaps(bitmapAcc, digitsToBitmap(breakDownCombos[setLength][sumVal][setNdx]));
            }
            sumCombosBitmaps[setLength][sumVal] = bitmapAcc;
        }
    }
    return sumCombosBitmaps;
}

// breakdownCombosBitmaps = buildBreakdownComboBitmaps(solver.breakDownComboArr);
// console.table(breakdownCombosBitmaps[4][10][0]);

// sumCombosBitmaps = buildSumComboBitmaps(solver.breakDownComboArr);
// console.table(sumCombosBitmaps[4][10]);