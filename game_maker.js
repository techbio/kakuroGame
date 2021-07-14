"use strict";
// NxM
class GameMaker {
    constructor(w=10, h=10, c=[]) {
        var self = this;

        self.width = w;
        self.height = h;
        self.cells = c;
        self.gameCells = [];
        self.rowSets = [];
        self.colSets = [];
        self.game = null;

        // check every cell for toggled game cells, create col/row sets
        self.recreateSets = () => {
            for (let rowId = 0; rowId < self.cells.length; rowId++) {
                for (let colId = 0; colId < self.cells[rowId].length; colId++) {
                    if (self.cells[rowId][colId] instanceof GameCell) {
                        self.gameCells.push(self.cells[rowId][colId]);

                        let rowSet = `set${rowId},${colId}`;//self.cells[rowId][colId].getRowSet();
                        let colSet = `set${rowId},${colId}`;//self.cells[rowId][colId].getColSet();
                        console.log('found a gamecell at: ' + rowId + ', ' + colId);
                        // make row and col sets
                        let incr = 1;
                        while (colId + incr < self.width) {
                            console.log('colId: ' + (incr + colId));
                            if (self.cells[rowId][colId + incr] instanceof PlayCell) {
                                //rowSet.addCell(self.cells[rowId][colId + incr]);
                                self.cells[rowId][colId + incr].rowSet = rowSet;
                                self.cells[rowId][colId + incr].setRowSetId(rowSet);
                                incr++;
                            } else { break; }
                        }

                        incr = 1;
                        while (rowId + incr < self.height) {
                            console.log('rowId: ' + (incr + rowId));
                            if (self.cells[rowId + incr][colId] instanceof PlayCell) {
                                //colSet.addCell(self.cells[rowId + incr][colId]);
                                self.cells[rowId + incr][colId].colSet = colSet;
                                self.cells[rowId + incr][colId].setColSetId(colSet);
                                incr++;
                            } else { break; }
                        }
                        self.rowSets.push(rowSet);
                        self.colSets.push(colSet);
                        self.cells[rowId][colId].setRowSetId(rowSet);
                        self.cells[rowId][colId].setColSetId(colSet);
                        // self.cells[rowId][colId].rowSet = rowSet;
                        // self.cells[rowId][colId].colSet = colSet;
                    } else {
                        console.log('found a playcell at: ' + rowId + ', ' + colId);
                    }
                }
            }
            self.game = new Game(self.cells, self.gameCells, self.rowSets, self.colSets);
            let game = self.game;
            game.checkSolution();
            let solver = new Solver();
            solver.solve();
        };

        self.checkPlayCell = (playCell) => {
            let lengthError = false;

            if (self.cells[playCell.row][playCell.col] instanceof PlayCell) {
                console.log("is a play cellllllll");
            } else {
                console.log(self.cells[playCell.row][playCell.col]);
            }
            console.table(playCell);
            // if next to a game cell, must have a playcell on opposite side
            if (playCell.row - 1 >= 0) {
                if ( !(self.cells[playCell.row - 1][playCell.col] instanceof PlayCell)) {
                    if ( !(self.cells[playCell.row + 1][playCell.col] instanceof PlayCell)) {
                        console.log("checkPlayCell error 1");
                        return false;
                    }
                }
            } else {
                console.log("checkPlayCell lengthError 1");
                lengthError = true;
            }

            if (playCell.row + 1 < self.cells.length) {
                if ( !(self.cells[playCell.row + 1][playCell.col] instanceof PlayCell)) {
                    if ( !(self.cells[playCell.row - 1][playCell.col] instanceof PlayCell)) {
                        console.log("checkPlayCell error 2");
                        return false;
                    }
                }
            } else {
                console.log("checkPlayCell lengthError 2");
                lengthError = true;
            }

            if (playCell.col - 1 >= 0) {
                if ( !(self.cells[playCell.row][playCell.col - 1] instanceof PlayCell)) {
                    if ( !(self.cells[playCell.row][playCell.col + 1] instanceof PlayCell)) {
                        console.log("checkPlayCell error 3");
                        return false;
                    }
                }
            } else {
                console.log("checkPlayCell lengthError 3");
                lengthError = true;
            }

            if (playCell.col + 1 < self.cells[0].length) {
                if ( !(self.cells[playCell.row][playCell.col + 1] instanceof PlayCell)) {
                    if ( !(self.cells[playCell.row][playCell.col - 1] instanceof PlayCell)) {
                        console.log("checkPlayCell error 4");
                        return false;
                    }
                }
            } else {
                console.log("checkPlayCell lengthError 4");
                lengthError = true;
            }
            //if (lengthError) return false;

            return true;
        };

        self.checkGameCell = (gameCell) => {
            let lengthError = false;
            // if next to a play cell, must have two or more play cells in that direction
            if (gameCell.row + 1 < self.cells.length) {
                if (self.cells[gameCell.row + 1][gameCell.col] instanceof PlayCell) {
                    if ( !(self.cells[gameCell.row + 2][gameCell.col] instanceof PlayCell)) {
                        console.log("checkGameCell error 1");
                        return false;
                    }
                }
            } else {
                console.log("checkGameCell lengthError 1");
                lengthError = true;
            }

            if (gameCell.row - 1 >= 0) {
                if (self.cells[gameCell.row - 1][gameCell.col] instanceof PlayCell) {
                    if ( !(self.cells[gameCell.row - 2][gameCell.col] instanceof PlayCell)) {
                        console.log("checkGameCell error 2");
                        return false;
                    }
                }
            } else {
                console.log("checkGameCell lengthError 2");
                lengthError = true;
            }

            if (gameCell.col + 1 < self.cells[0].length) {
                if (self.cells[gameCell.row][gameCell.col + 1] instanceof PlayCell) {
                    if ( !(self.cells[gameCell.row][gameCell.col + 2] instanceof PlayCell)) {
                        console.log("checkGameCell error 3");
                        return false;
                    }
                }
            } else {
                console.log("checkGameCell lengthError 3");
                lengthError = true;
            }

            if (gameCell.col - 1 >= 0) {
                if (self.cells[gameCell.row][gameCell.col - 1] instanceof PlayCell) {
                    if ( !(self.cells[gameCell.row][gameCell.col - 2] instanceof PlayCell)) {
                        console.log("checkGameCell error 4");
                        return false;
                    }
                }
            } else {
                console.log("checkGameCell lengthError 4");
                lengthError = true;
            }

            return true;
        };

        // ascertain whether current configuration is a(n in)valid Kakuro board
        self.checkBoard = () => {
            for (let row of self.cells) {
                for (let cell of row) {
                    if (cell instanceof GameCell) {
                        console.log('Game Cell: ' + cell.row + ' ' + cell.col);
                        if (self.checkGameCell(cell)) {
                            console.log("Good game cell");
                        } else {
                            return false;
                        }
                    } else if (cell instanceof PlayCell) {
                        console.log('Play Cell: ' + cell.row + ' ' + cell.col);
                        if (self.checkPlayCell(cell)) {
                            console.log("Good play cell");
                        } else {
                            return false;
                        }
                    } else {
                        console.log('Other Cell: ' + cell.row + ' ' + cell.col);
                    }
                }
            }
            return true;
        };

        self.toggleCell = (event) => {
            //id = event.path[0].id;
            let id = event.target.id;
            if (id.match(/toggleButton(0\d | \d0)/g)) {
                console.log('Cannot toggle first row/column--must be game cells.');
                return;
            }

            let idCoords = id.match(/\d\d/g)[0].split(''); // TODO use an id convention that can handle multidigit row/col ids
            let cellId = 'td' + idCoords[0] + idCoords[1];
            idCoords[0] = Number(idCoords[0]);
            idCoords[1] = Number(idCoords[1]);
            let flipCoords = [];
            flipCoords[0] = self.width - idCoords[0];
            flipCoords[1] = self.height - idCoords[1];
            let symCellId = 'td' + flipCoords[0] + flipCoords[1];
            let symToggleButtonId = 'toggleButton' + flipCoords[0] + flipCoords[1];

            console.log(self.cells);
            console.log(self.width);
            console.log(self.height);
            console.log(event.target);
            console.log(idCoords);
            console.log(flipCoords);
            console.log(id);
            console.log(cellId);
            console.log(symCellId);
            console.log(symToggleButtonId);


            let toggleButton = document.getElementById(id);
            let symToggleButton = document.getElementById(symToggleButtonId);

            if (toggleButton.getAttribute('class').match(/^.*game$/g)) {
                document.getElementById(cellId).setAttribute('class', 'play');
                toggleButton.setAttribute('class', 'toggleButton play');
                toggleButton.innerText = 'play';
                self.cells[idCoords[0]][idCoords[1]] = new PlayCell(idCoords[0], idCoords[1]);

                document.getElementById(symCellId).setAttribute('class', 'play');
                symToggleButton.setAttribute('class', 'toggleButton play');
                symToggleButton.innerText = 'play';
                self.cells[flipCoords[0]][flipCoords[1]] = new PlayCell(flipCoords[0], flipCoords[1]); // symmetric playcell

            } else if (toggleButton.getAttribute('class').match(/^.*play$/g)) {
                document.getElementById(cellId).setAttribute('class', 'game');
                toggleButton.setAttribute('class', 'toggleButton game');
                toggleButton.innerText = 'game';
                self.cells[idCoords[0]][idCoords[1]] = new GameCell(idCoords[0], idCoords[1]);

                document.getElementById(symCellId).setAttribute('class', 'game');
                symToggleButton.setAttribute('class', 'toggleButton game');
                symToggleButton.innerText = 'game';
                self.cells[flipCoords[0]][flipCoords[1]] = new GameCell(flipCoords[0], flipCoords[1]); // symmetric gamecell
            }
            //console.log(toggleButton);
            console.log(self);
            if (self.checkBoard()) {
                console.log("OK");
                self.recreateSets();
            } else {
                console.log("Invalid board");
            }
        };

        // intitialize board with all white playcells
        // except for the top row and leftmost column being black gamecells
        self.createEmptyBoard = (width, height) => {
            document.getElementById('titleTh').setAttribute('colspan', width);
            document.getElementById('titleTh').innerHTML = "<h4>KAKURO: Cell Mapper</h4>";
            console.log('height/width', height, width);
            // using height and width, create table, all play cells, initial game cells at row zero and column zero
            self.width = width;
            self.height = height;

            let currentGameCell;
            let currentRowGameCell;
            let currentColGameCell;
            let currentPlayCell;

            let tr;
            let td;
            let tdId;
            let toggleButton;
            let toggleId;
            let tbody = document.getElementById('grid');
            tbody.innerHTML = "";
            // initialize all cells with top-level game/play cell toggle button
            for(let i = 0; i < self.height; i++) {
                self.cells[i] = [];
                tr = document.createElement('tr');
                tr.setAttribute('id', 'tr' + i);
                tbody.appendChild(tr);

                for (let j = 0; j < self.width; j++) {
                    td = document.createElement('td');
                    tdId = 'td' + i + j;
                    td.setAttribute('id', tdId);
                    tr.appendChild(td);
                    toggleButton = document.createElement('button');
                    toggleId = 'toggleButton' + i + j;
                    toggleButton.setAttribute('id', toggleId);
                    toggleButton.addEventListener('click', self.toggleCell, false);

                    if (0 === i || 0 === j) {
                        toggleButton.setAttribute('class', 'toggleButton game');
                        toggleButton.innerText = 'game';
                        currentGameCell = new GameCell(i, j, 1, 1);
                        currentGameCell.setRowSetId(`set${i},${j}`);
                        currentGameCell.setColSetId(`set${i},${j}`);
                        //if (j === 0) { // update row as we move down leftmost column
                        //    currentRowGameCell = currentGameCell;
                        //} else if (i === 0) { // update col as we move across topmost row
                        //    currentColGameCell = currentGameCell;
                        //}
                        // add cell to game
                        self.cells[i][j] = currentGameCell;
                    } else {
                        toggleButton.setAttribute('class', 'toggleButton play');
                        toggleButton.innerText = 'play';
                        currentPlayCell = new PlayCell(i, j);
                        currentPlayCell.setRowSetId(`set${i},0`); // leftmost gamecell in row
                        currentPlayCell.setColSetId(`set0,${j}`); // top gamecell in column
                        // currentRowGameCell.rowSet.push(currentPlayCell);
                        // currentColGameCell.colSet.push(currentPlayCell);
                        // add cell to game
                        self.cells[i][j] = currentPlayCell;
                    }
                    td.appendChild(toggleButton);
                }
            }
            return false;
        };

        self.createBoardFromCells = (cellData) => {
            // using height and width, create table, all play cells, initial game cells at row zero and column zero
            self.width = cellData[0].length;
            self.height = cellData.length;
        };

        self.createEmptyBoard(w, h);
    }
}
// subclass or extend PlayCell/GameCell to include methods for transformation on click
// creating appropriate playValue's in Set's PlayCells (horizontal and vertical non-repeating single digits)
// updating GameCell rowSum and colSum on new Set.PlayCell.playValue's
// checking game (unique?) solvability
