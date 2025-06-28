'use strict'

const FLAG = '🚩'
const MINE = '💣'
const HINT = '💡'

var gLevel = {
    SIZE: 4,
    MINES: 2,
}

var gGame
var gBoard
var gIsDarkMode = false
var gMillisec = 0
var gSeconds = 0
var gTimerInterval = 0

function onInit() {
    stopTimer()
    gGame = {
        isOn: false,
        revealedCount: 0,
        markedCount: gLevel.MINES,
        trueMarkedCount: 0,
        isFirstClick: true,
        lives: 3,
        safeClick: 3,
        isHint: false,
        hints: [],
        megaHint: { amount: 1, isMegaHint: false, clicks: [] },
        manualCreate: { amount: gLevel.MINES, isManualCreate: false, minePositions: [], toRandomizeMines: true },
        prevBoards: [],
        isUndo: false,
        isDarkMode: false,
    }

    gBoard = buildBoard()
    renderBoard(gBoard)
    updateMinecountdown()
    showResetTimer()
    initDOMel()
    initLeaderBoard()

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
            if (cell.isRevealed || cell.isMarked) {
                document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = 'var(--clr-main-table)'
            }
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
    if (gGame.revealedCount + gGame.trueMarkedCount === gLevel.SIZE ** 2) {
        handleLedearshipBoard(gSeconds)
        stopTimer()
        handleRestartImoji('😎')
        gGame.isOn = false
    }
    return
}

function onChangeDifficulty(level, mines) {
    gLevel.SIZE = level
    gLevel.MINES = mines
    onInit()
}


//DOM functions

function initDOMel() {

    handleRestartImoji('😃')
    handleShowLives()
    initHints()

    //Mega hint
    const elMegaHintBtn = document.querySelector('.mega-hint')
    elMegaHintBtn.style.backgroundColor = 'var(--clr-main-btn)'
    elMegaHintBtn.style.transform = 'revert'

    //safe click
    document.querySelector('.safe-click').style.backgroundColor = 'var(--clr-main-btn)'
    document.querySelector('.safe-click span').innerHTML = '3'

    //Manual Create
    document.querySelector('.manual-create').style.backgroundColor = 'var(--clr-main-btn)'
    document.querySelector('.manual-create span').classList.add('hidden')

    //In dark mode - init all btns
    if (gIsDarkMode) initDarkModeBtn()
}

function initDarkModeBtn() {
    // console.log('--initDarkModeBtn--')
    changeElBgColor('.btn', 'var(--clr-dm-btn-bg)')
}

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