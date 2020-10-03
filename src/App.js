import React, { Component } from 'react';
import './App.css';

// import ReactMapGL from 'react-map-gl';

import ReactMapBoxGl, { Layer, Feature } from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

class App extends Component {

  state = {
    viewport: {
      width: 600,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState((prevState) => {
        return {
          viewport: {
            ...prevState.viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }
      })
    })
  }

  onDrawCreate = ({ features }) => {
    console.log(features);
  };

  onDrawUpdate = ({ features }) => {
    console.log(features);
  };
  
  render() {
    return (
      <div>
        <h1>Welcome to Tripify</h1>
        <h2>The ReactMapBoxGl Component</h2>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: this.state.viewport.height,
            width: this.state.viewport.width
          }}
          center={[
            this.state.viewport.longitude,
            this.state.viewport.latitude
          ]}
        >
          <DrawControl onDrawCreate={this.onDrawCreate} onDrawUpdate={this.onDrawUpdate} />
        </Map>
      </div>
    );
  }
}

export default App;

const Map = ReactMapBoxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
})