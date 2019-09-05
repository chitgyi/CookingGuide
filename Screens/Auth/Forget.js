import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  BackHandler,
  ActivityIndicator,
  StatusBar,
  Button,
  Alert
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import { Dialog } from "react-native-simple-dialogs";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/FontAwesome";
export default class LoginView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Forget Password",
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.navigate("Login")} />
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
  forget = () => {
    if (this.state.email) {
      this.setState({ loading: true });
      firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(res => {
          this.setState({ loading: false });
          Alert.alert(
            "Warning!",
            "Plase check your email and then set new password"
          );
        })
        .catch(err => {
          this.setState({ loading: false });
          alert(err.code);
        });
    } else {
      alert("Enter your email!");
    }
  };
  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Dialog visible={this.state.loading}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,.7)"
          />
          <View style={{ flexDirection: "row", padding: 10 }}>
            <ActivityIndicator size="large" color="red" />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "#000", fontSize: 14 }}>Resetting password...</Text>
            </View>
          </View>
        </Dialog>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={{}}>
          <TextInput
            style={{}}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
          />
          <Button title="submit" onPress={this.forget} />
        </View>
      </View>
    );
  }
}
