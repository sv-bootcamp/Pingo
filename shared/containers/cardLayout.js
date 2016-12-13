import Card from '../components/card';
import { getDetailImage } from '../actions/listActions';
import { saveEvent, deleteEvent, toggleModalVisible, deleteMyphoto } from '../actions/myPageActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentScene: state.flux.currentScene,
    myPageTabViewIndex: state.myPage.myPageTabViewIndex,
    modalVisible: state.myPage.modalVisible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailImage: (key) => {
      return dispatch(getDetailImage(key));
    },
    saveEvent: (eventKey) => {
      return dispatch(saveEvent(eventKey));
    },
    deleteEvent: (eventKey) => {
      return dispatch(deleteEvent(eventKey));
    },
    toggleModalVisible: () => {
      return dispatch(toggleModalVisible());
    },
    deleteMyphoto: (key) => {
      return dispatch(deleteMyphoto(key));
    }
  };
};

const CardLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(Card);

export default CardLayout;
