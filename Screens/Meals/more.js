import React, { Component } from "react";
import { View, Text, Icon } from "native-base";

export default class More extends Component {
  render() {
    return (
      <View style={{ justifyContent: "center", backgroundColor: "green" }}>
        <Icon name="arrow-forward" />
      </View>
    );
  }
}
