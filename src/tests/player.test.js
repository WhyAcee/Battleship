import Player from '../player';
import Gameboard from '../gameboard'; 
import Ship from '../ship'; 

describe('Player', () => {
  // Test case for creating a Player instance
  test('Create a Player instance', () => {
    const gameboard = new Gameboard(10, 10);
    const enemyGameboard = new Gameboard(10, 10);
    const player = new Player('Player 1', gameboard, enemyGameboard);
    expect(player.name).toBe('Player 1');
  });

  // Test case for taking a turn (attacking)
  test('Take a turn and check attack result', () => {
    // Create game boards and players
    const player1Gameboard = new Gameboard(10, 10);
    const player2Gameboard = new Gameboard(10, 10);
    const player1 = new Player('Player 1', player1Gameboard, player2Gameboard);
    const player2 = new Player('Player 2', player2Gameboard, player1Gameboard);

    // Create a ship on the opponent's game board
    const ship = new Ship(3);
    player2Gameboard.placeShip(ship, 2, 3, 'horizontal');

    // Simulate player1 taking a turn
    const attackResult = player1.takeTurn(2, 3);

    // Expectations based on the attack result
    expect(attackResult).toBe('hit');
    // You can add more expectations based on your game rules
  });

  // Add more test cases as needed to cover different scenarios
});