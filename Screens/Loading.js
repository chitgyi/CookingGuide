import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import firebase from "react-native-firebase";

export default class Loading extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Taps" : "Login");
    });
  }
  render() {
    return (
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Text> Loading </Text>
      </View>
    );
  }
}
