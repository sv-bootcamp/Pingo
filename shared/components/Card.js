import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, ListView, Image, Platform, TouchableOpacity, Dimensions } from 'react-native';
import {Actions} from 'react-native-router-flux';

import IMG_BUTTON_STAR from '../resources/btn_star/drawable-xxxhdpi/btn_star.png';
import IMG_BUTTON_YELLOW_STAR from '../resources/btn_star_yellow/drawable-mdpi/btn_star.png';

const FLEX_MARGIN_ROW = 16;
const FLEX_MARGIN_TEXT_ROW = 8;
const FLEX_LIST_WRAPPER = 120 - 36;
const FLEX_TEXT_WRAPPER = 64;
const FLEX_TEXT_TITLE = 19;
const FLEX_TEXT_ADDRESS = 15;
const FLEX_TEXT_DATE = 14;
const HEIGHT_CARD = 199;
const HEIGHT_CARD_FACILITY = 175;
const WIDTH_CARD = 360;

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: 'white',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7'
  },
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
      numOfImage: 0,
      starClicked: false
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
    this.setState({ date: date });
  }

  renderImg(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={()=>{
        this.props.setCurrentScene('detail');
        this.props.getDetailImage(this.props.dataSource.key);
        Actions.detailView({ rowID: rowID, title: this.props.dataSource.title, lastScene: this.props.currentScene,
                             date: this.state.date, address: this.props.dataSource.address, category: this.props.dataSource.category,
                             lat: this.props.dataSource.lat, lng: this.props.dataSource.lng});
      }}>
        <Image style={styles.CardImage}
             source = {{uri: rowData}}/>
      </TouchableOpacity>
    );
  }
  handlePressStar() {
    if (this.state.starClicked === true) {
      this.setState({starClicked: false});
    } else {
      this.setState({starClicked: true});
    }
    // todo: implement save favourite event here
  }

  renderCardText() {
    return (
      <View style={{
        flex: (this.props.dataSource.category === 'facility') ? FLEX_TEXT_WRAPPER : FLEX_TEXT_WRAPPER + FLEX_MARGIN_ROW,
        flexDirection: 'column'
      }}>
        <View style={{flex: FLEX_TEXT_TITLE + FLEX_MARGIN_TEXT_ROW, flexDirection: 'row'}}>
          <View style={{flex: 4, justifyContent: 'flex-start'}}>
            <Text style={styles.TextTitle}>{this.props.dataSource.title}</Text>
          </View>
          <View style={{flex: 1, position: 'absolute', right: Dimensions.get('window').width * 16 / 360}}>
            <TouchableOpacity
              onPress={this.handlePressStar.bind(this)}>
              <Image
                style={{
                  height: Dimensions.get('window').height * 24 / 640,
                  width: Dimensions.get('window').height * 24 / 640
                }}
                source={(this.state.starClicked === true) ? IMG_BUTTON_YELLOW_STAR : IMG_BUTTON_STAR}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          flex: FLEX_TEXT_ADDRESS + FLEX_MARGIN_TEXT_ROW,
          justifyContent: (this.props.dataSource.category === 'facility') ? 'flex-start' : 'center'}}>
          <Text style={styles.address}>{this.props.dataSource.address}</Text>
        </View>
        { (this.props.dataSource.category === 'facility') ? null :
          <View style={{flex: FLEX_TEXT_DATE + FLEX_MARGIN_TEXT_ROW * 2}}>
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
      <View style={{flex: FLEX_LIST_WRAPPER}}>
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
      <View style={[styles.cardWrapper, {height: (this.props.dataSource.category === 'facility') ? HEIGHT_CARD_FACILITY : HEIGHT_CARD}]}>
        <View style={{flex: FLEX_MARGIN_ROW, backgroundColor: 'white'}}/>
        <View style={{flex: HEIGHT_CARD - FLEX_MARGIN_ROW * 2, backgroundColor: 'white', flexDirection: 'row'}}>
          <View style={{flex: FLEX_MARGIN_ROW}}/>
          <View style={{flex: WIDTH_CARD - FLEX_MARGIN_ROW}}>
            {this.renderCardText()}
            {this.renderListView()}
          </View>
        </View>
        <View style={{flex: FLEX_MARGIN_ROW}}/>
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
