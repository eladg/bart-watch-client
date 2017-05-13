import React from 'react';
import { connect } from 'react-redux';
import MapThree from "../../MapThree/mapThree";

import { fetchMapIndex, setMapThree } from "../../redux/reducer";

class MapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mapThreeLoaded: false,
    }
  }

  componentDidMount() {
    const domElement = document.getElementById("map");
    
    const options = {
      rootElement: domElement,
    }

    let mapThree = new MapThree({
      rootElement: options.rootElement,
    });
 
    this.props.dispatch(setMapThree(mapThree));
    this.props.dispatch(fetchMapIndex());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mapThree == null && nextProps.mapThree !== null) {
      this.setState({
        mapThreeLoaded: true,
      });
    }
  }

  mapStyle() {
    return {
      "width": "100%",
      "display": "table",
      "margin": "0",
      "maxWidth": "1080px",
      "backgroundColor": "#373B44",
      "height": "100vh",
    }
  }

  render() {


    if (this.state.mapThreeLoaded) {
      this.props.mapThree.load();
      this.props.mapThree.animate();
    }

    return (
      <div id="map" style={ this.mapStyle() } ></div>
    );
  }
}

// map redux store props to component props
const mapStateToProps = (state) => { 
  return { 
    mapThree: state.mapThree,
  } 
}

// add dispatch to props
const mapDispatchToProps = (dispatch) => { return { dispatch } };

export default connect(mapStateToProps, mapDispatchToProps)(MapView);