import './style.css'
import Gameboard from './gameboard'
import Ship from './ship'; 
import Player from './player';

const content = document.querySelector('.content')
const message = document.querySelector('#message')

const playerGameboardContainer = document.getElementById('player-gameboard');
const computerGameboardContainer = document.getElementById('computer-gameboard');

const playerGameboard = new Gameboard(10, 10, playerGameboardContainer)
const computerGameboard = new Gameboard(10, 10, computerGameboardContainer)

const shipsToPlace = [playerGameboard.carrier, playerGameboard.battleship, playerGameboard.cruiser, playerGameboard.submarine, playerGameboard.destroyer]
let currentShipIndex = 0;
let orientation = 'vertical' 

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

    // Create Players
    const player = new Player(name, playerGameboard, computerGameboard)
    const computer = new Player('Computer', computerGameboard, playerGameboard)

    let gameIsOver = false;
    let currentPlayer = player;

    // Display game boards
    playerGameboard.createGrid('player-gameboard', 10, 10)
    computerGameboard.createGrid('computer-gameboard', 10, 10)
    console.log(playerGameboardContainer)
   

    message.textContent = `Place your ships ${name}.`

    computerGameboard.autoPlaceShips()
    

    console.log(playerGameboard.grid)

}
 
CreateTitleScreen()

const clickHandler = (event) => {
    const cell = event.target
    const row = parseInt(cell.getAttribute('data-row'))
    const col = parseInt(cell.getAttribute('data-col'))

    const currentShip = shipsToPlace[currentShipIndex]
    message.textContent = `Place your ${currentShip.name} (Length: ${currentShip.length})`;
    
    const placed = playerGameboard.placeShip(currentShip, row, col, orientation)

    if (placed) {
        playerGameboard.displayShipOnGrid(currentShip)
        currentShipIndex++;
        const cellsToClear = playerGameboardContainer.querySelectorAll('.highlighted-cell');
        cellsToClear.forEach((cell) => {
            cell.classList.remove('highlighted-cell');
        }); 

        if(currentShipIndex === shipsToPlace.length) {
            message.textContent = 'Now Attack the Enemy board'
            playerGameboardContainer.removeEventListener('click', clickHandler)
            playerGameboardContainer.removeEventListener('mouseover', hoverHandler)
        } else {
            const nextShip = shipsToPlace[currentShipIndex];
            message.textContent = `Place your ${nextShip.name} (Length: ${nextShip.length})`;
        }
    } 
}

const hoverHandler = (event) => {
    const cell = event.target
    if (cell.hasAttribute('data-row') && cell.hasAttribute('data-col')) {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));

        const currentShip = shipsToPlace[currentShipIndex];
        const cellsToHighlight = []
        if (orientation === 'horizontal' && col + currentShip.length <= playerGameboard.cols) {
            for (let i = 0; i < currentShip.length; i++) {
                cellsToHighlight.push(playerGameboardContainer.querySelector(`[data-row="${row}"][data-col="${col + i}"]`))
            }
        } else if (orientation === 'vertical' && row + currentShip.length <= playerGameboard.rows) {
            for (let i = 0; i < currentShip.length; i++) {
                cellsToHighlight.push(playerGameboardContainer.querySelector(`[data-row="${row + i}"][data-col="${col}"]`))
            }
        }

        cellsToHighlight.forEach((highlightedCell) => {
            highlightedCell.classList.add('highlighted-cell')
        })
    }
}

playerGameboardContainer.addEventListener('mouseout', (event) => {
   
    playerGameboardContainer.querySelectorAll('.highlighted-cell').forEach((cell) => {
    cell.classList.remove('highlighted-cell');
  });
})

playerGameboardContainer.addEventListener('click', clickHandler)

playerGameboardContainer.addEventListener('mouseover', hoverHandler)
