import React, { useEffect, useState } from "react";

import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import AppButton from "../components/AppButton";

import { useProfile } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";

const EditProfileScreen = ({ navigation }) => {
  const { profile, updateProfile } = useProfile();

  const { colors } = useTheme();

  const [name, setName] = useState(profile.name);

  const [bio, setBio] = useState(profile.bio);

  const [avatar, setAvatar] = useState(profile.avatar);

  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setBio(profile.bio);
    setAvatar(profile.avatar);
    setErrors({});
  }, [profile]);

  const validate = () => {
    const newErrors = {};
    const cleanName = name.trim();
    const cleanBio = bio.trim();
    const cleanAvatar = avatar.trim();

    if (!cleanName) {
      newErrors.name = "Name is required.";
    } else if (cleanName.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (cleanBio.length > 150) {
      newErrors.bio = "Bio must not exceed 150 characters.";
    }

    if (
      cleanAvatar &&
      !cleanAvatar.startsWith("http://") &&
      !cleanAvatar.startsWith("https://")
    ) {
      newErrors.avatar = "Avatar must be a valid HTTP/HTTPS URL.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    const updatedProfile = {
      name: name.trim(),
      bio: bio.trim(),
      avatar: avatar.trim(),
    };

    setSaving(true);

    const saved = await updateProfile(updatedProfile);

    setSaving(false);

    if (!saved) {
      setErrors({
        general: "Unable to save profile. Please try again.",
      });

      return;
    }

    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        Edit Profile
      </Text>

      <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        Name
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor={colors.subText}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: errors.name ? colors.danger : colors.border,
            color: colors.text,
          },
        ]}
      />

      {errors.name && (
        <Text
          style={[
            styles.error,
            {
              color: colors.danger,
            },
          ]}
        >
          {errors.name}
        </Text>
      )}

      <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        Bio
      </Text>

      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Tell us about yourself"
        placeholderTextColor={colors.subText}
        multiline
        numberOfLines={4}
        style={[
          styles.input,
          styles.bioInput,
          {
            backgroundColor: colors.card,
            borderColor: errors.bio ? colors.danger : colors.border,
            color: colors.text,
          },
        ]}
      />

      <Text
        style={[
          styles.counter,
          {
            color: colors.subText,
          },
        ]}
      >
        {bio.length}/150
      </Text>

      {errors.bio && (
        <Text
          style={[
            styles.error,
            {
              color: colors.danger,
            },
          ]}
        >
          {errors.bio}
        </Text>
      )}

      <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        Avatar URL
      </Text>

      <TextInput
        value={avatar}
        onChangeText={setAvatar}
        placeholder="https://..."
        placeholderTextColor={colors.subText}
        autoCapitalize="none"
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: errors.avatar ? colors.danger : colors.border,
            color: colors.text,
          },
        ]}
      />

      {errors.avatar && (
        <Text
          style={[
            styles.error,
            {
              color: colors.danger,
            },
          ]}
        >
          {errors.avatar}
        </Text>
      )}

      {errors.general && (
        <Text
          style={[
            styles.error,
            {
              color: colors.danger,
            },
          ]}
        >
          {errors.general}
        </Text>
      )}

      <View style={styles.buttons}>
        <AppButton
          title={saving ? "Saving..." : "Save"}
          onPress={handleSave}
          disabled={saving}
        />

        <AppButton
          title="Cancel"
          variant="secondary"
          onPress={handleCancel}
          disabled={saving}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },

  bioInput: {
    height: 110,
    textAlignVertical: "top",
  },

  counter: {
    marginTop: 4,
    textAlign: "right",
  },

  error: {
    marginTop: 6,
    fontSize: 13,
  },

  buttons: {
    marginTop: 24,
  },
});
