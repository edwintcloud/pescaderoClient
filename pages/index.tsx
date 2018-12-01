import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateAnnouncement } from '../stores/announcement/actions'

import { NavBar, Map } from '../components'

interface IProps {
  announcementMessage: string
  updateAnnouncement: any
}

interface IState {}

class IndexPage extends React.Component<IProps, IState> {
  state = {
    markers: {
      currentLocation: {
        lat: 37.78768,
        lng: -122.41094
      },
      otherLocation: {
        lat: 37.7865,
        lng: -122.41094
      }
    }
  }

  render() {
    
    return (
      <div className="base_container">
        <NavBar />
      <div className="map_container">
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDwrgWKkdd5dT7ftnPaccBM6zgRb5R90g&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div className="map" />}
        containerElement={<div className="map" />}
        mapElement={<div className="map" />}
        zoom={15}
        center={this.state.markers.currentLocation}
        markers={this.state.markers}
      />
      </div>
      <div className="issues_container">
        dsfa
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  announcementMessage: state.announcement.message,
})

const mapDispatchToProps = (dispatch) => ({
  updateAnnouncement: bindActionCreators(updateAnnouncement, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)