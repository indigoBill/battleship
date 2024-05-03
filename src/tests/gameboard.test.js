/* global describe, test, expect */

import Ship from '../factories/ship';
import Gameboard from '../factories/gameboard';


describe('gameboard interactions', () => {
    const board = Gameboard();
    
    describe('place ships of different sizes at specific coordinates', () => {
        test('ship length is 1', () => {
            expect(board.placeShip(Ship(), [0,0])).toEqual([0,0]);
        });

        test('ship length is 5', () => {
            expect(board.placeShip(Ship(5), [0,0])).toEqual([[0,0],[0,4]]);
        });

        test('ship length is 3 but it is placed too far off grid to fit length', () => {
            expect(board.placeShip(Ship(3), [0,8])).toBeFalsy();
        });
    });
    

    // test('determine whether attack was a hit or miss');

    // test('keep track of missed attacks');

    // test('report whether or not all ships have sunk');
});