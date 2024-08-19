const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

function markBoard(position, mark) {
    let pos = parseInt(position);

    if (pos >= 1 && pos <= 9 && (mark === 'X' || mark === 'O')) {
      
        if (validateMove(pos)) {
            board[pos] = mark;
            return true;
        }
    }
    return false;
};

function printBoard() {
    let updatedBoard = [];

    for(let index in board){
        if (board[index] === ' '){ 
            updatedBoard.push(index);
        } else {
            updatedBoard.push(board[index]);
        }
    };
    
    console.log(
        `${updatedBoard[0]} | ${updatedBoard[1]} | ${updatedBoard[2]}\n` +
        '---------\n' +
        `${updatedBoard[3]} | ${updatedBoard[4]} | ${updatedBoard[5]}\n` +
        '---------\n' +
        `${updatedBoard[6]} | ${updatedBoard[7]} | ${updatedBoard[8]}`
    );
};


function validateMove(position) {
    let pos = parseInt(position);
    
    if (pos >= 1 && pos <= 9) {
       
        if (board[pos] === ' ') {
            return true;
        }
    }
    return false;
};

let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function checkWin(player) {
    for (let combo of winCombinations) {
      
        const [a, b, c] = combo;
      
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
};

function checkFull() {
    for (let key in board) {
        if (board[key] === ' ') {
            return false;
        }
    }
    return true;
};

function playTurn(player) {
    let position;
    do {
        position = prompt(`${player}'s turn. Enter a position (1-9):`);
    } while (!validateMove(position));

    markBoard(position, player);

    if (checkWin(player)) {
        console.log(`Player ${player} wins!`);
        return true;
    }

    if (checkFull()) {
        console.log("It's a draw!");
        return true;
    }

    return false;
}

console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false;
let currentTurnPlayer = 'X';

while (!winnerIdentified) {
    winnerIdentified = playTurn(currentTurnPlayer);
    printBoard();

    if (!winnerIdentified) {
        currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
    }
}

console.log("Game over.");
