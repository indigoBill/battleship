import { updateBoxDisplay } from './game-ui';

const POSSIBLE_PLAYS = [[1,0],[-1,0],[0,1],[0,-1]];
const nextPossibleMoves = [];
const successfulCoordinates = [];
let direction;
let nextMoveLogical;
let row;
let column;

function getRandomMove(){
    row = Math.floor(Math.random() * 10);
    column = Math.floor(Math.random() * 10);

    return [row, column];
}

function getEmptyBoardPlacement(board, shipLength){
    const coordinate = getRandomMove();
    const shipHorizEnd = coordinate[1] + shipLength;

    //  WILL NEED TO ADJUST FOR VERTICAL END WHEN ADDING ROTATE FUNCTIONALITY
    if(board.getBoard()[coordinate[0]][coordinate[1]] || shipHorizEnd >= 10){
        return getEmptyBoardPlacement(board);
    }
        
    return coordinate;
}

function validateCoordinates(xCoor, yCoor){
    const uiBoard = document.querySelector('.board.not-active');

    if(xCoor > -1 && xCoor < 10){
        if(yCoor > -1 && yCoor < 10){
            const uiRow = uiBoard.querySelector(`[row = "${xCoor}"]`);
            const uiBox = uiRow.querySelector(`[box = "${yCoor}"]`);

            if(!uiBox.classList.contains('hit')) return [xCoor, yCoor];
        }
    }

    return false;
}

export function generateRandomShipPlacement(board, ships){
    ships.forEach((ship) => {

        const coordinates = getEmptyBoardPlacement(board, ship.getLength());
        console.log(`ship: ${ship.getLength()} coor: ${coordinates}`);

        board.placeShip(ship, coordinates);
    });
}

function loadAllPossibleMoves(){
    POSSIBLE_PLAYS.forEach((move) => {
        const newRow = row + move[0];
        const newColumn = column + move[1];

        const validCoor = validateCoordinates(newRow, newColumn);

        if(validCoor) nextPossibleMoves.push(validCoor);
    });
}

function getDirection(){
    switch(direction){
        case 'LEFT':
            column-=1;
            break;
        case 'RIGHT':
            column+=1;
            break;
        case 'UP':
            row-=1;
            break;
        default:
            row+=1;
            break;
    }

    const validCoor = validateCoordinates(row, column);

    if(validCoor){
        return [row, column];
    }
    
    direction = null;
    nextMoveLogical = false;

    return getRandomMove();
}

function clearArray(array){
    array.forEach((arr) => {
        arr.splice(0, arr.length);
    });
}

function getLogicalMove(){
    if(direction) return getDirection();

    if(successfulCoordinates.length === 2){
        const firstXCoor = successfulCoordinates[0][0];
        const firstYCoor = successfulCoordinates[0][1];
        const secondXCoor = successfulCoordinates[1][0];
        const secondYCoor = successfulCoordinates[1][1];

        const xDirection = firstXCoor - secondXCoor;
        const yDirection = firstYCoor - secondYCoor;

        if(xDirection > 0 && !yDirection) direction = 'UP';
        else if(xDirection < 0 && !yDirection) direction = 'DOWN';

        if(yDirection > 0 && !xDirection) direction = 'LEFT';
        else if(yDirection < 0 && !xDirection) direction = 'RIGHT'

        clearArray([successfulCoordinates, nextPossibleMoves]);

        return getDirection();
    }

    if(nextPossibleMoves.length === 0)  loadAllPossibleMoves();
        
    const coordinates = nextPossibleMoves.shift();
    
    if(!coordinates){
        nextMoveLogical = false;
        return getRandomMove();
    }

    [row, column] = [coordinates[0], coordinates[1]];

    return [row, column];  
}

export function getComputerMove(uiBoard, board){
    const coordinates = (nextMoveLogical) ? getLogicalMove() : getRandomMove();

    const uiRow = uiBoard.querySelector(`[row = "${coordinates[0]}"]`);
    const uiBox = uiRow.querySelector(`[box = "${coordinates[1]}"]`);

    if(uiBox.classList.contains('hit')){
        getComputerMove(uiBoard, board);
    }else{
        board.receiveAttack([row,column]);

        if(board.getBoard()[row][column]){
            if(!nextMoveLogical) nextMoveLogical = true;
            successfulCoordinates.push([row, column]);
            updateBoxDisplay(uiBox, true);
        }else{
            if(direction){
                clearArray([successfulCoordinates, nextPossibleMoves]);
                nextMoveLogical = false;
                direction = null;
            }

            updateBoxDisplay(uiBox);
        }
    }
}