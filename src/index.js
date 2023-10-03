import './style.css'
import Gameboard from './gameboard'
import Ship from './ship'; 
import Player from './player';

const content = document.querySelector('.content')
const message = document.querySelector('#message')



function CreateTitleScreen() {
    message.style.display = 'none'

    const titleScreen = document.createElement('div')
    titleScreen.setAttribute('class', 'title-screen')
    titleScreen.style.display = 'flex'
    titleScreen.style.zIndex = '10'
    content.appendChild(titleScreen)

    const titleHeader = document.createElement('h1')
    titleHeader.setAttribute('class', 'title')
    titleHeader.textContent = 'BATTLESHIP'
    titleScreen.appendChild(titleHeader)

    const inputName = document.createElement('input')
    inputName.setAttribute('id', 'name')
    inputName.setAttribute('type', 'text')
    inputName.placeholder = "INSERT NAME HERE"
    titleScreen.appendChild(inputName)

    const startBtn = document.createElement('button')
    startBtn.setAttribute('id', 'start-btn')
    startBtn.textContent = 'Start'
    titleScreen.appendChild(startBtn)

    startBtn.addEventListener('click', () => {
        titleScreen.style.display = 'none'
        if (inputName.value === '') {
            inputName.value = 'Human'
        }
        console.log(`Greetings, ${inputName.value}`)

        message.style.display = 'block'
        gameLoop(inputName.value)
    })
}

function gameLoop(name) {

    // Create game boards
    const playerGameboard = new Gameboard(10, 10)
    const computerGameboard = new Gameboard(10, 10)

    // Create Players
    const player = new Player(name, playerGameboard, computerGameboard)
    const computer = new Player('Computer', computerGameboard, playerGameboard)

    let gameIsOver = false;
    let currentPlayer = player;

    playerGameboard.createGrid('player-gameboard', 10, 10)
    computerGameboard.createGrid('computer-gameboard', 10, 10)
}
 
CreateTitleScreen()


