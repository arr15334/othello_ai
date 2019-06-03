
module.exports = {
    countUp: function (board, pos, player) {
        let up = pos - 8
        let possibleFlips = 0,stop = false
        let newBoard = [...board]
        newBoard[pos] = player
        while (up >= 0 && !stop) {
            let tileUp = board[up]
            if (player == tileUp) {
                return {
                    board: newBoard,
                    flips: possibleFlips
                }
            } else if (tileUp == 0) {
                stop = true
            } else {
                newBoard[up] = player
                possibleFlips++
            }
            up = up - 8
        }
        return {
            flips: 0,
            board: board
        }
    },
    countDown: function (board, pos, player) {
        let down = pos + 8
        let possibleFlips = 0
        let stop = false
        let newBoard = [...board]
        newBoard[pos] = player
        while (down < 64 && !stop) {
            let tileDown = board[down]
            if (player == tileDown) {
                return {
                    board: newBoard,
                    flips: possibleFlips
                }
            } else if (tileDown == 0) {
                stop = true
            } else {
                newBoard[down] = player
                possibleFlips++
            }
            down = down + 8
        }
        return {
            flips: 0,
            board: board
        }
    },
    countRight: function (board, pos, player) {
        if (pos % 8 == 7) {
            return {
                flips: 0,
                board: board
            }
        }
        let right = pos + 1
        let possibleFlips = 0
        let newBoard = [...board]
        newBoard[pos] = player
        let stop = false
        while (!stop) {
            let tileRight = board[right]
            if (player == tileRight) {
                return {
                    board: newBoard,
                    flips: possibleFlips
                }
            } else if (tileRight == 0) {
                stop = true
            } else {
                newBoard[right] = player
                possibleFlips++
            }
            if (right % 8 == 7) {
                stop = true
            }
            right = right + 1
        }
        return {
            flips: 0,
            board: board
        }
    },
    countLeft: function(board, pos, player) {
        if (pos % 8 == 0) {
            return {
                flips: 0,
                board: board
            }
        }
        let left = pos - 1
        let possibleFlips = 0
        let newBoard = [...board]
        newBoard[pos] = player
        let stop = false
        while (!stop) {
            let tileLeft = board[left]
            if (player == tileLeft) {
                return {
                    board: newBoard,
                    flips: possibleFlips
                }
            } else if (tileLeft == 0) {
                stop = true
            } else {
                newBoard[left] = player
                possibleFlips++
            }
            if (left % 8 == 0) {
                stop = true
            }
            left = left - 1
        }
        return {
            flips: 0,
            board: board
        }
    },
    countDownLeft: function(board, pos, player) {
        if (pos % 8 == 0 || pos > 55) {
            return {
                flips: 0,
                board: board
            }
        }
        let downLeft = pos + 7
        let possibleFlips = 0
        let stop = false
        let newBoard = [...board]
        newBoard[pos] = player
        while (!stop) {
            let tileDownLeft = board[downLeft]
            if (player == tileDownLeft) {
                return {
                    board: newBoard,
                    flips: possibleFlips
                }
            } else if (tileDownLeft == 0) {
                stop = true
            } else {
                newBoard[downLeft] = player
                possibleFlips++
            }
            if (downLeft % 8 == 0 || downLeft > 55) {
                stop = true
            }
            downLeft = downLeft + 7
        }
        return {
            flips: 0,
            board: board
        }
    },
    countDownRight: function(board, pos, player) {
        if (pos % 8 == 7 || pos > 55) {
            return {
                flips: 0,
                board: board
            }
        }
        let downRight = pos + 9
        let possibleFlips = 0
        let stop = false
        let newBoard = [...board]
        newBoard[pos] = player
        while (!stop) {
            let tileDownRight = board[downRight]
            if (player == tileDownRight) {
                return {
                    board: newBoard,
                    flips: possibleFlips
                }
            } else if (tileDownRight == 0) {
                stop = true
            } else {
                possibleFlips++
                newBoard[downRight] = player
            }
            if (downRight % 8 == 7 || downRight > 55) {
                stop = true
            }
            downRight = downRight + 9
        }
        return {
            flips: 0,
            board: board
        }
    },

    countUpLeft: function(board, pos, player) {
        if (pos % 8 == 0 || pos < 9) {
            return {
                flips: 0,
                board: board
            }
        }
        let upLeft = pos - 9
        let possibleFlips = 0
        let stop = false
        let newBoard = [...board]
        newBoard[pos] = player

        while (!stop) {
            let tileUpLeft = board[upLeft]
            if (player == tileUpLeft) {
                return {
                    flips: possibleFlips,
                    board: newBoard
                }
            } else if (tileUpLeft == 0) {
                stop = true
            } else {
                newBoard[upLeft] = player
                possibleFlips++
            }
            if (upLeft % 8 == 0 || upLeft < 9) {stop = true}
            upLeft = upLeft - 9
        }
        return {
            flips: 0,
            board: board
        }
    },

    countUpRight: function(board, pos, player) {
        if (pos % 8 == 7 || pos < 8) {
            return {
                flips: 0,
                board: board
            }
        }
        let upRight = pos - 7
        let possibleFlips = 0
        let stop = false
        let newBoard = [...board]
        newBoard[pos] = player

        while (!stop) {
            let tileUpRight = board[upRight]
            if (player == tileUpRight) {
                return {
                    flips: possibleFlips,
                    board: newBoard
                }
            } else if (tileUpRight == 0) {
                stop = true
            } else {
                possibleFlips++
                newBoard[upRight] = player
            }
            if (upRight % 8 == 7 || upRight < 7) {stop = true}
            upRight = upRight - 7
        }
        return {
            flips: 0,
            board: board
        }
    },
    countTilesToFlip: function (board, pos, player) {
        return this.countUp(board, pos, player).flips + this.countDown(board, pos, player).flips +
            this.countLeft(board, pos, player).flips + this.countRight(board, pos, player).flips +
            this.countDownLeft(board, pos, player).flips + this.countDownRight(board, pos, player).flips +
            this.countUpRight(board, pos, player).flips + this.countUpLeft(board, pos, player).flips
    },
    calculateNewBoard: function (board, pos, player) {
        let original = [...board]
        let new1 = this.countUp(board,pos, player).board
        let new2 = this.countUpRight(new1, pos, player).board
        let new3 = this.countRight(new2, pos, player).board
        let new4 = this.countDownRight(new3, pos, player).board
        let new5 = this.countDown(new4, pos, player).board
        let new6= this.countDownLeft(new5, pos, player).board
        let new7 = this.countLeft(new6, pos, player).board
        let new8 = this.countUpLeft(new7, pos, player).board
        return {
            newBoard: new8,
            originalBoard: original
        }
    },
    getValidMovements: function (board, turn_id) {
    let valid = []
    for (let i = 0; i < board.length; i++) {
        if (board[i] != 0) {
            continue
        }
        const flips = this.countTilesToFlip(board, i, turn_id)
        if (flips > 0) {
            valid.push({
                'move': i,
                'flips': flips
            })
        }
    }
    return valid
    }
}
/*
let board = [1, 1, 1, 1, 0, 0, 1, 2,
             1, 1, 1, 2, 0, 0, 2, 2,
             2, 1, 2, 1, 1, 2, 2, 0,
             0, 0, 1, 1, 2, 1, 2, 1,
             2, 2, 2, 2, 2, 2, 1, 1,
             0, 0, 1, 1, 2, 1, 1, 1,
             0, 0, 0, 1, 1, 1, 1, 1,
             0, 0, 2, 0, 1, 1, 2, 0]
let pos = 25
let player = 2

console.log(countTilesToFlip(board, pos, player))
*/
// todo, chequear que encuentre uno al final en cada funcion para que valgan los flips