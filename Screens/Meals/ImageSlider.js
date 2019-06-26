import React, { Component } from "react";
import { Text, View, ImageBackground, StyleSheet, TouchableHighlight } from "react-native";
import ImgSlider from "react-native-image-slider";

export default class ImageSlider extends Component {
  render() {
    const res = [
      { image: "https://placeimg.com/640/640/nature", title: "Caption 1" },
      { image: "https://placeimg.com/640/640/people", title: "Caption 2" },
      { image: "https://placeimg.com/640/640/animals", title: "Caption 3" },
      { image: "https://placeimg.com/640/640/beer", title: "Caption 4" }
    ];

    return (
      <View style={styles.container}>
        <ImgSlider
          autoPlayWithInterval={3000}
          images={res}
          customSlide={({ index, item, style, width }) => (
            // It's important to put style here because it's got offset inside
            <TouchableHighlight onPress={()=> {alert(index)}} key={index} style={[style, styles.customSlide]}>
              <ImageBackground
                source={{ uri: item.image }}
                resizeMode="stretch"
                style={styles.customImage}
                
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  {" "}
                  {item.title}
                </Text>
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
    height: 300,
    marginTop: 2
  },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -20,
    alignItems: "center",
    flexDirection: "row"
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
