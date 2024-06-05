/* global describe, test, expect */

import Player from '../factories/player';

describe('differentiate real players from the computer', () => {
    test('player is a person', () => {
        expect(Player('Peters').getPlayerName()).toBe('Peters');
    });

    test('player is a computer', () => {
        expect(Player().getPlayerName()).toBe('Computer');
    });
});

test('player has a gameboard', () => {
    expect(Player()).toHaveProperty('getBoard');
});