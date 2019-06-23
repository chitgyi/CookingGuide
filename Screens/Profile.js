import React, { Component } from "react";
import { ScrollView, Text, StatusBar, Button } from "react-native";
import firebase from "react-native-firebase";
import { ProgressDialog } from "react-native-simple-dialogs";
import { LoginManager } from "react-native-fbsdk";
import { Card, CardItem, Left, Right, Thumbnail, Icon } from "native-base";
import Icons from "react-native-vector-icons/MaterialIcons"
import Spinner from "react-native-loading-spinner-overlay";


export default class Home extends Component {
  static navigationOptions = {
    title: "Cooking Guide"
  };

  constructor(props) {
    super(props);
    this.state = { currentUser: null, loading: false };
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
        this.props.navigation.navigate("Loading")
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <ScrollView horizontal={false} style={{ padding: 5 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Spinner
          visible={this.state.loading}
          textContent={"Logging out..."}
          textStyle={{color: "#FFFFFF"}}
        />
        
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
          <CardItem bordered>
            <Left>
              <Icons name="feedback" size={30} />
              <Text style={{ marginLeft: 7, color: "#000" }}>Feedback</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
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
          <CardItem bordered>
            <Left>
              <Icons name="share" size={30} />
              <Text style={{ marginLeft: 7, color: "#000" }}>
                Share App
              </Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
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
