import React, { useState } from "react";

import { StyleSheet, Switch, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";

const SettingsScreen = () => {
  const { theme, colors, toggleTheme } = useTheme();

  const [error, setError] = useState("");

  const handleToggleTheme = async () => {
    setError("");

    const saved = await toggleTheme();

    if (!saved) {
      setError("Unable to save theme preference.");
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        Settings
      </Text>

      <View
        style={[
          styles.settingCard,
          {
            backgroundColor: colors.card,

            borderColor: colors.border,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.settingTitle,
              {
                color: colors.text,
              },
            ]}
          >
            Dark Mode
          </Text>

          <Text
            style={[
              styles.settingDescription,
              {
                color: colors.subText,
              },
            ]}
          >
            Current theme: {theme}
          </Text>
        </View>

        <Switch value={theme === "dark"} onValueChange={handleToggleTheme} />
      </View>

      {error ? (
        <Text
          style={[
            styles.error,
            {
              color: colors.danger,
            },
          ]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
  },

  settingCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  settingTitle: {
    fontSize: 17,
    fontWeight: "600",
  },

  settingDescription: {
    marginTop: 4,
    fontSize: 14,
  },

  error: {
    marginTop: 12,
  },
});
