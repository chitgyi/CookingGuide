import React from "React";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "react-native-vector-icons/Entypo";
import Login from "./Screens/Login";
import Loading from "./Screens/Loading";
import GuideLine from "./Screens/GuideLine"
import Splash from "./Screens/Splash"

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
import sendPost from "./Screens/CreateMeal";
import categories from './Screens/Categories'

const HomeStack = createStackNavigator({
  Home: {
    screen: home
  }
});
const CategoriesStack = createStackNavigator({
  Categories: {
    screen: categories
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
      tabBarIcon: ({ tintColor }) => (
        <Home name="home" size={20} color={tintColor} />
      )
    }
  },
  Categories: {
    screen: CategoriesStack,
    navigationOptions: {
      tabBarLabel: "Categories",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="th" size={20} color={tintColor} />
      )
    }
  },
  Video: {
    screen: VideoStack,
    navigationOptions: {
      tabBarLabel: "FGuide",
      tabBarIcon: ({ tintColor }) => (
        <Home name="video" size={20} color={tintColor} />
      )
    }
  },
  Favorite: {
    screen: FavoriteStack,
    navigationOptions: {
      tabBarLabel: "Saved",
      tabBarIcon: ({ tintColor }) => (
        <Home name="save" size={20} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={20} color={tintColor} />
      )
    }
  }
});
const SendPost = createStackNavigator({SendPost:{screen: sendPost}})
const switchNav = createSwitchNavigator(
  { Loading, Login, Taps,  SendPost, GuideLine, Splash},
  { initialRouteName: "Splash" }
);

export default createAppContainer(switchNav);
