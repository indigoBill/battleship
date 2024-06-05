import '../stylesheets/game-style.css';

const uiBoard1ShipBoxes = [];
const uiBoard2ShipBoxes = [];

export function createPageLogo(){
    const pageLogoContainer = document.createElement('div');
    const pageLogoText = document.createElement('p');

    pageLogoContainer.classList.add('page-logo-container');
    pageLogoText.classList.add('page-logo-text');

    pageLogoText.textContent = 'BATTLESHIP';

    pageLogoContainer.appendChild(pageLogoText);
    document.body.appendChild(pageLogoContainer);
}

export function generateUiBoard(board, additionalClassName){
    const uiBoard = document.createElement('div');

    if(typeof additionalClassName === 'string') uiBoard.classList.add(additionalClassName);
    uiBoard.classList.add('board');

    board.forEach((boardRow, index) => {
        const uiRow = document.createElement('div');

        uiRow.classList.add('row');
        uiRow.setAttribute('row', index);

        for(let boxNum = 0; boxNum < 10; boxNum+=1){
            const uiBox = document.createElement('div');

            uiBox.classList.add('box');
            uiBox.setAttribute('box', boxNum);
            uiRow.appendChild(uiBox);
        }

        uiBoard.appendChild(uiRow);
    });

    return uiBoard;
}

export function updateUiBoard(uiBoard, board){
    const boardArr = board.getBoard();

    boardArr.forEach((boardRow, rowIndex) => {
        boardRow.forEach((rowBox, boxIndex) => {
            if(boardArr[rowIndex][boxIndex]){
                const uiRow = uiBoard.querySelector(`[row = "${rowIndex}"]`);
                const uiBox = uiRow.querySelector(`[box = "${boxIndex}"]`);

                uiBox.classList.add('filled-box');
            }
        });
    });
}

export function updateClassList(domObj, className, toBeRemoved){
    if(toBeRemoved) domObj.classList.remove(className);
    else domObj.classList.add(className);
}

export function toggleBoardState(uiBoard){
    uiBoard.classList.toggle('disable-board');
}

function toggleBoxDisplay(uiBoard){
    const shipBoxes = uiBoard.querySelectorAll('.filled-box');

    if(uiBoard.classList.contains('not-active')){
        if(uiBoard.classList.contains('board-one')){
            uiBoard1ShipBoxes.forEach((box) => {
                box.classList.add('filled-box');
            });
        }else{
            uiBoard2ShipBoxes.forEach((box) => {
                box.classList.add('filled-box');
            });
        }
    }else{
        shipBoxes.forEach((box) => {
            if(uiBoard.classList.contains('board-one') && uiBoard1ShipBoxes.length <= shipBoxes.length){
                uiBoard1ShipBoxes.push(box);
            }else if(uiBoard.classList.contains('board-two') && uiBoard2ShipBoxes.length <= shipBoxes.length){
                uiBoard2ShipBoxes.push(box);
            }
            
            box.classList.remove('filled-box');
        });
    }
}

export function updateBoxDisplay(domBox, shipExists){
    const boxContent = shipExists ? 'o' : 'x';
    const box = domBox;

    domBox.classList.add('hit');

    if(shipExists) domBox.classList.add('ship-hit');
    else domBox.classList.add('ship-missed');

    box.textContent = boxContent;
}

export function setActiveUiBoard(domBoard){
    const gameBoards = document.querySelectorAll('.board');

    gameBoards.forEach((board) => {        
        if(board === domBoard){
            board.classList.add('active');
            board.classList.remove('not-active');
        }else{
            board.classList.add('not-active');
            board.classList.remove('active');
        } 
        toggleBoxDisplay(board);
    });
}

export function createSelectOpponentModal(){
    const selectOpponentModal = document.createElement('div');
    const textContainer = document.createElement('div');
    const modalText = document.createElement('p');
    const ellipsis = document.createElement('span');
    const btnContainer = document.createElement('div');
    const computerBtn = document.createElement('button');
    const playerBtn = document.createElement('button');
    
    selectOpponentModal.classList.add('select-opponent');
    textContainer.classList.add('modal-text-container');
    btnContainer.classList.add('modal-btn-container');
    modalText.classList.add('modal-text');
    ellipsis.classList.add('ellipsis');
    computerBtn.classList.add('comp-btn', 'opponent-btn');
    playerBtn.classList.add('player-btn', 'opponent-btn');

    modalText.textContent = 'SELECT YOUR OPPONENT';
    computerBtn.textContent = 'COMPUTER';
    playerBtn.textContent = 'PLAYER';

    selectOpponentModal.appendChild(textContainer);
    selectOpponentModal.appendChild(btnContainer);
    textContainer.appendChild(modalText);
    textContainer.appendChild(ellipsis);
    btnContainer.appendChild(computerBtn);
    btnContainer.appendChild(playerBtn);

    document.body.appendChild(selectOpponentModal);
}

export function toggleOpponentModalDisplay(){
    const modal = document.querySelector('.select-opponent');

    modal.classList.toggle('hide');
}

export function createPlaceShipsPage(uiBoard1, uiBoard2){
    const boardTextContainer = document.createElement('div');
    const textContainer = document.createElement('div');
    const placeShipText = document.createElement('p');
    const ellipsis = document.createElement('span');
    const rotateBtn = document.createElement('button');

    boardTextContainer.classList.add('board-text-container');
    placeShipText.classList.add('place-ship-text');
    ellipsis.classList.add('ellipsis');
    uiBoard2.classList.add('hide');
    rotateBtn.classList.add('rotate-btn');

    placeShipText.textContent = 'PLACE YOUR SHIPS';
    rotateBtn.textContent = 'ROTATE';

    textContainer.appendChild(placeShipText);
    textContainer.appendChild(ellipsis);
    boardTextContainer.appendChild(textContainer);
    boardTextContainer.appendChild(uiBoard1);
    boardTextContainer.appendChild(uiBoard2);
    boardTextContainer.appendChild(rotateBtn);
    document.body.appendChild(boardTextContainer);
}

export function updatePlaceShipsPage(){
    const gameBoards = document.querySelectorAll('.board');

    gameBoards.forEach((board) => {
        board.classList.toggle('hide');
    });
}

export function createPassTheDevicePage(){
    const passDeviceModal = document.createElement('div');
    const textContainer = document.createElement('div');
    const passTheDeviceText = document.createElement('p');
    const countDown = document.createElement('p');

    passDeviceModal.classList.add('pass-device-modal');
    passDeviceModal.classList.add('hide');
    textContainer.classList.add('pass-device-content');
    countDown.classList.add('count-down');

    passTheDeviceText.textContent = 'PASS THE DEVICE TO THE NEXT PLAYER';
    countDown.textContent = '3';

    passDeviceModal.appendChild(textContainer);
    textContainer.appendChild(passTheDeviceText);
    textContainer.appendChild(countDown);

    document.body.appendChild(passDeviceModal);
}

function resetCountDown(){
    const countDown = document.querySelector('.count-down');

    countDown.textContent = '3';
}

export function toggleDisplayForPassDevice(countDownFunction){
    const textContainer = document.querySelector('.pass-device-modal');

    textContainer.classList.toggle('hide');

    if(!textContainer.classList.contains('hide')) countDownFunction();
    else resetCountDown();
}

export function createGameUi(){
    const boardTextContainer = document.querySelector('.board-text-container');
    const boardContainer = document.createElement('div');
    const uiBoards = document.querySelectorAll('.board');

    boardContainer.classList.add('board-container');

    uiBoards.forEach((uiBoard) => {
        uiBoard.classList.remove('hide');
        boardContainer.appendChild(uiBoard);
    });

    boardTextContainer.remove();
    document.body.appendChild(boardContainer);
}

export function createGameOverModal(winningPlayer){
    const gameOverModal = document.createElement('div');
    const gameOverContent = document.createElement('div');
    const gameOverText = document.createElement('p');
    const playAgainBtn = document.createElement('button');

    gameOverModal.classList.add('game-over-modal');
    gameOverContent.classList.add('game-over-content');
    gameOverText.classList.add('game-over-text');
    playAgainBtn.classList.add('play-again-btn');

    gameOverText.textContent = `${winningPlayer.toUpperCase()} WINS!`;
    playAgainBtn.textContent = 'PLAY AGAIN';

    gameOverModal.appendChild(gameOverContent);
    gameOverContent.appendChild(gameOverText);
    gameOverContent.appendChild(playAgainBtn);
    document.body.appendChild(gameOverModal);
}