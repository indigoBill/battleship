/* global describe, test, expect */

import Ship from '../factories/ship';
import Gameboard from '../factories/gameboard';


describe('gameboard interactions', () => {
    const board = Gameboard();
    const carrierShip = Ship(5);
    
    describe('place ships of different sizes at specific coordinates', () => {
        test('ship length is 1', () => {
            expect(board.placeShip(Ship(), [1,1])).toEqual([1,1]);
        });

        test('ship length is 5', () => {
            expect(board.placeShip(carrierShip, [0,0])).toEqual([[0,0],[0,4]]);
        });

        test('ship length is 3 but it is placed too far off grid to fit length', () => {
            expect(board.placeShip(Ship(3), [0,8])).toBeFalsy();
        });
    });
    
    describe('determine whether attack was a hit or miss', () => {
        test('attack hit ship', () => {
            board.receiveAttack([0,3]);
            expect(carrierShip.getHits()).toBe(1);
        });

        test('attack missed ship', () => {
            board.receiveAttack([0,5]);
            expect(board.getMissedShots()).toEqual(expect.arrayContaining([[0,5]]));
        });

    });

    test('keep track of missed attacks', () => {
        board.receiveAttack([1,5]);
        expect(board.getMissedShots()).toEqual(expect.arrayContaining([[1,5]]));
    });

    describe('report whether or not all ships have sunk', () => {
        test('not all ships have sunk', () => {
            expect(board.checkStatusOfShips()).toBeFalsy();
        });

        test('all ships sunk', () => {
            board.receiveAttack([1,1]);
            board.receiveAttack([0,0]);
            board.receiveAttack([0,1]);
            board.receiveAttack([0,2]);
            board.receiveAttack([0,4]);

            expect(board.checkStatusOfShips()).toBeTruthy();
        });
    })
    
});