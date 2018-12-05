import React from "react";

import {
  NavBar,
  Map,
  Issues,
  IssuesModal,
  Landing,
  Login,
  Signup
} from "../components";

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
    currentUser: {
      firstName: "edwin",
      lastName: "cloud",
      avatar: "https://via.placeholder.com/100",
      email: "",
      password: "",
      confirmPassword: "",
      city: ""
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
    currentIssueDescError: false,
    loginOpen: false,
    signupOpen: false,
    signupEmailInvalid: false,
    signupPasswordInvalid: false,
    signupConfirmPasswordInvalid: false,
    cities: [
      {text: "San Francisco, CA (USA)", value: "a3r3sdf"},
      {text: "San Jose, CA (USA)", value: "shos"}
    ]
  };

  componentWillMount() {
    console.log(this.state.currentUser)
  }

  render() {
    // Add marker to map component
    const mapAddMarker = location => {
      console.log(location.lat());
      console.log(location.lng());
      this.setState({ modalOpen: true });
    };

    // Issues NavBar onClick method
    const issuesNavClick = (e, { name }) => {
      this.setState({ issuesNav: name });
    };

    // IssuesModal title and description on change method
    const currentIssueChange = (event, data) => {
      // update current issue state
      this.setState({
        currentIssue: {
          ...this.state.currentIssue,
          [data.name]: data.value
        }
      });
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
      this.setState({ modalOpen: false });
      console.log("close");
    };

    // IssuesModal Submit click
    const modalSubmit = () => {
      this.setState({ modalOpen: false });
    };

    // Landing Login click
    const loadLogin = () => {
      this.setState({ loginOpen: true });
    };

    // Landing SignUp click
    const loadSignup = () => {
      this.setState({ signupOpen: true });
    };

    // Login inputs on change
    const loginInputsChange = (event, data) => {
      // update currentUser state
      this.setState({
        currentUser: {
          ...this.state.currentUser,
          [data.name]: data.value
        }
      });
    };

    // Login on Submit
    const loginSubmit = () => {
      console.log(this.state.currentUser.email);
      console.log(this.state.currentUser.password);
      this.setState({ signupOpen: false });
    };

    // Signup inputs on change
    const signupInputsChange = (event, data) => {
      // update currentUser state
      this.setState({
        currentUser: {
          ...this.state.currentUser,
          [data.name]: data.value
        }
      });

      if (data.name === "email") {
        if (/.+@.+\..+/.test(data.value)) {
          this.setState({ signupEmailInvalid: false });
        } else {
          this.setState({ signupEmailInvalid: true });
        }
      }
      if (data.name === "password") {
        if (data.value.length > 5) {
          this.setState({ signupPasswordInvalid: false });
        } else {
          this.setState({ signupPasswordInvalid: true });
        }
      }
      if (data.name === "confirmPassword") {
        if (data.value === this.state.currentUser.password) {
          this.setState({ signupConfirmPasswordInvalid: false });
        } else {
          this.setState({ signupConfirmPasswordInvalid: true });
        }
      }
    };

    // Signup on Submit
    const signupSubmit = () => {
      console.log(this.state.currentUser.email);
      console.log(this.state.currentUser.password);
      this.setState({ loginOpen: false });
    };

    if (this.state.currentUser) {
      if (this.state.loginOpen) {
        return (
          <Login
            onSubmit={loginSubmit}
            passwordValue={this.state.currentUser.password}
            emailValue={this.state.currentUser.email}
            inputsChange={loginInputsChange}
          />
        );
      } else if (this.state.signupOpen) {
        return (
          <Signup
            onSubmit={signupSubmit}
            passwordValue={this.state.currentUser.password}
            emailValue={this.state.currentUser.email}
            inputsChange={signupInputsChange}
            emailInvalid={this.state.signupEmailInvalid}
            passwordInvalid={this.state.signupPasswordInvalid}
            confirmPasswordInvalid={this.state.signupConfirmPasswordInvalid}
            firstNameValue={this.state.currentUser.firstName}
            lastNameValue={this.state.currentUser.lastName}
            confirmPasswordValue={this.state.currentUser.confirmPassword}
            cityOptions={this.state.cities}
          />
        );
      } else {
        return (
          <Landing
            title="Project Pescadero"
            subtitle="Changing the world, one small act of kindness at a time."
            loginClick={loadLogin}
            signupClick={loadSignup}
          />
        );
      }
    } else {
      return (
        <div className="base_container">
          <NavBar user={this.state.currentUser} />
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
              user={this.state.currentUser}
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
}

export default IndexPage;
