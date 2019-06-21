import React, { Component } from "react";
import { View, Text, StatusBar, Alert, Button } from "react-native";
import firebase from "react-native-firebase";
import { ProgressDialog } from "react-native-simple-dialogs";
import { AccessToken, LoginManager } from "react-native-fbsdk";

export default class Home extends Component {
  static navigationOptions = {
    title: "Cooking Guide"
  };

  constructor(props) {
    super(props);
    this.state = { currentUser: null, loading: false };
  }
  componentDidMount() {
   // firebase.auth().currentUser.updateProfile({ displayName: "Chit Gyi" });
    this.setState({
      currentUser: firebase.auth().currentUser
    });
  }

  signOutUser = () => {
    try {
      setTimeout(() => {
        firebase.auth().signOut();
        LoginManager.logOut();
        this.setState({loading: false})
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ProgressDialog
          visible={this.state.loading}
          title="Logouting..."
          message="Please, wait..."
        />
        <Text> Profile {JSON.stringify(this.state.currentUser)+this.state.loading} woo</Text>
        <Button title="Logout" onPress={() => {
          this.setState({loading: true});
          this.signOutUser()
          //this.signOutUser();
          //this.setState({loading: false})
          } 
          }/>
      </View>
    );
  }
}
