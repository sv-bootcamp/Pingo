import Loading from '../components/loading';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    loadingLoginAnimating: state.user.loadingLoginAnimating
  };
};

const mapDispatchToProps = () => {
  return {
    // TBD
  };
};

const LoadingLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);

export default LoadingLayout;
