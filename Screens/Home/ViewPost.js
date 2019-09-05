import React, { Component } from "react";
import { Image, ScrollView, View, Text, StatusBar, ToastAndroid, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import firebase from "react-native-firebase";
import { CardItem, Left, Body, Thumbnail } from "native-base";
import { HeaderBackButton } from "react-navigation";
export default class ViewPost extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Details",
    headerLeft: <HeaderBackButton onPress={() => navigation.pop()} />
  });
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      likes: 0,
      saved: false
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
      .child(this.props.navigation.state.params.details.pid)
      .child(firebase.auth().currentUser.uid)
      .update({ like: !like });
    await firebase
      .database()
      .ref("Likes/")
      .child(this.props.navigation.state.params.details.pid)
      .orderByChild("like")
      .equalTo(true)
      .once("value", snap => {
        let like = snap.numChildren();
        this.setState({ likes: like });
      });
  };

  isSaved = saved => {
    firebase
      .database()
      .ref("Saved")
      .child(firebase.auth().currentUser.uid)
      .child(this.props.navigation.state.params.details.pid)
      .update({ saved: !saved });
  };
  componentWillMount() {
    firebase
      .database()
      .ref("Likes")
      .child(this.props.navigation.state.params.details.pid)
      .orderByChild("like")
      .equalTo(true)
      .once("value", snap => {
        let like = snap.numChildren();
        this.setState({ likes: like });
      });
    firebase
      .database()
      .ref("Likes")
      .child(this.props.navigation.state.params.details.pid)
      .child(firebase.auth().currentUser.uid)
      .once("value", snap => {
        this.setState({ active: snap.val() ? snap.val().like : false });
      });
  }

  report = () => {
    firebase
      .database()
      .ref("Reports")
      .push({
        uid: firebase.auth().currentUser.uid,
        pid: this.props.navigation.state.params.details.pid
      })
      .then(res => {
        ToastAndroid.show("Reported!", 2500)
      }).catch(err=> {
        ToastAndroid.show("Error", 2500)
      })
  };

  componentDidMount() {
    firebase
      .database()
      .ref("Saved")
      .child(firebase.auth().currentUser.uid)
      .child(this.props.navigation.state.params.details.pid)
      .once("value", snap => {
        let cond = snap.val() ? snap.val().saved : false;
        this.setState({ saved: cond });
      });
  }

  render() {
    return (
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <CardItem bordered>
          <Left>
            <Thumbnail
              source={{
                uri: this.props.navigation.state.params.details.profilePhoto
              }}
            />
            <Body>
              <Text style={{ color: "#000" }}>
                {this.props.navigation.state.params.details.displayName}
              </Text>
              <Text style={{ fontSize: 12 }}>
                {this.dateDiff(
                  this.props.navigation.state.params.details.createdAt
                )}
              </Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem cardBody bordered>
          <Image
            source={{
              uri: this.props.navigation.state.params.details.url
            }}
            resizeMode="cover"
            style={{
              height: 300,
              width: null,
              flex: 1,
              borderBottomWidth: 1
            }}
          />
        </CardItem>

        <Text style={{ fontSize: 16, padding: 10, color: "#000" }}>
          {this.props.navigation.state.params.details.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
            marginTop: 5,
            borderBottomWidth: 1,
            borderColor: "#cccccc"
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

                this.isLiked(this.state.active);
              }}
            />
            {/* <Text>{this.state.likes>1 ? this.state.likes+" Likes": this.state.likes+" Like"}</Text> */}
            <Text style={{ marginLeft: 7 }}>
              {this.state.likes > 1
                ? this.state.likes + " Likes"
                : this.state.likes + " Like"}
            </Text>
            <Icon
              name="save"
              size={30}
              color={this.state.saved ? "blue" : "#333"}
              onPress={() => {
                this.setState({
                  saved: !this.state.saved
                });

                this.isSaved(this.state.saved);
              }}
              style={{ marginLeft: 15 }}
            />
          </View>
          <Icon
            name="frown"
            size={30}
            color="#4f4e4d"
            onPress={() => {
              Alert.alert(
                "Report!",
                "This post is spam post or not interested?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      this.report();
                    }
                  }
                ]
              );
            }}
          />
        </View>
        <Text
          style={{
            padding: 5,
            color: "#666",
            textAlign: "justify"
          }}
        >
          {this.props.navigation.state.params.details.postBody}
        </Text>
      </ScrollView>
    );
  }
}
