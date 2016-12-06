import React, { Component, PropTypes } from 'react';
import { Dimensions, View, ActivityIndicator } from 'react-native';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.loadingLoginAnimating) {
      return null;
    }
    const height = !this.props.customWrapperHeight ? Dimensions.get('window').height : this.props.customWrapperHeight;
    const width = !this.props.customWrapperWidth ? Dimensions.get('window').width : this.props.customWrapperWidth;
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: height,
          width: width,
          zIndex: 40,
          backgroundColor: 'white',
          opacity: 0.5
        }}
      >
        <ActivityIndicator
          animating={this.props.loadingLoginAnimating}
          style={{
            position: 'absolute',
            top: height / 2 - 40,
            left: width / 2 - 40 + 3,
            height: 80,
            width: 80,
            zIndex: 50
          }}
          size="large"
          color="black"
        />
      </View>
    );
  }
}

Loading.propTypes = {
  loadingLoginAnimating: PropTypes.bool,
  customWrapperHeight: PropTypes.number,
  customWrapperWidth: PropTypes.number
};

export default Loading;
