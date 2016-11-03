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
    this.renderImg = this.renderImg.bind(this);
  }

  transformTodate() {
    let startTime = new Date(this.props.dataSource.startTime);
    let endTime = new Date(this.props.dataSource.endTime);
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    let startMonth = startTime.getMonth();
    let startDate = startTime.getDate();
    let startHours = startTime.getHours();
    let startMinutes = startTime.getMinutes();
    let endMonth = endTime.getMonth();
    let endDate = endTime.getDate();
    let endHours = endTime.getHours();
    let endMinutes = endTime.getMinutes();
    let startMid = 'am';
    if (startHours === 0) {
      startHours = 12;
    } else if (startHours > 12) {
      startMid = 'pm';
      startHours = startHours % 12;
    }
    let endMid = 'am';
    if (endHours === 0) {
      endHours = 12;
    } else if (endHours > 12) {
      endMid = 'pm';
      endHours = endHours % 12;
    }
    return (
      <Text style={styles.term}>
        {monthNames[startMonth]}. {startDate}-{(endMonth === startMonth) ? '' : monthNames[endMonth] + '. '}
        {endDate}, {startHours}:{startMinutes}{startMid} - {endHours}:{endMinutes}{endMid}
      </Text>
    );
  }

  renderImg(rowData, sectionID, rowID) {

    return (
      <TouchableOpacity onPress={()=>{
        console.log(rowID);
        this.props.getDetailImage(this.props.dataSource.key, rowID);
        Actions.detailView({ rowID: rowID, title: this.props.dataSource.title, date: this.props.dataSource.startTime});
      }}>
        <Image style={styles.image}
             source = {{uri: rowData}}/>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>{this.props.dataSource.title}</Text>
        <Text style={styles.address}>{this.props.dataSource.address}</Text>
        { (this.props.dataSource.category === 'facility') ? null : this.transformTodate() }
        <View style={styles.listWrapper}>
          <ListView
            dataSource={new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            }).cloneWithRows(this.props.dataSource.imageUrls)}
            renderRow={(rowData, sectionID, rowID) => this.renderImg(rowData, sectionID, rowID)}
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
  getDetailImage: PropTypes.function
};

export default Card;
