'use strict'

const FLAG = '🚩'
const MINE = '💣'

var gLevel = {
    SIZE: 4,
    MINES: 2,
}

var gGame
var gBoard

function onInit() {
    stopTimer()
    gGame = {
        isOn: true,
        revealedCount: 0,
        markedCount: gLevel.MINES,
        trueMarkedCount: 0,
        // secsPassed: 0,
        // isTimer: false,
        isFirstClick: true,
        lives: 3,
    }

    if (!gGame.isOn) return

    gBoard = buildBoard()
    // randomizeMines(gBoard)
    // setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    updateMinecountdown()
    handleRestartImoji('😃')
    handleShowLives()
    showResetTimer()
    // console.table(gBoard)
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
                isMarked: false,
                isMineBlown: false,
            }
            board[i][j] = cell
        }
    }
    // board[0][1].isMine = board[2][3].isMine = true
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            const className = `cell cell-${i}-${j} `
            strHTML += `<td onclick="onCellClicked(this, ${i}, ${j})" 
                        oncontextmenu="onCellMarked(this, ${i}, ${j})" 
                        class="${className}">${getCelltHTML(cell)}</td>\n`
        }
        strHTML += '</tr>\n'
    }

    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML

    removeRightClickDefault()
}

function getCelltHTML(cell) {
    var value = cell.isMine ? MINE : cell.minesAroundCount

    if (cell.isRevealed)
        return `<span class ="value">${value}</span>`
    else
        return `<span class ="value hidden">${value}</span>`
}

function getFlagHTML(cell, value) {
    return `<span class ="value ">${value}</span>`
}

function GameOver() {
    console.log('--checkGameOver--')

    gGame.isOn = false
    handleRestartImoji('🤯')
    // revealAllMines(gBoard)
    handleShowLives()
    stopTimer()
}

function checkVictory() {
    console.log('--checkVictory--')
    // console.table(gBoard)
    // console.log('gGame.revealedCount', gGame.revealedCount)
    // console.log('gGame.gLevel.MINES', gLevel.MINES)
    if (gGame.revealedCount + gGame.trueMarkedCount === gLevel.SIZE ** 2) {
        stopTimer()
        handleRestartImoji('😎')
        gGame.isOn = false
        // addMarkOnVictory(gBoard)
    }
    return
}

function handleRestartImoji(value) {
    var elButton = document.querySelector('.restart')
    elButton.innerText = value
}

function handleShowLives() {
    var lives = ''
    for (var i = 0; i < gGame.lives; i++) {
        lives += '🩷'
    }
    var elLives = document.querySelector('.lives')
    elLives.innerText = lives
}

function onChangeDifficulty(level, mines) {
    gLevel.SIZE = level
    gLevel.MINES = mines
    onInit()
}

function showResetTimer(){
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = gSeconds
}

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
    console.log('--randomizeMines--')
    for (var i = 0; i < gLevel.MINES; i++) {
        var mineLocation = getEmptyLocation(board)
        var cell = board[mineLocation.i][mineLocation.j]
        cell.isMine = true
    }
}

function setMinesNegsCount() {
    // console.log('--setMinesNegsCount--')
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
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
    var elMarkedCountDown = document.querySelector('.marked-counter')
    elMarkedCountDown.innerText = gGame.markedCount
}

function handleStrike(cell, elCell) {
    console.log('--handleStrike--')
    if (cell.isMineBlown) return

    gGame.revealedCount--
    cell.isRevealed = false
    cell.isMineBlown = true

    elCell.style.backgroundColor = 'rgb(252, 190, 199)'
    handleShowLives()
}

function revealAllMines(board) {
    console.log('--revealAllMines--')
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (cell.isMarked && !cell.isMine) {
                var elSpan = document.querySelector(`.cell-${i}-${j} span`)
                elSpan.classList.remove('hidden')
                elSpan.innerText = 'x'
                elSpan.style.color = 'red'
            }
            if (cell.isMine) {
                var elSpan = document.querySelector(`.cell-${i}-${j} span`)
                elSpan.classList.remove('hidden')
            }
        }
    }
}

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