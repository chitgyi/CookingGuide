import React from "React";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "react-native-vector-icons/Entypo";
import Login from "./Screens/Login";
import Loading from "./Screens/Loading";

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import home from "./Screens/Home";
import profile from "./Screens/Profile";
import videos from "./Screens/Videos";
import favorite from "./Screens/Favorite";
import sendPost from "./Screens/SendPost";

const HomeStack = createStackNavigator({
  Home: {
    screen: home
  }
});
const VideoStack = createStackNavigator({
  Video: {
    screen: videos
  }
});
const FavoriteStack = createStackNavigator({
  Favorite: {
    screen: favorite
  }
});
const ProfileStack = createStackNavigator({
  Profile: {
    screen: profile
  }
});
const Taps = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => <Home name="home" size={20} />
    }
  },
  Video: {
    screen: VideoStack,
    navigationOptions: {
      tabBarLabel: "Video",
      tabBarIcon: ({ tintColor }) => <Home name="video" size={20} />
    }
  },
  Favorite: {
    screen: FavoriteStack,
    navigationOptions: {
      tabBarLabel: "Favorite",
      tabBarIcon: ({ tintColor }) => <Home name="heart" size={20} />
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => <Icon name="user" size={20} />
    }
  }
});
const SendPost = createStackNavigator({SendPost:{screen: sendPost}})
const switchNav = createSwitchNavigator(
  { Loading, Login, Taps,  SendPost},
  { initialRouteName: "Loading" }
);

export default createAppContainer(switchNav);
