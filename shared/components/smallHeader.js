import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';

import ImgBtnBefore from '../resources/camera/btn_before.png';

const styles = StyleSheet.create({
  header: {
    height: 64,
    width: Dimensions.get('window').width,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    marginBottom: 20
  },
  text_header: {
    fontSize: 17,
    top: 24,
    color: '#2b2b2b',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  btn_before: {
    left: 15,
    top: 24
  },
  btn_done: {
    position: 'absolute',
    right: 15,
    top: 24
  }
});

class SmallHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderBtnLeft() {
    return (
      <TouchableOpacity
        style={styles.btn_before}
        onPress={()=>{
          this.props.handleBtnLeft();
        }}>
        <Image
          style={{height: 24, width: 24}}
          source={ImgBtnBefore}
        />
      </TouchableOpacity>
    );
  }

  renderHeaderTitle() {
    return (
      <Text style={styles.text_header}>{this.props.headerText}</Text>
    );
  }

  renderBtnRight() {
    return (
      <TouchableOpacity
        style={styles.btn_done}
        onPress={()=>{
          this.props.handleBtnRight();
        }}
        activeOpacity={(this.props.Done === true) ? 0.2 : 1}
      >
        {this.props.btnRight}
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[styles.header, {elevation: 3}]}>
        <View style={{flex: 1}}>
          {this.renderBtnLeft()}
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          {this.renderHeaderTitle()}
        </View>
        <View style={{flex: 1}}>
          {this.renderBtnRight()}
        </View>
      </View>
    );
  }
}

SmallHeader.propTypes = {
  Done: PropTypes.any.isRequired,
  addingNewLocation: PropTypes.any.isRequired,
  btnRight: PropTypes.any.isRequired,
  handleBtnLeft: PropTypes.func.isRequired,
  handleBtnRight: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired
};

export default SmallHeader;
