import React, { PropTypes, Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Image } from 'react-native';

const styles = {
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    flex: 1
  }
};

export default class detailView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Swiper style={styles.wrapper} showsButtons>
          {this.props.detailSource.map((value)=>{
            return (
              <View style={styles.slide}>
                <Image source = {{uri: value.url}}
                       style = {styles.image}/>
              </View>
            );
          })}
        </Swiper>
      </View>
    );
  }
}

detailView.propTypes = {
  detailSource: PropTypes.any
};
