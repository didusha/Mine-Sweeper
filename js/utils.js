'use strict'

var gMillisec = 0;
var gSeconds = 0;
var gTimer = 0;

function display() {
    if (gMillisec >= 9) {
        gMillisec = 0
        gSeconds++
    }
    else
        gMillisec++

    var elTimer = document.querySelector('.timer')
    elTimer.innerText = gSeconds                    
    gTimer = setTimeout("display()", 100);
}

function startTimer() {
    if (gTimer > 0) {
        return
    }
    display()
}

function stopTimer() {
    //stop timer
    clearTimeout(gTimer)
    //reset timer
    gTimer = 0
    gMillisec = 0
    gSeconds = 0
}

function getEmptyLocation(board) {
    var emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if(cell.isRevealed) continue
            if(cell.isMine) continue
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

// //location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//     // Select the elCell and set the value
//     const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//     elCell.innerHTML = value
// }

/*
function buildBoard() {
    const SIZE = 4
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = ''   
            }
        }
    return board
}

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

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

function getEmptyLocation(board) {
    var emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyLocations.push({ i, j })
            }
        }
    }
    if (!emptyLocations.length) return null
    var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    return emptyLocations[randIdx]
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

function changeElText(selector, text) {
    document.querySelector(selector).innerText = text
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

function playAudio() {
    var audio = new Audio('audio/audio.mp3')
    audio.play()
    audio.volume = 0.2
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
