import React from "react";
import { Loader } from "semantic-ui-react";
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
const API_HOST = "http://localhost:5000";

interface IProps {}

interface IState {}

class IndexPage extends React.Component<IProps, IState> {
  state = {
    currentLocation: {
      lat: 37.78768,
      lng: -122.41094
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
      { text: "San Francisco, CA (USA)", value: "a3r3sdf" },
      { text: "San Jose, CA (USA)", value: "shos" }
    ],
    loading: true,
    loadingError: "",
    selectedIssue: "",
    messageVisible: true,
    loginError: ""
  };

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    }
  };

  async componentDidMount() {
    this.getCurrentLocation();
    // initialize state
    this.setState({ loading: true });
    this.setState({ loadingError: "" });
    this.setState({ cities: [] });
    this.setState({ issues: [] });
    this.setState({ currentUser: {} });

    // fetch data from api and update state
    try {
      const citiesRes = await fetch(`${API_HOST}/api/cities`);
      const issuesRes = await fetch(`${API_HOST}/api/issues`);
      const currentUserRes = await fetch(`${API_HOST}/api/users/current`, {
        credentials: "include"
      });
      if (!citiesRes.ok || !issuesRes.ok || !currentUserRes.ok) {
        throw new Error();
      }
      const citiesData = await citiesRes.json();
      const issuesData = await issuesRes.json();
      const currentUser = await currentUserRes.json();
      citiesData.map(i => {
        this.setState({
          cities: [
            ...this.state.cities,
            {
              text: `${i.name}, ${i.state} (${i.country})`,
              value: i._id
            }
          ]
        });
      });
      this.setState({ issues: issuesData });
      this.setState({
        openIssues: issuesData.filter(i => i.resolved === "false").length
      });
      this.setState({
        resolvedIssues: issuesData.filter(i => i.resolved === "true").length
      });
      this.setState({ currentUser: currentUser });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ loading: false });
      this.setState({
        loadingError:
          "Website is currently undergoing maintenance. Please check back later!"
      });
    }
  }

  render() {
    // Add marker to map component
    const mapAddMarker = event => {
      const location = {
        lat: String(event.lat()),
        lng: String(event.lng())
      };
      this.setState({
        currentIssue: {
          location: location,
          author: this.state.currentUser._id,
          city: this.state.currentUser.city
        },
        modalOpen: true,
        modalTitle: "New Issue",
        selectedIssue: "",
        messageVisible: false
      });
    };

    // Issues NavBar onClick method
    const issuesNavClick = (e, { name }) => {
      this.setState({
        issuesNav: name,
        selectedIssue: ""
      });
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
    };

    // IssuesModal Submit click
    const modalSubmit = () => {
      console.log(this.state.currentIssue);
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
          [data.name]: data.value,
          loginError: ""
        }
      });
    };

    // Login on Submit
    const loginSubmit = async () => {
      try {
        const loginRes = await fetch(`${API_HOST}/api/users/login`, {
          method: "POST",
          body: JSON.stringify(this.state.currentUser),
          credentials: "include"
        });
        if (!loginRes.ok) {
          throw new Error();
        }
        const loginResData = await loginRes.json();
        if (loginResData.hasOwnProperty("error")) {
          this.setState({ loginError: loginResData.error });
          return;
        }
        const currentUserRes = await fetch(`${API_HOST}/api/users/current`, {
          credentials: "include"
        });
        if (!currentUserRes.ok) {
          throw new Error();
        }
        const currentUserResData = await currentUserRes.json();
        this.setState({ currentUser: currentUserResData });
      } catch (e) {
        console.log(e);
      }
      this.setState({ loginOpen: false, loginError: "" });
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
      this.setState({ signupOpen: false });
    };

    // Logout button on click
    const logoutUser = async () => {
      try {
        const logoutUserRes = await fetch(`${API_HOST}/api/users/logout`, {
          method: "POST",
          credentials: "include"
        });

        if (!logoutUserRes.ok) {
          throw new Error();
        }
        const currentUserRes = await fetch(`${API_HOST}/api/users/current`, {
          credentials: "include"
        });
        if (!currentUserRes.ok) {
          throw new Error();
        }
        this.setState({ currentUser: await currentUserRes.json() });
      } catch (e) {
        console.log(e);
      }
    };

    // Marker on click
    const markerClick = (event, data) => {
      if (data == undefined) {
        const location = {
          lat: String(event.latLng.lat()),
          lng: String(event.latLng.lng())
        };
        this.setState({
          currentIssue: {
            location: location,
            author: this.state.currentUser._id,
            city: this.state.currentUser.city
          },
          modalOpen: true,
          modalTitle: "New Issue",
          selectedIssue: ""
        });
      } else {
        this.setState({
          currentIssue: {
            ...data,
            author: data.author._id,
            city: data.author.city
          },
          modalOpen: true,
          modalTitle: "Edit Issue",
          selectedIssue: data._id
        });
      }
    };

    // Issues edit button on click
    const issuesEditClick = data => {
      this.setState({
        currentIssue: {
          ...data,
          author: data.author._id,
          city: data.author.city
        },
        modalOpen: true,
        modalTitle: "Edit Issue",
        selectedIssue: ""
      });
    };

    // Issues card on click
    const issuesCardClick = data => {
      this.setState({ selectedIssue: data._id });
    };

    // Dismiss Message action
    const dismissMessage = () => {
      this.setState({ messageVisible: false });
    };

    // Render page conditionally
    if (this.state.loading) {
      return (
        <div className="landing_container">
          <Loader active inline="centered" />
          <p style={{ marginTop: "10px" }}>Loading please wait...</p>
        </div>
      );
    } else if (this.state.loadingError && !this.state.loading) {
      return (
        <div className="landing_container">
          <h1 style={{ color: "red" }}>{this.state.loadingError}</h1>
        </div>
      );
    } else if (!this.state.currentUser.hasOwnProperty("_id")) {
      if (this.state.loginOpen) {
        return (
          <Login
            onSubmit={loginSubmit}
            passwordValue={this.state.currentUser.password}
            emailValue={this.state.currentUser.email}
            inputsChange={loginInputsChange}
            loginError={this.state.loginError}
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
          <NavBar
            user={this.state.currentUser}
            logoutClick={logoutUser}
            dismissMessage={dismissMessage}
            messageVisible={this.state.messageVisible}
          />
          <div className="map_container">
            {navigator.onLine && (
              <Map
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div className="map" />}
                containerElement={<div className="map" />}
                mapElement={<div className="map" />}
                zoom={15}
                center={this.state.currentLocation}
                currentLocation={this.state.currentLocation}
                issues={
                  (this.state.issuesNav == "all" && this.state.issues) ||
                  (this.state.issuesNav == "open" &&
                    this.state.issues.filter(i => i.resolved === "false")) ||
                  (this.state.issuesNav == "resolved" &&
                    this.state.issues.filter(i => i.resolved === "true"))
                }
                onClick={mapAddMarker}
                markerClick={markerClick}
                selectedIssue={this.state.selectedIssue}
              />
            )}
          </div>
          <div className="issues_container">
            <Issues
              issues={
                (this.state.issuesNav == "all" && this.state.issues) ||
                (this.state.issuesNav == "open" &&
                  this.state.issues.filter(i => i.resolved === "false")) ||
                (this.state.issuesNav == "resolved" &&
                  this.state.issues.filter(i => i.resolved === "true"))
              }
              activeNav={this.state.issuesNav}
              navOnClick={issuesNavClick}
              openIssues={this.state.openIssues}
              resolvedIssues={this.state.resolvedIssues}
              user={this.state.currentUser}
              editClick={issuesEditClick}
              cardClick={issuesCardClick}
            />
          </div>
          <div className="issues_modal">
            <IssuesModal
              open={this.state.modalOpen}
              title={this.state.modalTitle}
              currentIssue={this.state.currentIssue}
              user={this.state.currentUser}
              issueTitleValueChange={currentIssueChange}
              issueTitleValueError={this.state.currentIssueTitleError}
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
