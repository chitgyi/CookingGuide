import React, { Component } from "react";
import { Text, View, ImageBackground, TouchableOpacity, StatusBar } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

export default class SendPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgPath: "empty"
    };
  }

  pickImage = () => {
    ImagePicker.openPicker({cropping: true}).then(image => {
      this.setState({imgPath: image.path})
    })
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <TouchableOpacity onPress={this.pickImage}>
          <ImageBackground
            style={{
              minWidth: 200,
              height: 250,
              borderColor: "black",
              borderWidth: 3,
              justifyContent: 'center'
            }}
            source={{ uri: this.state.imgPath }}
          >
            {this.state.imgPath == "empty" ? (
              <Text style={{textAlign: "center"}}> Upload Image </Text>
            ) : (
              <Text />
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}
