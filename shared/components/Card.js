import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, ListView, Image, Platform, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  TextTitle: {
    fontSize: 19,
    color: '#2b2b2b',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  address: {
    fontSize: 14,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  term: {
    fontSize: 14,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  CardImage: {
    width: 88,
    height: 88,
    marginRight: 8
  }
});

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      numOfImage: 0
    };
    this.renderImg = this.renderImg.bind(this);
  }

  componentDidMount() {
    if (this.props.dataSource.category !== 'facility') {
      this.transformTodate();
    }
  }

  transformTodate() {
    let startTime = new Date(this.props.dataSource.startTime);
    let endTime = new Date(this.props.dataSource.endTime);
    let date = '';
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    date += monthNames[startTime.getMonth()] + '. ' + startTime.getDate() + ', ';
    (startTime.getHours() === 0) ? date += '12:' + startTime.getMinutes() + 'am' :
    (startTime.getHours() > 12) ? date += startTime.getHours() % 12 + ':' + startTime.getMinutes() + 'pm' :
    date += startTime.getHours() + ':' + startTime.getMinutes() + 'am';
    date += ' - ';
    if (endTime) {
      date += monthNames[endTime.getMonth()] + '. ' + endTime.getDate() + ', ';
      (endTime.getHours() === 0) ? date += '12:' + endTime.getMinutes() + 'am' :
      (endTime.getHours() > 12) ? date += endTime.getHours() % 12 + ':' + endTime.getMinutes() + 'pm' :
      date += endTime.getHours() + ':' + endTime.getMinutes() + 'am';
    } else {
      date += '?';
    }
    this.setState({ date : date });
  }

  renderImg(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={()=>{
        this.props.setCurrentScene('detail');
        this.props.getDetailImage(this.props.dataSource.key);
        Actions.detailView({ rowID: rowID, title: this.props.dataSource.title, lastScene: this.props.currentScene, date: this.state.date});
      }}>
        <Image style={styles.CardImage}
             source = {{uri: rowData}}/>
      </TouchableOpacity>
    );
  }

  renderCardText() {
    return (
      <View style={{
        flex: (this.props.dataSource.category === 'facility') ? 64 : 64 + 16,
        backgroundColor: 'white',
        flexDirection: 'column'
      }}>
        <View style={{flex: 19 + 8, justifyContent: 'flex-start'}}>
          <Text style={styles.TextTitle}>{this.props.dataSource.title}</Text>
        </View>
        <View style={{flex: 15 + 8, justifyContent: (this.props.dataSource.category === 'facility') ? 'flex-start' : 'center'}}>
          <Text style={styles.address}>{this.props.dataSource.address}</Text>
        </View>
        { (this.props.dataSource.category === 'facility') ? null :
          <View style={{flex: 14 + 16}}>
            <Text style={styles.term}>
              {this.state.date}
            </Text>
          </View>
        }
      </View>
    );
  }

  renderListView() {
    return (
      <View style={{flex: 120 - 36}}>
        <ListView
          dataSource={new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          }).cloneWithRows(this.props.dataSource.imageUrls)}
          renderRow={this.renderImg.bind(this)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={true}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{height: (this.props.dataSource.category === 'facility') ? 199 - 24 : 199, flexDirection: 'column'}}>
        <View style={{flex: 16, backgroundColor: 'white'}}/>
        <View style={{flex: 199 - 32, backgroundColor: 'white', flexDirection: 'row'}}>
          <View style={{flex: 16}}/>
          <View style={{flex: 360 - 16}}>
            {this.renderCardText()}
            {this.renderListView()}
          </View>
        </View>
        <View style={{flex: 16}}/>
      </View>
    );
  }
}

Card.propTypes = {
  address: PropTypes.string,
  title: PropTypes.string,
  dataSource: PropTypes.objectOf(PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    imageUrls: PropTypes.array
  })),
  getDetailImage: PropTypes.function,
  currentScene: PropTypes.string,
  setCurrentScene: PropTypes.function
};

export default Card;
