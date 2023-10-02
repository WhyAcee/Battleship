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
    gameboard.placeShip(ship, 2, 3, 'horizontal');
    // Add expectations to verify that the ship is placed correctly
  });

  // Test case for receiving an attack on the Gameboard
  test('Receive an attack on the Gameboard', () => {
    const gameboard = new Gameboard(10, 10);
    const ship = new Ship(3);
    gameboard.placeShip(ship, 2, 3, 'horizontal');
    const result = gameboard.receiveAttack(2, 3);
    // Add expectations to verify the attack result and ship status
  });

  // Test case for checking if all ships are sunk
  test('Check if all ships are sunk', () => {
    const gameboard = new Gameboard(10, 10);
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    gameboard.placeShip(ship1, 2, 3, 'horizontal');
    gameboard.placeShip(ship2, 5, 5, 'vertical');
    // Simulate attacks on the ships
    // Add expectations to verify if all ships are sunk
  });
});