import Player from './factories/player';
import Ship from './factories/ship';

import { generateUiBoard, toggleBoardDisplay } from './game-ui';

export default function startGame(){
    const player1 = Player('player1');
    const player2 = Player();
    const board1 = player1.getBoard();
    const board2 = player2.getBoard();


    board1.placeShip(Ship(5), [0,0]);
    board2.placeShip(Ship(2), [9,0]);

    const uiBoard1 = generateUiBoard(board1.getBoard());
    const uiBoard2 = generateUiBoard(board2.getBoard());

    toggleBoardDisplay(uiBoard2);
}