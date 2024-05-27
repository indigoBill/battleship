import './stylesheets/game-style.css';

export function generateUiBoard(board, additionalClassName){
    const uiBoard = document.createElement('div');

    uiBoard.classList.add('board', additionalClassName);

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

    // document.body.appendChild(uiBoard);

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
        shipBoxes.forEach((box) => {
            box.classList.add('filled-box');
        });
    }else{
        shipBoxes.forEach((box) => {
            box.classList.remove('filled-box');
        });
    }
}

export function updateBoxDisplay(domBox, shipExists){
    domBox.classList.add('hit');

    if(shipExists) domBox.classList.add('ship-hit');
    else domBox.classList.add('ship-missed');
}

export function setActiveBoard(domBoard){
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
    const modalText = document.createElement('p');
    const computerBtn = document.createElement('button');
    const playerBtn = document.createElement('button');
    
    selectOpponentModal.classList.add('select-opponent');
    modalText.classList.add('modal-text');
    computerBtn.classList.add('comp-btn', 'opponent-btn');
    playerBtn.classList.add('player-btn', 'opponent-btn');

    modalText.textContent = 'SELECT OPPONENT';
    computerBtn.textContent = 'COMPUTER';
    playerBtn.textContent = 'PLAYER';

    selectOpponentModal.appendChild(modalText);
    selectOpponentModal.appendChild(computerBtn);
    selectOpponentModal.appendChild(playerBtn);

    document.body.appendChild(selectOpponentModal);
}

export function hideOpponentModal(){
    const modal = document.querySelector('.select-opponent');

    modal.classList.add('hide');
}

export function createPlaceShipsPage(uiBoard1, uiBoard2){
    const boardTextContainer = document.createElement('div');
    const placeShipText = document.createElement('p');
    const rotateBtn = document.createElement('button');

    boardTextContainer.classList.add('board-text-container');
    placeShipText.classList.add('place-ship-text');
    uiBoard2.classList.add('hide');
    rotateBtn.classList.add('rotate-btn');

    placeShipText.textContent = 'PLACE YOUR SHIPS';
    rotateBtn.textContent = 'ROTATE';

    boardTextContainer.appendChild(placeShipText);
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
    const textContainer = document.createElement('div');
    const passTheDeviceText = document.createElement('p');
    const countDown = document.createElement('p');

    textContainer.classList.add('pass-device-container');
    textContainer.classList.add('hide');
    countDown.classList.add('count-down');

    passTheDeviceText.textContent = 'PASS THE DEVICE TO THE NEXT PLAYER';
    countDown.textContent = '3';

    textContainer.appendChild(passTheDeviceText);
    textContainer.appendChild(countDown);

    document.body.appendChild(textContainer);
}

function resetCountDown(){
    const countDown = document.querySelector('.count-down');

    countDown.textContent = '3';
}

export function toggleDisplayForPassDevice(countDownFunction){
    const textContainer = document.querySelector('.pass-device-container');

    textContainer.classList.toggle('hide');

    if(!textContainer.classList.contains('hide')) countDownFunction();
    else resetCountDown();
}

export function createGameUi(){
    const boardTextContainer = document.querySelector('.board-text-container');
    const uiBoards = document.querySelectorAll('.board');

    uiBoards.forEach((uiBoard) => {
        uiBoard.classList.remove('hide');
        document.body.appendChild(uiBoard);
    });

    boardTextContainer.remove();
}