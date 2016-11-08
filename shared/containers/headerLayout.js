import { connect } from 'react-redux';
import { categorizeItems, setTabViewIndex, showListCard, hideMapCard } from '../actions/mapActions';
import { setCurrentScene } from '../actions/fluxActions';
import MainHeader from '../components/MainHeader';

const mapStateToProps = (state) => {
  return {
    tabviewIndex: state.map.tabviewIndex,
    tabviewRoutes: state.map.tabviewRoutes,
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
)(MainHeader);

export default HeaderLayout;
