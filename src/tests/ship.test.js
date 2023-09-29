import Ship from "../ship";

describe('Ship', () => {
  it('should create a ship with the specified length', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
  });

  it('should increase hits when hit() is called', () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  it('should return true for isSunk() when hits equal length', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  it('should return false for isSunk() when hits are less than length', () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  it('should return false for isSunk() when hits are greater than length', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});