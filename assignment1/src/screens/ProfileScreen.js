import React from "react";

import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import ProfileCard from "../components/ProfileCard";

import { useProfile } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";

const ProfileScreen = ({ navigation }) => {
  const { profile } = useProfile();

  const { colors } = useTheme();

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
        My Profile
      </Text>

      <ProfileCard
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
      />

      <View style={styles.buttonContainer}>
        <AppButton
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

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

  buttonContainer: {
    marginTop: 20,
  },
});
