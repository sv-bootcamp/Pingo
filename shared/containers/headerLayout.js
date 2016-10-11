import { connect } from 'react-redux';
import {updateMarkers, setTabViewIndex} from '../actions/mapActions';
import Headerbox from '../components/headerbox';

const mapStateToProps = (state) => {
    return {
        tabview_index: state.map.tabview_index,
        tabview_routes: state.map.tabview_routes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTabViewIndex: (index) => {
            return dispatch(setTabViewIndex(index));
        },
        updateMarkers: (select) => {
            return dispatch(updateMarkers(select));
        }
    }
};

const HeaderLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(Headerbox);

export default HeaderLayout;