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
