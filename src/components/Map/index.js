import * as React from 'react';

import { Hotels } from '../Hotels';

const ZOOM_LEVEL = 15;

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
            navigator.geolocation.getCurrentPosition(
                this.onSetPositionSuccess,
                this.onSetPositionError
            );
        }
    };

    onSetPositionSuccess = (position) =>
        this.setState(
            {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            },
            this.initializeMap
        );

    onSetPositionError = (error) => this.setState({ error: error.message });

    initializeMap = () => {
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: 'Mbq16vleQ5WNqXJUoSDg2zvxKHvkt7PL2_irXrYQon4'
        });
        const defaultLayers = platform.createDefaultLayers();

        // Create the map
        const map = new H.Map(this.mapRef.current, defaultLayers.vector.normal.map, {
            center: { lat: this.state.latitude, lng: this.state.longitude },
            zoom: ZOOM_LEVEL,
            pixelRatio: window.devicePixelRatio || 1
        });

        // Add interactivity to the map
        const events = new H.mapevents.MapEvents(map);
        new H.mapevents.Behavior(events);
        const ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
        this.setState({ map, ui });
    };

    componentWillUnmount() {
        // Cleanup after the map to avoid memory leaks
        this.state.map.dispose();
    }

    render() {
        const { map, latitude, longitude, ui, error } = this.state;
        return (
            <div style={{ height: '100%' }}>
                {error && (
                    <div className="error">
                        Sorry, an error occured while trying to set the position. Please reload the
                        page and try again
                    </div>
                )}
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
