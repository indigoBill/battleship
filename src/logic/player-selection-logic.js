import PubSub from 'pubsub-js';
import { createSelectPlayersModal, hideModal, setOpponentSelection } from '../ui/player-selection-modal';

export const OPPONENT_SELECTED = 'the opponent has been selected';

function setTypeOfOpponent(e){
    setOpponentSelection(e.target);
    hideModal();
    PubSub.publish(OPPONENT_SELECTED);
}

function addListenersToModal(){
    const oppponentBtns = document.querySelectorAll('.oppponent-btn');

    oppponentBtns.forEach((btn) => {
        btn.addEventListener('click', setTypeOfOpponent);
    });
}

export function createModal(){
    createSelectPlayersModal();
    addListenersToModal();
}