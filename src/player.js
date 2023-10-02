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
        if (result === 'hit') {
            console.log(`${this.name} landed a hit at (${row}, ${col})`)
        } else if (result === 'miss') {
            console.log(`${this.name} missed at (${row}, ${col})`)
        } else if (result === 'sunk') {
            console.log(`${this.name} sunk an enemy ship at (${row}, ${col})`)
        } else if (result === 'duplicate') {
            console.log(`${this.name} has already attacked (${row}, ${col})`)
        }
    }
}