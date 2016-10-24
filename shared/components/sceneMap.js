import React, {PropTypes, Component} from 'react';
import MapLayout from '../containers/mapLayout';

export default class SceneMap extends Component {
  componentDidMount() {
    this.props.setCurrentScene('map');
  }

  render() {
    return (
      <MapLayout/>
    );
  }
}

SceneMap.propTypes = {
  setCurrentScene: PropTypes.func
};
