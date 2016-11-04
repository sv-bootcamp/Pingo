import React, { PropTypes, Component } from 'react';
import Swiper from 'react-native-swiper';
import DetailHeaderLayout from '../containers/detailHeaderLayout';
import { View, Image, Text } from 'react-native';

const styles = {
  wrapper: {
    height: 461
  },

  slide: {
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  caption: {
    height: 38
  },

  image: {
    width: 360,
    height: 360
  },

  index: {
    fontSize: 14,
    height: 14,
    color: '#8e8e8e',
    marginTop: 14,
    marginBottom: 17,
    marginLeft: 162
  }
};

const renderPagination = (index, total) => {
  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      height: 45,
      width: 360,
      borderBottomWidth: 1,
      borderColor: '#e7e7e7'
    }}>
      <Text style={styles.index}>
        {index + 1} of {total}
      </Text>
    </View>
  );
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
          <DetailHeaderLayout title = {this.props.title}
                              date = {this.props.date}
                              lastScene = {this.props.lastScene}/>
        </View>
        <View style={styles.wrapper}>
          <Swiper height = {508} ref={(swiper) => {this._swiper = swiper;}}
            showsButtons = {false}
            renderPagination={renderPagination}
            paginationStyle={{
              bottom: 0,
              position: 'absolute'
            }} loop = {false}>

            {this.props.detailSource.map((value)=>{
              return (
                <View style={styles.slide}>
                  <Image style = {styles.image}
                         source = {{uri: value.url}}/>
                       <Text style = {styles.caption}> { value.caption }</Text>
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
  title: PropTypes.any,
  date: PropTypes.string,
  lastScene: PropTypes.string
};
