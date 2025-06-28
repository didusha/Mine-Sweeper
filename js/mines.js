'use strict'

//Mines functions
function setMinesOnBoard() {
    // console.log('--setMinesOnBoard--')
    randomizeMines(gBoard)
    setMinesNegsCount()
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
    elCell.style.backgroundColor = 'var( --clr-mine-strike)'
    handleShowLives()
}

//On gameOver
function revealAllMines(board) {
    console.log('--revealAllMines--')
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (cell.isMarked && !cell.isMine) {
                revealFaultMarks(i, j)
            }
            if (cell.isMine) {
                revealEl(`.cell-${i}-${j} span`, 'hidden')
            }
        }
    }
}

function revealFaultMarks(i, j) {
    const elSpan = getSpan({i, j})              
    elSpan.classList.remove('hidden')
    elSpan.innerText = 'x'
    elSpan.style.color = 'var(--clr-faults)'
}
