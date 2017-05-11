import React from 'react';
import { connect } from 'react-redux';

import { fetchMapIndex } from "../../redux/reducer";

class MapView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchMapIndex());
  }

  render() {
    return (
      <h1>MapView!</h1>
    );
  }
}

// map redux store props to component props
const mapStateToProps = (state) => { 
  return { 
    mapData: state.mapData,
  } 
}

// add dispatch to props
const mapDispatchToProps = (dispatch) => { return { dispatch } };

export default connect(mapStateToProps, mapDispatchToProps)(MapView);