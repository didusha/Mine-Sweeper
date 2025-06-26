'use strict'

//Mines functions
function setMinesOnBoard() {
    console.log('--setMinesOnBoard--')
    randomizeMines(gBoard)
    // gBoard[0][1].isMine = gBoard[1][1].isMine = gBoard[1][2].isMine = true
    // gBoard[1][3].isMine = gBoard[1][0].isMine = gBoard[0][3].isMine = true
    // console.table(gBoard)
    setMinesNegsCount(gBoard)
    updateMinecountdown()
    renderBoard(gBoard)
    gGame.isFirstClick = false
}

function randomizeMines(board) {
    // console.log('--randomizeMines--')
    for (var i = 0; i < gLevel.MINES; i++) {
        const mineLocation = getEmptyLocation(board)
        const cell = board[mineLocation.i][mineLocation.j]
        cell.isMine = true
    }
}

function setMinesNegsCount() {
    // console.log('--setMinesNegsCount--')
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            cell.minesAroundCount = countMinesAround(gBoard, i, j)
        }
    }
}

function countMinesAround(board, rowIdx, colIdx) {
    // console.log('--countMinesAround--')
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) count++
        }
    }
    return count
}

function updateMinecountdown() {
    const elMarkedCountDown = document.querySelector('.marked-counter')
    elMarkedCountDown.innerText = gGame.markedCount
}

function handleStrike(cell, elCell) {
    console.log('--handleStrike--')
    if (cell.isMineBlown) return

    console.log('cell', cell)
    //update model
    gGame.revealedCount--
    cell.isRevealed = false
    cell.isMineBlown = true
    //update DOM
    elCell.style.backgroundColor = 'rgb(252, 190, 199)'
    handleShowLives()

}

function revealAllMines(board) {
    console.log('--revealAllMines--')
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (cell.isMarked && !cell.isMine) {
                revealFaults(i, j)
            }
            if (cell.isMine) {
                const elSpan = document.querySelector(`.cell-${i}-${j} span`)
                elSpan.classList.remove('hidden')

            }
        }
    }
}

function revealFaults(i, j) {
    const elSpan = document.querySelector(`.cell-${i}-${j} span`)
    elSpan.classList.remove('hidden')
    elSpan.innerText = 'x'
    elSpan.style.color = 'red'
}

//Not relevant for this version 
// function addMarkOnVictory(board) {
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             const cell = board[i][j]
//             if (!cell.isRevealed && cell.isMine) {
//                 var elCell = document.querySelector(`.cell-${i}-${j}`)
//                 elCell.innerHTML = getFlagtHTML(cell, FLAG)
//             }
//         }
//     }
// }