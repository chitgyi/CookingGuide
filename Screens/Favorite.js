import React, { Component } from "react";
import { View, Text, StatusBar, Alert } from "react-native";

export default class Favorite extends Component {
  static navigationOptions = {
    title: "Cooking Guide"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Text> Favorite </Text>
      </View>
    );
  }
}
