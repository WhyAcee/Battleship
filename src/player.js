export default class Player {
    constructor(name, gameboard, enemyGameboard) {
        this.name = name;
        this.gameboard = gameboard;
        this.enemyGameboard = enemyGameboard
    }

    takeTurn(row, col) {
        const attackResult = this.enemyGameboard.receiveAttack(row, col)

        this.handleAttackResult(attackResult, row, col)

        return attackResult
    }

    handleAttackResult(result, row, col) {
        const cell = this.enemyGameboard.container.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const gridMarker = document.createElement('div')

        if (result === 'hit') {
            console.log(`${this.name} landed a hit at (${row}, ${col})`)
            gridMarker.classList.add('hit');
            cell.appendChild(gridMarker)

        } else if (result === 'miss') {
            console.log(`${this.name} missed at (${row}, ${col})`)
        } else if (result === 'sunk') {
            console.log(`${this.name} sunk an enemy ship at (${row}, ${col})`)
        } else if (result === 'duplicate') {
            console.log(`${this.name} has already attacked (${row}, ${col})`)
        }
    }
}