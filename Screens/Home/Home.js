import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  ListView
} from "react-native";
import { Card, CardItem, Root, Toast } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import firebase from "react-native-firebase";
import ImageSlider from "./ImageSlider";
let nav;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const ds2 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

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
          onPress={() => nav.routeTo("Search")}
        />
      </View>
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      post1: ds,
      post2: ds2
    };
    nav = this;
  }
  routeTo = Name => {
    nav.props.navigation.navigate(Name);
  };
  componentWillMount() {
    this.setState(null);
  }
  componentDidMount() {
    try {
      firebase
        .database()
        .ref("Posts")
        .orderByChild("foodType")
        .equalTo("type1")
        .limitToLast(5)
        .on("value", data => {
          let val = data.val();
          let res = [];
          if(data.exists()){
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
        }
          this.setState({ post1: ds.cloneWithRows(res) });
        });
    } catch (error) {
      this.state.setState({ post1: null });
    }
    try {
      firebase
        .database()
        .ref("Posts")
        .orderByChild("foodType")
        .equalTo("type2")
        .limitToLast(5)
        .on("value", data => {
          let val = data.val();
          let res = [];
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
          this.setState({ post2: ds2.cloneWithRows(res) });
        });
    } catch (error) {
      this.state.setState({ post2: null });
    }
  }
  _rowRender(data) {
    return (
      <Card style={{ width: 180 }}>
        <TouchableOpacity
          onPress={() =>
            nav.props.navigation.navigate("ViewPost", { details: data })
          }
        >
          <CardItem cardBody bordered>
            <Image
              source={{ uri: data.url }}
              resizeMode="contain"
              resizeMethod="resize"
              style={{ width: 180, height: 150 }}
            />
          </CardItem>
          <CardItem footer>
            <Text style={{ fontSize: 12 }}>{data.title}</Text>
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  }
  render() {
    return (
      <Root>
        <ScrollView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <ImageSlider nav={this.props.navigation} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              padding: 5
            }}
          >
            <Text>အသား/ငါး ဟင်းပြုလုပ်နည်းများ</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#4168e1",
                padding: 5,
                borderRadius: 3
              }}
              onPress={() => {
                this.props.navigation.navigate("CatView", {
                  details: {
                    text: "အသား/ငါး ဟင်းပြုလုပ်နည်းများ",
                    type: "type1"
                  }
                });
              }}
            >
              <Text style={{ color: "white" }}>See All</Text>
            </TouchableOpacity>
          </View>
          {this.state.post1 ? (
            <ListView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderRow={this._rowRender}
              dataSource={this.state.post1}
              enableEmptySections
            />
          ) : (
            <Text style={{}}>No Post Here</Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              padding: 5
            }}
          >
            <Text>အသီးအရွက် ဟင်းပြုလုပ်နည်းများ</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#4168e1",
                padding: 5,
                borderRadius: 3
              }}
              onPress={() => {
                this.props.navigation.navigate("CatView", {
                  details: {
                    text: "အသီးအရွက် ဟင်းပြုလုပ်နည်းများ",
                    type: "type2"
                  }
                });
              }}
            >
              <Text style={{ color: "white" }}>See All</Text>
            </TouchableOpacity>
          </View>
          {this.state.post2 ? (
            <ListView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderRow={this._rowRender}
              dataSource={this.state.post2}
              enableEmptySections
            />
          ) : (
            <Text style={{}}>No Post Here</Text>
          )}
          {/* {this.props.navigation.getParam("success", false)
            ? SnackBar.show({
                title: this.props.navigation.getParam("success", null),
                duration: SnackBar.LENGTH_SHORT
              })
            : null} */}
        </ScrollView>
      </Root>
    );
  }
}
