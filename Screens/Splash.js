import React, { Component } from "react";
import { Text, View, Image, StatusBar, AsyncStorage } from "react-native";

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem("launched").then(value => {
        if (value === "yes") {
          this.props.navigation.navigate("Loading");
        } else {
            this.props.navigation.navigate("GuideLine");
        }
      });
      
    }, 1500);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "gray" }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Image source={require("../Images/user.png")} />
      </View>
    );
  }
}
