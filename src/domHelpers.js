/**
 * Takes in a board container and populates a 10x10 board inside it.
 *
 * @param {HTMLElement} boardElement
 */
function createGameboardGrid(playerNum, boardElement) {
    for (let i = 0; i < 10; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.id = `p${playerNum}-row${i}`;
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `p${playerNum}-row${i}-cell${j}`;
            row.appendChild(cell);
        }
        boardElement.appendChild(row);
    }
}

export { createGameboardGrid };
