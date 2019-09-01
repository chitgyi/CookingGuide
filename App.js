import React from "React";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "react-native-vector-icons/Entypo";
import Login from "./Screens/Login";
import Loading from "./Screens/Loading";
import GuideLine from "./Screens/GuideLine";
import Splash from "./Screens/Splash";
import CatView from './Screens/CatView'

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
import categories from "./Screens/Categories";
import viewPost from "./Screens/ViewPost";
import viewSavePost from "./Screens/ViewSavedPost";
import myPost from "./Screens/Meals/MyPost";
import myPostedView from './Screens/MyPostedView'
import ViewPost from "./Screens/ViewPost";
import Search from './Screens/Search'

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
        CatView: {
            screen: CatView
        },
        ViewCatItem: {
            screen: viewSavePost
        },
        Search: {
            screen: Search
        }
    },
    { initialRouteName: "Home" }
);
const CategoriesStack = createStackNavigator({
    Categories: {
        screen: categories
    },
    CatView: {
        screen: CatView
    },
    ViewCatItem: {
        screen: viewSavePost
    }
}, { initialRouteName: "Categories" });
const VideoStack = createStackNavigator({
    Video: {
        screen: videos
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

const switchNav = createSwitchNavigator(
    { Loading, Login, Taps, GuideLine, Splash },
    { initialRouteName: "Splash" }
);

export default createAppContainer(switchNav);
