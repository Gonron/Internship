const moves = ['rock', 'paper', 'scissors']

oppenentMoves = moves[Math.floor(Math.random() * moves.length)]

function rockPaperScissor(oMoves, pMoves) {
	console.log('PC:', oMoves, 'vs.', 'YOU:', pMoves)
	if (oMoves == pMoves) {
		return 'DRAW!'
	}
	if (oMoves === 'rock') {
		if (pMoves === 'scissors') {
			return 'PC WINS!'
		} else {
			return 'YOU WIN!'
		}
	}
	if (oMoves === 'paper') {
		if (pMoves === 'rock') {
			return 'PC WINS!'
		} else {
			return 'YOU WIN!'
		}
	}
	if (oMoves === 'scissors') {
		if (pMoves === 'rock') {
			return 'YOU WIN!'
		} else {
			return 'PC WINS!'
		}
	}
}

console.log(rockPaperScissor(oppenentMoves, 'paper'))
