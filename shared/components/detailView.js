import React, { PropTypes, Component } from 'react';
import Swiper from 'react-native-swiper';
import DetailHeaderLayout from '../containers/detailHeaderLayout';
import { View, Image, Text, TouchableHighlight, Platform } from 'react-native';

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
  btn_flag: {
    flex: 38,
    justifyContent: 'center'
  },
  index: {
    fontSize: 14,
    color: '#8e8e8e',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    this.renderDate = this.renderDate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  componentDidMount() {
    this._swiper.scrollBy(this.props.rowID * 1);
  }
  handleClick() {
    this.setState({isClicked: !this.state.isClicked});
  }
  renderPagination(index, total) {
    if (this.state.isClicked) {
      return (<View style ={{flex: 0.3, backgroundColor: 'black'}}/>);
    }
    return (
      <View style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
      }}>
        <View style = {{flex: 32, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight>
            <Image source = {require('../resources/arrow_left/drawable-mdpi/arrow.png')}/>
          </TouchableHighlight>
        </View>
        <View style = {{flex: 296, height: 45, borderTopWidth: 1, borderTopColor: '#e7e7e7'}}>
          <View style = {{ alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text style={styles.index}>
              {index + 1} of {total}
            </Text>
          </View>
        </View>
        <View style = {{flex: 32, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight>
            <Image source = {require('../resources/arrow_right/drawable-mdpi/arrow.png')}/>
          </TouchableHighlight>
        </View>
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
      <Text> {createdTime} </Text>
    );
  }
  render() {
    return (
      <View style = {{ flex: 1, backgroundColor: '#ffffff'}}>
      {
        (this.state.isClicked) ? <View style = {{height: 67, backgroundColor: 'black'}}/> :
          <View style = {{height: 67}}>
            <DetailHeaderLayout title = {this.props.title}
                                date = {this.props.date}
                                lastScene = {this.props.lastScene}/>
          </View>
      }

        <View style = {{flex: 573}}>
          <Swiper ref={(swiper) => {this._swiper = swiper;}}
            showsButtons = {false}
            renderPagination={this.renderPagination}
            height= {549}
            loop = {false}>
              {this.props.detailSource.map((value)=>{
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
                            <Text style = {styles.name}> Name 2</Text>
                          </View>
                          <View style = {{flex: 4}}/>
                          <View style = {{flex: 14}}>
                            {this.renderDate(value.createdDate)}
                          </View>
                          <View style = {{flex: 16}}/>
                        </View>
                        <View style = {styles.btn_flag}>
                          <TouchableHighlight>
                            <Image source = {require('../resources/btn_flag/drawable-mdpi/btn_flag.png')}/>
                          </TouchableHighlight>
                        </View>
                      </View>
                    }
                    <View style={styles.slide}>
                      <TouchableHighlight style = {{flex : 1}}
                                          onPress = {this.handleClick}>
                        <Image source = {{uri: value.url}}
                               style = {{flex: 1}}/>
                      </TouchableHighlight>
                    </View>
                    {(this.state.isClicked) ? <View style = {{flex: 103, backgroundColor: 'black'}}/> :
                    <View style = {{flex: 103, flexDirection : 'row'}}>
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
