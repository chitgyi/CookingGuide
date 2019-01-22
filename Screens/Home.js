import React, { Component } from "react";
import { View, Text, StatusBar, Alert, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/AntDesign";
import Card from "react-native-cardview";

export default class Home extends Component {
  static navigationOptions = {
    title: "Cooking Guide",
    headerRight: (
      <Icons
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
    this.state = {};
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ScrollView>
          <Card style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 25, padding: 10 }}
                source={require("../Images/user.png")}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 16, color: "black" }}>
                  Food Name One
                </Text>
                <Text>1 day ago</Text>
              </View>
            </View>
            <View style={{ backgroundColor: "gray", height: 1 }} />
            <Image
              source={require("../Images/food.jpeg")}
              style={{ height: 220, width: "100%" }}
            />
            <Text style={{ padding: 10 }}>
              Hello, this is a content of food details and you can follow this
              steps
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 5
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="heart" size={40} style={{ color: "#ad0670" }} />
                <Icon name="bookmark" size={40} style={{ color: "black" }} />
              </View>
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <Icons name="leftcircle" size={30} style={{ color: "red" }} />
                <Text style={{ padding: 4 }}>-6</Text>
                <Icons
                  name="rightcircle"
                  size={30}
                  style={{ color: "green" }}
                />
              </View>
            </View>
          </Card>
          <Card style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 25, padding: 10 }}
                source={require("../Images/user.png")}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 16, color: "black" }}>
                  Food Name Two
                </Text>
                <Text>2 day ago</Text>
              </View>
            </View>
            <View style={{ backgroundColor: "gray", height: 1 }} />
            <Image
              source={require("../Images/food.jpeg")}
              style={{ height: 220, width: "100%" }}
            />
            <Text style={{ padding: 10 }}>
              Hello, this is a content of food details and you can follow this
              steps
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 5
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="heart" size={40} style={{ color: "#ad0670" }} />
                <Icon name="bookmark" size={40} style={{ color: "black" }} />
              </View>
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <Icons name="leftcircle" size={30} style={{ color: "red" }} />
                <Text style={{ padding: 4 }}>-6</Text>
                <Icons
                  name="rightcircle"
                  size={30}
                  style={{ color: "green" }}
                />
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
