import Ship from "./ship";

export default class Gameboard {
    constructor(rows, cols, container) {
        this.rows = rows;
        this.cols = cols;
        this.container = container
        this.grid = Array(rows).fill().map(() => Array(cols).fill(null));
        this.ships = [];

        this.carrier = new Ship('carrier', 5)
        this.battleship = new Ship('battleship', 4)
        this.cruiser = new Ship('cruiser', 3)
        this.submarine = new Ship('submarine', 3)
        this.destroyer = new Ship('destroyer', 2)

    }

    createGrid(containerId, rows, cols) {
        const container = document.getElementById(containerId)

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div')
                cell.classList.add('grid-cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                container.appendChild(cell)
            } 
        }
    }

    placeShip(ship, row, col, orientation) {
        this.orientation = orientation
        // Check of Ship placement is valid
        if (!this.isValidPlacement(ship, row, col, orientation)) {
            return false
        }

        // Place ship on board
        if (orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.grid[row][col + i] = ship
            }
        } else if (orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.grid[row + i][col] = ship
            }
        }
     
        // Update ship properties
        ship.position = { row, col };
        ship.orientation = orientation;

        //Add ship to list of ships on the board
        this.ships.push(ship);

        return true
    }

    autoPlaceShips() {
        const ShipsToPlace = [this.carrier, this.battleship, this.cruiser, this.submarine, this.destroyer]

        for (const ship of ShipsToPlace) {
            let placed = false;
            let attempts = 0

            while (!placed && attempts < 100) {
                const randomRow = Math.floor(Math.random() * this.rows);
                const randomCol = Math.floor(Math.random() * this.cols)
                const orientation = ['horizontal', 'vertical']
                const randomOrientation = orientation[Math.floor(Math.random() * 2)]

                if (this.isValidPlacement(ship, randomRow, randomCol, randomOrientation)) {
                    placed = this.placeShip(ship, randomRow, randomCol, randomOrientation)

                    if (placed) {
                        this.displayShipOnGrid(ship)
                    }
                }
            }

            if (!placed) {
                console.log(`Unable to place ${ship.name} after ${attempts} attempts.`);
            }
        }
    }

    receiveAttack(row, col) {
        // Check if the cell has already been attacked
        if (this.grid[row][col] === 'miss' || this.grid[row][col] == 'hit') {
            return 'duplicate'
        }

        const shipIndex = this.grid[row][col];

        //Check if there's a ship in the cell
        if (shipIndex !== null) {
            // Mark the ship as hit
            shipIndex.hit()

            // Mark the cell as 'hit'
            this.grid[row][col] = 'hit';

            // Check if the ship has been sunk
            if (shipIndex.isSunk()) {
                return 'sunk';
            } else {
                return 'hit'
            }

        } else {
            this.grid[row][col] = 'miss';
            return 'miss'
        }
        
    }

    isValidPlacement(ship, row, col, orientation) {
        // Check if the ship fits within the boundaries of the game board
        if (orientation === 'horizontal' && col + ship.length > this.cols) {
            return false
        } else if (orientation === 'vertical' && row + ship.length > this.rows) {
            return false
        }
        
        // Check if there are any other ships in the path
        if (orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                if (this.grid[row][col + i] !== null) {
                    return false
                }
            }
        } else if (orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                if (this.grid[row + i][col] !== null) {
                    return false
                }
            }
        }

        return true
    }

    displayShipOnGrid(ship) {
        const { row, col } = ship.position
        const orientation = ship.orientation
        
        if (orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                const cell = this.container.querySelector(`[data-row="${row}"][data-col="${col + i}"]`)
                cell.classList.add(ship.name)
                cell.classList.add('ship-cell')
            }
        } else if (orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                const cell = this.container.querySelector(`[data-row="${row + i}"][data-col="${col}"]`)
                cell.classList.add(ship.name)
                cell.classList.add('ship-cell')
            }
        }
    }

    getSunkenShip(row, col) {
        const cell = this.container.querySelector(`[data-row="${row}"][data-col="${col}"]`)
        
         for (const ship of this.ships) {
            const shipCells = Array.from(this.container.querySelectorAll(`[data-row="${ship.position.row}"][data-col="${ship.position.col}"]`));
    
            if (shipCells.every(shipCell => shipCell.classList.contains('hit'))) {
                console.log('Ship is sunken:', ship);
                return ship;
            } 
        }
        return null
    }

    allShipsSunk() {
        for (const ship of this.ships) {
            if (!ship.isSunk()) {
                return false
            }
        }

        return true
    }

}