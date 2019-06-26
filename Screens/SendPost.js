import React, { Component, } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  BackHandler,
  Alert,
  Button,
} from "react-native";
import {
  Item,
  Content,
  Input,
  Textarea,
  Text,
  Picker,
  Icon
} from "native-base";
import Toast, { DURATION } from "react-native-easy-toast";
import { HeaderBackButton } from "react-navigation";
import ImagePicker from "react-native-image-crop-picker";
import uuid from "react-native-uuid";
import firebase from "react-native-firebase";
import { ProgressDialog } from "react-native-simple-dialogs";
import SnackBar from "react-native-snackbar";
export default class SendPost extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Upload",
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate("Taps")} />
  });
  constructor(props) {
    super(props);
    this.state = {
      imgPath: "empty",
      loading: false,
      selectedValue: "burmese",
      title: "",
      postBody: "",
      url: ""
    };
  }

  onValueChange2(value) {
    this.setState({
      selectedValue: value
    });
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.back);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.back);
    this.state = {};
    ImagePicker.clean();
  }
  back = () => {
    this.props.navigation.navigate("Taps");
    return true;
  };

  pickImage = () => {
    ImagePicker.openPicker({ cropping: true, height: 230, width: 360 })
      .then(image => {
        this.setState({ imgPath: image.path });
      })
      .catch(error => {
        alert("Please select an image!");
      });
  };

  showSnack = () => {
    // this.props.navigation.navigate("Home", { success: "Successfully posted!" });
    // this.refs.toast.show("Successfully uploaded!", 3000);
    // return true;
  };
 
  sendPost = () => {
    if (this.state.imgPath !== "empty") {
      if (this.state.title) {
        if (this.state.postBody) {
          this.setState({ loading: true });
          const image = this.state.imgPath;
          const imageRef = firebase
            .storage()
            .ref("postImages")
            .child(uuid.v1() + ".jpg");
          let mime = "image/jpg";

          imageRef
            .putFile(image, { contentType: mime })
            .then(snapshot => {
              if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                this.setState({ loading: false });
                firebase
                  .database()
                  .ref("Posts/" + firebase.auth().currentUser.uid)
                  .push({
                    url: snapshot.downloadURL,
                    title: this.state.title,
                    postBody: this.state.postBody,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                    profilePhoto: firebase.auth().currentUser.photoURL,
                    displayName: firebase.auth().currentUser.displayName
                  });
                this.props.navigation.navigate("Home", {
                  success: "Successfully posted!"
                });
                return true;
              } else {
                Alert.alert("Unable to upload photo");
              }
            })
            .catch(error => {
              Alert.alert("An error occurring!");
            });
        } else {
          alert("Enter your food details");
        }
      } else {
        alert("Enter your food name");
      }
    } else {
      alert("Please select your food photo");
    }
  };

  render() {
    return (
      <ScrollView horizontal={false} style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ProgressDialog
          visible={this.state.loading}
          title="Uploading..."
          message="Please, wait..."
        />
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
            <Input
              placeholder="Food Title"
              onChangeText={value => {
                this.setState({ title: value });
              }}
            />
          </Item>
          <Item picker regular style={{ marginTop: 5 }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select your food type"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selectedValue}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Picker.Item label="Burmese Food" value="burmese" />
              <Picker.Item label="Japanese Food" value="japanese" />
              <Picker.Item label="Korea Food" value="korea" />
              <Picker.Item label="Thai Food" value="thai" />
              <Picker.Item label="Other..." value="other" />
            </Picker>
          </Item>
          <Textarea
            rowSpan={8}
            bordered
            placeholder="Details of Food"
            onChangeText={value => {
              this.setState({ postBody: value });
            }}
          />
          <Button
            title="Send Post"
            style={{ marginTop: 7 }}
            onPress={() => {
              this.sendPost();
            }}
          />
        </Content>
      </ScrollView>
    );
  }
}
