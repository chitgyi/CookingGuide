import React, { Component } from "react";
import { View, Button, StatusBar, ListView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import CardView from "./CardViewItem";
import firebase from "react-native-firebase";

let nav;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Home extends Component {
  static navigationOptions = {
    title: "Cooking Guide",
    headerRight: (
      <View style={{ flexDirection: "row" }}>
        <Icon
          name="form"
          size={25}
          color="#000"
          style={{ height: 25, width: 25, marginRight: 10 }}
          onPress={() => nav.routeTo("SendPost")}
        />
        <Icon
          name="search1"
          size={25}
          color="#000"
          style={{ height: 25, width: 25, marginRight: 10 }}
          onPress={() => nav.routeTo("SendPost")}
        />
      </View>
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      posts: ds
    };
    nav = this;
  }
  routeTo = Name => {
    nav.props.navigation.navigate(Name);
  };
  addPost = () => {
    firebase
      .database()
      .ref("Posts/")
      .push({
        userId: firebase.auth().currentUser.uid,
        postTitle: "Rose is set of Loving...",
        postBody:
          "aldkfa asodfia ja sdfoias aosidf a a faosd f;la foas lad foasf aldkfjasof aosfasdfalsd fjo asodf asldfjasodif aosdf",
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/220px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
        downPost: [],
        upPost: [],
        fav: [],
        startedAt: firebase.database.ServerValue.TIMESTAMP
      });
  };

  getData = () => {};
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
        {/* <Button
          onPress={this.addPost}
          style={{ backgroundColor: "green" }}
          title="Add post"
        />
        <Button onPress={this.getData} title="Get data" /> */}

        <ListView
          renderRow={this._rowRender}
          dataSource={this.state.posts}
          enableEmptySections
        />
      </View>
    );
  }
}
