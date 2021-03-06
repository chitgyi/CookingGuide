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
import { Card, Root } from "native-base";

var nav;
export default class CatView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.details.text
  });
  constructor(props) {
    super(props);
    nav = this;
    this.state = {
      posts: "empty",
      refreshing: false
    };
    nav = this;
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ refreshing: true, posts: [] });
    firebase
      .database()
      .ref("Posts")
      .orderByChild("foodType")
      .equalTo(this.props.navigation.state.params.details.type)
      .on("value", data => {
        let val = data.val();
        let res = [];
        if (data.exists()) {
          Object.keys(val).forEach(value => {
            res.push({
              pid: value,
              uid: `${val[value].uid}`,
              title: `${val[value].title}`,
              postBody: `${val[value].postBody}`,
              url: `${val[value].url}`,
              createdAt: `${val[value].createdAt}`,
              displayName: `${val[value].displayName}`,
              profilePhoto: `${val[value].profilePhoto}`
            });
          });
          this.setState({ posts: res, refreshing: false });
        } else {
          this.setState({ posts: "empty", refreshing: false });
        }
      });
  };

  componentWillReceiveProps() {
    this.loadData();
  }
  _rowRender(data) {
    return (
      <Card>
        <TouchableOpacity
          onPress={() =>
            nav.props.navigation.navigate("ViewCatItem", {
              details: data.item
            })
          }
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Image
              source={{ uri: data.item.url }}
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
              {data.item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
  render() {
    return (
      <Root>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />

          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={this.loadData}
                refreshing={this.state.refreshing}
              />
            }
            renderItem={this._rowRender}
            data={this.state.posts === "empty" ? [] : this.state.posts}
            keyExtractor={(item, index) => index.toString()}
          />
          {this.state.posts === "empty" ? (
            <Text style={{ alignSelf: "center", position: "absolute" }}>
              No Post Here
            </Text>
          ) : null}
        </View>
      </Root>
    );
  }
}
