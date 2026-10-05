import { createRealPlayer, createComputerPlayer } from "../player";

describe("player", () => {
    test("player cannot place overlapping ships", () => {
        const real = createRealPlayer();
        real.placeShip([0, 0], [0, 2]);
        expect(() => {
            real.placeShip([0, 1], [2, 1]);
        }).toThrow("Cannot place a ship there");
    });

    test("computer successful attack on real player returns true", () => {
        const real = createRealPlayer();
        const comp = createComputerPlayer();

        real.setOpponent(comp);
        comp.setOpponent(real);

        for (let i = 0; i < 10; i++) {
            real.placeShip([i, 0], [i, 9]);
        }

        expect(comp.attackOpponent()).toBe(true);
    });

    test("computer missed attack on real player returns false", () => {
        const real = createRealPlayer();
        const comp = createComputerPlayer();

        real.setOpponent(comp);
        comp.setOpponent(real);

        expect(comp.attackOpponent()).toBe(false);
    });

    test("real player attacking same square twice throws error", () => {
        const real = createRealPlayer();
        const comp = createComputerPlayer();

        real.setOpponent(comp);
        comp.setOpponent(real);

        real.attackOpponent([0, 0]);
        expect(() => {
            real.attackOpponent([0, 0]);
        }).toThrow("Cannot attack there");
    });

    test("lossCheck false when one of several ships still afloat", () => {
        const real = createRealPlayer();
        const comp = createComputerPlayer();

        real.setOpponent(comp);
        comp.setOpponent(real);

        comp.placeShip([0, 0], [0, 2]);
        comp.placeShip([1, 1], [1, 3]);

        real.attackOpponent([0, 0]);
        real.attackOpponent([0, 1]);
        real.attackOpponent([0, 2]);

        expect(comp.lossCheck()).toBe(false);
    });

    test("lossCheck true when all ships are sunk", () => {
        const real = createRealPlayer();
        const comp = createComputerPlayer();

        real.setOpponent(comp);
        comp.setOpponent(real);

        comp.placeShip([0, 0], [0, 2]);

        real.attackOpponent([0, 0]);
        real.attackOpponent([0, 1]);
        real.attackOpponent([0, 2]);

        expect(comp.lossCheck()).toBe(true);
    });

    test("computer retry-loop skips already-attacked squares", () => {
        const real = createRealPlayer();
        const comp = createComputerPlayer();

        real.setOpponent(comp);
        comp.setOpponent(real);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (i === 9 && j === 9) continue;
                real.getBoard().receiveAttack([i, j]);
            }
        }

        expect(() => {
            comp.attackOpponent();
        }).not.toThrow("Cannot attack there");
    });
});
