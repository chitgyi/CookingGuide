import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  Alert,
  StatusBar
} from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import { AccessToken, LoginManager, LoginButton } from "react-native-fbsdk";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/FontAwesome";
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  async facebookLogin() {
    try {
      await LoginManager.logInWithReadPermissions(["public_profile", "email"]);
      const data = await AccessToken.getCurrentAccessToken();
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      await firebase.auth().signInWithCredential(credential);
    } catch (e) {
      Alert.alert("Failed", "Login failed, try again!" + e.message);
    }
  }

  onClickListener = viewId => {
    //Alert.alert("Alert", "Button pressed " + viewId);
    if (this.state.email && this.state.password) {
      this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          if (res.user.emailVerified) {
            this.setState({ loading: false });
            this.props.navigation.navigate("Home");
          } else {
            this.setState({ loading: false });
            alert("Please check your email and verify!");
          }
        })
        .catch(err => {
          this.setState({ loading: false });
          Alert.alert("Login failed", err.code.substring(5));
        });
    } else {
      Alert.alert("Please fill in blank!");
    }
  };
  forget= ()=> {
    this.props.navigation.navigate("Forget")
  }
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
              <Text style={{ color: "#000", fontSize: 14 }}>Logging in...</Text>
            </View>
          </View>
        </Dialog>
        <StatusBar backgroundColor="#DCDCDC" barStyle="dark-content" />
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

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener("login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.facebookLogin}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="facebook"
              size={25}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.loginText}>Facebook Login</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.forget()}
        >
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text>Register</Text>
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
