import React, {PropTypes, Component} from 'react';
import ListLayout from '../containers/listLayout';

export default class SceneList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListLayout />
    );
  }
}

SceneList.propTypes = {
  route: PropTypes.any,
  navigator: PropTypes.any,
  setRoute: PropTypes.func,
  setNavigator: PropTypes.func
};
