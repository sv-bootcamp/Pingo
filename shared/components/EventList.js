import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import CardLayout from '../containers/cardLayout';

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  renderRowTxt(rowData) {
    return (
      <CardLayout dataSource = {rowData}/>
    );
  }

  componentDidMount() {
    this.props.getAllItems(this.props.zoomLevel, this.props.currentLocation.latitude,
    this.props.currentLocation.longitude);
  }

  render() {
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
  currentLocation: PropTypes.object,
  zoomLevel: PropTypes.any
};

export default EventList;
