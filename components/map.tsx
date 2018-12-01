import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const Markers = props => (
  <>
    {props.markers.currentLocation && (
      <Marker position={props.markers.currentLocation} />
    )}
    {props.markers.issues &&
      props.markers.issues.map((issue, index) => (
        <Marker key={index} position={issue.location} />
      ))}
  </>
);

export const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={props.center}
      onClick={c => {
        props.onClick(c.latLng);
      }}
    >
      <Markers markers={props.markers} />
    </GoogleMap>
  ))
);
