import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, ListView, Image } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    height: 199
  },
  title: {
    width: 360,
    height: 19,
    margin: 8,
    fontSize: 19
  },
  address: {
    width: 360,
    height: 14,
    fontSize: 14
  },
  term: {
    width: 360,
    height: 14
  },
  thumb: {
    width: 88,
    height: 88,
    margin: 4
  }
});

class Card extends Component {

  constructor(props) {
    super(props);
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
    }
    else if (startHours > 12) {
      startMid = 'pm';
      startHours %= 12;
    }
    let endMid = 'am';
    if (endHours === 0) {
      endHours = 12;
    }
    else if (endHours > 12) {
      endMid = 'pm';
      endHours %= 12;
    }
    return (
      <Text>
        {monthNames[startMonth]}.{startDate}-
        {monthNames[endMonth]}.{endDate},
        {startHours}:{startMinutes}{startMid}~
        {endHours}:{endMinutes}{endMid}
      </Text>
    );
  }

  renderImg(rowData) {
    return (
      <Image style = {{width: 50, height: 50}}
             source = {{uri: rowData}}/>
    )
  }

  render() {
    if (this.props.cardVisible) {
      return (
		    <View style={styles.wrapper}>
			    <Text style={styles.title}>{this.props.dataSource.title}</Text>
			    <Text style={styles.address}>{this.props.dataSource.address}</Text>
          {this.transformTodate()}

        <ListView
          dataSource={new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
          }).cloneWithRows(this.props.dataSource.imageUrls)}
          renderRow={this.renderImg}
          horizontal={true}/>
        </View>
      );
    }
    return (
      <View/>
    );
  }
}

Card.propTypes = {
  cardVisible: PropTypes.bool,
  address: PropTypes.string,
  title: PropTypes.string,
  dataSource: PropTypes.objectOf(PropTypes.shape({
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  title: PropTypes.string,
    address: PropTypes.string,
    imageUrls: PropTypes.array
  }))
};

export default Card;
