import React from 'react';

import { Map } from '../Map';
import logo from '../../images/logo.svg';
import MapBurgerIcon from '../../images/MapBurgerIcon.svg';
import './App.css';

export const App = () => (
    <div>
        <nav>
            <img src={logo} alt="logo" />
            <img src={MapBurgerIcon} alt="select" className="burgerIcon" />
        </nav>
        <div className="content-body">
            <Map />
        </div>
    </div>
);
