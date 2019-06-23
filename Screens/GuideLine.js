import React, { Component } from "react";
import {
  Text,
  StatusBar,
  View,
  Image,
  AsyncStorage,
  StyleSheet
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    width: 320,
    height: 320
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16
  }
});
const slides = [
  {
    key: "somethun",
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("../Images/food.jpeg"),
    backgroundColor: "#59b2ab"
  },
  {
    key: "somethun-dos",
    title: "Title 2",
    text: "Other cool stuff",
    image: require("../Images/user.png"),
    backgroundColor: "#febe29"
  },
  {
    key: "somethun1",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../Images/food.jpeg"),
    backgroundColor: "#22bcb5"
  }
];

export default class GuideLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLaunch: null
    };
  }

  _renderItem = item => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "blue"
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "white",
            backgroundColor: "transparent",
            textAlign: "center",
            marginBottom: 16
          }}
        >
          {item.title}
        </Text>
            <Image source={item.image} style={{height: 320, width: 320}}/>
        <Text
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            backgroundColor: "transparent",
            textAlign: "center",
            paddingHorizontal: 16
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  };
  
  _onDone = () => {
    AsyncStorage.setItem("launched", "yes").then(() => {
      this.props.navigation.navigate("Loading");
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: "blue", flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="blue" />
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          onDone={this._onDone}
          showSkipButton
          onSkip={this._onDone}
          renderDoneBottom={this._renderBottom}
          buttonStyle={{ backgroundColor: "rgba(255, 255, 255, .4)", borderRadius: 20, }}
        />
      </View>
    );
  }
}
