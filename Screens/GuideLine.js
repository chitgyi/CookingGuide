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
import Icon from "react-native-vector-icons/MaterialIcons";

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
    key: "1",
    title: "ဟင္းမ်ိဳးစံု ျပဳလုပ္နည္းမ်ား",
    text:
      "ဤ Application သည္ ဟင္းခ်က္ရာတြင္ အခက္ခဲမျဖစ္ေစရန္ ရည္ရြယ္ေရးသားထားေသာ Application ျဖစ္ပါသည္။"
  },
  {
    key: "2",
    title: "မုန႔္မ်ိဳးစံု ျပဳလုပ္မ်ား",
    text:
      "အစားအေသာက္ မ်ိဳးစံုျပဳလုပ္နည္းမ­်ားကို တစ္ေနရာတည္းတြင္ ရရိွႏိုင္ပါသည္။ မိမိတို႔ ကိုယ္တိုင္ခ်က္ျပဳတ္န­ည္းကိုလည္း မ်ွေဝသံုးစြဲႏိုင္ေအာ­င္ ျပဳလုပ္ေပးထားပါသည္။"
  },
  {
    key: "3",
    title: "အစားအေသာက္အတြက္ ေဆာင္ရန္ေရွာင္ရန္မ်ာ­း",
    text:
      "မုန႔္မ်ိဳးစံု လုပ္နည္းမ်ားႏွင့္ ေဆာင္ရန္ ေရွာင္ရန္မ်ားကိုလည္း­ ထၫ့္သြင္း‌ေပးထားပါသည­္။ ဤ Application သည္အစားအေသာက္ႏွင့္ပတ­္သတ္၍ ခ်က္ျပဳတ္နည္းလမ္းမ်ားရရိွႏိုင­္ေသာ Application ေကာင္းတစ္ခုျဖစ္ပါသည္­။"
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
          justifyContent: "center",
          backgroundColor: "#a00bd6"
        }}
      >
        <Icon name="restaurant" size={100} color="white" />
        <Text
          style={{
            fontSize: 20,
            color: "white",
            backgroundColor: "transparent",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 25
          }}
        >
         
          {item.title}
        </Text>

        <Text
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            backgroundColor: "transparent",
            textAlign: "justify",
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
      <View style={{ backgroundColor: "#a00bd6", flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#a00bd6" />
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          onDone={this._onDone}
          showSkipButton
          onSkip={this._onDone}
          renderDoneBottom={this._renderBottom}
        />
      </View>
    );
  }
}
