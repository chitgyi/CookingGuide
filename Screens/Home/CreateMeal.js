import React, { Component } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  BackHandler,
  Alert,
  Button,
  ToastAndroid,
  View,
  ActivityIndicator
} from "react-native";
import {
  Item,
  Content,
  Input,
  Textarea,
  Text,
  Picker,
  Icon,
  Toast
} from "native-base";
import { HeaderBackButton } from "react-navigation";
import ImagePicker from "react-native-image-crop-picker";
import uuid from "react-native-uuid";
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
import { Dialog } from "react-native-simple-dialogs";

export default class SendPost extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Upload",
    headerLeft: <HeaderBackButton onPress={() => navigation.pop()} />
  });
  constructor(props) {
    super(props);
    this.state = {
      imgPath: "empty",
      loading: false,
      selectedValue: "type1",
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
    this.props.navigation.pop();
    return true;
  };

  pickImage = () => {
    ImagePicker.openPicker({ cropping: true, height: 300, width: 360 })
      .then(image => {
        this.setState({ imgPath: image.path });
      })
      .catch(error => {
        alert("Please select an image!");
      });
  };

  _goBack = () => {
    this.props.navigation.pop();
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

          imageRef.putFile(image, { contentType: mime }).then(snapshot => {
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              this.setState({ loading: false });
              firebase
                .database()
                .ref("Posts")
                .push({
                  uid: firebase.auth().currentUser.uid,
                  url: snapshot.downloadURL,
                  title: this.state.title,
                  postBody: this.state.postBody,
                  createdAt: firebase.database.ServerValue.TIMESTAMP,
                  profilePhoto: firebase.auth().currentUser.photoURL,
                  displayName: firebase.auth().currentUser.displayName,
                  foodType: this.state.selectedValue
                });
              this._goBack();
              try {
                Toast.show({
                  text: "Created Meal Successfully!",
                  duration: 2000,
                  type: "success"
                });
              } catch (error) {
                ToastAndroid.show("Created Meal Successfully!", 2500);
              }
            } else {
              Alert.alert("Unable to upload photo");
            }
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
        {/* <Spinner
                    visible={this.state.loading}
                    textContent={"Creating Meal"}
                    textStyle={{ color: "blue" }}
                /> */}
        <Dialog visible={this.state.loading}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,.7)"
          />
          <View style={{ flexDirection: "row", padding: 10 }}>
            <ActivityIndicator size="large" color="red" />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "#000", fontSize: 14 }}>Uploading..</Text>
            </View>
          </View>
        </Dialog>
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
            <Input
              placeholder="Food Title"
              onChangeText={title => this.setState({ title })}
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
              <Picker.Item label="အသား/ငါး" value="type1" />
              <Picker.Item label="အသီးအရွက်" value="type2" />
              <Picker.Item label="အသုတ်" value="type3" />
              <Picker.Item label="အသား/ငါး ကြော်/ပေါင်း" value="type4" />
              <Picker.Item label="မုန့်" value="type5" />
              <Picker.Item label="ဟင်းရည်" value="type6" />
            </Picker>
          </Item>
          <Textarea
            rowSpan={8}
            bordered
            placeholder="Details of Food"
            onChangeText={postBody => this.setState({ postBody })}
            style={{ marginBottom: 7 }}
          />
          <TouchableHighlight
            style={{
              flex: 1,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00b5ec"
            }}
            onPress={() => {
              this.sendPost();
            }}
          >
            <Text style={{ color: "white" }}>Create Food</Text>
          </TouchableHighlight>
        </Content>
      </ScrollView>
    );
  }
}
