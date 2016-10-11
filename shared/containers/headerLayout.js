import { connect } from 'react-redux';
import {
  categorizeItems,
  setTabViewIndex,
  onForward,
  setRoute,
  setSceneIndex
} from '../actions/mapActions';
import Headerbox from '../components/headerbox';

const mapStateToProps = (state) => {
  return {
    tabview_index: state.map.tabview_index,
    tabview_routes: state.map.tabview_routes,
    route: state.map.route,
    navigator: state.map.navigator,
    sceneIndex: state.map.sceneIndex
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