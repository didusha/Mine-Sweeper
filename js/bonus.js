'use strict'

//Hints
function initHints() {
    //model
    for (var i = 0; i < 3; i++) {
        gGame.hints[i] = {
            isRevealed: false,
        }
    }
    //DOM
    const elHintBtns = document.querySelectorAll('.hint')
    for (var i = 0; i < elHintBtns.length; i++) {
        const elHintBtn = elHintBtns[i]
        elHintBtn.classList.remove('visibility')
        if (gIsDarkMode) elHintBtn.style.backgroundColor = 'var(clr-dm-btn-bg)'
    }
}

function onHintReveal(elBtn) {
    console.log('--onHintReveal--')
    if (!gGame.isOn) return
    if (gGame.isFirstClick) return

    if (gGame.isHint) {
        gGame.isHint = false
        elBtn.style.backgroundColor = 'revert-layer'
        return
    }

    gGame.isHint = true
    const elHintId = elBtn.dataset.id
    for (var i = 0; i < gGame.hints.length; i++) {
        const hint = gGame.hints[i]
        if (i === +elHintId) hint.isRevealed = true
    }

    elBtn.style.backgroundColor = 'var(--clr-highlight)'
}

function revealHint(i, j) {
    toggleHintReveal(gBoard, i, j)
    setTimeout(() => {
        gGame.isHint = false
        toggleHintReveal(gBoard, i, j)
        hideHintBtn()
    }, 1500)
}

function hideHintBtn() {
    const elHintBtns = document.querySelectorAll('.hint')
    for (var i = 0; i < elHintBtns.length; i++) {
        const elHintBtn = elHintBtns[i]

        if (gGame.hints[i].isRevealed) {
            elHintBtn.classList.add('visibility')
            elHintBtn.style.backgroundColor = 'revert-layer'
        }
    }
}

function toggleHintReveal(board, rowIdx, colIdx) {
    // console.log('--revealNG--')
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]

            if (gGame.isHint) {
                const elSpan = getSpan({ i, j })
                elSpan.classList.remove('hidden')
                changeElBgColor(`.cell-${i}-${j}`, 'var(--clr-highlight)')
            } else {
                const elSpan = getSpan({ i, j })
                if (currCell.isMineBlown || currCell.isRevealed || currCell.isMarked) {
                    changeElBgColor(`.cell-${i}-${j}`, 'revert')
                } else {
                    elSpan.classList.add('hidden')
                    changeElBgColor(`.cell-${i}-${j}`, 'revert')
                }
            }
        }
    }
}

//Safe click
function onSafeClick(elBtn) {
    if (!gGame.isOn) return
    if (gGame.safeClick === 0) return

    //model
    gGame.safeClick--
    //DOM
    const unrevealedLocation = getEmptyLocation(gBoard)         //returns {i, j}
    const elUnrevealedCell = getCell(unrevealedLocation)
    elUnrevealedCell.style.backgroundColor = 'var(--clr-highlight)'

    //unrevealed after 1.5 sec
    setTimeout(() => {
        elUnrevealedCell.style.backgroundColor = 'revert-layer'
    }, 1500)

    changeElText('.safe-click span', gGame.safeClick)
    //after last attempt
    if (gGame.safeClick === 0) {
        elBtn.style.transform = 'none'
        elBtn.style.backgroundColor = 'var(--clr-main-table)'
    }
}

//Dark Mode
function onDarkMode(elBtn) {
    gIsDarkMode = !gIsDarkMode
    console.log('gIsDarkMode', gIsDarkMode)

    if (gIsDarkMode) {
        changeElBgColor('body', 'var(--clr-dm-body)')
        changeElBgColor('.btn', 'var(--clr-dm-btn-bg)')

        changeElTextColor('.btn', 'var(--clr-dm-txt)')
        changeElBoxShadowColor('.btn', '0 0 5px var(--clr-main-box-shadow), 0 0 0 4px var(--clr-dm-txt), 0 0 0 5px var(-clr-dm-btn-bg)')
        elBtn.innerText = 'Light Mode'

    } else {
        changeElBgColor('body', 'revert-layer')
        changeElBgColor('.btn', 'revert-layer')

        changeElTextColor('.btn', 'revert-layer')
        changeElBoxShadowColor('.btn', 'revert-layer')
        elBtn.innerText = 'Dark Mode'
    }

}

//Mega Hint
function onMegaHint(elBtn) {
    console.log('--onMegaHint--')
    if (!gGame.isOn) return

    if (gGame.megaHint.isMegaHint) {
        gGame.megaHint.isMegaHint = false
        elBtn.style.backgroundColor = 'revert-layer'
        return
    }

    changeElBgColor('.mega-hint', 'var(--clr-Highlight)')
    if (gGame.megaHint.isMegaHint) return
    gGame.megaHint.isMegaHint = true
}

function handleMegaHint(i, j) {
    gGame.megaHint.clicks.push({ i, j })
    changeElBgColor(`.cell-${i}-${j}`, 'var(--clr-highlight)')
    if (gGame.megaHint.clicks.length === 2) revealMegaHint()
    return
}

function revealMegaHint() {
    // positions to reveal
    const pos1 = gGame.megaHint.clicks[0]
    const pos2 = gGame.megaHint.clicks[1]

    //reveal Elements
    for (var i = pos1.i; i <= pos2.i; i++) {
        for (var j = pos1.j; j <= pos2.j; j++) {
            revealEl(`.cell-${i}-${j} span`, 'hidden')
            changeElBgColor(`.cell-${i}-${j}`, 'var(--clr-highlight)')
        }
    }

    //hide relevant elements
    setTimeout(() => {
        gGame.megaHint.isMegaHint = false
        for (var i = pos1.i; i <= pos2.i; i++) {
            for (var j = pos1.j; j <= pos2.j; j++) {
                const cell = gBoard[i][j]
                if (cell.isMineBlown || cell.isRevealed || cell.isMarked) {
                    changeElBgColor(`.cell-${i}-${j}`, 'var(--clr-main-table)')
                } else {
                    hideEl(`.cell-${i}-${j} span`, 'hidden')
                    changeElBgColor(`.cell-${i}-${j}`, 'var(--clr-main-table)')
                }
            }
        }
        //update DOM btn
        const elBtn = document.querySelector('.mega-hint')
        elBtn.style.backgroundColor = 'var(--clr-main-table)'
        elBtn.style.transform = 'none'
    }, 2000)
}

//Manually create
function onManualCreate(elBtn) {
    if (gGame.isOn) return

    gGame.manualCreate.isManualCreate = true
    changeElBgColor('.manual-create', 'var(--clr-highlight)')
    revealEl('.manual-create span', 'hidden')
    changeElText('.manual-mines', gLevel.MINES)
    gGame.manualCreate.toRandomizeMines = false
}

function setMinesOnBoardManually(i, j) {
    if (gGame.manualCreate.minePositions.length < gLevel.MINES) {
        gGame.manualCreate.minePositions.push({ i, j })
        const cell = gBoard[i][j]
        //model
        cell.isMine = true
        gGame.manualCreate.amount--
        //Dom
        const elSpan = `<span class ="value">${MINE}</span>`
        renderCell({ i, j }, elSpan)
        changeElText('.manual-mines', gGame.manualCreate.amount)

        gGame.prevBoards.push(copyMat(gBoard))
    }

    if (gGame.manualCreate.minePositions.length === gLevel.MINES) hideManualMines()
    else return
}

function hideManualMines() {
    setMinesNegsCount()
    setTimeout(() => {
        renderBoard(gBoard)
    }, 500)
    gGame.manualCreate.isManualCreate = false
}

//leadership Board
function handleLedearshipBoard(gameTotalTime) {

    //Check if player is better than best Player in local storage and store new best
    const level = getLevel()
    const levelName = getLevelName()
    const name = prompt('Enter your userName')
    const player = [name, gameTotalTime]

    //retrive best player from local store
    const strBestPlayer = localStorage.getItem(levelName)
    const bestPlayer = strBestPlayer ? strBestPlayer.split(',') : []

    //checks if new best player
    if (+player[1] < +bestPlayer[1]) {
        localStorage.setItem(levelName, player.join(','))
        //update DOM
        updateLeadershipBoardView(level, player)
    }
}

function updateLeadershipBoardView(level, bestPlayer) {
    var strBestPlayer = `${bestPlayer[0]}  ${bestPlayer[1]}`
    document.querySelector(`.ld-${level}`).innerText = strBestPlayer
}

function initLeaderBoard() {
    for (var i = 0; i < 3; i++) {
        var strBestPlayer = ''
        switch (i) {
            case 0:
                strBestPlayer = localStorage.getItem('Beginner')
                break
            case 1:
                strBestPlayer = localStorage.getItem('Medium')
                break
            case 2:
                strBestPlayer = localStorage.getItem('Expert')
                break
        }
        const bestPlayer = strBestPlayer.split(',')
        updateLeadershipBoardView(i, bestPlayer)
    }
}

function getLevelName() {
    switch (gLevel.SIZE) {
        case 4: return 'Beginner'
        case 8: return 'Medium'
        case 12: return 'Expert'
    }
}

function getLevel() {
    switch (gLevel.SIZE) {
        case 4: return 0
        case 8: return 1
        case 12: return 2
    }
}


/*
function getLeadershipTable(level) {
    var strBestPlayers = ''
    switch (level) {
        case 0:
            strBestPlayers = localStorage.getItem('Beginner')
        case 1:
            strBestPlayers = localStorage.getItem('Medium')
        case 2:
            strBestPlayers = localStorage.getItem('Expert')
    }

    const BestPlayers = []

    if (strBestPlayers) {
        const rows = strBestPlayers.split('|')
        for (var i = 0; i < rows.length; i++) {
            var players = rows[i].split(',')
            const row = []
            for (var j = 0; j < players.length; j++) {
                row.push(players[j])
            }
        BestPlayers.push(row)
        }
    }
    console.log('BestPlayers', BestPlayers)
}*/

/*
//Undo
function onUndo() {
    console.log('--onUndo--')

    gGame.isUndo = true
    console.table('gGame.prevBoards', gGame.prevBoards)
    const length = gGame.prevBoards.length
    gBoard = copyMat(gGame.prevBoards[length-1])
    renderBoard(gBoard)
    updateMinecountdown()
}
*/
