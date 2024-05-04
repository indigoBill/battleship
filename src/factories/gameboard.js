export default function Gameboard(){
    const board = [[],[],[],[],[],[],[],[],[],[]];
    const missedShots = [];

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

                return [[row, column],[row, endColumn]];
            }

            return false;
        }

        board[row][column] = obj;

        return [row, column];   
    }

    function receiveAttack(coordinates){
        const row = coordinates[0];
        const column = coordinates[1];
        const ship = board[row][column];

        if(ship) ship.hit();
        else missedShots.push(coordinates);
    }

    return { getMissedShots, placeShip, receiveAttack };
}