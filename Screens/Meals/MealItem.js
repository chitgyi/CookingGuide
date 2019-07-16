import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Card, CardItem, Text } from "native-base";

export default class MealItem extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <Card style={{ width: 180 }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigator.navigate("ViewPost", {
              details: "data"
            })
          }
        >
          <CardItem cardBody bordered>
            <Image
              source={{ uri: this.props.data.post.url }}
              resizeMode="contain"
              resizeMethod="resize"
              style={{ width: 180, height: 150 }}
            />
          </CardItem>
          <CardItem footer>
            <Text style={{ fontSize: 12 }}>
              {this.props.data.post.title}
            </Text>
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  }
}
