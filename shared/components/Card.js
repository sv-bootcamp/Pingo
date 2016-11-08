import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, ListView, Image, Platform, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    height: 199,
    borderBottomWidth: 1,
    borderColor: '#e7e7e7'
  },
  title: {
    marginLeft: 16,
    marginTop: 16,
    height: 19,
    fontSize: 19,
    fontWeight: 'bold',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  address: {
    marginTop: 8,
    marginLeft: 16,
    height: 14,
    fontSize: 14,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  term: {
    marginTop: 9,
    marginLeft: 16,
    height: 14,
    fontSize: 14,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  listWrapper: {
    marginLeft: 16,
    height: 119
  },
  image: {
    marginTop: 15,
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
        <Image style={styles.image}
             source = {{uri: rowData}}/>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title} hi>{this.props.dataSource.title}</Text>
        <Text style={styles.address}>{this.props.dataSource.address}</Text>
        { (this.props.dataSource.category === 'facility') ? null : <Text style={styles.term}> {this.state.date} </Text>}
        <View style={styles.listWrapper}>
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
