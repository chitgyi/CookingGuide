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
  render() {
    const res = [
      {
        image:
          "https://asideofsweet.com/wp-content/uploads/2018/07/Rainbow-Vegetarian-Tortilla-Pinwheels-Recipe-Healthy-Appetizer-2473.jpg",
        title: "Caption & Caption"
      },
      {
        image:
          "https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_900x675/public/grilled-chicken-vegetable-summer-salad-cl.jpg",
        title: "Caption 2"
      },
      {
        image:
          "https://img.taste.com.au/QaDKlckA/taste/2016/11/fresh-summer-vegetable-salad-91664-1.jpeg",
        title: "Caption 3"
      },
      {
        image:
          "https://img.taste.com.au/WNJ_c_QW/taste/2016/11/summer-gnocchi-and-chorizo-salad-92387-1.jpeg",
        title: "Caption 4"
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
                alert(index);
              }}
              key={index}
              style={[style, styles.customSlide]}
            >
              <ImageBackground
                source={{ uri: item.image }}
                resizeMode="stretch"
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
                  <Text style={{ color: "white" }}>{item.title}</Text>
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
