export default function Ship(shipLength = 1){
    const length = shipLength;
    let numOfHits = 0;
    let hasSunk = false;

    function getHits(){
        return numOfHits;
    }

    function getLength(){
        return length;
    }

    function hit(){
        numOfHits += 1;
        return numOfHits;
    }

    function isSunk(){
        hasSunk = (numOfHits === length);
        return hasSunk;
    }

    return { getHits, getLength, hit, isSunk };
}