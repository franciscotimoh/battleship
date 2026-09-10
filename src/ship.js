/**
 * Begin your app by creating the Ship class/factory (your choice).
 * Your ‘ships’ will be objects: length, the number of times hit and whether or not they’ve been sunk.
 * REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
 * Ships should have a hit() function that increases the number of ‘hits’ in your ship.
 * isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.
 */

function createShip(length) {
    let timesHit = 0;

    function hit() {
        if (isSunk()) {
            return;
        }

        timesHit++;
    }

    function isSunk() {
        return timesHit === length;
    }

    return { hit, isSunk };
}

export default createShip;
