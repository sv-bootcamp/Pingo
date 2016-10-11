import { connect } from 'react-redux';
import {setRoute, setNavigator} from '../actions/mapActions';
import First from '../components/first';

const mapStateToProps = () => {
  return {
    // todo: add state here if needed
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoute: (state) => {
      return dispatch(setRoute(state));
    },
    setNavigator: (navigator) => {
      return dispatch(setNavigator(navigator));
    }
  }
};

const FirstLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(First);

export default FirstLayout;