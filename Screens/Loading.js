import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import firebase from "react-native-firebase";

export default class Loading extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // alert(user.emailVerified);
        if (user.providerData[0].providerId === "facebook.com") {
          //ToastAndroid.show("You are using fb acc.", 2000);
          this.props.navigation.navigate("Home");
        } else {
          if (user.emailVerified) {
            this.props.navigation.navigate("Home");
          } else if(user.photoURL){
            this.props.navigation.navigate("Login");
          }
        }
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }
  render() {
    return (
      <View
        style={{ alignContent: "center", justifyContent: "center", flex: 1 }}
      >
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
