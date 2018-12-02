import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { mapStyles } from "./mapStyles";

const Markers = props => (
  <>
    {props.markers.currentLocation && (
      <Marker position={props.markers.currentLocation} />
    )}
    {props.markers.issues &&
      props.markers.issues.map((issue, index) => (
        <Marker
          title={issue.title}
          key={index}
          position={issue.location}
          icon={{
            path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            strokeColor: "black",
            fillColor: "red",
            fillOpacity: 0.7,
            strokeWeight: 2,
            scale: 7
          }}
        />
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
      options={{ styles: mapStyles }}
    >
      <Markers markers={props.markers} />
      
    </GoogleMap>
  ))
);
