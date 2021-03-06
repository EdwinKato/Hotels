import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Hotel } from '../Hotel';
import MapHomeIconDefault from '../../images/MapHomeIconDefault.svg';
import MapHomeIconActive from '../../images/MapHomeIconActive.svg';
import './Hotels.css';

const H = window.H;
const defaultIcon = new H.map.Icon(MapHomeIconDefault);
const activeIcon = new H.map.Icon(MapHomeIconActive);

export class Hotels extends Component {
    state = {
        hotels: [],
        selectedHotel: null,
        selectedMarker: null
    };

    async componentDidMount() {
        const result = await this.getHotels();
        this.setState({ hotels: result.items });
        this.addHotelMarkers(result);
    }

    getHotels = async () => {
        const { latitude, longitude } = this.props;
        const searchURL = `https://discover.search.hereapi.com/v1/discover?at=${latitude},${longitude}&q=hotel&lang=en-US&apiKey=${process.env.REACT_APP_HERE_API_KEY}`;
        const response = await fetch(searchURL);
        return response.json();
    };

    addHotelMarkers = (hotels) => {
        const { map } = this.props;
        hotels.items.forEach((hotel) => {
            const marker = new H.map.Marker(hotel.position, { icon: defaultIcon });
            marker.addEventListener('tap', (event) => this.onMarkerClick(event, hotel, marker));

            // Add the marker to the map
            map.addObject(marker);
        });
    };

    onMarkerClick = (event, hotel, marker) => {
        const { map } = this.props;
        const { selectedMarker } = this.state;
        if (selectedMarker) {
            selectedMarker.setIcon(defaultIcon);
        }
        event.target.setIcon(activeIcon);
        this.setState({
            selectedHotel: hotel,
            selectedMarker: marker
        });
        map.setCenter(hotel.position, true);
    };

    componentDidUnMount() {
        const { map } = this.state;
        const objects = map.getObjects();
        objects.forEach((object) => {
            object.dispose();
        });
    }

    render() {
        const { selectedHotel } = this.state;
        return (
            <div className="hotels">
                {selectedHotel && <Hotel key={selectedHotel.id} {...selectedHotel} />}
            </div>
        );
    }
}

Hotels.propTypes = {
    map: PropTypes.object,
    latitude: PropTypes.number,
    longitude: PropTypes.number
};
