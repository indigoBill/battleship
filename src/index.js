import Ship from './factories/ship';
import Player from './factories/player';
import { createDomGameBoard } from './dom';
 
const player1 = Player('Danny');
const playerBoard1 = player1.getBoard();
const player2 = Player('Chicken');
const playerBoard2 = player2.getBoard();

playerBoard1.placeShip(Ship(5), [0,1]);
playerBoard1.placeShip(Ship(4), [8,3]);
playerBoard1.placeShip(Ship(3), [4,0]);
playerBoard1.placeShip(Ship(3), [6,3]);
playerBoard1.placeShip(Ship(2), [9,5]);

playerBoard2.placeShip(Ship(5), [7,2]);
playerBoard2.placeShip(Ship(4), [9,0]);
playerBoard2.placeShip(Ship(3), [4,3]);
playerBoard2.placeShip(Ship(3), [6,5]);
playerBoard2.placeShip(Ship(2), [2,5]);

createDomGameBoard(playerBoard1.getBoard());