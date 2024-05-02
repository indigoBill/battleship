/* global describe, test, expect */

import Ship from '../factories/ship';

describe('ship interactions', () => {
    const newShip = Ship();
    
    test('ship acknowledges hit', () => {
        expect(newShip.hit()).toBe(1);
    });
    
    test('ship sinks', () => {
        expect(newShip.isSunk()).toBeTruthy();
    });
});
