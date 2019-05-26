import React, { Component } from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Card,
  CardItem,
  Left,
  Right,
  Text,
  Body,
  Thumbnail,
  Button
} from "native-base";

export default class CardViewItem extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  activeHeart = () => {
    alert(1);
    this.setState({ active: !true });
  };
  render() {
    return (
      <Card>
        <CardItem >
          <Left>
            <Thumbnail source={{ uri: this.props.photoUrl }} />
            <Body>
              <Text>User</Text>
              <Text note>2 August, 2019</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: this.props.photoUrl }}
            resizeMode="contain"
            style={{ height: 230, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{fontSize: 16, fontWeight: "bold"}}>
             Specified food title
            </Text>
            <Text style={{fontSize: 14}}>
              Cooking details and guides. You can cook from this cooking guide...
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Icon
              name={this.state.active ? "heart" : "heart-outline"}
              color={this.state.active? "red": "#333"}
              size={35}
              onPress={() => {
                this.setState({ active: !this.state.active });
              }}
            />
            <Text>45 likes</Text>
            <Icon
              style={{marginLeft: 7}}
              name="bookmark"
              size={35}
              onPress={() => {
                this.activeHeart;
              }}
            />
          </Left>
          <Right>
            <Icon name="comment-alert" size={30} />
          </Right>
        </CardItem>
      </Card>
    );
  }
}
