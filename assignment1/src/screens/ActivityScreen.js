import React, { useState } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import ActivityItem from "../components/ActivityItem";
import AppButton from "../components/AppButton";

import { INITIAL_ACTIVITIES } from "../data/activities";

import { useTheme } from "../context/ThemeContext";

const ActivityScreen = () => {
  const { colors } = useTheme();

  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  const toggleActivity = (id) => {
    setActivities((previousActivities) =>
      previousActivities.map((activity) => {
        if (activity.id === id) {
          return {
            ...activity,
            completed: !activity.completed,
          };
        }

        return activity;
      }),
    );
  };

  const clearActivities = () => {
    setActivities([]);
  };

  const resetActivities = () => {
    setActivities(
      INITIAL_ACTIVITIES.map((activity) => ({
        ...activity,
      })),
    );
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
        My Activities
      </Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityItem
            activity={item}
            onPress={() => toggleActivity(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text
              style={[
                styles.emptyText,
                {
                  color: colors.subText,
                },
              ]}
            >
              No activities available.
            </Text>

            <AppButton title="Reset Activities" onPress={resetActivities} />
          </View>
        }
        contentContainerStyle={
          activities.length === 0 ? styles.emptyList : undefined
        }
      />

      {activities.length > 0 && (
        <AppButton
          title="Clear List"
          variant="secondary"
          onPress={clearActivities}
        />
      )}
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  emptyList: {
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 16,
  },
});
