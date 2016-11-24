import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';

import ImgBtnBefore from '../resources/camera/btn_before.png';

const DEFAULT_ACTIVE_OPACITY = 0.2;

const styles = {
  header: {
    height: 64,
    width: Dimensions.get('window').width,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    marginBottom: 0,
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowOpacity: 1,
        shadowRadius: 4,
        zIndex: 5
      }
    })
  },
  textHeader: {
    fontSize: 17,
    top: 24,
    color: '#2b2b2b',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      },
      ios: {
        fontWeight: 'bold'
      }
    })
  },
  btnLeft: {
    left: 15,
    top: 24
  },
  btnRight: {
    position: 'absolute',
    right: 15,
    top: 24
  }
};

class SmallHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderBtnLeft() {
    return (
      <TouchableOpacity
        style={styles.btnLeft}
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
      <Text style={styles.textHeader}>{this.props.headerText}</Text>
    );
  }

  renderBtnRight() {
    return (
      <TouchableOpacity
        style={styles.btnRight}
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
      <View style={styles.header}>
        <View style={{flex: 1}}>
          {this.renderBtnLeft()}
        </View>
        <View style={{flex: 3, alignItems: 'center'}}>
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
