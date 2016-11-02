import React, { PropTypes, Component } from 'react';
import Swiper from 'react-native-swiper';
import DetailHeader from './detailHeader';
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

export default class DetailView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._swiper.scrollBy(this.props.rowID * 1);
  }


  render() {
    return (
      <View>
        <View>
          <DetailHeader title = {this.props.title}/>
        </View>
        <View>
          <Swiper style={styles.wrapper} showsButtons ref={(swiper) => {this._swiper = swiper;}} loop = {false}>
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
      </View>
    );
  }
}

DetailView.propTypes = {
  detailSource: PropTypes.any,
  detailIndex: PropTypes.any,
  rowID: PropTypes.any,
  title: PropTypes.any
};
