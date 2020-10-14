import React from 'react';
import logo from '../../images/logo.svg';
import MapBurgerIcon from '../../images/MapBurgerIcon.svg';
import './App.css';
import { Map } from '../Map';

function App() {
    return (
        <div>
            <nav>
                <img src={logo} alt="logo" />
                <img src={MapBurgerIcon} alt="select" />
            </nav>
            {/* <Map /> */}
            <div className="bh">
                <Map />
            </div>
        </div>
    );
}

export default App;
