const Validator = require('./validator.js')
const AI = require('./ai.js')

const io = require('socket.io-client')
let socket = io.connect('http://localhost:4000'),userName = 'arriazaneitor' +randInt(0,100), tournamentID = 12;

socket.on('connect', () => {
    console.log('Conectado papu' + userName)

    socket.emit('signin', {
        user_name: userName,
        tournament_id: tournamentID,
        user_role: 'player'
    })
})

socket.on('ok_signin', () => {
    console.log('logeado')
})

socket.on('ready', (data) => {
    //console.log(data.board)
    console.log(humanBoard(data.board))

    console.log('Turn: '+data.player_turn_id)
    const validMovements = Validator.getValidMovements(data.board, data.player_turn_id)
    let best = AI.alphabeta(data.board, data.player_turn_id, 3)
    let movement = null
    if (!best) {
        console.log('not found')
        movement = maxMove(validMovements)
    } else {
        console.log('found')
        movement = best.move
    }
    /*
    while(! validateHumanPosition(movement)) {
        movement = getRandomMove()
    }
    */
     movement = greedy(validMovements)

    socket.emit('play', {
        player_turn_id: data.player_turn_id,
        tournament_id: tournamentID,
        game_id: data.game_id,
        movement: movement //ix(parseInt(movement[0]), movement[1].toLowerCase())
    })
    
})

socket.on('finish', (data) => {
    console.log('game ' + data.game_id + ' finished')
    let winnerTurn = data.winner_turn_id
    console.log('WINNER: ' + winnerTurn)
    socket.emit('player_ready', {
        tournament_id: tournamentID,
        game_id: data.game_id,
        player_turn_id: data.player_turn_id
    })
})

// 0 = _, 1 = X, 2 = O
var tileRep = ['_', 'X', 'O'],
    N = 8;

function humanBoard(board) {

    var result = '    A  B  C  D  E  F  G  H';

    for (var i = 0; i < board.length; i++) {
        if (i % N === 0) {
            result += '\n\n ' + (parseInt(Math.floor(i / N)) + 1) + ' ';
        }
        result += ' ' + tileRep[board[i]] + ' ';
    }
    return result;
}

function greedy(movements) {
    let max = -Infinity
    let move = null
    for (m of movements) {
        if (m.flips > max) {
            max = m.flips
            move = m.move
        }
    }
    return move
}

function randInt(a,b) {
    return parseInt( Math.floor( (Math.random() * (b - a) ) ))
}

function getRandomMove (movements) {
    const total = movements.length
    return movements[0].move
}

function maxMove(movements) {
    let max = -Infinity
    let move = null
    for (m of movements) {
        if ((m.flips + 2*AI.weights[m.move]) > max) {
            max = m.flips
            move = m.move
        }
    }
    return move
}

function getSameColumn(board, colIndex) {
    let sameColumn = []
    for (let i = 0; i < board.length; i++) {
        if (Math.abs(i-colIndex) % 8 === 0) {
            sameColumn.push(board[i])
        }
    }
    return sameColumn
}

function getSurrounding(board, position) {
    let surrounding = []
    if (position < 56) {
        surrounding.push(board[position + 8])
    }
    if (position > 8) {
        surrounding.push(board[position - 8])
    }
    if ((position % 8) != 0 ) {
        surrounding.push(board[position - 1])
    }
    if ((position % 7) != 0) {
        surrounding.push(board[position + 1])
    }
    if ((position % 8) != 0 && position > 8) {
        surrounding.push(board[position - 9])
    }
    if ((position % 7) != 0 && position >= 8) {
        surrounding.push(board[position - 7])
    }
    if ((position % 8) != 0 && position < 56) {
        surrounding.push(board[position - 9])
    }
    if ((position % 7) != 0 && position < 55) {
        surrounding.push(board[position - 7])
    }
    return surrounding
}

let board =
[2, 2, 2, 2, 2, 2, 1, 1,
1, 1, 1, 1, 1, 1, 1, 1,
1, 1, 2, 2, 1, 2, 2, 1,
1, 2, 0, 2, 1, 2, 0, 0,
1, 2, 2, 2, 2, 2, 2, 2,
0, 2, 0, 2, 0, 2, 2, 0,
0, 0, 0, 0, 0, 0, 2, 0,
0, 0, 0, 0, 0, 0, 0, 0]
    
    
let pos = 40
let player = 1

//console.log(maxMove(board,player,10))
console.log(Validator.countTilesToFlip(board,pos,player))

let validMoves = Validator.getValidMovements(board, player)
console.log(validMoves)

let best = AI.alphabeta(board,player,5)
console.log(best.move)

//console.log(AI.heuristic(Validator.calculateNewBoard(board,26,1).newBoard,1))
//console.log(AI.heuristic(Validator.calculateNewBoard(board,63,1).newBoard,1))

/*

console.log('calculating...')
let ai_move = AI.alphabeta(board,player, 7).move
console.log('best_move')
console.log(ai_move)


console.log('new board')
console.log(Validator.calculateNewBoard(board,best,player))
*/