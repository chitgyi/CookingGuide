import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import ImgSlider from "react-native-image-slider";

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const res = [
      {
        text: "အသုပ်စုံပြုလုပ်နည်းများ",
        type: "type3",
        img: require("./../../Images/type3.jpg")
      },
      {
        text: "အသား/ငါး ကြော်/ပေါင်း",
        type: "type4",
        img: require("./../../Images/type4.jpg")
      },
      {
        text: "မုန့်လုပ်နည်းများ",
        type: "type5",
        img: require("./../../Images/type5.jpg")
      },
      {
        text: "ဟင်းရည်လုပ်နည်းများ",
        type: "type6",
        img: require("./../../Images/type6.jpg")
      }
    ];
    return (
      <View style={styles.container}>
        <ImgSlider
          autoPlayWithInterval={3000}
          images={res}
          customSlide={({ index, item, style, width }) => (
            // It's important to put style here because it's got offset inside
            <TouchableHighlight
              onPress={() => {
                this.props.nav.navigate("CatView", {
                  details: item
                });
              }}
              key={index}
              style={[style, styles.customSlide]}
            >
              <ImageBackground
                source={item.img}
                resizeMode="cover"
                imageStyle={{ opacity: 0.8 }}
                style={styles.customImage}
              >
                <View
                  style={{
                    margin: 5,
                    padding: 5,
                    backgroundColor: "green",
                    borderRadius: 5,
                    alignSelf: "baseline"
                  }}
                >
                  <Text style={{ color: "white" }}>{item.text}</Text>
                </View>
              </ImageBackground>
            </TouchableHighlight>
          )}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
              {res.map((image, index) => {
                return (
                  <View key={index} style={styles.button}>
                    <View style={position === index && styles.buttonSelected} />
                  </View>
                );
              })}
            </View>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 270,
    marginTop: 2
  },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    margin: 3,
    width: 12,
    height: 12,
    opacity: 0.9,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 6
  },
  buttonSelected: {
    width: 12,
    height: 12,
    opacity: 1,
    backgroundColor: "blue",
    borderRadius: 6
  },
  customSlide: {
    alignItems: "center",
    justifyContent: "center"
  },
  customImage: {
    width: "100%",
    height: "100%"
  }
});
