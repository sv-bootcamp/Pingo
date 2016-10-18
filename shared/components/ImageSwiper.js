import React, { Component } from 'react';
import { View, ListView, Image } from 'react-native';

const styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  thumb: {
   width: 88,
   height: 88,
   margin: 8
  }
};
export default class ImageSwiper extends Component {
  render() {
    return (
      <View>
        <ListView
          horizontal = {true}
          dataSource={new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          }).cloneWithRows([
              require('../../static/images/empty_star.png'),
              require('../../static/images/yellow_star.png'),
              require('../../static/images/yellow_star.png'),
              require('../../static/images/yellow_star.png'),
              require('../../static/images/empty_star.png')
            ])
          }
          renderRow={(rowData)=><Image style = {styles.thumb} source = {rowData}/>}
          enableEmptySections={true} />
      </View>
    );
  }
}
