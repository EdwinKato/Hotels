import * as React from 'react';

import { Hotels } from '../Hotels';

const API_KEY = 'Mbq16vleQ5WNqXJUoSDg2zvxKHvkt7PL2_irXrYQon4';

export class Map extends React.Component {
    mapRef = React.createRef();

    state = {
        // The map instance to use during cleanup
        map: null,
        latitude: 0,
        longitude: 0,
        error: null,
        ui: null
    };

    componentDidMount() {
        this.setCurrentPosition();
    }

    setCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.onPositionSuccess, this.onPositionError);
        }
    };

    onPositionSuccess = (position) => {
        this.setState(
            {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            },
            this.initializeMap
        );
    };

    onPositionError = (error) => this.setState({ error: error.message });

    initializeMap = async () => {
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: 'Mbq16vleQ5WNqXJUoSDg2zvxKHvkt7PL2_irXrYQon4'
        });
        const defaultLayers = platform.createDefaultLayers();

        // Create an instance of the map
        const map = new H.Map(this.mapRef.current, defaultLayers.vector.normal.map, {
            center: { lat: this.state.latitude, lng: this.state.longitude },
            zoom: 15,
            pixelRatio: window.devicePixelRatio || 1
        });
        const events = new H.mapevents.MapEvents(map);
        new H.mapevents.Behavior(events);
        const ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
        this.setState({ map, ui });
    };

    getHotels = async () => {
        const searchURL = `https://discover.search.hereapi.com/v1/discover?at=${this.state.latitude},${this.state.longitude}&q=hotel&lang=en-US&apiKey=${API_KEY}`;
        const response = await fetch(searchURL);
        return response.json();
    };

    componentWillUnmount() {
        // Cleanup after the map to avoid memory leaks when this component exits the page
        this.state.map.dispose();
    }

    render() {
        const { map, latitude, longitude, ui } = this.state;
        return (
            <div style={{ height: '100%' }}>
                <div ref={this.mapRef} style={{ height: '100vh' }}></div>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                    {map && <Hotels map={map} latitude={latitude} longitude={longitude} ui={ui} />}
                </div>
            </div>
        );
    }
}
