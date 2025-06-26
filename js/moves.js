'use strict'

// Left clicks functions
function onCellClicked(elCell, i, j) {
    // console.log('--onCellClicked--')
    if (!gGame.isOn) return
    startTimer()

    const cell = gBoard[i][j]
    if (cell.isMarked) return
    if (cell.isRevealed) return
    if (cell.isMineBlown) return

    handleRevealed(cell, elCell)

    //If first click - Add all mines to board
    if (gGame.isFirstClick) setMinesOnBoard()

    // if cell consist 0 --> expand reveal 
    if (cell.minesAroundCount === 0) {
        if (cell.isMine) return
        expandReveal(gBoard, elCell, i, j)
    }

    //if cell is a mine
    if (cell.isMine) {
        gGame.lives--
        if (gGame.lives > 0) handleStrike(cell, elCell)
        else {
            GameOver(cell, elCell)
            elCell.style.backgroundColor = 'rgb(252, 190, 199)'
            return
        }
    }

    checkVictory()
}

function expandReveal(board, elCell, rowIdx, colIdx) {
    console.log('--expandReveal--')
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isRevealed) continue
            //update model
            currCell.isRevealed = true
            gGame.revealedCount++
            //update DOM
            const elNGCell = document.querySelector(`.cell-${i}-${j} span`)
            elNGCell.classList.remove('hidden')

        }
    }
    console.log('gGame.revealedCount', gGame.revealedCount)
    // console.log(gBoard)
    // renderBoard(gBoard)
}

function handleRevealed(cell, elCell) {
    console.log('--handleRevealed--')
    //Update Model
    cell.isRevealed = true
    gGame.revealedCount++
    //update DOM
    revealSpan(elCell)

    // checkVictory()
}

function revealSpan(elCell) {
    // console.log('--revealSpan--')
    var elSpan = elCell.querySelector('.value')
    elSpan.classList.remove('hidden')
}

//Right click functions

function onCellMarked(elCell, i, j) {
    // console.log('--onCellMarked--')
    if (!gGame.isOn) return
    startTimer()

    const cell = gBoard[i][j]

    if (!cell.isMarked) {
        handleMarked(elCell, cell)
    } else if (cell.isMarked) {
        handleUnMarked(elCell, cell)
    }
}

function handleMarked(elCell, cell) {
    console.log('--handleMarked--')
    if (cell.isRevealed) return
    if (gGame.isFirstClick) return

    //update model
    cell.isMarked = true
    gGame.markedCount--
    if (cell.isMarked && cell.isMine) gGame.trueMarkedCount++
    console.log('gGame.trueMarkedCount', gGame.trueMarkedCount)
    // console.log('cell', cell)

    //update DOM
    elCell.innerHTML = `<span class ="value">${FLAG}</span>`
    elCell.style.backgroundColor = 'azure'

    updateMinecountdown()
    checkVictory()
}

function handleUnMarked(elCell, cell) {
    if (cell.isMineBlown) return
    console.log('--handleUnMarked--')
    //update model
    cell.isMarked = false
    gGame.markedCount++

    if (!cell.isMarked && cell.isMine) gGame.trueMarkedCount--
    console.log('gGame.trueMarkedCount', gGame.trueMarkedCount)
    updateMinecountdown()
    // console.log('cell', cell)
    //update DOM
    elCell.innerHTML = getCelltHTML(cell)
}

function removeRightClickDefault() {
    var elCells = document.querySelectorAll('.cell')
    for (var i = 0; i < elCells.length; i++) {
        elCells[i].addEventListener("contextmenu", (e) => { e.preventDefault(); });
    }
}