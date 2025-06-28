'use strict'

function display() {
    if (gMillisec >= 9) {
        gMillisec = 0
        gSeconds++
    }
    else
        gMillisec++

    const elTimer = document.querySelector('.timer')
    elTimer.innerText = gSeconds
    gTimerInterval = setTimeout("display()", 100);
}

function startTimer() {
    if (gTimerInterval > 0) {
        return
    }
    display()
}

function stopTimer() {
    //stop timer
    clearTimeout(gTimerInterval)
    //reset timer
    gTimerInterval = 0
    gMillisec = 0
    gSeconds = 0
}

function getEmptyLocation(board) {
    var emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell.isRevealed) continue
            if (cell.isMine) continue
            emptyLocations.push({ i, j })
        }
    }
    if (!emptyLocations.length) return null
    var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)

    return emptyLocations[randIdx]
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function copyMat(mat) {
    var newMat = []
    
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j]
        }
    }
    return newMat
}

function revealSpan(elCell) {
    // console.log('--revealSpan--')
    const elSpan = elCell.querySelector('.value')
    elSpan.classList.remove('hidden')
}

function hideEl(selector) {
    // console.log('--hideSpan--')
    return document.querySelector(selector).classList.add('hidden')
}

function revealEl(selector) {
    // console.log('--hideSpan--')
    return document.querySelector(selector).classList.remove('hidden')
}

function getCell(location) {
    // return elCell by location
    return document.querySelector(`.cell-${location.i}-${location.j}`)
}

function getSpan(location) {
    // return elSpan by location
    return document.querySelector(`.cell-${location.i}-${location.j} span`)
}

function changeElBgColor(selector, color) {
    const els = document.querySelectorAll(selector)
    for (var i = 0; i < els.length; i++) {
        els[i].style.backgroundColor = color
    }
}

function changeElTextColor(selector, color) {
    const els = document.querySelectorAll(selector)
    for (var i = 0; i < els.length; i++) {
        els[i].style.color = color
    }
}

function changeElBoxShadowColor(selector, color) {
    const els = document.querySelectorAll(selector)
    for (var i = 0; i < els.length; i++) {
        els[i].style.boxShadow = color
    }
}

function changeElText(selector, text) {
    document.querySelector(selector).innerText = text
}

//location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

/*


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function showModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hidden')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hidden')
}

get current time in a normal view
function getTime() {
    return new Date().toString().split(' ')[4]
}

flash buttons
function flashOnceWrongAnswer(elBtn) {
    elBtn.classList.add('wrong')
    setTimeout(() => {
        elBtn.classList.remove('wrong')
    }, 1500)
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 } //right
        case 2: return { i: 1, j: 0 } //down
        case 3: return { i: 0, j: -1 } //left
        case 4: return { i: -1, j: 0 } //up
    }
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

var gStartTime
var gTimerInterval

//create a stopwatch
function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(updateTimer, 25)
    // console.log(' gTimerInterval:', gTimerInterval)
}

function updateTimer() { 
    const now = Date.now()
    //* Taking the difference between current time and start time
    //* and converting to seconds
    const diff = (now - gStartTime) / 1000
    document.querySelector('.timer span').innerText = diff.toFixed(3)
}

function stopTimer() {
    clearInterval(gTimerInterval)
}


 */
