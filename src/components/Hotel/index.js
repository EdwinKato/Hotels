import React from 'react';
import PropTypes from 'prop-types';

import './Hotel.css';

export const Hotel = (props) => (
    <div className="card">
        <div className="content">
            <p className="name">{props.title}</p>
            <p className="role">{props.distance}</p>
            <p className="text">{props.address.street}</p>
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
