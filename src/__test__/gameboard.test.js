import createGameboard from "../gameboard";

describe("createGameboard", () => {
    describe("placeShip", () => {
        test("attacks on ship return true, misses return false", () => {
            const board = createGameboard();
            board.placeShip([0, 0], [2, 0]);
            expect(board.receiveAttack([1, 0])).toEqual(true);
            expect(board.receiveAttack([3, 0])).toEqual(false);
            expect(board.receiveAttack([0, 0])).toEqual(true);
            expect(board.receiveAttack([2, 0])).toEqual(true);
        });

        test("not sunk when ship is partially hit", () => {
            const board = createGameboard();
            board.placeShip([0, 0], [2, 0]);
            expect(board.receiveAttack([0, 0])).toEqual(true);
            expect(board.receiveAttack([2, 0])).toEqual(true);
            expect(board.areAllShipsSunk()).toEqual(false);
        });

        test("sunk when ship is fully hit", () => {
            const board = createGameboard();
            board.placeShip([0, 0], [2, 0]);
            board.receiveAttack([0, 0]);
            board.receiveAttack([1, 0]);
            board.receiveAttack([2, 0]);
            expect(board.areAllShipsSunk()).toEqual(true);
        });
    });

    describe("areAllShipsSunk", () => {
        test("returns false when no ships are present on board", () => {
            const board = createGameboard();
            expect(board.areAllShipsSunk()).toEqual(false);
        });
    });
});
