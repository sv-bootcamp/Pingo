import React, {PropTypes, Component} from 'react';
import ListLayout from '../containers/listLayout';

export default class SceneList extends Component {
  componentDidMount () {
    this.props.setCurrentScene('list');
  }

  render() {
    console.log("ListLayout");
    return (
      <ListLayout />
    );
  }
}

SceneList.propTypes = {
  setCurrentScene: PropTypes.func
};
