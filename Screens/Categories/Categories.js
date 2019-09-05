import React, { Component } from "react";
import {
  View,
  StatusBar,
  FlatList,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Card, CardItem, Text } from "native-base";

export default class Categories extends Component {
  static navigationOptions = {
    title: "Cooking Guide"
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          img: require("./../../Images/type1.png"),
          text: "အသား/ငါး ဟင်းများ",
          type: "type1"
        },
        {
          img: require("./../../Images/type2.png"),
          text: "အသီးအရွက် ဟင်းများ",
          type: "type2"
        },
        {
          img: require("./../../Images/type3.png"),
          text: "အသုတ်စုံပြုလုပ်နည်းများ",
          type: "type3"
        },
        {
          img: require("./../../Images/type4.png"),
          text: "အသား/ငါး ကြော်/ပေါင်း",
          type: "type4"
        },
        {
          img: require("./../../Images/type5.png"),
          text: "မုန့်လုပ်နည်းများ",
          type: "type5"
        },
        {
          img: require("./../../Images/type6.png"),
          text: "ဟင်းရည်လုပ်နည်းများ",
          type: "type6"
        }
      ]
    };
  }
  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <FlatList
          numColumns={2}
          data={this.state.data}
          renderItem={({ item }) => (
            <Card style={{ flex: 1, padding: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("CatView", {
                    details: item
                  });
                }}
              >
                <CardItem cardBody>
                  <ImageBackground
                    source={item.img}
                    resizeMode="cover"
                    imageStyle={{ opacity: 0.3 }}
                    resizeMethod="auto"
                    style={{
                      width: 180,
                      height: 150,
                      justifyContent: "flex-end",
                      backgroundColor: "rgba(0,0,0,.5)"
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        padding: 5,
                        fontSize: 16,
                        textAlign: "justify"
                      }}
                    >
                      {item.text}
                    </Text>
                  </ImageBackground>
                </CardItem>
              </TouchableOpacity>
            </Card>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
