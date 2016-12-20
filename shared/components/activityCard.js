import React, { Component, PropTypes } from 'react';
import { Text, View, ListView, Image, Platform, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';
import IMG_BUTTON_RED_FLAG from '../resources/activity/btn_flag.png';
import IMG_BUTTON_EDIT from '../resources/activity/btn_edit.png';
import IMG_BUTTON_MORE from '../resources/activity/btn_more.png';

const styles = {
  address: {
    fontSize: 14,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  option: {
    fontSize: 14,
    color: '#828282',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  TextTitle: {
    fontSize: 19,
    color: '#2b2b2b',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      },
      ios: {
        fontWeight: 'bold'
      }
    })
  }
};


export default class ActivityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
    this.renderActivityCard = this.renderActivityCard.bind(this);
    this.transformTodate = this.transformTodate.bind(this);
    this.renderActivityInfo = this.renderActivityInfo.bind(this);
    this.renderEventOption = this.renderEventOption.bind(this);
  }

  componentWillMount() {
    this.setState({date: this.transformTodate(this.props.dataSource)});
  }
  renderActivityInfo(rowData) {
    return (
      <View style = {{flex: 107, flexDirection: 'row'}}>
        <View style = {{flex: 16}}/>
        <View style = {{flex: 344}}>
          <View style={{flex: 19, justifyContent: 'flex-start'}}>
            <Text style = {styles.TextTitle}>{rowData.title}</Text>
          </View>
          <View style={{flex: 8}}/>
          <View style={{
            flex: 14,
            justifyContent: 'center'}}>
            <Text numberOfLines={1}
                  style={styles.address}>{rowData.address}</Text>
          </View>
          <View style={{flex: 8}}/>
          <View style={{flex: 14}}>
            <Text>{this.transformTodate(rowData)}</Text>
          </View>
          <View style={{flex: 8}}/>
          { (rowData.category === 'event') &&
              <View style = {{flex: 14}}>
                <Text style = {{flex: 14}}>Created by me</Text>
              </View>
          }
          <View style={{flex: 8}}/>
        </View>
      </View>
    );
  }

  renderActivityCard(rowData) {
    return (
      <View style = {{height: 490.5, borderBottomColor: '#e7e7e7', borderBottomWidth: 1}}>
        <View style = {{flexDirection: 'row', flex: 1}}>
          <View style = {{flex: 344}}>
            <View style = {{flex: 32}}/>
            {this.renderActivityInfo(rowData)}
            {(rowData.category === 'event') && this.renderEventOption()}
            <View style = {{flex: 176, flexDirection: 'row'}}>
              <View style = {{flex: 16}}/>
              <View style = {{flex: 344}}>
                <ListView
                  dataSource={new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                  }).cloneWithRows(rowData.images)}
                  renderRow={this.renderImg.bind(this)}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  horizontal={true}
                  removeClippedSubviews={false}
                />
              </View>
            </View>
            {this.renderPhotoOption()}
          </View>
        </View>
      </View>
    );
  }

  renderImg(rowData) {
    return (
      <TouchableOpacity onPress={()=>{
        this.props.setCurrentScene('detail');
        this.props.getDetailImage(this.props.dataSource.key)
        .then(json => json.findIndex((image) => (image.key === rowData.imageKey)))
        .then((index) => {
          Actions.detailView({
            rowID: index + 1,
            lastScene: 'myPage',
            toggleStar: ()=>{},
            date: this.state.date,
            dataSource: this.props.dataSource,
            isSaved: false
          });
        })
        .catch(console.log)
      }}>
        <Image style={{width: 328, height: 176, marginRight: 8}}
               source = {{uri: rowData.imageUrl}}/>
      </TouchableOpacity>
    );
  }

  renderPhotoOption() {
    return (
      <View style = {{flex: 64, flexDirection: 'row', backgroundColor: '#FCFCFC'}}>
        <View style = {{flex: 16}}/>
        <View style = {{flex: 344}}>
          <View style = {{flex: 1}}/>
          <View style = {{flex: 3, flexDirection: 'row'}}>
            <View style = {{flex: 24}}>
              <Image source = {IMG_BUTTON_RED_FLAG} style = {{width: 24, height: 24}}/>
            </View>
            <View style = {{flex: 10}}/>
            <View style = {{flex: 328}}>
              <View style = {{flex: 1 }}>
                <Text style = {styles.option}>Photo Reported</Text>
              </View>
              <View style = {{flex: 1}}/>
              <View style = {{flex: 0.5}}/>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderEventOption() {
    return (
      <View style = {{flex: 111, backgroundColor: '#FCFCFC', flexDirection: 'row'}}>
        <View style = {{flex: 16}}/>
        <View style = {{flex: 344}}>
          <View style = {{flex: 16}}/>
          <View style = {{flex: 24, flexDirection: 'row'}}>
            <View style = {{flex: 24}}>
              <Image source = {IMG_BUTTON_EDIT} style = {{width: 24, height: 24}}/>
            </View>
            <View style = {{flex: 8}}/>
            <View style = {{flex: 272}}>
              <Text style = {styles.option}>Edit Suggestion</Text>
            </View>
            <View style = {{flex: 24}}>
              <Image source = {IMG_BUTTON_MORE} style = {{width: 24, height: 24}}/>
            </View>
            <View style = {{flex: 16}}/>
          </View>
          <View style = {{flex: 16}}/>
          <View style = {{flex: 22, flexDirection: 'row'}}>
            <View style = {{flex: 24}}>
              <Image source = {IMG_BUTTON_RED_FLAG} style = {{width: 24, height: 24}}/>
            </View>
            <View style = {{flex: 8}}/>
            <View style = {{flex: 312}}>
              <View style = {{flex: 1 }}>
                <Text style = {styles.option}>Event Reported</Text>
              </View>
            </View>
          </View>
          <View style = {{flex: 8}}/>
          <View style = {{flex: 14}}/>
          <View style = {{flex: 16}}/>
        </View>
      </View>
    );
  }

  transformTodate(rowData) {
    let startTime = new Date(rowData.startTime);
    let endTime = '';
    if (rowData.endTime) {
      endTime = new Date(rowData.endTime);
    }
    let date = '';
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    let meridiem = 'am';
    let hour = startTime.getHours();
    if (hour === 0) {
      hour = 12;
    } else if (hour === 12) {
      meridiem = 'pm';
    } else if (hour > 12) {
      hour %= 12;
      meridiem = 'pm';
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    let minute = startTime.getMinutes();
    if (minute === 0) {
      minute = '00';
    } else if (minute < 10) {
      minute = '0' + minute;
    }
    date += monthNames[startTime.getMonth()] + '. ' + startTime.getDate() + ', ';
    date += hour + ':' + minute + meridiem + ' - ';
    if (endTime) {
      meridiem = 'am';
      hour = endTime.getHours();
      if (hour === 0) {
        hour = 12;
      } else if (hour === 12) {
        meridiem = 'pm';
      } else if (hour > 12) {
        hour %= 12;
        meridiem = 'pm';
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      minute = endTime.getMinutes();
      if (minute === 0) {
        minute = '00';
      } else if (minute < 10) {
        minute = '0' + minute;
      }
      date += hour + ':' + minute + meridiem;
    } else {
      date += '?';
    }
    return date;
  }

  render() {
    return (
      <View>
        {this.renderActivityCard(this.props.dataSource)}
      </View>
    );
  }
}

ActivityCard.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    imageUrls: PropTypes.array,
    key: PropTypes.any,
    isSaved: PropTypes.bool
  })),
  setCurrentScene: PropTypes.func,
  getDetailImage: PropTypes.func
};
