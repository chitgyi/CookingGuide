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
      active: false,
      likes: 0
    };
  }
  activeHeart = () => {
    this.setState({ active: !true });
  };
  dateDiff = previous => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "October",
      "December"
    ];
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
        : months[result.getMonth()] +
            " " +
            result.getDate() +
            ", " +
            result.getFullYear();
    }
    if (dateDiff < msPerYear) {
      return Math.round(dateDiff / msPerMonth) + " year ago";
    }
  };

  isLiked = async like => {
    await firebase
      .database()
      .ref("Likes/")
      .child(this.props.pid)
      .child(firebase.auth().currentUser.uid)
      .update({ like: !like });
    await firebase
      .database()
      .ref("Likes/")
      .child(this.props.pid)
      .orderByChild("like")
      .equalTo(true)
      .once("value", snap => {
        let like = snap.numChildren();
        this.setState({ likes: like });
      });
  };

  componentDidMount() {
    this.mounted = true;
    firebase
      .database()
      .ref("Likes/")
      .child(this.props.pid)
      .orderByChild("like")
      .equalTo(true)
      .once("value", snap => {
        let like = snap.numChildren();
        this.setState({ likes: like });
      });
    firebase
      .database()
      .ref("Likes/")
      .child(this.props.pid)
      .child(firebase.auth().currentUser.uid)
      .once("value", snap => {
        this.setState({ active: snap.val() ? snap.val().like : false });
      });
  }
  componentWillUnmount() {
    this.mounted = false;
    this.setState(null);
  }
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
            style={{ height: 240, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ fontSize: 16, fontWeight: "900" }}>
              {}
              {this.props.title}
            </Text>
            <Text style={{ fontSize: 14, textAlign: "justify" }}>
              {/* Cooking details and guides. You can cook from this cooking guide... */}
              {this.props.postBody.substring(0, 100)}......
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Icon
              name={this.state.active ? "heart" : "hearto"}
              color={this.state.active ? "#ff0080" : "#333"}
              size={30}
              onPress={() => {
                this.setState({ active: !this.state.active });
                let like = this.state.active;
                this.isLiked(like);
              }}
            />
            <Text>{this.state.likes>1 ? this.state.likes+" Likes": this.state.likes+" Like"}</Text>
            <Icon
              style={{ marginLeft: 10, }}
              name="star"
              size={30}
              color="blue"
              onPress={() => {}}
            />
          </Left>
          <Right>
            <Icon name="frown" size={30} color="#4f4e4d"/>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
