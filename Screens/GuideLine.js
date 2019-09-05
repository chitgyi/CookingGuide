import React, { Component } from "react";
import {
    Text,
    StatusBar,
    View,
    Image,
    AsyncStorage,
    StyleSheet
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    image: {
        width: 320,
        height: 320
    },
    text: {
        color: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "transparent",
        textAlign: "center",
        paddingHorizontal: 16
    },
    title: {
        fontSize: 22,
        color: "white",
        backgroundColor: "transparent",
        textAlign: "center",
        marginBottom: 16
    }
});
const slides = [
    {
        key: "1",
        title: "ဟင်းမျိူးစုံပြုလုပ်နည်းများ",
        text:
            "ဤ Application သည် ဟင်းချက်ရာတွင် အခက်အခဲမဖြစ်စေရန် ရည်ရွယ်ရေးသားထားသော Application ဖြစ်ပါသည်"
    },
    {
        key: "2",
        title: "မုန့်မျိုးစုံပြုလုပ်နည်းများ",
        text:
            "အစားအ ေသာက်မျိုစုံပြုလုပ်နည်းများကို တစ်နေရာတည်းတွင် ရရှိနိုင်ပါသည်။ မိမိတို့ကိုယ်တိုင်ချက်နည်းများကိုလည်း မျှဝေသုံးစွဲနိုင်အောင်ပြုလုပ်ပေးပါသည်။"
    },
    {
        key: "3",
        title: "အစားအသောက်အတွက်ဆောင်ရန်ရှောင်ရန်များ",
        text:
            "အစားအသောက်အတွက် ဘေးဥပါလ်မဖြစ်စေရန်‌ ဆောင်ရန်ရှောင်ရန်များကိုလည်း အစုံအလင်ထည့်သွင်းပေးပါသည်။"
    }
];

export default class GuideLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLaunch: null
        };
    }

    _renderItem = item => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#a00bd6"
                }}
            >
                <Icon name="restaurant" size={100} color="white" />
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        backgroundColor: "transparent",
                        textAlign: "center",
                        marginTop: 20,
                        marginBottom: 25
                    }}
                >

                    {item.title}
                </Text>

                <Text
                    style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        backgroundColor: "transparent",
                        textAlign: "justify",
                        paddingHorizontal: 16
                    }}
                >
                    {item.text}
                </Text>
            </View>
        );
    };

    _onDone = () => {
        AsyncStorage.setItem("launched", "yes").then(() => {
            this.props.navigation.navigate("Loading");
        });
    };
    render() {
        return (
            <View style={{ backgroundColor: "#a00bd6", flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor="#a00bd6" />
                <AppIntroSlider
                    renderItem={this._renderItem}
                    slides={slides}
                    onDone={this._onDone}
                    showSkipButton
                    onSkip={this._onDone}
                    renderDoneBottom={this._renderBottom}
                />
            </View>
        );
    }
}
