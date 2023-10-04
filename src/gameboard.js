import Ship from "./ship";

export default class Gameboard {
    constructor(rows, cols, container) {
        this.rows = rows;
        this.cols = cols;
        this.container = container
        this.grid = Array(rows).fill().map(() => Array(cols).fill(null));
        this.ships = [];
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

    receiveAttack(row, col) {
        // Check if the cell has already been attacked
        if (this.grid[row][col] === 'miss' || this.grid[row][col] == 'hit') {
            return 'duplicate'
        }

        const shipIndex = this.grid[row][col];
        console.log(this.grid)

        //Check if there's a ship in the cell
        if (shipIndex !== null) {
            // Mark the ship as hit
            shipIndex.hit()

            // Mark the cell as 'hit'
            this.grid[row][col] = 'hit';
            console.log(this.grid[row][col])


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
                cell.classList.add('ship-cell')
            }
        } else if (orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                const cell = this.container.querySelector(`[data-row="${row + i}"][data-col="${col}"]`)
                cell.classList.add('ship-cell')
            }
        }
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