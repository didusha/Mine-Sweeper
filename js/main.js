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
        isFirstClick: true,
        lives: 3,
    }

    if (!gGame.isOn) return

    gBoard = buildBoard()
    renderBoard(gBoard)
    updateMinecountdown()
    handleRestartImoji('😃')
    handleShowLives()
    showResetTimer()
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

function gameOver() {
    // console.log('--checkGameOver--')
    gGame.isOn = false
    handleRestartImoji('🤯')
    revealAllMines(gBoard)
    handleShowLives()
    stopTimer()
}

function checkVictory() {
    // console.log('--checkVictory--')
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

function onChangeDifficulty(level, mines) {
    gLevel.SIZE = level
    gLevel.MINES = mines
    onInit()
}


//DOM functions
function handleRestartImoji(value) {
    const elButton = document.querySelector('.restart')
    elButton.innerText = value
}

function handleShowLives() {
    var lives = ''
    for (var i = 0; i < gGame.lives; i++) {
        lives += '🩷'
    }
    const elLives = document.querySelector('.lives')
    elLives.innerText = lives
}

function showResetTimer() {
    const elTimer = document.querySelector('.timer')
    elTimer.innerText = gSeconds
}

function getCelltHTML(cell) {
    const value = cell.isMine ? MINE : cell.minesAroundCount

    if (cell.isRevealed)
        return `<span class ="value">${value}</span>`
    else
        return `<span class ="value hidden">${value}</span>`
}

function getFlagHTML(cell, value) {
    return `<span class ="value ">${value}</span>`
}