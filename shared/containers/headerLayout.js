import { connect } from 'react-redux';
import {update_markers_A, update_markers_B, update_markers_C} from '../actions/mapActions';
import Headerbox from '../components/headerbox';

const mapStateToProps = () => {
    return {
        //TBD
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        update_markers_A: () => {
            return dispatch(update_markers_A());
        },
        update_markers_B: () => {
            return dispatch(update_markers_B());
        },
        update_markers_C: () => {
            return dispatch(update_markers_C());
        }
    };
};

const HeaderLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(Headerbox);

export default HeaderLayout;
