# Requirement Traceability Matrix

## MMA301 Assignment 1 - Profile & Activity App

This document maps each assignment requirement to the source code and test cases used as evidence.

---

## Requirement Traceability Matrix

| ID  | Requirement                                                                | Implementation Evidence                                                                                                             | Test Evidence                      |
| --- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| R01 | Expo / React Native project runs correctly                                 | `App.js`, `package.json`                                                                                                            | TC01                               |
| R02 | Navigation between at least 5 screens/areas                                | `src/navigation/AppNavigator.js`                                                                                                    | TC02, TC20, TC21                   |
| R03 | Profile displays default and persisted data                                | `src/context/ProfileContext.js`, `src/screens/ProfileScreen.js`, `src/components/ProfileCard.js`                                    | TC03, TC12                         |
| R04 | Edit Profile supports controlled input, validation, Save and Cancel        | `src/screens/EditProfileScreen.js`                                                                                                  | TC04, TC05, TC06                   |
| R05 | Theme/preference is shared using Context API                               | `src/context/ThemeContext.js`, `src/constants/theme.js`                                                                             | TC07, TC08, TC13                   |
| R06 | Activity collection uses FlatList and supports interaction and empty state | `src/screens/ActivityScreen.js`, `src/components/ActivityItem.js`, `src/data/activities.js`                                         | TC09, TC10, TC11                   |
| R07 | Profile and Theme persistence use AsyncStorage                             | `src/context/ProfileContext.js`, `src/context/ThemeContext.js`                                                                      | TC12, TC13, TC16, TC17, TC18, TC19 |
| R08 | Application uses reusable components                                       | `src/components/AppButton.js`, `src/components/ProfileCard.js`, `src/components/ActivityItem.js`                                    | TC14                               |
| R09 | UI uses StyleSheet and Flexbox                                             | `src/screens/`, `src/components/`                                                                                                   | TC15                               |
| R10 | Application handles validation, empty and storage fallback states          | `src/screens/EditProfileScreen.js`, `src/screens/ActivityScreen.js`, `src/context/ProfileContext.js`, `src/context/ThemeContext.js` | TC04, TC11, TC16, TC17, TC18, TC19 |

---

# R01 - Expo / React Native Project

## Requirement

The React Native project must install dependencies and run correctly using Expo.

## Implementation Evidence

- `App.js`
- `package.json`

## Verification

TC01 verifies:

- Expo can start
- Application can cold start
- No fatal runtime error occurs

---

# R02 - Navigation

## Requirement

The application must provide navigation between at least five screens or application areas.

## Screens

1. HomeScreen
2. ProfileScreen
3. EditProfileScreen
4. ActivityScreen
5. SettingsScreen

## Navigation Types

- Drawer Navigator
- Bottom Tab Navigator
- Native Stack Navigator

## Implementation Evidence

`src/navigation/AppNavigator.js`

## Navigation Structure

```text
NavigationContainer
        |
        v
DrawerNavigator
        |
        v
BottomTabNavigator
        |
        +----------------+----------------+
        |                |                |
        v                v                v
     HomeTab        ActivityTab      SettingsTab
        |                |                |
        v                v                v
    HomeStack      ActivityStack     SettingsStack
        |
        +-- Home
        +-- Profile
        +-- EditProfile
```

## Verification

- TC02
- TC20
- TC21

---

# R03 - Profile Display

## Requirement

The application must display Profile information.

## Profile Fields

- name
- bio
- avatar

## Implementation Evidence

- `src/context/ProfileContext.js`
- `src/screens/ProfileScreen.js`
- `src/components/ProfileCard.js`

## Verification

- TC03 verifies normal Profile display
- TC12 verifies persisted Profile display after restart

---

# R04 - Edit Profile and Validation

## Requirement

Edit Profile must provide:

- Controlled inputs
- Validation
- Save
- Cancel

## Validation Rules

### Name

- Required
- Minimum 2 characters

### Bio

- Maximum 150 characters

### Avatar

- Optional
- Must begin with `http://` or `https://` when provided

## Implementation Evidence

`src/screens/EditProfileScreen.js`

## Verification

- TC04 - Invalid Name
- TC05 - Valid Profile Update
- TC06 - Cancel Edit

---

# R05 - Shared Theme

## Requirement

Theme/preference must be shared application-wide using Context API.

## Implementation Evidence

- `src/context/ThemeContext.js`
- `src/constants/theme.js`

## Shared Values

```text
theme
colors
toggleTheme()
```

## Verification

- TC07
- TC08
- TC13

---

# R06 - Activity Collection

## Requirement

Activity/Interests collection must use FlatList or SectionList.

## Implementation

ActivityScreen uses FlatList with:

- `data`
- `renderItem`
- `keyExtractor`
- `ListEmptyComponent`

Users can toggle the completed state of an Activity.

## Implementation Evidence

- `src/screens/ActivityScreen.js`
- `src/components/ActivityItem.js`
- `src/data/activities.js`

## Verification

- TC09 - Normal Activity List
- TC10 - Activity Interaction
- TC11 - Empty Activity List

---

# R07 - Persistence

## Requirement

Profile and Theme must persist after application restart.

## Technology

AsyncStorage

## Storage Keys

```text
@mma301_profile
@mma301_theme
```

## Implementation Evidence

- `src/context/ProfileContext.js`
- `src/context/ThemeContext.js`

## Verification

- TC12 - Profile Persistence
- TC13 - Theme Persistence
- TC16 - Missing Profile Storage
- TC17 - Corrupted Profile JSON
- TC18 - Invalid Profile Structure
- TC19 - Invalid Theme

---

# R08 - Reusable Components

## Requirement

The project must use reusable UI components.

## Components

- AppButton
- ProfileCard
- ActivityItem

## Implementation Evidence

- `src/components/AppButton.js`
- `src/components/ProfileCard.js`
- `src/components/ActivityItem.js`

## Verification

TC14

---

# R09 - Responsive UI

## Requirement

The application must use StyleSheet and Flexbox for basic responsive layout.

## Techniques

- `StyleSheet.create()`
- `flex`
- `flexDirection`
- `justifyContent`
- `alignItems`
- `padding`
- `margin`

## Implementation Evidence

- `src/screens/`
- `src/components/`

## Verification

TC15

---

# R10 - Error and Fallback Handling

## Requirement

The application must safely handle invalid or missing data.

## Implemented Cases

- Empty Name
- Name shorter than minimum length
- Bio longer than 150 characters
- Invalid Avatar URL
- Empty Activity list
- Missing Profile storage
- Corrupted Profile JSON
- Invalid Profile object structure
- Invalid Theme value

## Implementation Evidence

- `src/screens/EditProfileScreen.js`
- `src/screens/ActivityScreen.js`
- `src/context/ProfileContext.js`
- `src/context/ThemeContext.js`

## Verification

- TC04
- TC11
- TC16
- TC17
- TC18
- TC19

---

# RTM Summary

| Requirement | Status      |
| ----------- | ----------- |
| R01         | Implemented |
| R02         | Implemented |
| R03         | Implemented |
| R04         | Implemented |
| R05         | Implemented |
| R06         | Implemented |
| R07         | Implemented |
| R08         | Implemented |
| R09         | Implemented |
| R10         | Implemented |
