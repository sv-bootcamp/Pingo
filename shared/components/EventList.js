import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import Card from './Card';

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  renderRowTxt(rowData) {
    return (
      <Card title = {rowData.title}
            address = {rowData.address}/>
    );
  }

  componentDidMount() {
    this.props.getAllItems();
  }

  render() {
    return (
    <ListView
      dataSource={this.props.dataSource}
      renderRow={this.renderRowTxt}
      enableEmptySections={true} />
    );
  }
}

EventList.propTypes = {
  getAllItems: PropTypes.any,
  dataSource: PropTypes.any,
  actions: PropTypes.any,
  getItems: PropTypes.any
};

export default EventList;
