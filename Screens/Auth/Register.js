import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  BackHandler,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Image,
  Alert,
  StatusBar,
  ImageBackground
} from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import uuid from "react-native-uuid";
import ImagePicker from "react-native-image-crop-picker";
import firebase from "react-native-firebase";
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      imgPath: "empty",
      loading: false
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.back);
  }
  back = () => {
    this.props.navigation.navigate("Login");
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.back);
  }
  onClickListener = viewId => {
    //Alert.alert("Alert", "Button pressed " + viewId);
    if (
      this.state.email &&
      this.state.password &&
      this.state.name &&
      this.state.cpassword &&
      this.state.imgPath !== "empty"
    ) {
      if (this.state.password === this.state.cpassword) {
        // do
        this.signup();
      } else {
        Alert.alert("Password didn't match!");
      }
    } else {
      Alert.alert("Please fill in blank!");
    }
  };
  signup = () => {
    this.setState({ loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(value => {
        ToastAndroid.show("Created Account!", 2000);
        value.user.sendEmailVerification().then(re => {
          ToastAndroid.show("Please check your email and login", 3500);
        });
        firebase
          .storage()
          .ref("Users")
          .child(uuid.v1() + ".jpg")
          .putFile(this.state.imgPath, { contentType: "image/jpg" })
          .then(res => {
            value.user.sendEmailVerification();
            value.user
              .updateProfile({
                displayName: this.state.name,
                photoURL: res.downloadURL
              })
              .then(end => {
                this.setState({ loading: false });
                this.props.navigation.navigate("Login");
              });
          });
      })
      .catch(reason => {
        this.setState({ loading: false });
        alert(reason.code);
      });
  };
  pickImage = () => {
    ImagePicker.openPicker({ cropping: true, height: 200, width: 200 })
      .then(image => {
        this.setState({ imgPath: image.path });
      })
      .catch(err => {});
  };
  render() {
    return (
      <View style={styles.container}>
        <Dialog visible={this.state.loading}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,.7)"
          />
          <View style={{ flexDirection: "row", padding: 10 }}>
            <ActivityIndicator size="large" color="red" />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "#000", fontSize: 14 }}>Signing up...</Text>
            </View>
          </View>
        </Dialog>
        <StatusBar backgroundColor="#DCDCDC" barStyle="dark-content" />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={this.pickImage}>
            <ImageBackground
              source={{ uri: this.state.imgPath }}
              imageStyle={{ borderRadius: 75 }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                justifyContent: "center",
                borderColor: "#666666",
                borderWidth: 1.5
              }}
            >
              {this.state.imgPath == "empty" ? (
                <Text style={{ textAlign: "center" }}> Your Photo </Text>
              ) : (
                <Text />
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("./../../Images/user.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Name"
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState({ name })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("./../../Images/gmail.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("./../../Images/password.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("./../../Images/password.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Confirm Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={cpassword => this.setState({ cpassword })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener("login")}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 280,
    height: 50,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 280,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  }
});
