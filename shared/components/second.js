import React, {PropTypes, Component} from 'react';
import ListLayout from '../containers/listLayout';

export default class Second extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //this.props.setRoute(this.props.route);
    //this.props.setNavigator(this.props.navigator);
    return (
      <ListLayout />
    );
  }
}

Second.propTypes = {
  route: PropTypes.any,
  navigator: PropTypes.any,
  setRoute: PropTypes.func,
  setNavigator: PropTypes.func
};
