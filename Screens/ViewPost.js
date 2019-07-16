import React, { Component } from "react";
import { Image, ScrollView, View, StatusBar, Button } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import firebase from "react-native-firebase";
import { CardItem, Left, Text, Body, Thumbnail } from "native-base";
import { HeaderBackButton } from "react-navigation";
export default class ViewPost extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Details",
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate("Taps")} />
  });
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      likes: 0,
      data: ""
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

  // componentDidMount() {
  //   this.mounted = true;
  //   firebase
  //     .database()
  //     .ref("Likes/")
  //     .child(this.props.pid)
  //     .orderByChild("like")
  //     .equalTo(true)
  //     .once("value", snap => {
  //       let like = snap.numChildren();
  //       this.setState({ likes: like });
  //     });
  //   firebase
  //     .database()
  //     .ref("Likes/")
  //     .child(this.props.pid)
  //     .child(firebase.auth().currentUser.uid)
  //     .once("value", snap => {
  //       this.setState({ active: snap.val() ? snap.val().like : false });
  //     });
  // }
  componentDidMount() {
    this.setState({
      data: this.props.navigation.getParam("success", null)
    });
  }
  componentWillUnmount() {
    this.mounted = false;
    this.setState(null);
  }
  render() {
    return (
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <CardItem>
          <Left>
            <Thumbnail source={require("../Images/user.png")} />
            <Body>
              <Text>Chit Ye Aung</Text>
              <Text note>2 July, 2019</Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem cardBody>
          <Image
            source={require("../Images/food.jpeg")}
            resizeMode="cover"
            style={{
              height: 300,
              width: null,
              flex: 1
            }}
          />
        </CardItem>

        <Text style={{ fontSize: 16, padding: 5 }}>
          {this.props.navigation.getParam("data", "sex")}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              name={this.state.active ? "heart" : "hearto"}
              color={this.state.active ? "#ff0080" : "#333"}
              size={30}
              onPress={() => {
                this.setState({
                  active: !this.state.active
                });
                // let like = this.state.active;
                // this.isLiked(like);
              }}
            />
            {/* <Text>{this.state.likes>1 ? this.state.likes+" Likes": this.state.likes+" Like"}</Text> */}
            <Text style={{ marginLeft: 7 }}>10 likes</Text>
            <Icon
              name="star"
              size={30}
              color="blue"
              onPress={() => {}}
              style={{ marginLeft: 15 }}
            />
          </View>
          <Icon name="frown" size={30} color="#4f4e4d" />
        </View>
        <Text
          style={{
            padding: 5,
            fontWeight: "800"
          }}
        >
          {this.props.navigation.getParam("details", "false")}
        </Text>
        <Button
          title="click"
          onPress={() => this.props.navigation.navigate("Taps")}
        />
      </ScrollView>
    );
  }
}
