export default function Gameboard(){
    const board = [[],[],[],[],[],[],[],[],[],[]];
    const missedShots = [];
    const shipLocations = [];
    let allShipsSunk = false;

    function getMissedShots(){
        return missedShots;
    }

    function placeShip(obj, coordinates){
        //  HORIZONTAL PLACEMENT
        const row = coordinates[0];
        const column = coordinates[1];

        //  POSSIBLE POSITIONS ONBOARD ARE BETWEEN 0 & 9, INCLUSIVE
        if(!(row < 10 && row > -1)) return false;

        if(!(column < 10 && column > -1)) return false;

        if(obj.getLength() > 1){
            const endColumn = column + (obj.getLength() - 1);

            if(endColumn < 10){
                for(let spacesToFill = column; spacesToFill <= endColumn; spacesToFill+=1){
                    board[row][spacesToFill] = obj;
                }
                shipLocations.push([[row, column],[row, endColumn]]);

                return [[row, column],[row, endColumn]];
            }

            return false;
        }

        board[row][column] = obj;
        shipLocations.push([row, column]);

        return [row, column];   
    }

    function receiveAttack(coordinates){
        const row = coordinates[0];
        const column = coordinates[1];
        const ship = board[row][column];

        if(ship) ship.hit();
        else missedShots.push(coordinates);
    }

    function checkStatusOfShips(){
        const totalAmountOfShips = shipLocations.length;
        let numOfShipsSunk = 0;

        shipLocations.forEach((coordinate) => {
            const ship = typeof coordinate[0] === 'number' ? board[coordinate[0]][coordinate[1]] : board[coordinate[0][0]][coordinate[0][1]];

            if(ship.isSunk()) numOfShipsSunk += 1;
            if(numOfShipsSunk === totalAmountOfShips) allShipsSunk = true;
        });

        return allShipsSunk;
    }

    return { getMissedShots, placeShip, receiveAttack, checkStatusOfShips };
}