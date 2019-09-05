import React, { Component } from "react";
import {
  ScrollView,
  Text,
  StatusBar,
  Button,
  TouchableOpacity
} from "react-native";
import firebase from "react-native-firebase";
import { LoginManager } from "react-native-fbsdk";
import { Card, CardItem, Left, Right, Thumbnail, Icon } from "native-base";
import Icons from "react-native-vector-icons/MaterialIcons";
import Spinner from "react-native-loading-spinner-overlay";
var nav;
export default class Home extends Component {
  static navigationOptions = {
    title: "Cooking Guide"
  };

  constructor(props) {
    super(props);
    this.state = { currentUser: null, loading: false };
    nav = this;
  }
  componentDidMount() {
    // firebase.auth().currentUser.updateProfile({ displayName: "Chit Gyi" });
    this.setState({
      currentUser: firebase.auth().currentUser
    });
  }

  signOutUser = () => {
    try {
      setTimeout(() => {
        firebase.auth().signOut();
        LoginManager.logOut();
        this.setState({ loading: false });
        this.props.navigation.navigate("Loading");
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };
  _myPost = () => {
    this.props.navigation.navigate("MyPost");
  };
  _about = () => {
    this.props.navigation.navigate("About");
  };
  _feedback = () => {
    this.props.navigation.navigate("Feedback");
  };

  render() {
    return (
      <ScrollView horizontal={false} style={{ padding: 5 }}>
        <Spinner
          visible={this.state.loading}
          textContent={"Logging out..."}
          textStyle={{ color: "#FFFFFF" }}
        />
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Card>
          <CardItem>
            <Left>
              <Thumbnail
                source={{ uri: firebase.auth().currentUser.photoURL }}
              />
              <Text style={{ marginLeft: 10, color: "#000", fontSize: 18 }}>
                {firebase.auth().currentUser.displayName}
              </Text>
            </Left>
          </CardItem>
        </Card>
        <Card>
          <TouchableOpacity onPress={this._myPost}>
            <CardItem bordered>
              <Left>
                <Icons name="restaurant-menu" size={30} />
                <Text style={{ marginLeft: 7, color: "#000" }}>
                  Your Recipes
                </Text>
              </Left>

              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._feedback}>
            <CardItem bordered>
              <Left>
                <Icons name="feedback" size={30} />
                <Text style={{ marginLeft: 7, color: "#000" }}>Feedback</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._about}>
          <CardItem bordered>
            <Left>
              <Icons name="error" size={30} />
              <Text style={{ marginLeft: 7, color: "#000" }}>
                About Developer
              </Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          </TouchableOpacity>
         
        </Card>
        {/* <Text> Profile {JSON.stringify(this.state.currentUser)+this.state.loading} woo</Text> */}
        <Button
          title="Logout"
          onPress={() => {
            this.setState({ loading: true });
            this.signOutUser();
            //this.signOutUser();
            //this.setState({loading: false})
          }}
        />
      </ScrollView>
    );
  }
}
