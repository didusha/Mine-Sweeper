'use strict'


function onCellClicked(elCell, i, j) {
    if(!gGame.isOn) return

    const cell = gBoard[i][j]
    console.log('Cell clicked: ', elCell, i, j)
    // if Bomb 
    if(cell.isMine) {
        revealCell(elCell)
        checkGameOver()
    }
    revealCell(elCell)
}

function onCellMarked(elCell, i, j) {

}

function expandReveal(board, elCell, i, j) {

}

function revealCell(elCell) {
    var elSpan = elCell.querySelector('.value')
    elSpan.classList.remove('hidden')
}