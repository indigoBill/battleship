export default function Ship(){
    const length = 1;
    let numOfHits = 0;
    let hasSunk = false;

    function hit(){
        numOfHits += 1;
        return numOfHits;
    }

    function isSunk(){
        hasSunk = (numOfHits === length);
        return hasSunk;
    }

    return { hit, isSunk };
}