/* global describe, beforeAll, test, expect */

import Ship from '../factories/ship';

describe('ship interactions', () => {
    let newShip;

    beforeAll(() => {
        newShip = Ship();
    });
    
    test('ship acknowledges hit', () => {
        expect(newShip.hit()).toBe(1);
    });
    
    test('ship sinks', () => {
        expect(newShip.isSunk()).toBeTruthy();
    });
});
