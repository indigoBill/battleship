import PubSub from 'pubsub-js';

import { createModal, OPPONENT_SELECTED } from './player-selection-logic';
import createGameBoard from '../ui/gameboard-ui';

import Player from '../factories/player';
import Ship from '../factories/ship';

function getOpponent(){
    const selectedBtn = document.querySelector('.modal-container > .selected');
    const opponent = (selectedBtn.textContent === 'PLAYER') ? Player('player2') : Player();

    return opponent;
}

export default function setUpGame(){
    createModal();
}

function startGame(){
    const player1 = Player('player1');
    const player2 = getOpponent();
    const isComputer = player2.getPlayerName() === 'Computer';

    const board1 = player1.getBoard();
    const board2 = player2.getBoard();

    createGameBoard(board1);
    createGameBoard(board2);

    // if(isComputer)


}

PubSub.subscribe(OPPONENT_SELECTED, startGame);