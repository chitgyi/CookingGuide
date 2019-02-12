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
    firebase
      .database()
      .ref("posts/" + firebase.auth().currentUser.uid)
      .push({
        postTitle: "Rose is set of Loving...",
        postPhoto:
          "https://cdn.pixabay.com/photo/2018/03/02/08/47/rose-3192610_960_720.png",
        postCond: -1,
        startedAt: firebase.database.ServerValue.TIMESTAMP
      });
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
