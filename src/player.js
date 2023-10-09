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
        const marker = document.createElement('div')

        if (result === 'hit') {
            console.log(`${this.name} landed a hit at (${row}, ${col})`)
            marker.classList.add('hit-marker');
            cell.classList.add('hit')
            cell.appendChild(marker)

        } else if (result === 'miss') {
            console.log(`${this.name} missed at (${row}, ${col})`)
            marker.classList.add('miss');
            cell.appendChild(marker)

        } else if (result === 'sunk') {
            marker.classList.add('hit-marker')
            cell.classList.add('hit')
            cell.appendChild(marker)

            let sunkenShip = this.enemyGameboard.getSunkenShip(row, col)
            if (sunkenShip) {
                for (let i = 0; i < sunkenShip.length; i++) {
                    let shipRow = sunkenShip.position.row;
                    let shipCol = sunkenShip.position.col;
                    let orientation = sunkenShip.orientation
                    console.log(`shipRow: ${shipRow}, shipCol: ${shipCol}`)

                    if (orientation === 'horizontal') {
                        shipCol += i;
                    } else if (orientation === 'vertical') {
                        shipRow += i;
                    }

                    const shipCell = this.enemyGameboard.container.querySelector(`[data-row="${shipRow}"][data-col="${shipCol}"]`)
                    shipCell.classList.add('sunken-ship')
                }
            }
        } else if (result === 'duplicate') {
            console.log(`${this.name} has already attacked (${row}, ${col})`)
        }
    }
}