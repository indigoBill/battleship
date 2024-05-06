import Gameboard from "./gameboard";

export default function Player(playerName){
    const nameOfPlayer = playerName;
    const board = Gameboard();

    function getBoard(){
        return board;
    }
    
    function getPlayerName(){
        if(!nameOfPlayer) return 'Computer';

        return nameOfPlayer;
    }

    return { getBoard, getPlayerName };
}