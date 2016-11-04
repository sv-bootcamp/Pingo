import React, { Component, PropTypes } from 'react';
import SmallHeader from './smallHeader';
import { Actions } from 'react-native-router-flux';

class Setting extends Component {
  constructor(props) {
    super(props);
  }

  handleButtonPrev() {
    this.props.setCurrentScene('myPage');
    Actions.myPage({type: 'replace'});
  }

  render() {
    return (
      <SmallHeader
        btnRight={null}
        handleBtnLeft={this.handleButtonPrev.bind(this)}
        handleBtnRight={()=>{}}
        headerText='Settings'/>
    );
  }
}

Setting.propTypes = {
  setCurrentScene: PropTypes.func
};

export default Setting;
