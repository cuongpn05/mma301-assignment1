import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "../context/ThemeContext";

const ActivityItem = ({ activity, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.checkbox,
          {
            borderColor: colors.primary,
            backgroundColor: activity.completed
              ? colors.primary
              : "transparent",
          },
        ]}
      >
        {activity.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>

      <Text
        style={[
          styles.title,
          {
            color: colors.text,

            textDecorationLine: activity.completed ? "line-through" : "none",
          },
        ]}
      >
        {activity.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  checkmark: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  title: {
    fontSize: 16,
    marginLeft: 14,
  },
});
