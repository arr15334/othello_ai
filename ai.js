module.exports = {
    Validator: require('./validator'),
    weights: [
         4,  -3,  2,  2,  2,  2, -3, 4,
        -3,  -4, -1, -1, -1, -1, -4,-3,
         2,  -1,  1,  0,  0,  1, -1, 2,
         2,  -1,  0,  1,  1,  0, -1, 2,
         2,  -1,  0,  1,  1,  0, -1, 2,
         2,  -1,  1,  0,  0,  1, -1, 2,
        -3,  -4, -1, -1, -1, -1, -4,-3,
         4,  -3,  2,  2,  2,  2, -3, 4],
    alphabeta: function(board, player, depth) {
        let alpha = -Infinity
        let beta = Infinity
        const legalMoves = this.Validator.getValidMovements(board,player)
        const rival = player == 1 ? 2 : 1
        // let theSuccesors = [...this.getSuccesors(board, player)]
        
        let best_move = null
        for (m of legalMoves) {
            const newBoard = this.Validator.calculateNewBoard([...board], m.move,player).newBoard
            const value = this.min_score(newBoard, rival, -Infinity, Infinity, depth-1)
            if (value.val < beta) {
                beta = value.val
                best_move = m
            }
        }
        return best_move
    },
    max_score: function (node, player, alpha, beta, depth) {
        const rival = player == 1 ? 2 : 1
        const nextMoves = this.Validator.getValidMovements(node, player)
        if (nextMoves.length == 0 || depth < 1) {
            return { val: this.heuristic(node, player), state: node }
        }

        let value = {val: -Infinity, state: null}

        for (mmax of nextMoves) {
            const nextBoard = this.Validator.calculateNewBoard([...node], mmax.move, player).newBoard
            const score = this.min_score(nextBoard, rival, alpha, beta, depth-1).val
            if (score > value.val) {
                value = {
                    val: score,
                    state: nextBoard
                }
            }
            if (value.val >= beta) {
                return value
            }
            alpha = Math.max(alpha, value.val)
        }
        return value
    },
    min_score: function (node, player, alpha, beta, depth) {
        const rival = player == 1 ? 2 : 1
        const nextMoves = this.Validator.getValidMovements(node,player)
        if (nextMoves.length == 0 || depth < 1) {
            return {val: this.heuristic(node,player), state: node}
        }
        let value = { val: Infinity, state: null }

        for (mmin of nextMoves) {
            const nextBoard = this.Validator.calculateNewBoard([...node],mmin.move,player).newBoard
            let score = this.max_score(nextBoard, rival, alpha, beta, depth-1).val
            if (score < value.val) {
                value = {
                    val: score,
                    state: nextBoard
                }
            }
            if (value.val <= alpha) {
                return value
            }
            beta = Math.min(beta, value.val)
        }
        return value
    },
    getSuccesors: function (board, player) {
        let tsuccesors = []
        let moves = this.Validator.getValidMovements(board, player)
        for (m of moves) {
            tsuccesors.push({
                move: m.move,
                state: this.Validator.calculateNewBoard(board, m.move, player)
            })
        }
        return tsuccesors
    },
    heuristic: function (board, player) {
        let rival = player == 1 ? 2 : 1
        let myPieces = 0
        let rivalPieces = 0
        let hWeight = 0
        for (x of board) {
            if (x == player) {
                myPieces++ 
                hWeight = hWeight + this.weights[x]
            } else if (x == rival) {
                rivalPieces++
                hWeight = hWeight - this.weights[x]
            }
        }
        return 2*hWeight + 3*(myPieces - rivalPieces) 
    }
}






