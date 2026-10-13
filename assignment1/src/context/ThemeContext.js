import React, { createContext, useContext, useEffect, useState } from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { lightColors, darkColors } from "../constants/theme";

const ThemeContext = createContext(null);

const THEME_KEY = "@mma301_theme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);

      if (savedTheme === "dark") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } catch (error) {
      console.warn("Load theme error:", error);

      setTheme("light");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === "light" ? "dark" : "light";

      setTheme(newTheme);

      await AsyncStorage.setItem(THEME_KEY, newTheme);

      return true;
    } catch (error) {
      console.warn("Save theme error:", error);

      return false;
    }
  };

  const colors = theme === "dark" ? darkColors : lightColors;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
