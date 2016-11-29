import React, { PropTypes, Component } from 'react';
import { Text, View, ListView, Image, Platform, TouchableOpacity, Dimensions } from 'react-native';
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

const styles = {
  cardWrapper: {
    backgroundColor: 'white',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
    ...Platform.select({
      android: {
        elevation: 5
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
};

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      numOfImage: 0,
      isSaved: this.props.dataSource.isSaved
    };
    this.renderImg = this.renderImg.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
  }

  componentDidMount() {
    if (this.props.dataSource.category !== 'facility') {
      this.transformTodate();
    }
  }

  transformTodate() {
    let startTime = new Date(this.props.dataSource.startTime);
    let endTime = '';
    if (this.props.dataSource.endTime) {
      endTime = new Date(this.props.dataSource.endTime);
    }
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
        Actions.detailView({ rowID: rowID, lastScene: this.props.currentScene, toggleStar: this.toggleStar,
        date: this.state.date, dataSource: this.props.dataSource, isSaved: this.state.isSaved});
      }}>
        <Image style={styles.CardImage}
             source = {{uri: rowData}}/>
      </TouchableOpacity>
    );
  }
  handlePressStar() {
    if (this.state.isSaved === true) {
      this.setState({isSaved: false});
      this.props.deleteEvent(this.props.dataSource.key);
    } else {
      this.setState({isSaved: true});
      this.props.saveEvent(this.props.dataSource.key);
    }
  }

  toggleStar() {
    this.setState({isSaved: !this.state.isSaved});
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
                source={(this.state.isSaved === true) ? IMG_BUTTON_YELLOW_STAR : IMG_BUTTON_STAR}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          flex: FLEX_TEXT_ADDRESS + FLEX_MARGIN_TEXT_ROW,
          justifyContent: (this.props.dataSource.category === 'facility') ? 'flex-start' : 'center'}}>
          <Text style={styles.address} numberOfLines={1}>{this.props.dataSource.address}</Text>
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
    if (this.props.dataSource && this.props.dataSource.imageUrls) {
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
            removeClippedSubviews={false}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={[
        styles.cardWrapper,
        {height: (this.props.dataSource.category === 'facility') ? HEIGHT_CARD_FACILITY : HEIGHT_CARD},
        (this.props.currentScene === 'map') ? {
          shadowOpacity: 0.15,
          shadowRadius: 2
        } : null
        ]}>
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
  dataSource: PropTypes.objectOf(PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    imageUrls: PropTypes.array,
    key: PropTypes.any,
    isSaved: PropTypes.bool
  })),
  getDetailImage: PropTypes.func,
  currentScene: PropTypes.string,
  setCurrentScene: PropTypes.func,
  saveEvent: PropTypes.func,
  deleteEvent: PropTypes.func
};

export default Card;
