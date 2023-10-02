import './style.css'
import Gameboard from './gameboard'
import Ship from './ship'; 

const gameboard = new Gameboard(10, 10)
const ship = new Ship(3);
gameboard.placeShip(ship, 2, 3, 'horizontal');
const result = gameboard.receiveAttack(2, 3);
console.log(result)