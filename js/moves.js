'use strict'


function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    startTimer()

    const cell = gBoard[i][j]

    handleRevealed(cell, elCell)

    if (cell.minesAroundCount === 0) expandReveal(gBoard, elCell, i, j)

    // console.log('Cell clicked: ', elCell, i, j)
    // console.log('cell value:', cell)


    // if Bomb --> game over
    if (cell.isMine) {
        checkGameOver()
    }
}

function onCellMarked(elCell, i, j) {
    if (!gGame.isOn) return

    startTimer()

    const cell = gBoard[i][j]

    if (!cell.isMarked) {
        handleMarked(elCell, cell)
    } else {
        handleUnMarked(elCell, cell)
    }
    console.log('Cell clicked: ', elCell, i, j)
    console.log('cell value:', cell)
}

function expandReveal(board, elCell, rowIdx, colIdx) {
    console.log('hey expandReveal')
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) continue

            currCell.isRevealed = true
            const elNGCell = document.querySelector(`.cell-${i}-${j}`)
            elNGCell.classList.remove('hidden')
        }
    }
    // console.log(gBoard)
    // renderBoard(gBoard)
}

function revealCell(elCell) {
    var elSpan = elCell.querySelector('.value')
    elSpan.classList.remove('hidden')
}

function handleRevealed(cell, elCell) {
    gGame.revealedCount++
    //Update Model
    cell.isRevealed = true
    //update DOM
    revealCell(elCell)

    checkVictory()
}

function handleMarked(elCell, cell) {
    //update model
    cell.isMarked = true
    gGame.markedCount--
    //update DOM
    elCell.innerHTML = `<span class ="value ">${FLAG}</span>`

    updateMinecountdown()
}

function handleUnMarked(elCell, cell) {
    //update model
    cell.isMarked = false
    gGame.markedCount++
    updateMinecountdown()
    //update DOM
    elCell.innerHTML = getCelltHTML(cell)
}

function updateMinecountdown() {
    var elMarkedCountDown = document.querySelector('.marked-counter')
    elMarkedCountDown.innerText = gGame.markedCount
}

function removeRightClickDefault() {
    var elCells = document.querySelectorAll('.cell')
    for (var i = 0; i < elCells.length; i++) {
        elCells[i].addEventListener("contextmenu", (e) => { e.preventDefault(); });
    }
}