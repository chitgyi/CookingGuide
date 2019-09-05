import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
export default class About extends Component {
  static navigationOptions = {
    title: "About Developer"
  };
  state = {};
  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text>
          This application is created by ALERT TEAM from TU(Meiktila). You can
          contact us with email (chityeaung.tu@gmail.com) or phone (09974376772)
          and you can suggest us needs of our applicaiton.
        </Text>
      </View>
    );
  }
}
