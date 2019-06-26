import React, { Component } from "react";
import { View, ScrollView, Button, Text, StatusBar, ListView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import CardView from "./CardViewItem";
import firebase from "react-native-firebase";
import SnackBar from "react-native-snackbar";
import ImageSlider from "./Meals/ImageSlider"
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
          // onPress={() => nav.routeTo("SendPost")}
        />
      </View>
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      posts: ds,
    };
    nav = this;
  }
  routeTo = Name => {
    nav.props.navigation.navigate(Name);
  };
  componentWillMount(){
    this.setState(null)
  }
  componentDidMount() {
    try {
      firebase
        .database()
        .ref("Posts")
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
                    title: `${val[value][child].title}`,
                    postBody: `${val[value][child].postBody}`,
                    url: `${val[value][child].url}`,
                    createdAt: `${val[value][child].createdAt}`
                  }
                });
              }
            }
          });
          this.setState({ posts: ds.cloneWithRows(res) });
        });
    } catch (error) {
      this.state.setState({ posts: null });
    }
  }
  _rowRender(data) {
    return (
      <CardView
        title={data.post.title}
        postBody={data.post.postBody}
        url={data.post.url}
        pid={data.post.pid}
        uid={data.post.uid}
        createdAt={data.post.createdAt}
      />
    );
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ImageSlider />
        {this.state.posts ? (
          <ListView
            renderRow={this._rowRender}
            dataSource={this.state.posts}
            enableEmptySections
          />
        ) : (
          <Text style={{}}>No Post Here</Text>
        )}

        {this.props.navigation.getParam("success", false)
          ? SnackBar.show({
              title: this.props.navigation.getParam("success", null),
              duration: SnackBar.LENGTH_SHORT
            })
          : null}
      </ScrollView>
    );
  }
}
