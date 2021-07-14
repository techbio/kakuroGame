"use strict";
/*
* Kakuro Puzzle Player
* Curtis Moore
* 2018-05-10
*
* All rights reserved.
*
* */

/*

    A code-folding editor is recommended to investigate the structure of this app,
    until I have a motivation to create better documents.

    I would like to add a puzzle generator before building
    a website to serve up different Kakuros.

    Perhaps a bitmap data structure would be more performant than arrays and objects
    (which solve a moderate sized puzzle in ~0.8seconds). I could also could simplify
    some of the code but I have not gotten my mind around it yet, and I do not
    presently have the time to rewrite.

    In this game, I would like to add:
        potential sums of correct length on row/col sum mouseover
        red or green flashing [in]correct sums (or repeated digits) on completing set values
        in concert with solver, game feedback upon section completion
 */

/**
 * A GameCell is the head of zero, one, or two Set objects, contains the sum of
 * the correct PlayCell play values from the sets, and acts as a helper for Game
 * to evaluate a possible puzzle solution.
 *
 * GameCell constructor takes row and column set ids and sums.
 * @param {string} row
 * @param {string} col
 * @param {number} rowSum
 * @param {number} colSum
 * @constructor
 */

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function GameCell(row, col, rowSum, colSum) {
  this.name = "GameCell";
  this.row = row;
  this.col = col;
  this.rowSum = rowSum;
  this.colSum = colSum;
  this.rowSet = null;
  this.colSet = null;
  this.cellDiv = document.createElement('div'); //console.log('in GameCell()', this);
}
/**
 * Get the row set from the game cell.
 * @returns {Set} The row Set.
 */


GameCell.prototype.getRowSet = function () {
  //removed console.log('in getRowSet', this.rowSet, game.rowSets);
  return game.rowSets[this.rowSet];
};
/**
 * Set the row set.
 * @param {Set} The row Set.
 */


GameCell.prototype.setRowSetId = function (rowSetId) {
  //removed console.log('in getRowSet', this.rowSet, game.rowSets);
  game.rowSets[this.rowSet] = rowSetId;
};
/**
 * Get the column set from the game cell.
 * @returns {Set} The column Set.
 */


GameCell.prototype.getColSet = function () {
  return game.colSets[this.colSet];
};
/**
 * Set the column set.
 * @param {Set} The column Set.
 */


GameCell.prototype.setColSetId = function (colSetId) {
  this.colSet = colSetId;
};
/**
 * Get the row and column indexes as an array of length two.
 * @returns {number[]}
 */


GameCell.prototype.getCoordinates = function () {
  return [this.row, this.col];
};
/**
 * Check the solutions from all of the Sets.
 * @returns {boolean} True if all 0, 1, or 2 Sets evaluate correctly.
 */


GameCell.prototype.checkSolution = function () {
  //removed console.log('in GameCell.checkSolution');
  if (!this.getRowSet() && !this.getColSet()) {
    return true; // don't check game cells without either set
  }

  if (this.rowSum <= 2 && this.colSum <= 2) {
    return true; // don't check game cells without any sum
  }

  if (this.rowSum > 2 && this.colSum > 2) {
    // check both sets when both sums are set
    var isRowSolved = this.checkSetSolution(this.getRowSet(), this.rowSum);
    var isColSolved = this.checkSetSolution(this.getColSet(), this.colSum);
    return isRowSolved && isColSolved;
  }

  if (this.rowSum > 2) {
    // don't check colSet if colSum is < 0
    return this.checkSetSolution(this.getRowSet(), this.rowSum);
  }

  if (this.colSum > 2) {
    // likewise, don't check rowSet if rowSum < 0
    return this.checkSetSolution(this.getColSet(), this.colSum);
  }
};
/**
 * Checks for a correct solution in the set parameter.
 * @param {Set} set The Set to check for correct completion.
 * @param {number} setSum The number the Set's PlayCell's playValue's must add up to.
 * @returns {boolean} True if cells are filled with unique digits 1-9 and their sum matches setSum.
 */


GameCell.prototype.checkSetSolution = function (set, setSum) {
  //removed console.log('in GameCell.checkSetSolution');
  // moved these checks to calling function
  //     if (!set) {
  //         return true;
  // //removed console.log('error: no set');
  //     } else if (!set.cells) {
  //         // this is an empty gameCell, shouldn't really even have a set
  //         return true;
  //     } else if (set.cells.length === 0) {
  //         return true; // set is empty, doesn't correspond to any row or col sum
  //     }
  var sum = 0; // check that sum of play cell values matches game cell sum

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = set.cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var cellId = _step.value;
      var cell = set.getCell(cellId); // each cell must be a non-zero decimal digit

      if (cell.playValue <= 0 || cell.playValue >= 10) {
        //console.log('errored at:' + set);
        return false;
      } else if (typeof cell.playValue !== 'number') {
        return false;
      }

      sum += cell.playValue;
    } // must add to sum and have no duplicate entries
    //let solved = (sum === setSum) && this.hasNoDuplicates(set);
    //removed console.log(sum === setSum);
    //removed console.log(this.hasNoDuplicates(set));
    //return solved;

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

  return sum === setSum && this.hasNoDuplicates(set);
};
/**
 * Checks for duplicated cell values in set.
 * @param {Set} set The Set to check.
 * @returns {boolean} True if no cell play values are duplicated.
 */


GameCell.prototype.hasNoDuplicates = function (set) {
  //removed console.log('in GameCell.hasNoDuplicates', set);
  if (!set.cells) {
    //removed console.log('error, set has no cells array', set);
    return true;
  }

  if (set.cells.length === 0) {
    //removed console.log('error, set has no cell values', set);
    return true;
  }

  var uniqueCheck = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = set.cells[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var cellId = _step2.value;
      var cell = set.getCell(cellId);
      uniqueCheck['a' + cell.playValue] = 1; // perform string conversion for numbers before assigning as new object property
    } //removed console.log(set, uniqueCheck);

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

  return set.cells.length === Object.keys(uniqueCheck).length;
};
/**
 * Sets the DOM div for this game cell.
 * @param {HTMLElement} cellDiv The table cell child div corresponding to this game cell.
 */


GameCell.prototype.setGridCell = function (cellDiv) {
  this.cellDiv = cellDiv; // refresh the sums displayed in puzzle.

  this.updateDisplaySums();
};
/**
 * Refresh the DOM with the current rowSum and colSum.
 */


GameCell.prototype.updateDisplaySums = function () {
  /*let table = this.cellDiv.children[0];
  let rows = table.children;
  if (this.rowSum !== -1) {
      let rowSumTd = rows[0].children[1];
      rowSumTd.innerText = this.rowSum;
  }
  if (this.colSum !== -1) {
      let colSumTd = rows[1].children[0];
      colSumTd.innerText = this.colSum;
  }*/
  var subDivs = this.cellDiv.children; //subDivs[0].innerText = '';
  // set display span value to row sum or else blank out the sub div

  if (this.rowSum >= 0) {
    subDivs[1].children[0].innerText = (this.rowSum < 10 ? '0' : '') + this.rowSum;
  } // set display span value to column sum or blank out the sub div


  if (this.colSum >= 0) {
    subDivs[2].children[0].innerText = (this.colSum < 10 ? '0' : '') + this.colSum;
  } //subDivs[3].innerText = '';


  if (this.rowSum < 0 && this.colSum < 0) {
    this.cellDiv.setAttribute('class', 'cell gameCell noline');
  }
};
/**
 * Instantiate the PlayCell object at grid indices: row, col.
 * @param {number} row The row index.
 * @param {number} col The column index.
 * @constructor
 */


function PlayCell(row, col) {
  this.name = "PlayCell";
  this.row = row;
  this.col = col;
  this.correctValue = -1;
  this.playValue = -1;
  this.rowSet = null;
  this.colSet = null;
  this.entry = null; //console.log('in PlayCell()', this);
}
/**
 * Get the cell's row set.
 * @returns {Set} The row Set this cell is in.
 */


PlayCell.prototype.getRowSet = function () {
  return game.rowSets[this.rowSet];
};
/**
 * Set the cell's row set.
 * @param {Set} The row Set this cell is in.
 */


PlayCell.prototype.setRowSetId = function (rowSetId) {
  this.rowSet = rowSetId;
};
/**
 * Get the cell's column set.
 * @returns {Set} The column Set this cell is in.
 */


PlayCell.prototype.getColSet = function () {
  return game.colSets[this.colSet];
};
/**
 * Set the cell's column set.
 * @param {Set} The column Set this cell is in.
 */


PlayCell.prototype.setColSetId = function (colSetId) {
  this.colSet = colSetId;
};
/**
 * Get the row and column indices as an array of length two.
 * @returns {number[]} The row and column indices.
 */


PlayCell.prototype.getCoordinates = function () {
  return [this.row, this.col];
};
/**
 * Set the DOM div corresponding to this PlayCell.
 * @param {HTMLElement} cellDiv The div (child of table cell) where this cell is displayed.
 */


PlayCell.prototype.setGridCell = function (cellDiv) {
  this.cellDiv = cellDiv;
};
/**
 * Set the DOM input on this cell.
 * @param {HTMLElement} entryPanel The DOM input element for this cell.
 */


PlayCell.prototype.setEntryPanel = function (entryPanel) {
  //console.log('in setEntryPanel', entryPanel);
  this.entry = entryPanel; //console.log('in setEntryPanel', this.entry);

  this.entry.value = ''; //console.log('in setEntryPanel', this.entry);
};
/**
 * Handle a keydown event on this cell's entry field.
 * @returns {boolean} True if handled, default value if the field handles it. (???) Not checked.
 */


PlayCell.prototype.processInput = function (event) {
  // have to get the cell because 'this' refers to input element
  var id = this.id;
  var coords = id.match(/(\d+,\d+)$/g);
  coords = coords[0].split(',');
  var playCell = game.cells[coords[0]][coords[1]]; // get the key pressed from event
  //removed console.log('keydown event',event);

  var key = event.key; // works in Chrome on Windows, handle other browsers and OSs?

  if (key.match(/^Arrow.*$/g)) {
    //removed console.log('in processInput, matched arrow key');
    event.preventDefault(); // handle arrow key

    var currRow = playCell.row;
    var currCol = playCell.col;

    if (key === 'ArrowLeft') {
      // choose next playCell to the left, skipping gameCells and wrapping to game.width-1 at -1
      while (game.cells[currRow][(--currCol + game.width) % game.width].name === 'GameCell') {// skip game cells
      }
    } else if (key === 'ArrowRight') {
      // choose next playCell to the right, skipping gameCells and wrapping to 0 at game.width
      while (game.cells[currRow][++currCol % game.width].name === 'GameCell') {// skip game cells
      }
    } else if (key === 'ArrowUp') {
      // choose next playCell above, skipping gameCells and wrapping to game.height-1 at -1
      while (game.cells[(--currRow + game.width) % game.width][currCol].name === 'GameCell') {// skip game cells
      }
    } else if (key === 'ArrowDown') {
      // choose next playCell below, skipping gameCells and wrapping to 0 at game.height
      while (game.cells[++currRow % game.width][currCol].name === 'GameCell') {// skip game cells
      }
    } //removed console.log('currRow, currCol:', currRow + ', ' + currCol);


    game.cells[(game.height + currRow) % game.height][(game.width + currCol) % game.width].entry.focus();
  } else if (key.match(/[1-9]/g)) {
    //removed console.log('in processInput, matched digit 1-9');
    event.preventDefault(); // handle numeric input

    this.value = key;
    playCell.playValue = Number(key);

    if (game.checkSolution()) {
      game.saveGame();
    }
  } else if (key.match(/0/g) || key.match(/Backspace/g)) {
    //removed console.log('in processInput, matched digit 0');
    event.preventDefault(); // handle numeric input

    this.value = '';
    playCell.playValue = -1; // unsolved background

    document.getElementById('gameContainer').style.backgroundColor = '#442020';
  } else if (key.match(/[a-zA-Z]/g) || key.match(/\W/g)) {
    // handle character input
    event.preventDefault();
    this.value = playCell.playValue === -1 ? '' : playCell.playValue; //removed console.log('in processInput, matched character, event:');
  } else {
    event.preventDefault(); //removed console.log('in processInput, else, event:');

    return true; // handle other keys
    // window default, unless it clears game, in which case make sure it's intended with a modal
  }
};
/**
 * Update the play value on the cell object and the input element.
 * @param {number} newValue New digit value for the cell.
 */


PlayCell.prototype.setValue = function (newValue) {
  if (newValue === 0) {
    this.playValue = -1;
    this.entry.value = '';
  } else if (newValue > 0 && newValue < 10) {
    this.playValue = newValue;
    this.entry.value = newValue;
  } else {
    this.setValue(0);
  }
};
/**
 * Instantiate a Set object.
 * @param {string} setType The set type: one of the values in {'row', 'col'}.
 * @constructor
 */


function Set(setType) {
  // TODO change this to use a namespace, Set is now a standard JavaScipt datatype
  this.id = '';
  this.row = '';
  this.col = '';
  this.setType = setType;
  this.gameCellId = '';
  this.cells = [];
  this.possibleCombos = [];
}
/**
 * Add a play cell id to the cells array.
 * @param {string} playCellId The grid coordinate id string for the play cell (i,j => "<i>,<j>")
 */


Set.prototype.addCell = function (playCellId) {
  this.cells.push(playCellId);
};
/**
 * Get the PlayCell object from an id string.
 * @param {string} cellId The grid coordinate id string for the play cell (i,j => "<i>,<j>")
 * @returns {PlayCell} The corresponding PlayCell from game.cells
 */


Set.prototype.getCell = function (cellId) {
  var coords = cellId.split(',');
  return game.cells[coords[0]][coords[1]];
};
/**
 * Set the game cell.
 * @param {string} gameCellId The grid coordinate id string for the GameCell.
 */


Set.prototype.setGameCellId = function (gameCellId) {
  this.gameCellId = gameCellId;
};
/**
 * Get the GameCell.
 * @returns {GameCell} The GameCell object associated with this set.
 */


Set.prototype.getGameCell = function () {
  var coords = this.gameCellId.match(/(\d+,\d+)/g)[0].split(',');
  return game.cells[coords[0]][coords[1]];
};
/**
 * The puzzle object, with the grid containing all cells,
 * the row sets and column sets, and display related values.
 * @param {Array} allCells The grid of all game and play cells in i,j coordinates.
 * @param {Array} gameCells An array of all the GameCells.
 * @param {Object} rowSets All of the row Set objects.
 * @param {Object} colSets All of the column Set objects.
 * @constructor
 */


function Game(allCells, gameCells, rowSets, colSets) {
  /* still needs to get gameCells and sets set somewhere */
  this.cells = allCells;
  this.gameCells = gameCells; // this.allSets = allSets;

  this.rowSets = rowSets;
  this.colSets = colSets;
  this.width = allCells[0].length;
  this.height = allCells.length;
  this.showingScratchPad = false; // this.isComplete = false;
}
/**
 * Create a string from current grid state.
 * @returns {string} A JSON array of rows and columns for the
 * cells grid, similar to the cellData used by initializeGame().
 */


Game.prototype.saveGame = function () {
  var savedGame = [];

  for (var row in game.cells) {
    if (!game.cells.hasOwnProperty(row)) {
      continue;
    }

    savedGame[row] = [];

    if (!game.cells.hasOwnProperty(row)) {
      continue;
    }

    for (var col in game.cells[row]) {
      if (!game.cells[row].hasOwnProperty(col)) {
        continue;
      }

      var cell = game.cells[row][col];

      if (cell.name === "GameCell") {
        savedGame[row][col] = [cell.colSum, cell.rowSum];
      } else if (cell.name === "PlayCell") {
        savedGame[row][col] = cell.playValue;
      }
    }
  } //let json = JSON.stringify(savedGame);
  //removed console.log(json);
  //return json;


  return JSON.stringify(savedGame);
};
/**
 * Load a saved game.
 * @param {string} cellData The JSON from a previous saveGame() call.
 */


Game.prototype.loadGame = function (cellData) {// run initialize(cellData)
};
/**
 * Check whether the game is solved.
 * @returns {boolean} True if the game is correctly solved.
 */


Game.prototype.checkSolution = function () {
  //removed console.log('in Game.checkSolution');
  // check all of the game cells for correct solutions
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = this.gameCells[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var gameCell = _step3.value;

      //removed console.log('in Game.checkSolution loop');
      if (!gameCell.checkSolution()) {
        //removed console.log('gameCell failed solution', gameCell);
        // console.log('errored at: cell' + gameCell.row + ',' + gameCell.col);
        document.getElementById('gameContainer').style.backgroundColor = '#442020';
        return false;
      }
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

  document.getElementById('gameContainer').style.backgroundColor = 'lightgreen';
  return true;
};
/**
 * Toggle the displayed scratch text area (for players to work out possibilities).
 */


Game.prototype.toggleScratchPad = function () {
  if (this.showingScratchPad) {
    document.getElementById('scratchpadDiv').style["float"] = 'none';
    document.getElementById('scratchpad').style.display = 'none';
    this.showingScratchPad = false;
  } else {
    document.getElementById('scratchpadDiv').style["float"] = 'right';
    document.getElementById('scratchpad').style.display = 'block';
    this.showingScratchPad = true;
  }
};
/**
 * Get a cell from the grid.
 * @param {string} cellId The cell's id string.
 * @returns {Object} The PlayCell or GameCell with this id.
 */


Game.prototype.findCell = function (cellId) {
  var coords = cellId.split(',');
  var cell = game.cells[coords[0]][coords[1]];

  if (typeof cell === 'undefined') {
    //removed console.log('could not find cell at cellId:' + cellId);
    return null;
  } else {
    return cell;
  }
};
/**
 * Initialize a new game, creating all objects and setting up DOM.
 * @param {Array} cellData The grid of values used to draw and populate the game.
 * @returns {Game} The ready-to-solve game object.
 */


function initializeGame(cellData) {
  /*let gameCellTd;*/
  var gameCellSubDiv;
  var cells = []; // pairs are colSum, rowSum
  // initialize all cells from cellData
  // create and attach the game grid to the DOM at tbody

  var tbody = document.getElementById('grid');
  var tr;
  var td;
  var tdId;
  var cellDiv;
  var entryPanel; // initialize game cells

  var pair;
  var gameCellRow;
  var gameCellCol;
  var gameCells = [];
  var gameCellSpan;
  var currentGameCell;

  for (var i = 0; i < cellData.length; i++) {
    cells[i] = []; //console.log('i', i);
    // create and append a new row

    tr = document.createElement('tr');
    tr.setAttribute('id', 'tr' + i);
    tbody.appendChild(tr);

    for (var j = 0; j < cellData[0].length; j++) {
      // console.log('typeof curr cellData', typeof cellData[i][j]);
      // make a new td and PlayCell no matter what
      //if (typeof cellData[i][j] === 'number') {
      cells[i][j] = new PlayCell(i, j); // create and append a td

      td = document.createElement('td');
      tdId = 'td' + i + ',' + j;
      td.setAttribute('id', tdId);
      tr.appendChild(td); // create the play cell DOM elements

      cellDiv = document.createElement('div');
      cellDiv.setAttribute('id', 'cell' + i + ',' + j);
      cellDiv.setAttribute('class', 'cell playCell');
      entryPanel = document.createElement('input');
      entryPanel.setAttribute('type', 'text');
      entryPanel.setAttribute('class', 'entryPanel');
      entryPanel.setAttribute('id', 'in' + i + ',' + j);
      entryPanel.setAttribute('value', '#');
      cellDiv.appendChild(entryPanel);
      cells[i][j].setEntryPanel(entryPanel); //entryPanel.addEventListener('input', function() {return});

      entryPanel.addEventListener('keydown', cells[i][j].processInput, false);
      entryPanel.select();
      cells[i][j].setGridCell(cellDiv);
      td.appendChild(cellDiv); // if there is GameCell data, make a game cell in the td

      if (_typeof(cellData[i][j]) === 'object') {
        pair = cellData[i][j];
        gameCellRow = i;
        gameCellCol = j;
        currentGameCell = new GameCell(gameCellRow, gameCellCol, cellData[i][j][1], cellData[i][j][0]);
        cells[gameCellRow][gameCellCol] = currentGameCell;
        gameCells.push(currentGameCell); // console.log('currentGameCell', currentGameCell);
        // create the gamecell div

        cellDiv = document.createElement('div');
        cellDiv.setAttribute('id', 'cell' + gameCellRow + gameCellCol);
        cellDiv.setAttribute('class', 'cell gameCell'); // put the div in the appropriate table cell

        tdId = 'td' + gameCellRow + ',' + gameCellCol;
        td = document.getElementById(tdId);
        td.innerHTML = '';
        td.appendChild(cellDiv); // create the gamecell sub-divs and append to the gamecell div

        gameCellSubDiv = document.createElement('div');
        gameCellSubDiv.setAttribute('class', 'diagonal'); //gameCellSubDiv.innerText = '--';

        cellDiv.appendChild(gameCellSubDiv);
        gameCellSubDiv = document.createElement('div');
        gameCellSubDiv.setAttribute('class', 'rowSum');
        gameCellSpan = document.createElement('span');

        if (currentGameCell.rowSum > 0) {
          gameCellSpan.setAttribute('class', 'numberCircle');
        } else {
          gameCellSpan.setAttribute('class', 'noNumberCircle');
        }

        gameCellSubDiv.appendChild(gameCellSpan);
        cellDiv.appendChild(gameCellSubDiv);
        gameCellSubDiv = document.createElement('div');
        gameCellSubDiv.setAttribute('class', 'colSum');
        gameCellSpan = document.createElement('span');

        if (currentGameCell.colSum > 0) {
          gameCellSpan.setAttribute('class', 'numberCircle');
        } else {
          gameCellSpan.setAttribute('class', 'noNumberCircle');
        }

        gameCellSubDiv.appendChild(gameCellSpan);
        cellDiv.appendChild(gameCellSubDiv);
        gameCellSubDiv = document.createElement('div');
        gameCellSubDiv.setAttribute('class', 'diagonal'); //gameCellSubDiv.innerText = '--';

        cellDiv.appendChild(gameCellSubDiv); // assign the new div to game cell

        currentGameCell.setGridCell(cellDiv);
      }
    }
  } // initialize row sets


  var setId = '';
  var currentCell = null;
  var rowSets = {};

  for (var _i = 0; _i < cellData.length; _i++) {
    // for each row
    for (var _j = 0; _j < cellData[0].length; _j++) {
      // and each column
      // get current cell
      currentCell = cells[_i][_j]; // if it's a game cell, create a set for it

      if (currentCell.name === "GameCell") {
        // new set id and set
        setId = 'set' + _i + ',' + _j;
        rowSets[setId] = new Set('row');
        rowSets[setId].id = setId;
        rowSets[setId].row = _i;
        rowSets[setId].col = _j;
        rowSets[setId].setGameCellId('' + _i + ',' + _j); // set the game cell's row set

        currentCell.rowSet = setId;
      } else if (typeof rowSets[setId] !== 'undefined') {
        // add play cell to set
        rowSets[setId].addCell('' + _i + ',' + _j); // '' + i + ',' + j // replace currentCell object with new id references

        currentCell.rowSet = setId;
      }
    }
  } //console.log('finished row set initialization', rowSets);
  // initialize column sets


  var colSets = {};

  for (var _j2 = 0; _j2 < cellData[0].length; _j2++) {
    // for each column
    for (var _i2 = 0; _i2 < cellData.length; _i2++) {
      // and each row
      // get current cell
      currentCell = cells[_i2][_j2]; // if it's a game cell, create a set for it

      if (currentCell.name === "GameCell") {
        // new set id and set
        setId = 'set' + _i2 + ',' + _j2;
        colSets[setId] = new Set('col');
        colSets[setId].id = setId;
        colSets[setId].row = _i2;
        colSets[setId].col = _j2;
        colSets[setId].setGameCellId('' + _i2 + ',' + _j2); // set the game cell's col set

        currentCell.colSet = setId;
      } else if (typeof colSets[setId] !== 'undefined') {
        // add play cell to set
        colSets[setId].addCell('' + _i2 + ',' + _j2);
        currentCell.colSet = setId;
      }
    }
  } //console.log('finished column set initialization', colSets);
  // assign row sets to game cells


  for (var _setId in rowSets) {
    if (!rowSets.hasOwnProperty(_setId)) {
      continue;
    }

    var coords = _setId.match(/(\d+,\d+)/g)[0].split(','); // setId's ('ij') correspond to GameCell locations


    var gameCell = cells[coords[0]][coords[1]];
    gameCell.rowSet = _setId; //console.log('setting rowSet', gameCell, setId, rowSets[setId])
  } // assign column sets to game cells


  for (var _setId2 in colSets) {
    if (!colSets.hasOwnProperty(_setId2)) {
      continue;
    }

    if (colSets[_setId2].cells.length === 0) {
      //removed console.log('discarding empty set', colSets[setId]);
      delete colSets[_setId2];
    }

    var _coords = _setId2.match(/(\d+,\d+)/g)[0].split(','); // setId's ('ij')correspond to GameCell locations


    var _gameCell = cells[_coords[0]][_coords[1]];

    _gameCell.setColSetId(_setId2); //console.log('setting colSet', gameCell, setId, colSets[setId]);

  } // remove empty sets from rowSets


  for (var _setId3 in rowSets) {
    if (!rowSets.hasOwnProperty(_setId3)) {
      continue;
    }

    if (rowSets[_setId3].cells.length === 0) {
      //removed console.log('discarding empty set', rowSets[setId]);
      delete rowSets[_setId3];
    }
  } // remove empty sets from rowSets


  for (var _setId4 in colSets) {
    if (!colSets.hasOwnProperty(_setId4)) {
      continue;
    }

    if (colSets[_setId4].cells.length === 0) {
      //removed console.log('discarding empty set', colSets[setId]);
      delete colSets[_setId4];
    }
  } // create game


  return new Game(cells, gameCells, rowSets, colSets);
}
/**
 * Initialize game, focus on cell and return
 * @param {Array} cellData The grid of values used to draw and populate the game.
 * @returns {Game} The ready-to-solve game object.
 */


function startGame(cellData) {
  var game = initializeGame(cellData); // used to check if a Game object is initialized
  // game.isComplete = true;
  //console.log('solution:', game.checkSolution());
  // this only works if 1,1 is a play cell, should be a function to find an upper left play cell input instead

  document.getElementById('in1,1').focus(); //removed console.log(JSON.stringify(game)); // fixed circular structure

  return game;
}
/**
 * maybe a clue to finding solutions? http://www.kakuros.com/solve
 */
//console.log('combinations', combinations([1, 2, 3, 4, 5, 6, 7, 8, 9]));

/*
    // 10x10 from The Mepham Group
    const cellData = [
        [ [-1, -1],  [-1 -1],  [17, -1], [37, -1], [-1, -1], [7, -1],  [5, -1], [4, -1], [12, -1], [-1, -1],],
        [ [-1, -1], [7,  12],        0,        0, [-1, 11],        0,        0,       0,        0,  [8, -1],],
        [ [-1, 10],        0,        0,        0,  [7, 15],        0,        0,       0,        0,        0,],
        [ [-1, 19],        0,        0,        0,        0,        0, [-1, -1], [36, 5],        0,        0,],
        [ [-1, 19],        0,        0,        0,        0, [-1, -1], [20, 12],       0,        0, [-1, -1],],
        [ [-1, -1], [-1, -1],  [27, 5],        0,        0, [-1, 17],        0,       0, [25, -1], [10, -1],],
        [ [-1, -1], [10, 13],        0,        0, [-1, -1],  [8, 13],        0,       0,        0,        0,],
        [ [-1, 12],        0,        0, [15, -1], [16, 32],        0,        0,       0,        0,        0,],
        [ [-1, 24],        0,        0,        0,        0,        0,  [-1, 7],       0,        0,        0,],
        [ [-1, -1], [-1, 29],        0,        0,        0,        0, [-1, 16],       0,        0, [-1, -1],],
    ];
    */
// 10x10 from The Mepham Group

/*const cellData = [
    [ [-1, -1],  [7, -1],  [7, -1], [23, -1], [-1, -1], [-1, -1], [15, -1], [20, -1], [34, -1], [-1, -1],],
    [ [-1,  6],        0,        0,        0, [10, -1], [-1, 23],        0,        0,        0, [10, -1],],
    [ [-1, 16],        0,        0,        0,        0, [16, 28],        0,        0,        0,        0,],
    [ [-1, -1], [-1, 19],        0,        0,        0,        0, [-1, 10],        0,        0,        0,],
    [ [-1, -1], [11, -1],  [30, 9],        0,        0,        0,  [10, -1], [27, 7],        0,        0,],
    [ [-1, 45],        0,        0,        0,        0,        0,        0,        0,        0,        0,],
    [ [-1, 4],         0,        0,  [7, -1], [-1, 11],        0,        0,        0, [21, -1],  [-1,-1],],
    [ [-1, 14],        0,        0,        0,  [3, 21],        0,        0,        0,        0,  [4, -1],],
    [ [-1, 13],        0,        0,        0,        0, [-1, 15],        0,        0,        0,        0,],
    [ [-1, -1],  [-1, 7],        0,        0,        0, [-1, -1],  [-1, 7],        0,        0,        0,],
];
/*/
// 10x10 from The Mepham Group (original puzzle that got me interested)


var cellData = [[[-1, -1], [14, -1], [16, -1], [-1, -1], [-1, -1], [10, -1], [16, -1], [40, -1], [11, -1], [-1, -1]], [[-1, 13], 0, 0, [36, -1], [-1, 17], 0, 0, 0, 0, [3, -1]], [[-1, 20], 0, 0, 0, [28, 18], 0, 0, 0, 0, 0], [[-1, -1], [5, -1], [8, 13], 0, 0, 0, [17, 19], 0, 0, 0], [[-1, 16], 0, 0, 0, 0, [-1, 6], 0, 0, [12, -1], [4, -1]], [[-1, 12], 0, 0, 0, 0, [-1, 12], 0, 0, 0, 0], [[-1, -1], [10, -1], [11, 17], 0, 0, [13, 20], 0, 0, 0, 0], [[-1, 22], 0, 0, 0, [3, 19], 0, 0, 0, [4, -1], [12, -1]], [[-1, 20], 0, 0, 0, 0, 0, [-1, 8], 0, 0, 0], [[-1, -1], [-1, 11], 0, 0, 0, 0, [-1, -1], [-1, 10], 0, 0]];
/*/

/*

    // 3x3
        const cellData = [
            [[-1, -1], [5, -1], [6, -1]],
            [[-1, 8],        0,       0],
            [[-1, 3],        0,       0]
        ];
*/

/*

        // 4x3, not a unique solution
            const cellData = [
                [[-1, -1], [3, -1], [7, -1], [7, -1]],
                [[-1, 11],        2,       5,      3],
                [[-1, 6],         1,       2,      3]
            ];
*/

/*
// 4x4, from kakuros.com
const cellData = [
    [[-1, -1], [20, -1], [12, -1], [10, -1]],
    [[-1, 24],       -1,       -1,       -1],
    [[-1, 11],       -1,       -1,       -1],
    [[-1, 7],        -1,       -1,       -1]
];
*/

/*
    // 5x5, from kakuros.com
    const cellData = [
        [[-1, -1], [16, -1], [7, -1], [-1, -1], [-1, -1]],
        [[-1, 13],       -1,      -1, [23, -1], [-1, -1]],
        [[-1, 16],       -1,      -1,       -1,  [4, -1]],
        [[-1, -1], [-1, 14],      -1,       -1,       -1],
        [[-1, -1], [-1, -1], [-1, 7],       -1,       -1]
    ];
*/

/*
    // from above 5x5 cellData, solver.solve(), saveGame()
    const cellData = [[[-1,-1],[16,-1],[7,-1],[-1,-1],[-1,-1]],[[-1,13],9,4,[23,-1],[-1,-1]],[[-1,16],7,1,8,[4,-1]],[[-1,-1],[-1,14],2,9,3],[[-1,-1],[-1,-1],[-1,7],6,1]];
    */

/*
    // 9x8, from kakuros.com
    const cellData = [
        [[-1, -1], [-1, -1], [-1, -1], [14, -1], [4, -1], [-1, -1], [-1, -1], [-1, -1]],
        [[-1, -1], [18, -1], [31, 8],        -1,      -1, [7, -1], [-1, -1], [-1, -1]],
        [[-1, 28],       -1,       -1,       -1,      -1,       -1,  [20, -1], [-1, -1]],
        [[-1, 6],       -1,       -1, [-1, -1], [-1, 8],      -1,       -1, [-1, -1]],
        [[-1, 17],       -1,       -1, [13, -1], [-1, 9],       -1,       -1, [19, -1]],
        [[-1, -1], [-1, 16],       -1,       -1, [-1, -1], [-1, 6],       -1,       -1],
        [[-1, -1], [-1, 4],       -1,       -1, [17, -1], [6, 12],       -1,       -1],
        [[-1, -1], [-1, -1], [-1, 25],       -1,       -1,       -1,       -1,       -1],
        [[-1, -1], [-1, -1], [-1, -1], [-1, 10],       -1,       -1, [-1, -1], [-1, -1]],
    ];
*/
//removed console.log('cellData', cellData);

var game = startGame(cellData);