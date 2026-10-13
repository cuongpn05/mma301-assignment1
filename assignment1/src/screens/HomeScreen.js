import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import { useProfile } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";

const HomeScreen = ({ navigation }) => {
  const { profile } = useProfile();

  const { colors } = useTheme();

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  const goToActivity = () => {
    navigation.getParent()?.navigate("ActivityTab");
  };

  const goToSettings = () => {
    navigation.getParent()?.navigate("SettingsTab");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Hello, {profile.name}
      </Text>

      <Text style={[styles.subtitle]}> Welcome to Profile & Activity App </Text>

      <View style={styles.buttonContainer}>
        <AppButton title="My Profile" onPress={goToProfile} />
        <AppButton title="My Activities" onPress={goToActivity} />
        <AppButton
          title="Settings"
          variant="secondary"
          onPress={goToSettings}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },

  buttonContainer: {
    marginTop: 32,
  },
});
