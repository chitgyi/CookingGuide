import React, { Component } from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import firebase from "react-native-firebase";
import {
  Card,
  CardItem,
  Left,
  Right,
  Text,
  Body,
  Thumbnail,
  Button
} from "native-base";

export default class CardViewItem extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  activeHeart = () => {
    alert(1);
    this.setState({ active: !true });
  };
  dateDiff = previous => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Nobember", "October", "December"]
    let prev = parseInt(previous);
    let msPerMin = 60 * 1000;
    let msPerHr = msPerMin * 60;
    let msPerDay = msPerHr * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerMonth * 365;
    let dateDiff = Date.now() - prev;
    let result = new Date(prev);

    if (dateDiff < msPerMin) {
      return "just now";
    }
    if (dateDiff < msPerHr) {
      return Math.round(dateDiff / msPerMin) + " min ago";
    }
    if (dateDiff < msPerDay) {
      return Math.round(dateDiff / msPerHr) + " hr ago";
    }
    if (dateDiff < msPerMonth) {
      let day = Math.round(dateDiff / msPerDay);
      return day < 1
        ? "Yesterday"
        : result.getDate() + " "+months[result.getMonth()]+", "+result.getFullYear()
    }
    if (dateDiff < msPerYear) {
      return Math.round(dateDiff / msPerMonth) + " year ago";
    }
  };
  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: firebase.auth().currentUser.photoURL }} />
            <Body>
              <Text>{firebase.auth().currentUser.displayName}</Text>
              <Text note>{this.dateDiff(this.props.createdAt)}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: this.props.url }}
            resizeMode="cover"
            style={{ height: 230, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {}
              {this.props.title}
            </Text>
            <Text style={{ fontSize: 14 }}>
              {/* Cooking details and guides. You can cook from this cooking guide... */}
              {this.props.postBody.substring(1, 100)}......
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Icon
              name={this.state.active ? "heart" : "hearto"}
              color={this.state.active ? "red" : "#333"}
              size={35}
              onPress={() => {
                this.setState({ active: !this.state.active });
              }}
            />
            <Text>45 likes</Text>
            <Icon
              style={{ marginLeft: 7 }}
              name="save"
              size={35}
              onPress={() => {
                this.activeHeart;
              }}
            />
          </Left>
          <Right>
            <Icon name="frown" size={30} />
          </Right>
        </CardItem>
      </Card>
    );
  }
}
