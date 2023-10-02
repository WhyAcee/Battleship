import Gameboard from '../gameboard'
import Ship from '../ship'; 

describe('Gameboard', () => {
  // Test case for creating a Gameboard instance
  test('Create a Gameboard with specified dimensions', () => {
    const gameboard = new Gameboard(10, 10);
    expect(gameboard.rows).toBe(10);
    expect(gameboard.cols).toBe(10);
  });

  // Test case for placing a ship on the Gameboard
  test('Place a ship on the Gameboard', () => {
    const gameboard = new Gameboard(10, 10);
    const ship = new Ship(3);
    
    // Place the ship on the Gameboard
    const result = gameboard.placeShip(ship, 2, 3, 'horizontal');
    
    // Expect the placement to be successful
    expect(result).toBe(true);
    
    // Check if the ship is on the board
    expect(gameboard.grid[2][3]).toBe(ship);
    expect(gameboard.grid[2][4]).toBe(ship);
    expect(gameboard.grid[2][5]).toBe(ship);
  });

  // Test case for receiving an attack on the Gameboard
  test('Receive an attack on the Gameboard', () => {
    const gameboard = new Gameboard(10, 10);
    const ship = new Ship(3);
    gameboard.placeShip(ship, 2, 3, 'horizontal');
    
    // Make an attack on the Gameboard
    const attackResult = gameboard.receiveAttack(2, 3);
    
    // Expect a 'hit' result
    expect(attackResult).toBe('hit');
  });

  // Test case for checking if all ships are sunk
  test('Check if all ships are sunk', () => {
    const gameboard = new Gameboard(10, 10);
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    
    // Place ships on the Gameboard
    gameboard.placeShip(ship1, 2, 3, 'horizontal');
    gameboard.placeShip(ship2, 4, 4, 'vertical');
    
    // Make attacks to sink ships
    gameboard.receiveAttack(2, 3);
    gameboard.receiveAttack(2, 4);
    gameboard.receiveAttack(4, 4);
    gameboard.receiveAttack(5, 4);
    gameboard.receiveAttack(6, 4);
    
    // Check if all ships are sunk
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});