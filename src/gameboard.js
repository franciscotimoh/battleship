/**
 * Game boards should be able to place ships at specific coordinates
 * by calling the ship factory
 * Game boards should have a `receiveAttack` function that takes a
 * pair of coordinates, determines whether or not the attack hit a
 * ship and then sends the `hit` function to the correct ship, or
 * records the coordinates of the missed shot.
 * Game boards should keep track of missed attacks so they can display
 * them properly.
 * Game boards should be able to report whether or not all of their
 * ships have been sunk.
 *
 * 10x10 grid for each player
 * Carrier: 5 spaces
 * Battleship: 4 spaces
 * Destroyer: 3 spaces
 * Submarine: 3 spaces
 * Patrol Boat: 2 spaces
 */
import createShip from "./ship";

function createGameboard() {
    // Coords are formatted as `${x}, ${y}`; don't forget the space!
    const coordsToShip = new Map();
    const fired = new Set();
    const ships = [];

    // validate if it's legal to place the ship or not
    // eslint-disable-next-line no-unused-vars
    function canPlaceShip(start, end) {
        return true;
    }

    /**
     * Places ships at start and end coordinates
     * We're assuming that the start coordinates are always smaller than end coordinates
     *
     * @param {[number, number]} start
     * @param {[number, number]} end
     */
    function placeShip(start, end) {
        if (canPlaceShip(start, end)) {
            const [startX, startY] = start;
            const [endX, endY] = end;

            const deltaX = endX - startX;
            const deltaY = endY - startY;

            const length = deltaX > deltaY ? deltaX + 1 : deltaY + 1;
            const ship = createShip(length);

            if (deltaY === 0) {
                // horizontal
                let i;
                for (i = 0; i <= deltaX; i++) {
                    coordsToShip.set(`${i + startX}, ${startY}`, ship);
                }
            } else {
                // vertical
                let i;
                for (i = 0; i <= deltaY; i++) {
                    coordsToShip.set(`${startX}, ${i + startY}`, ship);
                }
            }

            ships.push(ship);
        }
    }

    /**
     * @param {[number, number]} Coordinates
     * @returns boolean - whether a ship has been hit or missed
     */
    function receiveAttack([x, y]) {
        const key = `${x}, ${y}`;
        if (coordsToShip.has(key)) {
            coordsToShip.get(key).hit();
            fired.add(key);
            return true;
        } else {
            fired.add(key);
            return false;
        }
    }

    /**
     * @returns boolean - whether all ships on the game board are sunk or not
     */
    function areAllShipsSunk() {
        if (ships.length === 0) {
            return false;
        }

        for (const ship of ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }

        return true;
    }

    return {
        placeShip,
        receiveAttack,
        areAllShipsSunk,
    };
}

export default createGameboard;
