export default function Gameboard(){
    const board = [[],[],[],[],[],[],[],[],[],[]];
    const missedShots = [];
    const shipLocations = [];
    let allShipsSunk = false;

    function getBoard(){
        return board;
    }

    function getMissedShots(){
        return missedShots;
    }

    function placeShip(obj, coordinates, isVertical){
        const row = coordinates[0];
        const box = coordinates[1];

        //  POSSIBLE POSITIONS ONBOARD ARE BETWEEN 0 & 9, INCLUSIVE
        if(!(row < 10 && row > -1)) return false;

        if(!(box < 10 && box > -1)) return false;

        if(board[row][box]) return false;

        if(obj.getLength() > 1){
            const endBox = isVertical ? row + (obj.getLength() - 1) : box + (obj.getLength() - 1);

            if(endBox < 10){
                const location = [];
                let spacesToFill = isVertical ? row : box;

                for(    ; spacesToFill <= endBox; spacesToFill+=1){
                    if(!isVertical) board[row][spacesToFill] = obj;
                    else board[spacesToFill][box] = obj;
                }

                if(!isVertical) location.push([[row, box],[row, endBox]]);
                else location.push([[row, box],[endBox, box]]);

                shipLocations.push(location[0]);

                return location[0];
            }

            return false;
        }

        board[row][box] = obj;
        shipLocations.push([row, box]);

        return [row, box];   
    }

    function receiveAttack(coordinates){
        const row = coordinates[0];
        const box = coordinates[1];
        const ship = board[row][box];

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

    return { getBoard, getMissedShots, placeShip, receiveAttack, checkStatusOfShips };
}