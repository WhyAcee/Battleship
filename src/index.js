import './style.css'
import Gameboard from './gameboard'
import Ship from './ship'; 
import Player from './player';

const content = document.querySelector('.content')
const titleScreen = document.querySelector('.title-screen')
const inputName = document.querySelector('#name')
const startBtn = document.querySelector('#start-btn')

function CreateTitleScreen() {
    titleScreen.style.display = 'flex'
}
 

startBtn.addEventListener('click', () => {
    titleScreen.style.display = 'none'
    if (inputName.value === '') {
        inputName.value = 'Human'
    }
    console.log(inputName.value)
    
    gameLoop()
}) 
