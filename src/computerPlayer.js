//  2 LENGTH (X1)
//  3 LENGTH (X2)
//  4 LENGTH (X1)
//  5 LENGTH (X1)

import { updateBoxDisplay } from './game-ui';

const nextPossibleMoves = [];
let prevShotSuccessful;
let row;
let column;

function getRandomMove(){
    row = Math.floor(Math.random() * 10);
    column = Math.floor(Math.random() * 10);

    return [row, column];
}

function getLogicalMove(){
    const prevMoveCoordinates = [row, column];

    // row+1
    prevShotSuccessful = false;
    
}

export default function getComputerMove(uiBoard, board){
    const coordinates = (prevShotSuccessful) ? getLogicalMove() : getRandomMove();

    const uiRow = uiBoard.querySelector(`[row = "${coordinates[0]}"]`);
    const uiBox = uiRow.querySelector(`[box = "${coordinates[1]}"]`);

    if(uiBox.classList.contains('hit')){
        getComputerMove(uiBoard, board);
    }else{
        board.receiveAttack([row,column]);

        if(board.getBoard()[row][column]){
            prevShotSuccessful = true;
            updateBoxDisplay(uiBox, true);
        }else{
            updateBoxDisplay(uiBox);
        }
    }
}