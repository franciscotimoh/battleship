import createShip from "../ship";

describe("createShip", () => {
    test("ship of length 1 is sunk at 1 hit", () => {
        const cruiser = createShip(1);
        cruiser.hit();
        expect(cruiser.isSunk()).toEqual(true);
    });

    test("cruiser of length 3 is not sunk at 2 hits", () => {
        const cruiser = createShip(3);
        cruiser.hit();
        cruiser.hit();
        expect(cruiser.isSunk()).toEqual(false);
    });

    test("cruiser of length 3 is sunk at 3 hits", () => {
        const cruiser = createShip(3);
        cruiser.hit();
        cruiser.hit();
        cruiser.hit();
        expect(cruiser.isSunk()).toEqual(true);
    });
});
