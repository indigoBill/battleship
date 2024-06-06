import Player from './factories/player';
import Ship from './factories/ship';

import { generateUiBoard, toggleBoardState, updateBoxDisplay, setActiveUiBoard, 
        updateUiBoard, updateClassList, createSelectOpponentModal, toggleOpponentModalDisplay, 
        createPlaceShipsPage, updatePlaceShipsPage, createGameUi, createPassTheDevicePage,
        toggleDisplayForPassDevice, createGameOverModal, 
        createPageLogo} from './game-ui';
import { getComputerMove, generateRandomShipPlacement } from './computerPlayer';

const allShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
const activeBoardInfo = [];
const inactiveBoardInfo = [];
let computerOpponent;
let isVertical;

function startCountDown(){
    const countDown = document.querySelector('.count-down');
    let currNum = Number(countDown.textContent);

    const countDownInterval = setInterval(() => {
        countDown.textContent = `${currNum-=1}`;

        if(!currNum){
            clearInterval(countDownInterval);
            toggleDisplayForPassDevice();
        }

    }, 1000);
}

function addPlayAgainBtnEventListener(){
    const playAgainBtn = document.querySelector('.play-again-btn');

    playAgainBtn.addEventListener('click', () => {
        const allDomObjs = document.querySelectorAll('body > div:not(.select-opponent, .page-logo-container)');

        allDomObjs.forEach((obj) => obj.remove());
        activeBoardInfo.length = 0;
        inactiveBoardInfo.length = 0;

        toggleOpponentModalDisplay();
    });
}

function getNextMove(attackedBoard){
    if(computerOpponent){
        toggleBoardState(attackedBoard);

        setTimeout(() => {
            getComputerMove(inactiveBoardInfo[0][0], inactiveBoardInfo[0][1].getBoard());

            if(inactiveBoardInfo[0][1].getBoard().checkStatusOfShips()){
                createGameOverModal(activeBoardInfo[0][1].getPlayerName());
                addPlayAgainBtnEventListener();
            }else{
                toggleBoardState(attackedBoard);
            }

        }, 500);
    }else{
        setTimeout(() => {
            toggleDisplayForPassDevice(startCountDown);
        }, 500);
    }
}

function switchActiveBoard(){
    const newlyInactiveBoards = activeBoardInfo.splice(0,1, inactiveBoardInfo[0]);

    inactiveBoardInfo.splice(0,1, newlyInactiveBoards[0]);
    setActiveUiBoard(activeBoardInfo[0][0]);
}

function getAttackCoordinates(e){
    const row = Number(e.target.parentElement.getAttribute('row'));
    const column = Number(e.target.getAttribute('box'));

    return [row,column];
}

function addAttackEventListeners(uiBoard, board){
    const boxes = uiBoard.querySelectorAll('.box');

    boxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            if(!e.target.classList.contains('hit') && activeBoardInfo[0][0] === uiBoard){
                const coordinates = getAttackCoordinates(e);

                if(!computerOpponent){
                    setTimeout(() => {
                        switchActiveBoard();
                    }, 500);
                }

                board.receiveAttack(coordinates);

                if(board.getBoard()[coordinates[0]][coordinates[1]]) updateBoxDisplay(e.target, true);
                else updateBoxDisplay(e.target);
                
                if(board.checkStatusOfShips()){
                    createGameOverModal(inactiveBoardInfo[0][1].getPlayerName());
                    addPlayAgainBtnEventListener();
                }else{
                    getNextMove(uiBoard);
                }
            }
        });
    });
}

function removePlacementEventListeners(uiBoard, eventHandler){
    const uiBoxes = uiBoard.querySelectorAll('.box');
    uiBoxes.forEach((box) => {
        box.removeEventListener('click', eventHandler);
    });
}

function placeShipsOnBoard(uiBoard, board){
    const boxes = uiBoard.querySelectorAll('.box');
    let shipIndex = 0;

    function mouseOverEvent(e){
        if(shipIndex < allShips.length){
            const boxIndex = Number(e.target.getAttribute('box'));
            const rowIndex = Number(e.target.parentElement.getAttribute('row'));
            const currShipLength = allShips[shipIndex].getLength();
            const shipEndPosition = isVertical ? rowIndex + (currShipLength - 1) : boxIndex + (currShipLength - 1);
            let currBox = e.target;

            //  LARGEST INDEX ON A GAMEBOARD IS 9
            if(shipEndPosition < 10){
                while(document.querySelectorAll('.highlight').length < currShipLength){
                    updateClassList(e.target, 'highlight');
                    if(!isVertical){
                        updateClassList(currBox.nextSibling, 'highlight');
                        currBox = currBox.nextSibling;
                    }else{
                        const boxBelow = currBox.parentElement.nextSibling.querySelector(`[box = "${boxIndex}"]`);
                        updateClassList(boxBelow, 'highlight');
                        currBox = boxBelow;
                    }
                }
            }
        }
    }

    function mouseOutEvent(){
        const highlightedBoxes = document.querySelectorAll('.highlight');

        highlightedBoxes.forEach((highlightedBox) => {
            updateClassList(highlightedBox, 'highlight', true);
        });
    }

    function mouseClickEvent(e){
        const row = Number(e.target.parentElement.getAttribute('row'));
        const column = Number(e.target.getAttribute('box'));

        if(shipIndex < allShips.length && board.placeShip(Ship(allShips[shipIndex].getLength()), [row, column], isVertical)){
            updateUiBoard(uiBoard, board);
            shipIndex += 1;
        }

        if(shipIndex === allShips.length){
            removePlacementEventListeners(uiBoard, mouseClickEvent);

            if(!computerOpponent) addAttackEventListeners(uiBoard, board);

            if(computerOpponent || (!computerOpponent && uiBoard.classList.contains('board-two'))){
                toggleDisplayForPassDevice(startCountDown);
                createGameUi();
                setActiveUiBoard(activeBoardInfo[0][0]);
            }else{
                createPassTheDevicePage();
                toggleDisplayForPassDevice(startCountDown);
                updatePlaceShipsPage();
            }
        }
    }

    boxes.forEach((box) => {
        box.addEventListener('mouseover', mouseOverEvent);
        box.addEventListener('mouseout', mouseOutEvent);
        box.addEventListener('click', mouseClickEvent);
    });
}

function addRotateBtnEventListener(){
    const rotateBtn = document.querySelector('.rotate-btn');

    rotateBtn.addEventListener('click', () => {
        if(isVertical) isVertical = false;
        else isVertical = true;
    });
}

function startGame(){
    const player1 = Player('player 1');
    const player2 = computerOpponent ? Player() : Player('player 2');
    const board1 = player1.getBoard();
    const board2 = player2.getBoard();
    const uiBoard1 = generateUiBoard(board1.getBoard(), 'board-one');
    const uiBoard2 = generateUiBoard(board2.getBoard(), 'board-two');

    activeBoardInfo.push([uiBoard2, player2]);
    inactiveBoardInfo.push([uiBoard1, player1]);

    createPlaceShipsPage(uiBoard1, uiBoard2);
    addRotateBtnEventListener();
    placeShipsOnBoard(uiBoard1, board1);

    if(computerOpponent){
        generateRandomShipPlacement(board2, allShips);
        addAttackEventListeners(uiBoard2, board2);
    }else{
        placeShipsOnBoard(uiBoard2, board2);
    }
}

function addEventListenerToModal(){
    const opponentBtns = document.querySelectorAll('.opponent-btn');

    opponentBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if(e.target.textContent === 'COMPUTER') computerOpponent = true;
            else computerOpponent = false;

            toggleOpponentModalDisplay();
            startGame();
        });
    });
}

export default function loadIntroScreen(){
    createPageLogo();
    createSelectOpponentModal();
    addEventListenerToModal();
}
