import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
import Setting from '../components/Setting';

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const SettingLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

export default SettingLayout;
