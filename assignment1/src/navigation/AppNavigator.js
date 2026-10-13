import React from "react";

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerToggleButton,
} from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ActivityScreen from "../screens/ActivityScreen";
import SettingsScreen from "../screens/SettingsScreen";

import { useTheme } from "../context/ThemeContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStackNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },

        headerTintColor: colors.text,

        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",

          headerLeft: () => <DrawerToggleButton tintColor={colors.text} />,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
        }}
      />
    </Stack.Navigator>
  );
};

const ActivityStackNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },

        headerTintColor: colors.text,

        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          title: "Activities",

          headerLeft: () => <DrawerToggleButton tintColor={colors.text} />,
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStackNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },

        headerTintColor: colors.text,

        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",

          headerLeft: () => <DrawerToggleButton tintColor={colors.text} />,
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: colors.primary,

        tabBarInactiveTintColor: colors.subText,

        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Home",
        }}
      />

      <Tab.Screen
        name="ActivityTab"
        component={ActivityStackNavigator}
        options={{
          title: "Activity",
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{
          title: "Settings",
        }}
      />
    </Tab.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  const goToHome = () => {
    navigation.navigate("MainTabs", {
      screen: "HomeTab",

      params: {
        screen: "Home",
      },
    });

    navigation.closeDrawer();
  };

  const goToProfile = () => {
    navigation.navigate("MainTabs", {
      screen: "HomeTab",

      params: {
        screen: "Profile",
      },
    });

    navigation.closeDrawer();
  };

  const goToActivity = () => {
    navigation.navigate("MainTabs", {
      screen: "ActivityTab",
    });

    navigation.closeDrawer();
  };

  const goToSettings = () => {
    navigation.navigate("MainTabs", {
      screen: "SettingsTab",
    });

    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Home" onPress={goToHome} />

      <DrawerItem label="Profile" onPress={goToProfile} />

      <DrawerItem label="Activities" onPress={goToActivity} />

      <DrawerItem label="Settings" onPress={goToSettings} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          title: "Profile & Activity",
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const { theme, colors } = useTheme();

  const baseTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,

    colors: {
      ...baseTheme.colors,

      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.danger,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
