import React from "React";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "react-native-vector-icons/Entypo";
import Login from "./Screens/Auth/Login";
import Loading from "./Screens/Loading";
import GuideLine from "./Screens/GuideLine";
import Splash from "./Screens/Splash";
import CatView from "./Screens/Categories/CatView";
import Register from "./Screens/Auth/Register";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import home from "./Screens/Home/Home";
import profile from "./Screens/Profile/Profile";
import fguide from "./Screens/FGuide/FGuide";
import favorite from "./Screens/Saved/Favorite";
import sendPost from "./Screens/Home/CreateMeal";
import categories from "./Screens/Categories/Categories";
import viewSavePost from "./Screens/Saved/ViewSavedPost";
import myPost from "./Screens/Profile/MyPost";
import myPostedView from "./Screens/Profile/MyPostedView";
import Search from "./Screens/Home/Search";
import forget from "./Screens/Auth/Forget";
import feedback from "./Screens/Profile/Feedback";
import about from "./Screens/Profile/About";
import viewPost from "./Screens/Home/ViewPost";
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: home
    },
    ViewPost: {
      screen: viewPost
    },
    SendPost: {
      screen: sendPost
    },
    Search: {
      screen: Search
    },
    CatView: {
      screen: CatView
    },
    ViewCatItem: {
      screen: viewPost
    }
  },
  { initialRouteName: "Home" }
);
const CategoriesStack = createStackNavigator(
  {
    Categories: {
      screen: categories
    },
    CatView: {
      screen: CatView
    },
    ViewCatItem: {
      screen: viewPost
    }
  },
  { initialRouteName: "Categories" }
);
const FGuideStack = createStackNavigator({
  FGuide: {
    screen: fguide
  }
});
const FavoriteStack = createStackNavigator(
  {
    Favorite: {
      screen: favorite
    },
    ViewSavedPost: {
      screen: viewSavePost
    }
  },
  { initialRouteName: "Favorite" }
);
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: profile
    },
    MyPost: {
      screen: myPost
    },
    MyPostedView: {
      screen: myPostedView
    },
    Feedback: {
      screen: feedback
    },
    About: {
      screen: about
    }
  },
  { initialRouteName: "Profile" }
);

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
  FGuide: {
    screen: FGuideStack,
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
const ForgetStack = createStackNavigator({
  Forget: {
    screen: forget
  }
});

const switchNav = createSwitchNavigator(
  { Loading, Login, Taps, GuideLine, Splash, Register, ForgetStack },
  { initialRouteName: "Splash" }
);

export default createAppContainer(switchNav);
