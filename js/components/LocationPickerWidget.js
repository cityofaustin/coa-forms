import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "./LocationPickerWidget.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3Jvd2VhdHgiLCJhIjoiY2o1NDFvYmxkMHhkcDMycDF2a3pseDFpZiJ9.UcnizcFDleMpv5Vbv8Rngw"
});

class SelectLocationMap extends Component {
  constructor(props) {
    super(props);

    this.onStyleLoad = this.onStyleLoad.bind(this);
  }

  onStyleLoad(map) {
    map.resize();
  }

  render() {
    const { lat, lng } = this.props;
    return (
      <Map
        style={"mapbox://styles/croweatx/cjow5d6cd3l7g2snrvf17wf0r"}
        center={[lng, lat]}
        onStyleLoad={this.onStyleLoad}
      >
        <Layer
          type="symbol"
          id="selectedLocation"
          layout={{
            "icon-image": "marker-open-small",
            "icon-allow-overlap": true
          }}
        >
          <Feature
            coordinates={[lng, lat]}
            draggable={true}
            onDragEnd={this.props.locationUpdated}
          />
        </Layer>
      </Map>
    );
  }
}

export default class LocationPickerWidget extends React.Component {
  constructor(props) {
    super(props);
    const valueJSON = props.value ? props.value : props.schema.formData;

    const state = JSON.parse(valueJSON);
    this.state = state;

    this.locationUpdated = this.locationUpdated.bind(this);
  }

  locationUpdated({ lngLat }) {
    const state = {
      address: "Dropped Pin",
      position: lngLat
    };

    const valueJSON = JSON.stringify(state);

    this.props.onChange(valueJSON);
    this.setState(state);
  }

  render() {
    return (
      <div>
        <h3>{this.state.address}</h3>
        <div>
          <SelectLocationMap
            lat={this.state.position.lat}
            lng={this.state.position.lng}
            locationUpdated={this.locationUpdated}
          />
        </div>
      </div>
    );
  }
}
