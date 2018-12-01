import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const Markers = props => (
  <>
    <Marker position={props.markers.currentLocation} />
    <Marker position={props.markers.otherLocation} />
  </>
);

export const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>
      <Markers markers={props.markers} />
    </GoogleMap>
  ))
);
