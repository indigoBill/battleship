import Player from './factories/player';
import Ship from './factories/ship';


import { generateUiBoard, toggleBoardDisplay, updateBoxDisplay, setActiveBoard } from './game-ui';

function getAttackCoordinates(e){
    const row = Number(e.target.parentElement.getAttribute('row'));
    const column = Number(e.target.getAttribute('box'));

    return [row,column];
}

function addEventListenerToBoard(uiBoard, board){
    const boxes = uiBoard.querySelectorAll('.box');

    boxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            if(!e.target.classList.contains('hit')){
                const coordinates = getAttackCoordinates(e);
            
                board.receiveAttack(coordinates);

                if(board.getBoard()[coordinates[0]][coordinates[1]]){
                    updateBoxDisplay(e.target, true);
                }else{
                    updateBoxDisplay(e.target);
                }

                if(board.checkStatusOfShips()) console.log('GAME OVER');
            }
        });
    });
}

export default function startGame(){
    const player1 = Player('player1');
    const player2 = Player();
    const board1 = player1.getBoard();
    const board2 = player2.getBoard();

    board1.placeShip(Ship(5), [0,0]);
    board2.placeShip(Ship(2), [9,0]);

    const uiBoard1 = generateUiBoard(board1.getBoard());
    const uiBoard2 = generateUiBoard(board2.getBoard());

    if(player2.getPlayerName() === 'Computer'){
        toggleBoardDisplay(uiBoard2);
        addEventListenerToBoard(uiBoard2, board2);
        setActiveBoard(uiBoard2);
    }else{
        addEventListenerToBoard(uiBoard1, board1);
        addEventListenerToBoard(uiBoard2, board2);
    }
}
