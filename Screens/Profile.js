import React, { Component } from "react";
import { View, Text, StatusBar, Alert, Button } from "react-native";
import firebase from "react-native-firebase";
import { LoginManager, AccessToken } from "react-native-fbsdk";

export default class Home extends Component {
  static navigationOptions = {
    title: "Cooking Guide"
  };
  state = { currentUser: null };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState({
      currentUser: firebase.auth().currentUser
    });
  }
  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      await LoginManager.logOut();
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Text> Profile {JSON.stringify(this.state.currentUser)} woo</Text>
        <Button title="Logout" onPress={this.signOutUser} />
      </View>
    );
  }
}
