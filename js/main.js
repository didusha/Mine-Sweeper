'use strict'

const FLAG = '🚩'
const MINE = '💣'

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame

var gBoard

function onInit() {
    gGame = {
        isOn: true,
        revealedCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    if (!gGame.isOn) return

    gBoard = buildBoard()
    randomizeMines(gBoard)
    console.table(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)

}

function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []

        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = {
                minesAroundCount: 0,
                isRevealed: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }

    // board[0][1].isMine = board[2][3].isMine = true
    // console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            const className = `cell cell-${i}-${j} `
            // var value = cell.isMine ? MINE : cell.minesAroundCount
            strHTML += `<td onclick="onCellClicked(this, ${i}, ${j})" class="${className}">${getCelltHTML(cell)}</td>\n`
        }

        strHTML += '</tr>\n'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML

}

function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            cell.minesAroundCount = countMinesAround(gBoard, i, j)
        }
    }
    // console.table(gBoard)
}

function countMinesAround(board, rowIdx, colIdx) {
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

function getCelltHTML(cell) {
    const value = cell.isMine ? MINE : cell.minesAroundCount
    return `<span class ="value hidden">${value}</span>`
}

function getEmptyLocation(board) {
    var emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            emptyLocations.push({ i, j })
        }
    }
    if (!emptyLocations.length) return null
    var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)

    return emptyLocations[randIdx]
}

function randomizeMines(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var mineLocation = getEmptyLocation(board)
        var cell = board[mineLocation.i][mineLocation.j]
        cell.isMine = true
    }
}

function checkGameOver() {
    gGame.isOn = false
}

