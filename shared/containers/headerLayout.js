import { connect } from 'react-redux';
import { categorizeItems, setTabViewIndex } from '../actions/mapActions';
import { setRoute, setSceneIndex, onForward } from '../actions/navigatorActions';
import Headerbox from '../components/headerbox';

const mapStateToProps = (state) => {
  return {
    tabview_index: state.map.tabview_index,
    tabview_routes: state.map.tabview_routes,
    route: state.navigator.route,
    navigator: state.navigator.navigator,
    sceneIndex: state.navigator.sceneIndex
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
    onForward: (index, navigator) => {
      return dispatch(onForward(index, navigator));
    },
    setRoute: (route) => {
      return dispatch(setRoute(route));
    },
    setSceneIndex: (sceneIndex) => {
      return dispatch(setSceneIndex(sceneIndex));
    }
  }
};

const HeaderLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(Headerbox);

export default HeaderLayout;