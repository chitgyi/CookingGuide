import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import Card from "react-native-cardview";
export default class CardView extends Component {
  constructor() {
    super();
    this.state = {
      postCheck: 0,
      like: false,
      liked: 0,
      hearted: "heart-o"
    };
  }
  componentDidMount() {
    this.setState({
      postCheck: this.props.postCond
    });
  }
  render() {
    return (
      <Card style={{ marginTop: 7 }} cardElevation={2}>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              padding: 10
            }}
            source={{
              uri: this.props.photoUrl
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 16, color: "black" }}>Food Name One</Text>
            <Text>1 day ago</Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#d5dce8", height: 1 }} />
        <Image
          source={{
            uri: this.props.photoUrl
          }}
          style={{ height: 220, width: "100%" }}
        />
        <Text style={{ padding: 10 }}>{this.props.postTitle}</Text>
        <Text style={{ paddingStart: 10 }}>{this.state.like ? 1 : 0} like</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Icons
              onPress={() => {
                this.setState(previous => ({
                  like: !previous.like,
                  hearted: previous.like ? "heart-o" : "heart"
                }));
              }}
              name={this.state.hearted}
              size={30}
              style={{
                color: "#ad0670",
                marginLeft: 5,
                marginRight: 15
              }}
            />
            <Icons name="bookmark" size={30} style={{ color: "#2f146d" }} />
          </View>
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Icons
              name="caret-left"
              size={35}
              style={{ color: "red" }}
              onPress={() => {
                this.setState(previous => ({
                  postCheck: `${parseInt(previous.postCheck) - 1}`
                }));
              }}
            />
            <Text style={{ padding: 4, marginLeft: 15, marginRight: 15 }}>
              {this.state.postCheck}
            </Text>
            <Icons
              onPress={() => {
                this.setState(previous => ({
                  postCheck: `${parseInt(previous.postCheck) + 1}`
                }));
              }}
              name="caret-right"
              size={35}
              style={{ color: "green" }}
            />
          </View>
        </View>
      </Card>
    );
  }
}
