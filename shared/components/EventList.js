import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, ListView } from 'react-native';
const styles = StyleSheet.create({
  row: {
    flex: 1,
    fontSize: 24,
    padding: 42,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  }
});


class EventList extends Component {
  constructor(props) {
    super(props);
  }

  renderRowTxt(rowData) {
    return <Text style={styles.row}>{rowData.title}</Text>;
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
