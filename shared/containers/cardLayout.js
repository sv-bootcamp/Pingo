import Card from '../components/Card';
import { getDetailImage } from '../actions/listActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailImage: (key, index) => {
      return dispatch(getDetailImage(key, index));
    }
  };
};

const CardLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(Card);

export default CardLayout;
