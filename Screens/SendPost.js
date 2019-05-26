import React, { Component } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  BackHandler,
  Platform
} from "react-native";
import {
  Item,
  Content,
  Input,
  Form,
  Textarea,
  Button,
  Text
} from "native-base";
import { HeaderBackButton } from "react-navigation";
import ImagePicker from "react-native-image-crop-picker";
import uuid from 'react-native-uuid'
import firebase from "react-native-firebase";

export default class SendPost extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Upload",
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate("Taps")} />
  });
  constructor(props) {
    super(props);
    this.state = {
      imgPath: "empty",
      loading: 'No'
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.back);
  }

  async uploadImage() {
    const image = this.state.imgPath
    const imageRef = firebase
      .storage()
      .ref("postImages")
      .child(uuid.v1()+".jpg");
    let mime = "image/jpg";
    imageRef
      .putFile(image, { contentType: mime })
      .on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        this.setState({loading: "Yeah"})
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          alert(snapshot.downloadURL);
        }else{
          alert("Unable to upload..!")
        }
      });
  };

  back = () => {
    this.props.navigation.navigate("Taps");
    return true;
  };

  pickImage = () => {
    ImagePicker.openPicker({ cropping: true, height: 230, width: 250 })
      .then(image => {
        this.setState({ imgPath: image.path });
      })
      .catch(error => {
        alert("Please select an image!");
      });
  };

  render() {
    return (
      <ScrollView horizontal={false} style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Content padder>
          <TouchableOpacity
            onPress={this.pickImage}
            style={{ marginBottom: 7 }}
          >
            <ImageBackground
              style={{
                height: 250,
                borderColor: "#888",
                borderWidth: 2,
                justifyContent: "center"
              }}
              source={{ uri: this.state.imgPath }}
            >
              {this.state.imgPath == "empty" ? (
                <Text style={{ textAlign: "center" }}> Upload Image </Text>
              ) : (
                <Text />
              )}
            </ImageBackground>
          </TouchableOpacity>

          <Item regular>
            <Input placeholder="Food Title" />
          </Item>
          <Form>
            <Textarea rowSpan={8} bordered placeholder="Details of Food" />
          </Form>
          <Button block style={{ marginTop: 7 }} onPress={() => {this.uploadImage()}}>
            <Text>Send Post</Text>
          </Button>
          <Text>{this.state.loading}</Text>
        </Content>
      </ScrollView>
    );
  }
}
