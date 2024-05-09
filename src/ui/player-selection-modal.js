import '../stylesheets/game-style.css';

export function createSelectPlayersModal(){
    const modalContainer = document.createElement('div');
    const modalText = document.createElement('p');
    const playerBtn = document.createElement('button');
    const compBtn = document.createElement('button');

    modalText.textContent = 'CHOOSE YOUR OPPONENT';
    playerBtn.textContent = 'PLAYER';
    compBtn.textContent = 'COMPUTER';

    modalContainer.classList.add('modal-container');
    modalText.classList.add('modal-text');
    playerBtn.classList.add('oppponent-btn');
    compBtn.classList.add('oppponent-btn');

    modalContainer.appendChild(modalText);
    modalContainer.appendChild(playerBtn);
    modalContainer.appendChild(compBtn);

    document.body.appendChild(modalContainer);
}

export function hideModal(){
    const modalContainer = document.querySelector('.modal-container');

    modalContainer.classList.add('hide');
}

export function setOpponentSelection(domObj){
    domObj.classList.add('selected');
}