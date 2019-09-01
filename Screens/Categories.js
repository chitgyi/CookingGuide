import React, { Component } from "react";
import { View, StatusBar, FlatList, ImageBackground, TouchableOpacity } from "react-native";
import { Card, CardItem, Text } from "native-base";

export default class Categories extends Component {
    static navigationOptions = {
        title: "Cooking Guide",
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/chat-4aa5c.appspot.com/o/foodTypes%2Ftype1.png?alt=media&token=9eb72b03-76bf-4315-a532-edbf1bbe6f48",
                    text: "အသား/ငါး ဟင်းများ", type: "type1"
                },
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/chat-4aa5c.appspot.com/o/foodTypes%2Ftype2.png?alt=media&token=b947bf11-a8f9-4df6-8108-7a8234f30bf4",
                    text: "အသီးအရွက် ဟင်းများ", type: "type2"
                },
                { img: "https://firebasestorage.googleapis.com/v0/b/chat-4aa5c.appspot.com/o/foodTypes%2Ftype3.png?alt=media&token=3ac27968-c6b1-47fd-837b-8adb29073fb0",
                text: "အသုတ်စုံပြုလုပ်နည်းများ", type: "type3" },
                { img: "https://firebasestorage.googleapis.com/v0/b/chat-4aa5c.appspot.com/o/foodTypes%2Ftype4.png?alt=media&token=6494b341-88ad-46a1-936d-3ce21a37395c",
                text: "အသား/ငါး ကြော်/ပေါင်း", type: "type4" },
                { img: "https://firebasestorage.googleapis.com/v0/b/chat-4aa5c.appspot.com/o/foodTypes%2Ftype5.png?alt=media&token=9b6765ea-e2db-496c-ba9b-15f51da490b0",
                text: "မုန့်လုပ်နည်းများ", type: "type5" },
                { img: "https://firebasestorage.googleapis.com/v0/b/chat-4aa5c.appspot.com/o/foodTypes%2Ftype6.png?alt=media&token=803e7eac-8a2d-4ff1-b3e3-93c62d8af309",
                text: "ဟင်းရည်လုပ်နည်းများ", type: "type6" }]
        };
    }
    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <FlatList numColumns={2} data={this.state.data} renderItem={({ item }) => (
                    <Card style={{ flex: 1, padding: 5 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("CatView", {
                                    details: item
                                })
                            }
                            }
                        >
                            <CardItem cardBody>
                                <ImageBackground
                                    source={{uri: item.img}}
                                    resizeMode="cover"
                                    imageStyle={{ opacity: .3 }}
                                    resizeMethod="auto"
                                    style={{ width: 180, height: 150, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,.5)" }}
                                >
                                    <Text style={{ color: "#fff", padding: 5, fontSize: 16, textAlign: "justify" }}>{item.text}</Text>
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
