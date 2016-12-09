import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
import PrivacyPolicy from '../components/privacyPolicy';

const mapStateToProps = () => {
  return {
    // TBD
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const PrivacyPolicyLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacyPolicy);

export default PrivacyPolicyLayout;
