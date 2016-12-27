import React, { PropTypes, Component } from 'react';
import { Text, View, ListView, Image, Platform, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import {Actions} from 'react-native-router-flux';
import IMG_BUTTON_STAR from '../resources/btn_star/drawable-xxxhdpi/btn_star.png';
import IMG_BUTTON_YELLOW_STAR from '../resources/btn_star_yellow/drawable-mdpi/btn_star.png';
import { transformTodate } from '../utils';

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
      isSaved: this.props.dataSource.isSaved,
      menuVisible: false
    };
    this.renderImg = this.renderImg.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modalVisible === false) {
      this.setState({menuVisible: false});
    }
  }

  componentDidMount() {
    if (this.props.dataSource.category !== 'facility') {
      this.setState({date: transformTodate(this.props.dataSource)};
    }
  }

  renderImg(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={()=>{
        this.props.setCurrentScene('detail');
        this.props.getDetailImage(this.props.dataSource.key);
        Actions.detailView({ rowID: (rowID * 1) + 1, lastScene: this.props.currentScene, toggleStar: this.toggleStar,
          date: this.state.date, dataSource: this.props.dataSource, isSaved: this.state.isSaved});
      }}>
        <Image style={styles.CardImage}
               source={{uri: rowData}}/>
      </TouchableOpacity>
    );
  }

  handlePressStar() { // it will deleted another pr. please ignore this function!
    if (this.state.isSaved === true) {
      if (this.props.currentScene !== 'myPage') {
        this.setState({isSaved: false});
      }
      this.props.deleteEvent(this.props.dataSource.key);
    } else {
      if (this.props.currentScene !== 'myPage') {
        this.setState({isSaved: true});
      }
      this.props.saveEvent(this.props.dataSource.key);
    }
  }

  toggleStar() {
    this.setState({isSaved: !this.state.isSaved});
  }

  renderMenu() {
    return (
      <View
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width * 144.1 / 360,
          height: Dimensions.get('window').height * 96.6 / 640,
          zIndex: 100,
          top: Dimensions.get('window').height * 17 / 640,
          right: Dimensions.get('window').width * 5.6 / 360,
          backgroundColor: '#FAFAFA'
        }}
      >
        <TouchableOpacity style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 18.7}}/>
            <View style={{flex: 205.5, justifyContent: 'center'}}>
              <Text> Edit detail </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}}
                          onPress={() => {
                            this.props.toggleModalVisible();
                            this.props.deleteMyphoto(this.props.dataSource.key);
                          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 18.7}}/>
            <View style={{flex: 205.5, justifyContent: 'center'}}>
              <Text> Delete my photo </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  renderModal() {
    return (
      <TouchableOpacity style={{
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        opacity: 1,
        zIndex: 60,
        borderBottomWidth: 1}}
        onPress={()=> {
          this.props.toggleModalVisible();
        }}
      >
        {(this.state.menuVisible) ? this.renderMenu() : <View/> }
      </TouchableOpacity>
    );
  }
  renderCardText() {
    let wrapperFlex = (this.props.dataSource.category === 'facility') ? FLEX_TEXT_WRAPPER : FLEX_TEXT_WRAPPER + FLEX_MARGIN_ROW;
    return (
      <View style={{
        flex: wrapperFlex,
        flexDirection: 'column'
      }}>
        <View style={{flex: FLEX_TEXT_TITLE + FLEX_MARGIN_TEXT_ROW, flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={()=>{
            this.props.setCurrentScene('detail');
            this.props.getDetailImage(this.props.dataSource.key);
            Actions.detailView({ rowID: 0, lastScene: this.props.currentScene, toggleStar: this.toggleStar,
              date: this.state.date, dataSource: this.props.dataSource, isSaved: this.state.isSaved});
          }}>
            <View style={{flex: 4, justifyContent: 'flex-start'}}>
              <Text style={styles.TextTitle}>{this.props.dataSource.title}</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{position: 'absolute', right: Dimensions.get('window').width * 16 / 360}}>
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
          <View style={{flex: FLEX_TEXT_DATE + FLEX_MARGIN_TEXT_ROW}}>
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
          removeClippedSubviews={false}
        />
      </View>
    );
  }

  render() {
    let cardHeight = (this.props.dataSource.category === 'facility') ? HEIGHT_CARD_FACILITY : HEIGHT_CARD;
    return (
      <View style={[
        styles.cardWrapper,
        this.props.style,
        {height: cardHeight}
      ]}>
        { this.props.modalVisible && this.renderModal() }
        <View style={{flex: FLEX_MARGIN_ROW}}/>
        <View style={{flex: HEIGHT_CARD - FLEX_MARGIN_ROW * 2, flexDirection: 'row'}}>
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
  deleteEvent: PropTypes.func,
  style: PropTypes.object,
  deleteMyphoto: PropTypes.func,
  toggleModalVisible: PropTypes.func,
  modalVisible: PropTypes.bool
};

export default Card;
