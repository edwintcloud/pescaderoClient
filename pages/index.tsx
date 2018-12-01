import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateAnnouncement } from "../stores/announcement/actions";

import { NavBar, Map, Issues } from "../components";

const GOOGLE_MAPS_API_KEY = "AIzaSyDDwrgWKkdd5dT7ftnPaccBM6zgRb5R90g"

interface IProps {
  announcementMessage: string;
  updateAnnouncement: any;
}

interface IState {}

class IndexPage extends React.Component<IProps, IState> {
  state = {
    markers: {
      currentLocation: {
        lat: 37.78768,
        lng: -122.41094
      },
      issues: [
        {
          location: {
            lat: 37.7865,
            lng: -122.41094
          }
        }
      ]
    },
    issues: [
      {
        title: "A test Issue",
        description: "description",
        author: {
          firstName: "edwin"
        },
        city: {
          city: "San Francisco",
          state: "CA",
          country: "USA"
        },
        location: {
          lat: "",
          lng: ""
        },
        resolved: "false"
      }
    ],
    issuesNav: "all"
  };

  render() {
    // Add marker to map component
    const mapAddMarker = location => {
      console.log(location.lat());
      console.log(location.lng());
    };

    // Issues NavBar onClick method
    const issuesNavClick = (e, { name }) => {
      this.setState({ issuesNav: name });
    };

    return (
      <div className="base_container">
        <NavBar name={this.state.issues[0].author.firstName} />
        <div className="map_container">
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div className="map" />}
            containerElement={<div className="map" />}
            mapElement={<div className="map" />}
            zoom={15}
            center={this.state.markers.currentLocation}
            markers={this.state.markers}
            onClick={mapAddMarker}
          />
        </div>
        <div className="issues_container">
          <Issues
            issues={this.state.issues}
            activeNav={this.state.issuesNav}
            navOnClick={issuesNavClick}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  announcementMessage: state.announcement.message
});

const mapDispatchToProps = dispatch => ({
  updateAnnouncement: bindActionCreators(updateAnnouncement, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
