import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:7888');
    
  }

  componentDidMount() {
    this.socket.emit('userConnected', 3);
    console.log('emitted');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Behold, your first native application.</Text>
        <Text>Today, mobile development. Tomorrow, the world.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
