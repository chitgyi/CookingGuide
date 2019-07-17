import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";

export default class Categories extends Component {
  static navigationOptions = {
      title: "Cooking Guide",
  };
  render() {
    return (
        <View>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Text> Categories5 </Text>
      </View>
    );
  }
}
