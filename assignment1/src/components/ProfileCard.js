import React from "react";

import { Image, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";

const ProfileCard = ({ name, bio, avatar }) => {
  const { colors } = useTheme();

  const firstLetter =
    name && name.length > 0 ? name.charAt(0).toUpperCase() : "?";

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <View
          style={[
            styles.fallbackAvatar,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>
      )}

      <Text
        style={[
          styles.name,
          {
            color: colors.text,
          },
        ]}
      >
        {name}
      </Text>

      <Text
        style={[
          styles.bio,
          {
            color: colors.subText,
          },
        ]}
      >
        {bio || "No bio available."}
      </Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  fallbackAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
  },

  name: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "bold",
  },

  bio: {
    marginTop: 8,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
