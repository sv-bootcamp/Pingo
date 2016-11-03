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

const DEFAULT_ACTIVE_OPACITY = 0.2;

const styles = StyleSheet.create({
  header: {
    height: 64,
    width: Dimensions.get('window').width,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    marginBottom: 0
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
  btn_left: {
    left: 15,
    top: 24
  },
  btn_right: {
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
        style={styles.btn_left}
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
        style={styles.btn_right}
        onPress={()=>{
          this.props.handleBtnRight();
        }}
        activeOpacity={this.props.activeOpacity || DEFAULT_ACTIVE_OPACITY}
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
  btnRight: PropTypes.any.isRequired,
  handleBtnLeft: PropTypes.func.isRequired,
  handleBtnRight: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  activeOpacity: PropTypes.any
};

export default SmallHeader;
