import { connect } from 'react-redux';
import { categorizeItems, setTabViewIndex, showListCard, hideMapCard } from '../actions/mapActions';
import { setCurrentScene } from '../actions/fluxActions';
import Headerbox from '../components/headerbox';

const mapStateToProps = (state) => {
  return {
    tabview_index: state.map.tabview_index,
    tabview_routes: state.map.tabview_routes,
    currentScene: state.flux.currentScene,
    selectedItem: state.map.selectedItem
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTabViewIndex: (index) => {
      return dispatch(setTabViewIndex(index));
    },
    categorizeItems: (select) => {
      return dispatch(categorizeItems(select));
    },
    showListCard: () => {
      return dispatch(showListCard());
    },
    hideMapCard: () => {
      return dispatch(hideMapCard());
    },
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const HeaderLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Headerbox);

export default HeaderLayout;
