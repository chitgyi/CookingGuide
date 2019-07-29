import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import firebase from "react-native-firebase";
import { CardItem, Left, Body, Thumbnail, Toast, Root } from "native-base";
import { HeaderBackButton } from "react-navigation";
import { Dialog, ConfirmDialog } from "react-native-simple-dialogs";

export default class MyPostedView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Details",
    headerLeft: <HeaderBackButton onPress={() => navigation.pop()} />
  });
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      likes: 0,
      saved: false,
      deleting: false,
      showConfrim: false
    };
  }
  activeHeart = () => {
    this.setState({ active: !true });
  };
  _showTost = msg => {};
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

  _back = () => {
    this.setState({
      deleting: false
    });
    this.props.navigation.pop();
  };
  _deletePost = () => {
    this.setState({
      deleting: true
    });
    return null;
    let str = this.props.navigation.state.params.details.url.substring(82, 122);
    firebase
      .storage()
      .ref("postImages/" + str)
      .delete()
      .then(() => {
        firebase
          .database()
          .ref("Posts/" + this.props.navigation.state.params.details.pid)
          .remove()
          .then(removed => {
            this._back();
          })
          .catch(err => {});
      })
      .catch(error => {
        this.setState({
          deleting: false
        });
        alert("Can't Delete!");
      });
    this.setState({
      deleting: false
    });
  };

  render() {
    return (
      <Root>
        <Dialog
          visible={this.state.deleting}
          onTouchOutside={() => this.setState({ deleting: false })}
        >
          <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,.7)" />
          <View style={{ flexDirection: "row", padding: 10 }}>
            <ActivityIndicator size="large" color="red" />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "#000", fontSize: 14 }}>Deleting..</Text>
            </View>
          </View>
        </Dialog>
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
            name="delete"
            size={30}
            onPress={() => {
              // this.setState({
              //   showConfrim: true
              // });
              Alert.alert("Confirm!", "Are you sure want to delete?", [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel"
                },
                {
                  text: "Ok",
                  onPress: () => this._deletePost()
                }
              ]);
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
      </Root>
    );
  }
}
