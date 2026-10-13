import React, { createContext, useContext, useEffect, useState } from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileContext = createContext(null);

const DEFAULT_PROFILE = {
  name: "Phan Van Cuong",
  bio: "Software Engineering Student",
  avatar: "",
};

const PROFILE_KEY = "@mma301_profile";

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);

      if (savedProfile !== null) {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile(parsedProfile);
      }
    } catch (error) {
      console.warn("Load profile error:", error);

      setProfile(DEFAULT_PROFILE);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (newProfile) => {
    try {
      setProfile(newProfile);

      const jsonProfile = JSON.stringify(newProfile);

      await AsyncStorage.setItem(PROFILE_KEY, jsonProfile);

      return true;
    } catch (error) {
      console.warn("Save profile error:", error);

      return false;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
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
