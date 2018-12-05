import React from "react";

import { NavBar, Map, Issues, IssuesModal } from "../components";

const GOOGLE_MAPS_API_KEY = "AIzaSyDDwrgWKkdd5dT7ftnPaccBM6zgRb5R90g";

interface IProps {}

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
          firstName: "jigga",
          avatar:
            "https://www.iucn.org/sites/dev/files/styles/flexslider_full/public/import/img/masked_treefrog_slider_new_7_02.jpg?itok=OVeSCj3-"
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
      },
      {
        title: "A test Issue",
        description: "description",
        author: {
          firstName: "jamba",
          avatar:
            "https://i.kinja-img.com/gawker-media/image/upload/s---omb_B63--/18j431ggtl72djpg.jpg"
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
      },
      {
        title: "A test Issue",
        description: "description",
        author: {
          firstName: "joow",
          avatar:
            "https://static.comicvine.com/uploads/original/14/145204/2957109-2806578080-The_A.jpg"
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
      },
      {
        title: "A test Issue",
        description: "description",
        author: {
          firstName: "edwin",
          avatar: "https://via.placeholder.com/100"
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
    user: {
      firstName: "edwin",
      avatar: "https://via.placeholder.com/100"
    },
    issuesNav: "all",
    openIssues: 22,
    resolvedIssues: 12,
    currentIssue: {
      title: "A test Issue",
      description: "description",
      author: {
        firstName: "edwin",
        avatar: "https://via.placeholder.com/100"
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
    },
    modalOpen: false,
    modalTitle: "Edit Issue",
    currentIssueTitleError: false,
    currentIssueDescError: false
  };

  render() {
    // Add marker to map component
    const mapAddMarker = location => {
      console.log(location.lat());
      console.log(location.lng());
      this.setState({modalOpen:true});
    };

    // Issues NavBar onClick method
    const issuesNavClick = (e, { name }) => {
      this.setState({ issuesNav: name });
    };

    // IssuesModal title and description on change method
    const currentIssueChange = (event, data) => {
      // update current issue state
      this.setState(prevState => ({
        currentIssue: {
          ...prevState.currentIssue,
          [data.name]: data.value
        }
      }));
      if (data.name === "description") {
        if (data.value.length < 5) {
          this.setState({ currentIssueDescError: true });
        } else {
          this.setState({ currentIssueDescError: false });
        }
      } else {
        if (data.value.length < 5) {
          this.setState({ currentIssueTitleError: true });
        } else {
          this.setState({ currentIssueTitleError: false });
        }
      }
    };

    // IssuesModal Close click
    const modalClose = () => {
      this.setState({modalOpen:false});
      console.log("close")
    };

    // IssuesModal Submit click
    const modalSubmit = () => {
      this.setState({modalOpen:false});
    }

    return (
      <div className="base_container">
        <NavBar user={this.state.user} />
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
            openIssues={this.state.openIssues}
            resolvedIssues={this.state.resolvedIssues}
            user={this.state.user}
          />
        </div>
        <div className="issues_modal">
          <IssuesModal
            open={this.state.modalOpen}
            title={this.state.modalTitle}
            issueTitleValue={this.state.currentIssue.title}
            issueTitleValueChange={currentIssueChange}
            issueTitleValueError={this.state.currentIssueTitleError}
            issueDescValue={this.state.currentIssue.description}
            issueDescValueChange={currentIssueChange}
            issueDescValueError={this.state.currentIssueDescError}
            cancelClick={modalClose}
            submitClick={modalSubmit}
          />
        </div>
      </div>
    );
  }
}

export default IndexPage;
