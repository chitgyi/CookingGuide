import React, { Component } from "react";
import {
  View,
  Button,
  ToastAndroid,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { Text, Textarea } from "native-base";
import firebase from "react-native-firebase";
import { Dialog } from "react-native-simple-dialogs";
export default class MealItem extends Component {
  static navigationOptions = {
    title: "Feedback"
  };
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      loading: false
    };
  }
  _sendFeedback = () => {
    this.setState({ loading: true });
    firebase
      .database()
      .ref("Feedback")
      .push({
        feedback: this.state.feedback,
        uid: firebase.auth().currentUser.uid
      })
      .then(res => {
        this.setState({ loading: false });
        ToastAndroid.show("Feedbacked successfully!", 2000);
        this._goBack();
      });
  };

  _goBack = () => {
    this.props.navigation.pop();
  };
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", padding: 7 }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Dialog visible={this.state.loading}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,.7)"
          />
          <View style={{ flexDirection: "row", padding: 10 }}>
            <ActivityIndicator size="large" color="red" />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "#000", fontSize: 14 }}>Sending...</Text>
            </View>
          </View>
        </Dialog>
        <Textarea
          rowSpan={8}
          bordered
          placeholder="Feedback"
          onChangeText={value => {
            this.setState({ feedback: value });
          }}
          style={{ marginBottom: 7 }}
        />

        <Button
          title="Send Feedback"
          onPress={() => {
            if (
              this.state.feedback.length > 10 &&
              this.state.feedback.length < 200
            ) {
              this._sendFeedback();
            } else {
              ToastAndroid.show(
                "Please enter between 10 and 200 characters!",
                2000
              );
            }
          }}
        />
      </View>
    );
  }
}
