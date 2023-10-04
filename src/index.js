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
    const playerGameboardContainer = document.getElementById('player-gameboard');
    const computerGameboardContainer = document.getElementById('computer-gameboard');
    const playerGameboard = new Gameboard(10, 10, playerGameboardContainer)
    const computerGameboard = new Gameboard(10, 10, computerGameboardContainer)

    // Create Players
    const player = new Player(name, playerGameboard, computerGameboard)
    const computer = new Player('Computer', computerGameboard, playerGameboard)

    let gameIsOver = false;
    let currentPlayer = player;

    // Display game boards
    playerGameboard.createGrid('player-gameboard', 10, 10)
    computerGameboard.createGrid('computer-gameboard', 10, 10) 
   

    message.textContent = `Place your ship ${name}.`

    // Create ships
    const carrier = new Ship(5)
    const battleship = new Ship(4)
    const cruiser = new Ship(3);

    playerGameboard.placeShip(carrier, 0, 0, 'horizontal')
    playerGameboard.placeShip(cruiser, 5, 6, 'vertical')
    computerGameboard.placeShip(battleship, 2, 4, 'vertical')
    
    playerGameboard.displayShipOnGrid(carrier)
    playerGameboard.displayShipOnGrid(cruiser)
    computerGameboard.displayShipOnGrid(battleship)

    computer.takeTurn(0, 0)
    player.takeTurn(3,4)


    
}
 
CreateTitleScreen()


