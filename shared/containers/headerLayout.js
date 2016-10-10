import { connect } from 'react-redux';
import {update_markers} from '../actions/mapActions';
import Headerbox from '../components/headerbox';

const mapStateToProps = () => {
    return {
        //TBD
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        update_markers: (select) => {
            return dispatch(update_markers(select));
        }
    };
};

const HeaderLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(Headerbox);

export default HeaderLayout;
