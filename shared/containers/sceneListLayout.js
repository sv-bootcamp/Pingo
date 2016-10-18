import { connect } from 'react-redux';
import {setCurrentScene} from '../actions/fluxActions';
import SceneList from '../components/sceneList';

const mapStateToProps = () => {
    return {
        // todo: add state here if needed
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentScene: (currentScene) => {
            return dispatch(setCurrentScene(currentScene));
        }
    };
};

const SceneListLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(SceneList);

export default SceneListLayout;
