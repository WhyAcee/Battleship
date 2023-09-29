export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.shipSunk = false
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits === this.length;
    }
}