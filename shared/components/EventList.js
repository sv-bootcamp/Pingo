import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import Card from './Card';

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  renderRowTxt(rowData) {
    return (
      <Card dataSource = {rowData}
            cardVisible = {this.props.cardVisible}/>
    );
  }

  componentDidMount() {
    this.props.getAllItems();
  }

  render() {
    console.log("LIST in!!!");
    return (
    <ListView
      dataSource={new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.props.dataSource)}
      renderRow={this.renderRowTxt.bind(this)}
      enableEmptySections={true} />
    );
  }
}

EventList.propTypes = {
  getAllItems: PropTypes.any,
  dataSource: PropTypes.any,
  actions: PropTypes.any,
  getItems: PropTypes.any,
  cardVisible: PropTypes.any
};

export default EventList;
