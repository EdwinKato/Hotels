import React from 'react';
import PropTypes from 'prop-types';

import './Hotel.css';

const getDistanceLabel = (distance) => {
    let value = `${distance} m`;
    if (distance >= 1000) {
        value = `${distance / 1000} km`;
    }
    return `${value} from your current location`;
};

export const Hotel = ({ title, distance, address: { street } }) => (
    <div className="card">
        <div className="content">
            <p className="name">{title}</p>
            <p className="role">{`${getDistanceLabel(distance)}`}</p>
            <p className="text">{street}</p>
        </div>
    </div>
);

Hotel.propTypes = {
    title: PropTypes.string,
    address: PropTypes.shape({
        street: PropTypes.string
    }),
    distance: PropTypes.number
};
