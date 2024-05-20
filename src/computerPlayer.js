//  2 LENGTH (X1)
//  3 LENGTH (X2)
//  4 LENGTH (X1)
//  5 LENGTH (X1)

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

function validateCoordinates(xCoor, yCoor){
    if(xCoor > -1 && xCoor < 10){
        if(yCoor > -1 && yCoor < 10){
            return [xCoor, yCoor];
        }
    }

    return false;
}

function loadAllPossibleMoves(){
    POSSIBLE_PLAYS.forEach((move) => {
        const newRow = row + move[0];
        const newColumn = column + move[1];

        const validCoor = validateCoordinates(newRow, newColumn);

        if(validCoor) nextPossibleMoves.push(validCoor);
    });
}

function getLogicalMove(){
    if(direction) return direction;

    if(successfulCoordinates.length === 2){
        const firstXCoor = successfulCoordinates[0][0];
        const firstYCoor = successfulCoordinates[0][1];
        const secondXCoor = successfulCoordinates[1][0];
        const secondYCoor = successfulCoordinates[1][1];

        const xDirection = firstXCoor - secondXCoor;
        const yDirection = firstYCoor - secondYCoor;

        if(xDirection > 0 && !yDirection) direction = 'LEFT';
        else if(xDirection < 0 && !yDirection) direction = 'RIGHT';

        if(yDirection > 0 && !xDirection) direction = 'UP';
        else if(yDirection < 0 && !xDirection) direction = 'DOWN'

        nextPossibleMoves.length = 0;
        successfulCoordinates.length = 0;

        return direction;
    }

    if(nextPossibleMoves.length === 0) loadAllPossibleMoves();
        
    const coordinates = nextPossibleMoves.shift();

    [row, column] = [coordinates[0], coordinates[1]];

    return [row, column];  
}

export default function getComputerMove(uiBoard, board){
    const coordinates = (nextMoveLogical) ? getLogicalMove() : getRandomMove();

    if(coordinates === direction){
        switch(direction){
            case 'LEFT':
                row+=1;
                break;
            case 'RIGHT':
                row-=1;
                break;
            case 'UP':
                column+=1;
                break;
            default:
                column-=1;
                break;
        }
        
        const validCoor = validateCoordinates(row, column);

        if(validCoor){
            //  ISSUE SINCE I SET COORDINATES TO A STRING I CANT GET ARRAY VALUES
            [coordinates[0], coordinates[1]] = [row, column];
        }else{            
            const nextMove = getRandomMove();

            [coordinates[0], coordinates[1]] = [nextMove[0], nextMove[1]];
            nextMoveLogical = false;
        }
    }

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
                nextMoveLogical = false;
                direction = null;
            }

            updateBoxDisplay(uiBox);
        }
    }
}