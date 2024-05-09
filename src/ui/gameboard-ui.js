import '../stylesheets/game-style.css';

export default function createGameBoard(boardObj){
    const boardArr = boardObj.getBoard();
    const boardContainer = document.createElement('div');

    boardContainer.classList.add('board-container');

    boardArr.forEach((row, rowIndex) => {
        const uiRow = document.createElement('div');

        uiRow.classList.add('row');
        uiRow.setAttribute('row', rowIndex);

        for(let box = 0; box < 10; box+=1){
            const uiBox = document.createElement('div');

            uiBox.classList.add('box');
            uiBox.setAttribute('box', box);

            if(boardArr[rowIndex][box]) uiBox.classList.add('filled-box');
            uiRow.appendChild(uiBox);
        }

        boardContainer.appendChild(uiRow);
    });

    document.body.appendChild(boardContainer);
}