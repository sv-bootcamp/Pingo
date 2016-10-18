import { connect } from 'react-redux';
import { categorizeItems, setTabViewIndex } from '../actions/mapActions';
import Headerbox from '../components/headerbox';

const mapStateToProps = (state) => {
  return {
    tabview_index: state.map.tabview_index,
    tabview_routes: state.map.tabview_routes,
    currentScene: state.flux.currentScene
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTabViewIndex: (index) => {
      return dispatch(setTabViewIndex(index));
    },
    categorizeItems: (select) => {
      return dispatch(categorizeItems(select));
    }
  };
};

const HeaderLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Headerbox);

export default HeaderLayout;
