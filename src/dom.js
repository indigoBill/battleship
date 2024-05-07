export function createDomGameBoard(board){
    const boardContainer = document.createElement('div');

    board.forEach((row, index) => {
        for(let box = 0; box < 10; box+=1){
            const domBox = document.createElement('div');

            domBox.style.height = '20px'
            domBox.style.width = '20px'

            if(board[index][box]){
                domBox.style.backgroundColor = 'green';
                domBox.style.border = '1px solid black';
            }else{
                domBox.style.border = '1px solid black';
            }

            boardContainer.appendChild(domBox);
        }
    });

    document.body.appendChild(boardContainer);
}

export const y = 1;