import './stylesheets/game-style.css';

export function generateUiBoard(board){
    const uiBoard = document.createElement('div');

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

            if(board[index][boxNum]) uiBox.classList.add('filled-box');
        }

        uiBoard.appendChild(uiRow);
    });

    document.body.appendChild(uiBoard);

    return uiBoard;
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