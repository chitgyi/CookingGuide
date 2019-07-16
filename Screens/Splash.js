import React, { Component } from "react";
import { Text, View, Image, StatusBar, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"

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
      <View
        style={{
          flex: 1,
          backgroundColor: "#07b8e2",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#07b8e2" />
        <Icon name="restaurant-menu" size={60} color="#fff" />
        <Text style={{fontSize: 18, color: "#fff"}}>Cooking Guide</Text>
      </View>
    );
  }
}
