import React, { Component } from 'react';
import { View, ListView, Image } from 'react-native';

const styles = {
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
