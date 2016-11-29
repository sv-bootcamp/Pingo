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
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          zIndex: 40,
          backgroundColor: 'white',
          opacity: 0.5
        }}
      >
        <ActivityIndicator
          animating={this.props.loadingLoginAnimating}
          style={{
            position: 'absolute',
            top: Dimensions.get('window').height / 2 - 40,
            left: Dimensions.get('window').width / 2 - 40 + 3,
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
  loadingLoginAnimating: PropTypes.bool
};

export default Loading;
