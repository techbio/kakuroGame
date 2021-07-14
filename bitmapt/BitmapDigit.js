/*
filename: BitmapDigit.js
description: functions to manipulate bitmaps of digits for Kakuro
author: cwmoore
date: 7/14/21
*/

const applyBitmapToSet = (set, bitmap) => {
    for (cell of set) { // iterate through cells in set
        for (digit = 1; digit <= 9; digit++) { // iterate through digits in bitmap
            // cell.possibleBitmap[digit] |= bitmap[digit]; // TODO logic?
            cell.possibleBitmap[digit] = orTwoBitmaps(cell.possibleBitmap[digit], bitmap[digit]); // TODO this paramter is imaginary
            // cell.possibleBitmap[digit] = andTwoBitmaps(cell.possibleBitmap[digit], bitmap[digit]); // TODO again, logic...
        }
    }
}

// generate data structure, booleans for digits 1-9
const emptyBitmap = () => {

    return [0, // use extra bit at index 0? operator? null or marked flag?

        0,0,0,  // 1, 2, 3
        0,0,0,  // 4, 5, 6
        0,0,0,  // 7, 9, 8
    ];
}


// switch 0s to 1s and vice versa
const invertBitmap = (bitmap) => {
    let invertedBitmap = emptyBitmap();

    for (digit in invertedBitmap) {
        invertedBitmap[digit] = (bitmap[digit] === 1) ? 0 : 1;
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
        // if (bitmap[digit]) return 'overlap alert';
        bitmap[digit] = 1;
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
        bitmap[digit] = 0;
    }

    return bitmap;
}


// given a bitmap, which digits are represented
const digitsFromBitmap = (bitmap) => {
    let digits = [];

    for (digit in bitmap) {
        if (digit >= 1 && digit <= 9)
        {
            if (bitmap[digit]) {
                digits.push(digit);
            }
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

    for (digit in mergedBitmap) {
        mergedBitmap[digit] = bitmap1[digit] || bitmap2[digit];
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

    for (digit in mergedBitmap) {
        mergedBitmap[digit] = bitmap1[digit] && bitmap2[digit];
    }

    return mergedBitmap;
}


// true if no bitmaps in array have the same digits set, false if any digit is set twice
const nonOverlappingBitmaps = (bitmaps) => {
    let markedBitmap = emptyBitmap();

    for (bitmap of bitmaps) {
        for (digit in bitmap) {
            if (markedBitmap[digit] && bitmap[digit]) {
                return false; // overlap detected
            }
            markedBitmap[digit] = markedBitmap[digit] || bitmap[digit]; // mark digit
        }
    }

    return true; // no overlap detected
}



// for display
const empty2DBitmapArray = () => {

    return [

        [ 0, 0, 0 ],  //  1, 2, 3
        [ 0, 0, 0 ],  //  4, 5, 6
        [ 0, 0, 0 ],  //  7, 8, 9

    ];
}


// from 10 digit array to 2D array
const bitmapTo2DArray = (bitmap) => {

    let bitmap2DArr = empty2DBitmapArray();

    let digit = 1;
    for (row in bitmap2DArr) {
        for (column in bitmap2DArr[row]) {
            bitmap2DArr[row][column] = bitmap[digit];
            digit += 1;
        }
    }

    return bitmap2DArr;
}


// from 2D array to 10 digit array
const bitmapFrom2DArray = (bitmap2DArr) => {
    let bitmap = emptyBitmap();

    for (digit in bitmap) {
        [row, column] = digitToIndices(digit);
        bitmap[digit] = bitmap2DArr[row][column];
    }

    return bitmap;
}


//   use digit === index instead
// get bitmap row/column for a digit
const digitToIndices = (digit) => {
    if (digit < 1 || digit > 9) return [false, false];

    let row, column;

    row = Math.floor( (digit - 1) / 3);
    column = (digit - 1) % 3;

    return [row, column];
}

// get bitmap as an HTML table
const bitmapToHTML = (bitmap) => {
    bitmap2D = bitmapTo2DArray(bitmap);
    let blankBitmap = empty2DBitmapArray();
    // console.table(bitmap2D);
    // console.table(blankBitmap);

    let html = '';
    html += '<div class="bitmap_display">\n';
    html += '\t<div class="digitsbitmap_table">\n';

    for (row in blankBitmap) {
        html += `\t\t<div class="digitsbitmap_row">\n`;

        for (column in blankBitmap[row]) {
            html += `\t\t\t<div class="digitsbitmap_column ${ (bitmap2D[row][column] === 1) ? 'digit_present' : 'digit_absent'}">${ bitmap2D[row][column] }</div>\n`;
        }

        html += `\t\t</div>\n`;
    }

    html += `\t</div>\n`;
    html += `</div>\n`;
    //html += `<div>N: ${ digitsFromBitmap().length }, Sum: ${ sumOfDigitsInBitmap(bitmap) }</div>\n`;
    return html;
}

/* not in nodejs...
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

    console.table(bitmapTo2DArray(digitsToBitmap([7,8,9])));
    // console.table(bitmapTo2DArray(digitsToBitmap([1,2,3,4,5,6,7,8,9])));
    // console.table(digitsToBitmap([1,2,3,4,5,6,7,8,9]));
};
//tests();



// testGameCells = document.querySelectorAll(".gameCell:not(.noline)");
// testGameCells.filter((gameCell) => gameCell)



breakdownCombosBitmaps = buildBreakdownComboBitmaps(solver.breakDownComboArr);
// console.table(breakdownCombosBitmaps[4][10][0]);

sumCombosBitmaps = buildSumComboBitmaps(solver.breakDownComboArr);

console.table(bitmapTo2DArray(sumCombosBitmaps[8][40]));
console.table(bitmapTo2DArray(sumCombosBitmaps[3][10]));
console.table(bitmapTo2DArray(sumCombosBitmaps[3][13]));
console.table(bitmapTo2DArray(sumCombosBitmaps[4][10]));
console.table(bitmapTo2DArray(sumCombosBitmaps[4][17]));
console.table(bitmapTo2DArray(sumCombosBitmaps[5][18]));
console.table(bitmapTo2DArray(andBitmaps([sumCombosBitmaps[4][10],sumCombosBitmaps[3][10],sumCombosBitmaps[8][40]])));
console.table(bitmapTo2DArray(orBitmaps([sumCombosBitmaps[4][10],sumCombosBitmaps[3][10],sumCombosBitmaps[8][40]])));

document.getElementById('cell1,5').innerHTML = bitmapToHTML(
    andTwoBitmaps(
        digitsToBitmap(sumCombosBitmaps[3][10]), // column
        digitsToBitmap(sumCombosBitmaps[4][17]) // row
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
