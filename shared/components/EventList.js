import React, { Component, PropTypes } from 'react';
import { ListView, View, Dimensions, Platform } from 'react-native';
import CardLayout from '../containers/cardLayout';
import MapButton from './MapButton';
import { Actions } from 'react-native-router-flux';

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

  handleCameraButton() {
    this.props.setCurrentScene('camera');
    Actions.cameraView({lastScene: 'list'});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
          }).cloneWithRows(this.props.dataSource)}
          renderRow={this.renderRowTxt.bind(this)}
          removeClippedSubviews={false}
          enableEmptySections={true} />
        <MapButton
          handleOnPress={this.handleCameraButton.bind(this)}
          imageSource={'camera'}
          style={Platform.OS === 'android' ? {
            position: 'absolute', zIndex: 10, elevation: 4,
            bottom: Dimensions.get('window').width * 16 / 360,
            right: Dimensions.get('window').width * 16 / 360
          } : {
            position: 'absolute', zIndex: 10,
            bottom: Dimensions.get('window').width * 16 / 360,
            right: Dimensions.get('window').width * 16 / 360
          }}
        />
      </View>
    );
  }
}

EventList.propTypes = {
  getAllItems: PropTypes.any,
  dataSource: PropTypes.any,
  actions: PropTypes.any,
  getItems: PropTypes.any,
  currentLocation: PropTypes.object,
  zoomLevel: PropTypes.any,
  setCurrentScene: PropTypes.func
};

export default EventList;
