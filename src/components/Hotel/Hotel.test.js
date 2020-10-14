import React from 'react';
import { render } from '@testing-library/react';

import { Hotel, getDistanceLabel } from './index';

describe('Hotel', () => {
    it('should display the title distance and street when passed in', () => {
        const props = {
            title: 'Test title',
            distance: 1000,
            address: { street: 'Test street' }
        };
        const { getByText } = render(<Hotel {...props} />);

        expect(getByText('Test title')).toBeVisible();
        expect(getByText('1 km from your current location')).toBeVisible();
        expect(getByText('Test street')).toBeVisible();
    });

    it.each([
        [100, '100 m from your current location'],
        [0, '0 m from your current location'],
        [2000, '2 km from your current location']
    ])(
        'getDistanceLabel method returns the correct distance labels for different values',
        (input, expected) => {
            expect(getDistanceLabel(input)).toEqual(expected);
        }
    );
});
