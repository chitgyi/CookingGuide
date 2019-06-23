import React, { Component } from "react";
import { Text, View, StatusBar, ActivityIndicator } from "react-native";
import firebase from "react-native-firebase";


export default class Loading extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate( user ? "Home" : "Login");
    });
  }
  render() {
    return (
      <View style={{alignContent: "center", justifyContent: 'center', flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ActivityIndicator size="large"/>
      </View>
    );
  }
}
