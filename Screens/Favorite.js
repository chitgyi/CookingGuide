import React, { Component } from "react";
import {
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Text,
  RefreshControl
} from "react-native";
import firebase from "react-native-firebase";
import { Card } from "native-base";
var nav;
export default class Favorite extends Component {
  static navigationOptions = {
    title: "Cooking Guide"
  };
  constructor(props) {
    super(props);
    nav = this;
    this.state = {
      posts: [],
      refreshing: false
    };
    // this.ds = ds = new ListView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // });
    nav = this;
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ refreshing: true, posts: [] });
    var saved = firebase.database().ref("Saved");
    var posts = firebase.database().ref("Posts");
    saved
      .child(firebase.auth().currentUser.uid)
      .orderByChild("saved")
      .equalTo(true)
      .once("value", snap => {
        if (snap.exists()) {
          var data = snap.toJSON();
          Object.keys(data).forEach(key => {
            posts.child(key).once("value", post => {
              if (post.exists()) {
                this.setState({
                  posts: [...this.state.posts, {details: post.toJSON(), pid: key}]
                });
              }
            });
          });
        }
      });
    this.setState({ refreshing: false });
  };
  
  _rowRender(data) {
    if (data) {
      return (
        <Card>
          <TouchableOpacity
            onPress={() =>
              nav.props.navigation.navigate("ViewSavedPost", { details: data.item })
            }
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Image
                source={{ uri: data.item.details.url }}
                style={{ width: 150, height: 130 }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  textAlign: "justify",
                  marginLeft: 10,
                  color: "#000"
                }}
              >
                {data.item.details.title}
              </Text>
            </View>
          </TouchableOpacity>
        </Card>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        {this.state.refreshing ? (
          <ActivityIndicator size="large" color="blue" />
        ) : null}
        <FlatList
          refreshControl={<RefreshControl onRefresh={this.loadData} refreshing={this.state.refreshing} />}
          renderItem={this._rowRender}
          data={this.state.posts}
          keyExtractor={(item, index)=> index.toString()}
        />
      </View>
    );
  }
}
