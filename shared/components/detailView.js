import React, { PropTypes, Component } from 'react';
import Swiper from 'react-native-swiper';
import DetailHeaderLayout from '../containers/detailHeaderLayout';
import DetailLitemap from './detailLitemap';
import { View, Image, Text, Modal, TouchableOpacity, Platform, TouchableHighlight } from 'react-native';
import IMG_BUTTON_LEFT from '../resources/arrow_left/drawable-xxxhdpi/arrow.png';
import IMG_BUTTON_RIGHT from '../resources/arrow_right/drawable-xxxhdpi/arrow.png';
import IMG_BUTTON_FLAG from '../resources/btn_flag/drawable-xxxhdpi/btn_flag.png';
import {Actions} from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';

const styles = {
  wrapper: {
    flexDirection: 'column'
  },

  slide: {
    flex: 360,
    justifyContent: 'center'
  },

  caption: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    }),
    fontSize: 14
  },
  name: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    }),
    fontSize: 14,
    fontWeight: 'bold'
  },
  btnFlag: {
    flex: 38,
    justifyContent: 'center'
  },
  index: {
    fontSize: 14,
    color: '#8e8e8e',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thanksMessage: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    }),
    color: '#ffffff',
    fontSize: 14
  },
  date: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      },
      ios: {
        fontWeight: 'bold'
      }
    }),
    fontSize: 14,
    fontWeight: 'normal'
  }
};

export default class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      modalVisible: false,
      photoRepored: false,
      locationReported: false,
      messageVisible: false,
      currentReport: '',
      data: []
    };
    this.renderDate = this.renderDate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.toggleModalVisible = this.toggleModalVisible.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.messageUnvisible = this.messageUnvisible.bind(this);
    this.renderSlide = this.renderSlide.bind(this);
    this.renderInfoSlide = this.renderInfoSlide.bind(this);
    this.firstTry = true;
    this.currentIndex = 0;
  }

  toggleModalVisible() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  messageUnvisible() {
    if (this.state.messageVisible === true) {
      this.setState({messageVisible: false});
    }
  }

  handleReport(value) {
    (value === 'photo') ? this.setState({photoRepored: true})
    : this.setState({locationReported: true});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.firstTry) {
      this.swiper.scrollBy(prevProps.rowID * 1 + 1, false);
      this.currentIndex = this.props.rowID * 1 + 1;
      this.firstTry = false;
    }
    (prevState.isClicked) ? this.swiper.scrollBy(this.currentIndex, false) : this.swiper.scrollBy(this.currentIndex - 1, false);
  }

  handleClick(i) {
    this.setState({isClicked: !this.state.isClicked});
    this.currentIndex = i + 1;
  }

  handleMessage(value) {
    this.handleReport(value);
    this.setState({messageVisible: true});
    this.toggleModalVisible();
    TimerMixin.setTimeout(()=> {
      if (this.state.modalVisible === true) {
        this.toggleModalVisible();
      }
    }, 3000);
  }

  renderPagination(index, total) {
    if (this.currentIndex !== index) {
      this.currentIndex = index;
    }
    if (this.state.isClicked) {
      return (<View style ={{flex: 0.3, backgroundColor: 'black'}}/>);
    }
    return (
      <View style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
      }}>
        <View style = {{flex: 16}}/>
        <View style = {{flex: 328, height: 45, borderTopWidth: 1, borderTopColor: '#e7e7e7', flexDirection: 'row'}}>
        {
          (index > 0) ?
          <View style = {{flex: 16, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => {
              if (index > 0) {
                this.swiper.scrollBy(-1);
              }
            }}>
              <Image source = {IMG_BUTTON_LEFT}
                     style = {{height: 16, width: 16}}/>
            </TouchableOpacity>
          </View>
          : <View style = {{flex: 32}}/>
        }
          <View style = {{alignItems: 'center', flex: 296, justifyContent: 'center'}}>
            <Text style = {styles.index}>
              {index} of {total - 1}
            </Text>
          </View>
        {
          (index + 1 < total) ?
          <View style = {{flex: 16, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => {
              if (index + 1 < total) {
                this.swiper.scrollBy(1);
              }
            }}>
              <Image source = {IMG_BUTTON_RIGHT}
                     style = {{height: 16, width: 16}}/>
            </TouchableOpacity>
          </View>
          : <View style = {{flex: 32}}/>
        }
        </View>
        <View style = {{flex: 16}}/>
      </View>
    );
  }

  renderModal() {
    if (this.state.isClicked) {
      return (
        <View style = {{flex: 1, backgroundColor: 'black'}}/>
      )
    }
    return (
        <View style = {{flex: 1}}>
          <Modal
            animationType={(this.state.messageVisible) ? 'slide' : 'fade'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
            >
            <TouchableOpacity style = {{flex: 17}}
                              onPress = {() => this.toggleModalVisible()}/>
            <View style = {{flex: 96.6, flexDirection: 'row'}}>
              <TouchableOpacity style = {{flex: 210.2}}
                                onPress = {() => this.toggleModalVisible()}/>
              {
                (this.state.messageVisible) ?
                <TouchableOpacity style = {{flex: 114.1}}
                                  onPress = {() => this.toggleModalVisible()}/> :
              <View style = {{flex: 114.1, backgroundColor: '#fafafa', elevation: 4}}>
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress = {() => {
                    this.toggleModalVisible();
                    this.setState({currentReport: 'location'});
                    Actions.eventReportView({aboutPhoto: false, handleReport: this.handleMessage,
                      key: this.props.detailSource[this.currentIndex].key});
                  }}>
                  <Text> Report an Issue</Text>
                  </TouchableOpacity>
                </View>
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <Text> Suggest an Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            </View>
            <TouchableOpacity style = {{flex: 481.4}}
                              onPress = {() => this.toggleModalVisible()}/>
            {
              (this.state.messageVisible) ?
              <View style = {{flex: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e', flexDirection: 'row'}}>
                <View style = {{flex: 22.1}}/>
                <View style = {{flex: 337.9}}>
                  <Text style = {styles.thanksMessage}> Thank you for reporting an issue with this {this.state.currentReport}. </Text>
                </View>
              </View> :
              <TouchableOpacity style = {{flex: 45}}
                                onPress = {() => this.toggleModalVisible()}/>
            }
          </Modal>
        </View>
    );
  }
  renderInfoSlide() {
    let currentLocation = {
      latitude: this.props.dataSource.lat,
      longitude: this.props.dataSource.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    return (
      <View style = {{flexDirection: 'row', flex: 1}}>
        <View style = {{flex: 16}}/>
        <View style = {{flex: 328}}>
          <View style = {{flex: 64}}/>
          <View style = {{flex: 80}}>
            <Text style = {{fontSize: 40, fontWeight: 'bold'}}> {this.props.dataSource.title } </Text>
          </View>
          <View style = {{flex: 24}}/>
          <View style = {{flex: 100, backgroundColor: 'green', borderRadius: 5}}>
            <DetailLitemap currentLocation = {currentLocation}
                           category = {this.props.dataSource.category}/>
          </View>
          <View style = {{flex: 26}}/>
          <View style = {{flex: 17}}>
            <Text style = {{fontSize: 17}}> {this.props.dataSource.address} </Text>
          </View>
          <View style = {{flex: 9}}/>
          <View style = {{flex: 26}}>
            <Text style = {{fontSize: 17}}> {this.props.date} </Text>
          </View>
          <View style = {{flex: 94}}/>
          <View style = {{flex: 40, flexDirection: 'row'}}>
            <View style = {{flex: 32, backgroundColor: 'blue', borderRadius: 3}}/>
            <View style = {{flex: 7}}/>
            <View style = {{flex: 305, justifyContent: 'center'}}>
              <View style = {{flex: 14}}>
                <Text style = {styles.name}>Name</Text>
              </View>
              <View style = {{flex: 4}}/>
              <View style = {{flex: 14}}>
                {(this.props.detailSource.length !== 0) ? this.renderDate(this.props.detailSource[0].createdDate) : null }
              </View>
            </View>
          </View>
          <View style = {{flex: 110}}/>
        </View>
        <View style = {{flex: 16}}/>
      </View>
    );
  }

  renderSlide(value, i) {
    return (
      <View style = {{flex: 1}}>
        {
          (this.state.isClicked) ? <View style = {{flex: 68, backgroundColor: 'black'}}/> :
          <View style = {{flex: 68, flexDirection: 'row'}}>
            <View style = {{flex: 16}}/>
            <View style = {{flex: 32}}/>
            <View style = {{flex: 274}}>
              <View style = {{flex: 16}}/>
              <View style = {{flex: 14}}>
                <Text style = {styles.name}> Name </Text>
              </View>
              <View style = {{flex: 4}}/>
              <View style = {{flex: 14}}>
                {this.renderDate(value.createdDate)}
              </View>
              <View style = {{flex: 16}}/>
            </View>
            <View style = {styles.btnFlag}>
              <TouchableOpacity onPress = {()=>{
                this.setState({currentReport: 'photo'});
                Actions.eventReportView({aboutPhoto: true, handleReport: this.handleMessage});
              }}>
                <Image source = {IMG_BUTTON_FLAG}
                       style = {{height: 24, width: 24}}/>
              </TouchableOpacity>
            </View>
          </View>
        }
        <View style={styles.slide}>
          <TouchableHighlight style = {{flex: 1}}
                              onPress = {()=>this.handleClick(i)}>
            <Image source = {{uri: value.url}}
                   style = {{flex: 1}}/>
          </TouchableHighlight>
        </View>
        {(this.state.isClicked) ? <View style = {{flex: 103, backgroundColor: 'black'}}/> :
        <View style = {{flex: 103, flexDirection: 'row'}}>
          <View style = {{flex: 16}}/>
          <View style = {{flex: 328}}>
            <View style = {{flex: 15}}/>
            <View style = {{flex: 86}}>
              <Text style = {styles.caption}> { value.caption } </Text>
            </View>
          </View>
          <View style = {{flex: 16}}/>
        </View>
        }
      </View>
    );
  }

  renderDate(date) {
    const day = 86400000;
    const hour = 3600000;
    const minute = 60000;
    let gap = new Date() - new Date(date);
    let createdTime = '';
    (gap / day >= 1) ? createdTime += Math.ceil(gap / day) + ' days ago' :
    (gap / hour >= 1) ? createdTime += Math.ceil(gap / hour) + ' hours ago' :
    (gap / minute >= 1) ? createdTime += Math.ceil(gap / minute) + ' minutes ago' :
    createdTime += 'right now';
    return (
      <Text style = {styles.date}>{createdTime}</Text>
    );
  }

  render() {
    let pages = [];
    if (!this.state.isClicked) {
      pages.push(this.renderInfoSlide(this.props.detailSource[0]));
    }
    for (let i = 0; i < this.props.detailSource.length; i = i + 1) {
      pages.push(this.renderSlide(this.props.detailSource[i], i));
    }
    return (
      <View style = {{ flex: 1, backgroundColor: 'black'}}>
      {
        (this.state.isClicked) ? <View style = {{height: 67, backgroundColor: 'black'}}/> :
          <View style = {{height: 67}}>
            <DetailHeaderLayout title = {this.props.dataSource.title}
                                itemKey = {this.props.dataSource.key}
                                date = {this.props.date}
                                lastScene = {this.props.lastScene}
                                setModalVisible = {this.toggleModalVisible}
                                messageUnvisible = {this.messageUnvisible}
                                isSaved = {this.props.isSaved}/>
          </View>
      }
        <View style = {{flex: 573, backgroundColor: '#ffffff'}}>
          {this.renderModal()}
          <Swiper ref={(swiper) => {
            this.swiper = swiper;
          }}
            showsButtons = {false}
            renderPagination={this.renderPagination}
            height= {549}
            loop = {false}>
              {pages}
          </Swiper>
        </View>
      </View>
    );
  }
}

DetailView.propTypes = {
  detailSource: PropTypes.any,
  rowID: PropTypes.any,
  date: PropTypes.string,
  lastScene: PropTypes.string,
  dataSource: PropTypes.objectOf(PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    imageUrls: PropTypes.array,
    key: PropTypes.any
  })),
  isSaved: PropTypes.bool
};
