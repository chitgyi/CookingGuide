import React, { Component } from "react";
import { Text, View, StatusBar, Button } from "react-native";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import firebase from "react-native-firebase";
export default class Login extends Component {
  state = {};
  async facebookLogin() {
    try {
      await LoginManager.logInWithReadPermissions(["public_profile", "email"]);
      const data = await AccessToken.getCurrentAccessToken();
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      await firebase.auth().signInWithCredential(credential);
    } catch (e) {
      alert("Login failed, try again!" + e.message);
    }
  }
  render() {
    return (
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Text> Login </Text>
        <Button title="Login" onPress={this.facebookLogin} />
      </View>
    );
  }
}
