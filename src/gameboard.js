import createShip from "./ship";

function createGameboard() {
    const coordsToShip = new Map();
    const fired = new Set();
    const ships = [];

    /**
     * Constructs coordsToShip map key from coordinates
     * @param {number} x
     * @param {number} y
     * @returns string - key for coordsToShip
     */
    function toKey(x, y) {
        return `${x}, ${y}`;
    }

    /**
     * Validates a ship can be placed in the desired coordinates
     * A ship cannot be placed in the following conditions:
     * 1) another ship already exists in the space(s) we're attempting to occupy
     * 2) start/end coordinates are out of bounds
     * @param {[number, number]} start
     * @param {[number, number]} end
     * @returns boolean
     */
    function canPlaceShip(start, end) {
        const [startX, startY] = start;
        const [endX, endY] = end;

        if (startX < 0 || startY < 0 || endX > 9 || endY > 9) {
            return false;
        }

        const deltaY = endY - startY;

        if (deltaY === 0) {
            for (let i = startX; i <= endX; i++) {
                const key = toKey(i, startY);
                if (coordsToShip.has(key)) {
                    return false;
                }
            }
        } else {
            for (let i = startY; i <= endY; i++) {
                const key = toKey(startX, i);
                if (coordsToShip.has(key)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Places ships at start and end coordinates
     * We're assuming that the start coordinates are always smaller than end coordinates.
     * We're also assuming that the start and end are axis-aligned.
     * The Player will have to validate these two assumptions.
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
                let i;
                for (i = 0; i <= deltaX; i++) {
                    const key = toKey(i + startX, startY);
                    coordsToShip.set(key, ship);
                }
            } else {
                let i;
                for (i = 0; i <= deltaY; i++) {
                    const key = toKey(startX, i + startY);
                    coordsToShip.set(key, ship);
                }
            }

            ships.push(ship);
        } else {
            throw new Error("Cannot place a ship there");
        }
    }

    function canReceiveAttack([x, y]) {
        const key = toKey(x, y);
        return !fired.has(key);
    }

    /**
     * @param {[number, number]} Coordinates
     * @returns boolean - whether a ship has been hit or missed
     */
    function receiveAttack([x, y]) {
        const key = toKey(x, y);
        if (canReceiveAttack([x, y])) {
            if (coordsToShip.has(key)) {
                coordsToShip.get(key).hit();
                fired.add(key);
                return true;
            } else {
                fired.add(key);
                return false;
            }
        } else {
            throw new Error("Cannot attack there");
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
        canPlaceShip,
        placeShip,
        canReceiveAttack,
        receiveAttack,
        areAllShipsSunk,
    };
}

export default createGameboard;
