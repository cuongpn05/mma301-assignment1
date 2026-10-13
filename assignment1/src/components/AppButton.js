import React from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useTheme } from "../context/ThemeContext";

const AppButton = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}) => {
  const { colors } = useTheme();

  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isPrimary ? colors.primary : colors.card,

          borderColor: colors.primary,

          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          {
            color: isPrimary ? "#FFFFFF" : colors.primary,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    marginVertical: 6,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
