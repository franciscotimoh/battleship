import createGameboard from "../gameboard";

describe("createGameboard", () => {
    describe("canPlaceShip", () => {
        let board;

        beforeEach(() => {
            board = createGameboard();
        });

        test("returns true if squares are free to place ship", () => {
            expect(board.canPlaceShip([0, 0], [2, 0])).toEqual(true);
        });

        test("returns false if squares are fully occupied", () => {
            board.placeShip([0, 0], [2, 0]);
            expect(board.canPlaceShip([0, 0], [2, 0])).toEqual(false);
        });

        test("returns false if squares are partially occupied", () => {
            board.placeShip([0, 0], [0, 2]);
            expect(board.canPlaceShip([0, 1], [0, 4])).toEqual(false);
        });

        test("returns false if start is out of bounds", () => {
            expect(board.canPlaceShip([-1, 0], [1, 0])).toEqual(false);
        });

        test("returns false if end is out of bounds", () => {
            expect(board.canPlaceShip([9, 9], [9, 11])).toEqual(false);
        });
    });

    describe("placeShip", () => {
        let board;

        beforeEach(() => {
            board = createGameboard();
        });

        test("attacks on ship return true, misses return false", () => {
            board.placeShip([0, 0], [2, 0]);
            expect(board.receiveAttack([1, 0])).toEqual(true);
            expect(board.receiveAttack([3, 0])).toEqual(false);
            expect(board.receiveAttack([0, 0])).toEqual(true);
            expect(board.receiveAttack([2, 0])).toEqual(true);
        });

        test("not sunk when ship is partially hit", () => {
            board.placeShip([0, 0], [2, 0]);
            expect(board.receiveAttack([0, 0])).toEqual(true);
            expect(board.receiveAttack([2, 0])).toEqual(true);
            expect(board.areAllShipsSunk()).toEqual(false);
        });

        test("sunk when ship is fully hit", () => {
            board.placeShip([0, 0], [2, 0]);
            board.receiveAttack([0, 0]);
            board.receiveAttack([1, 0]);
            board.receiveAttack([2, 0]);
            expect(board.areAllShipsSunk()).toEqual(true);
        });

        test("attacks on vertical ship return true, misses return false", () => {
            board.placeShip([0, 0], [0, 2]);
            expect(board.receiveAttack([0, 1])).toEqual(true);
            expect(board.receiveAttack([0, 3])).toEqual(false);
            expect(board.receiveAttack([0, 0])).toEqual(true);
            expect(board.receiveAttack([0, 2])).toEqual(true);
        });

        test("not sunk when vertical ship is partially hit", () => {
            board.placeShip([0, 0], [0, 2]);
            expect(board.receiveAttack([0, 1])).toEqual(true);
            expect(board.receiveAttack([0, 2])).toEqual(true);
            expect(board.areAllShipsSunk()).toEqual(false);
        });

        test("sunk when vertical ship is fully hit", () => {
            board.placeShip([0, 0], [0, 2]);
            expect(board.receiveAttack([0, 0])).toEqual(true);
            expect(board.receiveAttack([0, 1])).toEqual(true);
            expect(board.receiveAttack([0, 2])).toEqual(true);
            expect(board.areAllShipsSunk()).toEqual(true);
        });

        test("throws error when placing ship on spot that fails canPlaceShip", () => {
            expect(() => {
                board.placeShip([9, 9], [9, 11]);
            }).toThrow("Cannot place a ship there");
        });
    });

    describe("canReceiveAttack", () => {
        let board;

        beforeEach(() => {
            board = createGameboard();
        });

        test("return true for a square that's never been attacked", () => {
            expect(board.canReceiveAttack([0, 0])).toEqual(true);
        });

        test("return false for a missed square", () => {
            board.receiveAttack([0, 0]);
            expect(board.canReceiveAttack([0, 0])).toEqual(false);
        });

        test("returns false for an already-hit ship", () => {
            board.placeShip([0, 0], [2, 0]);
            board.receiveAttack([1, 0]);
            expect(board.canReceiveAttack([1, 0])).toEqual(false);
        });

        test("throws error when attacking a spot that fails canReceiveAttack", () => {
            board.receiveAttack([0, 0]);
            expect(() => {
                board.receiveAttack([0, 0]);
            }).toThrow("Cannot attack there");
        });
    });

    describe("areAllShipsSunk", () => {
        let board;

        beforeEach(() => {
            board = createGameboard();
        });

        test("returns false when no ships are present on board", () => {
            expect(board.areAllShipsSunk()).toEqual(false);
        });

        test("returns false when a ship is not sunk", () => {
            board.placeShip([0, 0], [2, 0]);
            expect(board.areAllShipsSunk()).toEqual(false);
        });

        test("returns true when all ships on board are sunk", () => {
            board.placeShip([0, 0], [2, 0]);
            board.receiveAttack([0, 0]);
            board.receiveAttack([1, 0]);
            board.receiveAttack([2, 0]);
            expect(board.areAllShipsSunk()).toEqual(true);
        });
    });
});
