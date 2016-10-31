import React, {
    Component, PropTypes
} from 'react';

import {
    Dimensions,
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    Platform,
    ScrollView,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  preview: {
    height: 104,
    width: 104
  },
  header: {
    height: 64,
    width: Dimensions.get('window').width,
    backgroundColor: "#f8f8f8",
    flexDirection: 'row',
    marginBottom: 20
  },
  text_header: {
    fontSize: 17,
    left: Dimensions.get('window').width / 2 - 70,
    top: 24,
    color: "#2b2b2b",
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  text_done: {
    fontSize: 17,
    color: "#8e8e8e",
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  text_caption: {
    fontSize: 14,
    color: "#8e8e8e",
    left: 12,
    marginBottom: 5,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  btn_before: {
    left: 15,
    top: 24
  },
  btn_done: {
    position: 'absolute',
    right: 15,
    top: 24
  },
  input_text: {
    height: 104,
    width: 216,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    marginLeft: 16
  }
});

class Create extends Component {
    constructor(props) {
      super(props);
      this.state = { text: '' };
    }

  handleBefore() {
    //todo: handle before button here
  }

  handleDone() {
    //todo: handle Done button here
  }

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.btn_before}
            onPress={this.handleBefore.bind(this)}>
            <Image
              style={{height:24, width: 24}}
              source={require('../resources/camera/btn_before.png')}
            />
          </TouchableOpacity>
          <Text style={styles.text_header}>Post Photo</Text>
          <TouchableOpacity
            style={styles.btn_done}
            onPress={this.handleDone.bind(this)}>
            <Text style={styles.text_done}> Done </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          <Text style={styles.text_caption}> Done </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.input_text}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              multiline={true}
            />
            <Image source={{uri: this.props.pic}} style={styles.preview} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

Create.propTypes = {
    location: PropTypes.any,
    setEncPic: PropTypes.func,
    setCurrentScene: PropTypes.func,
    pic: PropTypes.string,
    encpic: PropTypes.string
};

export default Create;
