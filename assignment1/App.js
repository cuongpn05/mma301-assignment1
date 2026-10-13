import "react-native-gesture-handler";

import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppNavigator from "./src/navigation/AppNavigator";

import { ProfileProvider } from "./src/context/ProfileContext";

import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProfileProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </ProfileProvider>
    </GestureHandlerRootView>
  );
}
