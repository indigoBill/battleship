import Player from './factories/player';
import Ship from './factories/ship';

import { generateUiBoard, toggleBoardState, updateBoxDisplay, setActiveBoard, updateUiBoard, updateClassList } from './game-ui';
import getComputerMove from './computerPlayer';

//  /////////////////////////////////////////////////////////////////////////

const player1 = Player('player1');
const player2 = Player();
const board1 = player1.getBoard();
const board2 = player2.getBoard();

// board1.placeShip(Ship(5), [0,0]);
board2.placeShip(Ship(2), [9,0]);

const uiBoard1 = generateUiBoard(board1.getBoard());
const uiBoard2 = generateUiBoard(board2.getBoard());

//  ///////////////////////////////////////////////////////////////////////////////

function getAttackCoordinates(e){
    const row = Number(e.target.parentElement.getAttribute('row'));
    const column = Number(e.target.getAttribute('box'));

    return [row,column];
}

function getNextMove(){
    toggleBoardState(uiBoard2);

    if(player2.getPlayerName() === 'Computer'){
        setTimeout(() => {
            getComputerMove(uiBoard1, board1);

            if(board1.checkStatusOfShips()) console.log('GAME OVER');
            else toggleBoardState(uiBoard2);
        }, 500);
    }else{
        //  IF PLAYER IS PERSON SHOW NEXT PLAYER SCREEN FOR 5 SEC THEN CHANGE DISPLAY TO SHOW OTHER PLAYER BOARD
    }
}

function addEventListenerToBoard(uiBoard, board){
    const boxes = uiBoard.querySelectorAll('.box');

    boxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            if(!e.target.classList.contains('hit')){
                const coordinates = getAttackCoordinates(e);
            
                board.receiveAttack(coordinates);

                if(board.getBoard()[coordinates[0]][coordinates[1]]) updateBoxDisplay(e.target, true);
                else updateBoxDisplay(e.target);

                if(board.checkStatusOfShips()) console.log('GAME OVER');
                else getNextMove();
            }
        });
    });
}

const allShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];


function placeShipsOnBoard(uiBoard, board){
    const boxes = uiBoard.querySelectorAll('.box');
    let shipIndex = 0;

    boxes.forEach((box) => {
        box.addEventListener('mouseover', (e) => {
            if(shipIndex < allShips.length){
                const boxIndex = Number(e.target.getAttribute('box'));
                const currShipLength = allShips[shipIndex].getLength();
                const shipEndPosition = boxIndex + (currShipLength - 1);
                let currBox = e.target;

                //  LARGEST INDEX ON A GAMEBOARD IS 9
                if(shipEndPosition < 10){
                    while(document.querySelectorAll('.highlight').length < currShipLength){
                        // e.target.classList.add('highlight');
                        // currBox.nextSibling.classList.add('highlight');

                        updateClassList(e.target, 'highlight');
                        updateClassList(currBox.nextSibling, 'highlight');

                        currBox = currBox.nextSibling;
                    }
                }
            }
        });

        box.addEventListener('mouseout', () => {
            const highlightedBoxes = document.querySelectorAll('.highlight');

            highlightedBoxes.forEach((highlightedBox) => {
                // highlightedBox.classList.remove('highlight');

                updateClassList(highlightedBox, 'highlight', true);
            });
        });

        box.addEventListener('click', (e) => {
            const row = Number(e.target.parentElement.getAttribute('row'));
            const column = Number(e.target.getAttribute('box'));

            if(board.placeShip(allShips[shipIndex], [row, column])){
                updateUiBoard(uiBoard, board);
                shipIndex += 1;
            };

        });
    });
}

export default function startGame(){

    placeShipsOnBoard(uiBoard1, board1);

    if(player2.getPlayerName() === 'Computer'){
        addEventListenerToBoard(uiBoard2, board2);
        setActiveBoard(uiBoard2);
    }else{
        addEventListenerToBoard(uiBoard1, board1);
        addEventListenerToBoard(uiBoard2, board2);
    }
}

//  2 LENGTH (X1)
//  3 LENGTH (X2)
//  4 LENGTH (X1)
//  5 LENGTH (X1)

