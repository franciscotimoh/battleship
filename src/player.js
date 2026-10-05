import createGameboard from "./gameboard.js";

function createPlayerBoard() {
    const board = createGameboard();
    let opponent;

    function getBoard() {
        return board;
    }

    /**
     * @param {[number, number]} start
     * @param {[number, number]} end
     */
    function placeShip(start, end) {
        board.placeShip(start, end);
    }

    function lossCheck() {
        return board.areAllShipsSunk();
    }

    function setOpponent(opp) {
        opponent = opp;
    }

    function getOpponent() {
        return opponent;
    }

    /**
     * @param {[number, number]} coords
     * @returns
     */
    function attackOpponent(coords) {
        return opponent.getBoard().receiveAttack(coords);
    }

    return {
        getBoard,
        placeShip,
        lossCheck,
        setOpponent,
        getOpponent,
        attackOpponent,
    };
}

function createComputerPlayer() {
    const playerBoard = createPlayerBoard();

    function chooseRandomSpaceToAttack() {
        const opponentBoard = playerBoard.getOpponent().getBoard();
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (!opponentBoard.canReceiveAttack([x, y]));

        return [x, y];
    }

    // eslint-disable-next-line no-unused-vars
    const { getOpponent, ...rest } = playerBoard;

    return {
        ...rest,
        attackOpponent: () => {
            const coords = chooseRandomSpaceToAttack();
            return playerBoard.attackOpponent(coords);
        },
    };
}

function createRealPlayer() {
    const playerBoard = createPlayerBoard();

    // eslint-disable-next-line no-unused-vars
    const { getOpponent, ...rest } = playerBoard;

    return {
        ...rest,
    };
}

export { createComputerPlayer, createRealPlayer };
