import React, { Component } from "react";
import { View, Text, StatusBar, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class Home extends Component {
  static navigationOptions = {
    title: "Cooking Guide",
    headerRight: (
      <Icon
        name="ios-send"
        size={25}
        color="#000"
        style={{ height: 25, width: 25, marginRight: 10 }}
        onPress={() => {
          Alert.alert("You tapped the button!");
        }}
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Text> Home </Text>
      </View>
    );
  }
}
