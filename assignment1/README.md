# MMA301 Assignment 1

## Profile & Activity App

## 1. Project Overview

Profile & Activity App is a React Native application developed with Expo for MMA301 Assignment 1.

The application demonstrates fundamental React Native concepts including:

- Multi-screen navigation
- Drawer Navigation
- Bottom Tab Navigation
- Stack Navigation
- Reusable Components
- Local State
- Context API
- Controlled Forms
- Form Validation
- FlatList
- AsyncStorage
- Light/Dark Theme
- Persistent Data
- Error and Fallback Handling

The application allows users to view and edit a personal profile, manage an activity list, and change the application theme.

---

## 2. Main Features

### 2.1 Home

HomeScreen is the main entry screen of the application.

It:

- Displays a welcome message
- Reads the user's name from ProfileContext
- Provides navigation to Profile
- Provides navigation to Activities
- Provides navigation to Settings

---

### 2.2 Profile

ProfileScreen displays the user's personal information.

Displayed information includes:

- Name
- Bio
- Avatar

If no avatar URL is available, the application displays a fallback avatar using the first letter of the user's name.

Profile data is provided by ProfileContext.

---

### 2.3 Edit Profile

EditProfileScreen allows users to modify profile information.

Editable fields:

- Name
- Bio
- Avatar URL

The screen uses controlled inputs.

Validation rules:

- Name is required
- Name must contain at least 2 characters
- Bio must not exceed 150 characters
- Avatar is optional
- If Avatar is provided, it must begin with `http://` or `https://`

If validation fails:

- An error message is displayed
- ProfileContext is not updated
- AsyncStorage is not updated

If validation succeeds:

- The profile is saved
- ProfileContext is updated
- ProfileScreen displays the new data

The Cancel action discards temporary form changes.

---

### 2.4 Activity

ActivityScreen displays an activity collection using FlatList.

Each activity contains:

```js
{
  id: "1",
  title: "Coding",
  completed: false
}
```

The screen supports:

- Displaying activities
- Marking activities as completed
- Marking completed activities as incomplete
- Clearing all activities
- Displaying an empty state
- Restoring the initial activity list

Activity state is local to ActivityScreen because no other screen currently requires the activity collection.

---

### 2.5 Settings

SettingsScreen allows users to change the application theme.

Supported themes:

- Light
- Dark

Theme state is managed by ThemeContext.

When the user changes the theme:

1. ThemeContext updates the shared state
2. Components consuming ThemeContext re-render
3. The new theme is applied application-wide
4. The theme value is stored in AsyncStorage

The saved theme is restored when the application starts again.

---

## 3. Screen List

The application contains at least five required screens:

1. HomeScreen
2. ProfileScreen
3. EditProfileScreen
4. ActivityScreen
5. SettingsScreen

---

## 4. Navigation Structure

The application uses nested navigation.

Three navigation types are used:

- Drawer Navigator
- Bottom Tab Navigator
- Native Stack Navigator

Navigation structure:

```text
NavigationContainer
        |
        v
DrawerNavigator
        |
        v
BottomTabNavigator
        |
        +--------------------+--------------------+
        |                    |                    |
        v                    v                    v
     HomeTab            ActivityTab          SettingsTab
        |                    |                    |
        v                    v                    v
   HomeStack           ActivityStack         SettingsStack
        |
        +-- Home
        |
        +-- Profile
        |
        +-- EditProfile
```

### Drawer Navigation

Drawer Navigation provides global access to:

- Home
- Profile
- Activities
- Settings

The Drawer can be opened using the menu button in the top-left corner.

### Bottom Tab Navigation

Bottom Tabs provide quick access to the three main areas:

- Home
- Activity
- Settings

### Stack Navigation

Stack Navigation handles hierarchical navigation.

Example:

```text
Home
-> Profile
-> Edit Profile
```

When navigating deeper into the Stack, React Navigation automatically provides a Back button.

---

## 5. Project Structure

```text
src/
│
├── components/
│   ├── ActivityItem.js
│   ├── AppButton.js
│   └── ProfileCard.js
│
├── constants/
│   └── theme.js
│
├── context/
│   ├── ProfileContext.js
│   └── ThemeContext.js
│
├── data/
│   └── activities.js
│
├── navigation/
│   └── AppNavigator.js
│
└── screens/
    ├── ActivityScreen.js
    ├── EditProfileScreen.js
    ├── HomeScreen.js
    ├── ProfileScreen.js
    └── SettingsScreen.js
```

---

## 6. Folder Responsibilities

### `components/`

Contains reusable UI components.

#### `AppButton.js`

Reusable button component.

Responsibilities:

- Display button title
- Handle button press
- Support primary/secondary variants
- Support disabled state
- Apply theme colors

#### `ProfileCard.js`

Displays profile information.

Responsibilities:

- Display avatar
- Display fallback avatar
- Display name
- Display bio

#### `ActivityItem.js`

Displays one activity item.

Responsibilities:

- Display activity title
- Display completed state
- Trigger the callback provided by ActivityScreen

---

### `constants/`

Contains constant values used by the application.

#### `theme.js`

Defines:

- Light theme colors
- Dark theme colors

The file does not manage theme state.

ThemeContext selects which color set should be used.

---

### `context/`

Contains shared application state.

#### `ProfileContext.js`

Responsibilities:

- Maintain shared profile state
- Load saved profile from AsyncStorage
- Update profile
- Save profile to AsyncStorage
- Provide profile data to screens
- Provide safe default profile data

Consumers include:

- HomeScreen
- ProfileScreen
- EditProfileScreen

#### `ThemeContext.js`

Responsibilities:

- Maintain application theme
- Load theme from AsyncStorage
- Toggle Light/Dark theme
- Save theme preference
- Provide colors to screens/components

---

### `data/`

Contains initial application data.

#### `activities.js`

Stores the initial activity collection.

The data is imported by ActivityScreen and used as the initial state.

---

### `navigation/`

Contains application navigation configuration.

#### `AppNavigator.js`

Responsibilities:

- Configure NavigationContainer
- Configure Drawer Navigator
- Configure Bottom Tabs
- Configure Stack Navigators
- Register screens
- Configure headers
- Connect navigation with current theme

---

### `screens/`

Contains complete application screens.

#### `HomeScreen.js`

Responsibilities:

- Display Home UI
- Read shared profile
- Navigate to other application areas

#### `ProfileScreen.js`

Responsibilities:

- Read shared profile
- Display ProfileCard
- Navigate to EditProfileScreen

#### `EditProfileScreen.js`

Responsibilities:

- Manage temporary form state
- Handle TextInput
- Validate user input
- Save valid profile
- Cancel editing

#### `ActivityScreen.js`

Responsibilities:

- Maintain activity list state
- Render FlatList
- Toggle activity completion
- Clear list
- Restore activity list
- Display empty state

#### `SettingsScreen.js`

Responsibilities:

- Display theme preference
- Call ThemeContext toggleTheme
- Display theme persistence errors when necessary

---

## 7. State Management Strategy

The application uses Local State, Shared State and Persistent State.

### 7.1 Local State

Local state is used when data belongs only to one screen.

Examples:

#### EditProfileScreen

```text
name
bio
avatar
errors
saving
```

These values only exist while editing the form.

#### ActivityScreen

```text
activities
```

Activity data is currently only needed by ActivityScreen.

---

### 7.2 Shared State

Context API is used for data required by multiple screens.

#### ProfileContext

Provides:

```text
profile
updateProfile()
```

#### ThemeContext

Provides:

```text
theme
colors
toggleTheme()
```

---

### 7.3 Persistent State

AsyncStorage is used for data that must remain after application restart.

Persistent data:

- Profile
- Theme

Storage keys:

```text
@mma301_profile
@mma301_theme
```

---

## 8. Profile Data Model

Profile structure:

```js
{
  name: "Phan Van Cuong",
  bio: "Software Engineering Student",
  avatar: ""
}
```

---

## 9. Activity Data Model

Activity structure:

```js
{
  id: "1",
  title: "Coding",
  completed: false
}
```

The `id` is used by FlatList as a stable key.

---

## 10. Application Startup Flow

Application startup execution flow:

```text
npm start
-> Expo starts
-> Metro Bundler creates JavaScript bundle
-> App()
-> ProfileProvider()
-> load profile from AsyncStorage
-> restore profile or use default
-> ThemeProvider()
-> load theme from AsyncStorage
-> restore theme or use Light
-> AppNavigator()
-> NavigationContainer
-> DrawerNavigator
-> BottomTabNavigator
-> HomeStackNavigator
-> HomeScreen
-> UI displayed
```

---

## 11. Profile Flow

Profile display:

```text
AsyncStorage
-> ProfileContext
-> ProfileScreen
-> ProfileCard
-> UI
```

Profile editing:

```text
ProfileContext
-> EditProfileScreen
-> Local Form State
-> Validation
-> updateProfile()
-> AsyncStorage
-> ProfileContext
-> ProfileScreen
-> ProfileCard
-> Updated UI
```

---

## 12. Activity Flow

Initial rendering:

```text
activities.js
-> INITIAL_ACTIVITIES
-> ActivityScreen
-> useState()
-> FlatList
-> renderItem()
-> ActivityItem
-> UI
```

Activity interaction:

```text
User presses ActivityItem
-> onPress()
-> toggleActivity(id)
-> setActivities()
-> new activity array
-> ActivityScreen re-renders
-> FlatList receives new data
-> ActivityItem re-renders
-> UI updates
```

State is updated immutably using `map()` instead of directly mutating the original activity object.

---

## 13. Theme Flow

```text
SettingsScreen
-> Switch
-> toggleTheme()
-> ThemeContext
-> setTheme()
-> AsyncStorage
-> Context consumers re-render
-> UI colors update
```

---

## 14. Persistence Strategy

Profile and theme are persisted using AsyncStorage.

### Profile

Storage key:

```text
@mma301_profile
```

Before saving, the Profile object is converted to JSON using:

```js
JSON.stringify();
```

When loading, stored JSON is converted back to a JavaScript object using:

```js
JSON.parse();
```

If stored profile data is missing or invalid, the application uses a safe default profile.

### Theme

Storage key:

```text
@mma301_theme
```

Only supported theme values are accepted.

If the stored theme is missing or invalid, Light Mode is used.

---

## 15. Error and Fallback Handling

The application handles several failure cases.

### Missing Profile Storage

If no saved profile exists:

```text
DEFAULT_PROFILE
```

is used.

### Invalid/Corrupted Profile Storage

If JSON parsing fails or stored profile structure is invalid:

```text
DEFAULT_PROFILE
```

is used and the application continues without crashing.

### Invalid Theme

If theme data is not supported:

```text
light
```

is used.

### Invalid Form

Invalid Edit Profile values:

- display validation errors
- do not update profile
- do not save invalid data

### Empty Activity List

When the activity array is empty, FlatList displays:

```text
No activities available.
```

---

## 16. Reusable Components

The project uses reusable components to reduce duplicated UI code.

Reusable components:

```text
AppButton
ProfileCard
ActivityItem
```

Screens focus on screen-level responsibilities while components focus on presentation.

---

## 17. Installation

Install project dependencies:

```bash
npm install
```

---

## 18. Run the Application

Start Expo:

```bash
npx expo start
```

or:

```bash
npm start
```

If Metro cache causes problems:

```bash
npx expo start -c
```

The application can then be opened using an Android emulator or supported development device.

---

## 19. Testing

Testing evidence is documented in:

```text
docs/test-matrix.md
```

Testing covers:

- First Run
- Navigation
- Profile Read
- Invalid Profile
- Valid Profile
- Cancel Edit
- Theme Toggle
- Theme Persistence
- Activity Normal State
- Activity Interaction
- Activity Empty State
- Profile Persistence
- Missing Storage
- Corrupted Storage
- Responsive Layout

---

## 20. Debugging

Debugging evidence is documented in:

```text
docs/debug-log.md
```

The debugging process follows:

```text
Symptom
-> Hypothesis
-> Investigation
-> Root Cause
-> Fix
-> Retest
```

---

## 21. Limitations

Current application limitations:

- No backend
- No online database
- No production authentication
- Profile is stored locally only
- Activity state is not persisted
- No activity creation/editing feature
- Avatar supports URL input only
- Theme supports only Light and Dark
- No cloud synchronization
- AsyncStorage is not intended for secure sensitive information

These limitations are acceptable for the Assignment 1 scope.

---

## 22. AI Usage

AI tools were used to support:

- Assignment requirement analysis
- Project structure planning
- React Native concept explanation
- Navigation design
- State ownership explanation
- Context API explanation
- FlatList explanation
- AsyncStorage explanation
- Testing suggestions
- Debugging suggestions
- Documentation review

AI output was reviewed before being applied.

Suggested code was typed/adapted into the project and verified by running the application.

Detailed AI usage evidence is documented in:

```text
docs/ai-usage-log.md
```

---

## 23. Assignment Evidence

The final assignment evidence includes:

```text
README.md
docs/RTM.md
docs/design-decisions.md
docs/test-matrix.md
docs/debug-log.md
docs/ai-usage-log.md
```

Source code and Git history provide implementation evidence.
