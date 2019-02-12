import React, { Component } from "react";
import { View, Text, StatusBar, Alert, ListView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import CardView from "./CardViewItem";
import firebase from "react-native-firebase";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class Home extends Component {
  static navigationOptions = {
    title: "Cooking Guide",
    headerRight: (
      <Icon
        name="form"
        size={25}
        color="#000"
        style={{ height: 25, width: 25, marginRight: 10 }}
        onPress={() => {
          Alert.alert("You tapped the button!");
        }}
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      postCheck: 0,
      like: false,
      liked: 0,
      hearted: "heart-o",
      posts: ds
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("posts")
      .on("value", data => {
        let val = data.val();
        let res = [];
        Object.keys(val).forEach(value => {
          for (let child in val[value]) {
            if (!res.includes(child)) {
              res.push({
                post: {
                  uid: value,
                  pid: child,
                  postTitle: `${val[value][child].postTitle}`,
                  postPhoto: `${val[value][child].postPhoto}`,
                  postCond: `${val[value][child].postCond}`
                }
              });
            }
          }
        });
        this.setState({ posts: ds.cloneWithRows(res) });
      });
  }
  _rowRender(data) {
    return (
      <CardView
        postCond={data.post.postCond}
        photoUrl={data.post.postPhoto}
        postTitle={data.post.postTitle}
      />
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ListView
          renderRow={this._rowRender}
          dataSource={this.state.posts}
          enableEmptySections
        />
      </View>
    );
  }
}
