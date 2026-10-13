# Design Decision Record

## MMA301 Assignment 1 - Profile & Activity App

This document records important technical decisions used in the project.

---

# DD01 - Navigation Architecture

## Decision

Use nested navigation:

- Drawer Navigator
- Bottom Tab Navigator
- Native Stack Navigator

## Reason

The application has three main areas:

- Home
- Activity
- Settings

Bottom Tabs allow users to quickly switch between these main areas.

Drawer Navigation provides an additional global navigation menu.

Stack Navigation is used for hierarchical workflows:

```text
Home
-> Profile
-> Edit Profile
```

## Trade-off

Nested navigation is more difficult to understand than a single Stack Navigator.

Developers must understand:

- parent navigator
- child navigator
- nested routes
- `navigation.getParent()`

## Impact if Requirement Changes

If the application becomes simpler, Drawer Navigation can be removed.

If more main modules are added, new Bottom Tab or Drawer destinations can be created.

---

# DD02 - Profile Shared State

## Decision

Store the saved Profile object inside ProfileContext.

## Reason

Profile information is used by multiple screens.

HomeScreen requires the user's name.

ProfileScreen displays the full Profile.

EditProfileScreen reads and modifies Profile.

Context provides one shared source of truth.

## Trade-off

Components consuming ProfileContext re-render when Profile changes.

This is acceptable for the small assignment scope.

## Impact if Requirement Changes

Any new screen requiring Profile can use:

```js
useProfile();
```

without creating duplicated Profile state.

---

# DD03 - Edit Profile Local State

## Decision

Keep temporary Edit Profile values as local state inside EditProfileScreen.

## Local State

```text
name
bio
avatar
errors
saving
```

## Reason

These values only belong to the current form editing process.

The shared Profile should only change after validation succeeds and the user presses Save.

## Trade-off

The Edit Profile form temporarily contains a copy of Profile data.

## Impact if Requirement Changes

If unfinished Profile drafts must be shared across screens, draft state can be moved into Context or a custom hook.

---

# DD04 - Theme Shared State

## Decision

Use ThemeContext to manage application theme.

## Reason

Theme affects the entire application.

Many screens and components require:

```text
theme
colors
```

Context allows a single theme change to update all consumers.

## Trade-off

Theme changes cause ThemeContext consumers to re-render.

For the current application size, this cost is acceptable.

## Impact if Requirement Changes

ThemeContext can later support:

```text
light
dark
system
```

---

# DD05 - Profile Persistence

## Decision

Use AsyncStorage to persist Profile.

## Storage Key

```text
@mma301_profile
```

## Reason

Profile is a small amount of local data.

The Assignment does not require a backend.

## Serialization

Before storing:

```js
JSON.stringify(profile);
```

When loading:

```js
JSON.parse(savedProfile);
```

## Trade-off

AsyncStorage is not appropriate for sensitive information or complex relational data.

## Impact if Requirement Changes

If Profile data later comes from a backend, ProfileContext can use an API/service instead of AsyncStorage.

---

# DD06 - Theme Persistence

## Decision

Use AsyncStorage to persist Theme.

## Storage Key

```text
@mma301_theme
```

## Reason

Theme is a small application preference that should remain after restart.

## Trade-off

Theme preference is stored only locally.

## Impact if Requirement Changes

Theme preference can later be synchronized with a backend account.

---

# DD07 - Persistence Logic Location

## Decision

Keep AsyncStorage logic directly inside:

```text
ProfileContext.js
ThemeContext.js
```

## Reason

Only two pieces of data require persistence:

- Profile
- Theme

Keeping the persistence logic close to the state owner makes the application easier to understand.

Current flow:

```text
ProfileContext
-> AsyncStorage
```

instead of:

```text
ProfileContext
-> Storage Helper
-> AsyncStorage
```

## Trade-off

Some AsyncStorage logic may be duplicated.

## Impact if Requirement Changes

If more persistent data is added, storage logic should be extracted into:

```text
storage/
```

or:

```text
services/
```

---

# DD08 - Activity Local State

## Decision

Keep Activities as local state inside ActivityScreen.

## Reason

Only ActivityScreen currently needs the Activity collection.

Creating global Context for data used by only one screen would add unnecessary complexity.

## Trade-off

Activity state is not persisted after application restart.

## Impact if Requirement Changes

If multiple screens require Activities, ActivityContext can be introduced.

If Activities must survive restart, AsyncStorage can be added.

---

# DD09 - FlatList

## Decision

Use FlatList to display Activities.

## Reason

Activities are represented as a flat collection.

Activity model:

```js
{
  id: "1",
  title: "Coding",
  completed: false
}
```

FlatList provides:

- efficient collection rendering
- `data`
- `renderItem`
- `keyExtractor`
- `ListEmptyComponent`

## Trade-off

FlatList does not directly support grouped sections.

## Impact if Requirement Changes

If Activities must be grouped by category or date, FlatList can be replaced by SectionList.

---

# DD10 - Immutable Activity Update

## Decision

Update Activity state using `map()` and new objects.

Example:

```js
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
```

## Reason

React state should not be mutated directly.

Creating a new array and object allows React to detect state changes reliably.

## Trade-off

A new array is created for each update.

For the small Activity list, the cost is negligible.

## Impact if Requirement Changes

The same immutable update approach can be used for:

- deleting Activities
- editing Activities
- adding Favorites
- filtering Activities

---

# DD11 - Reusable Components

## Decision

Create reusable components:

- AppButton
- ProfileCard
- ActivityItem

## Reason

Screens should focus on screen-level behavior.

Components should focus on reusable presentation.

Example:

```text
HomeScreen
-> decides what happens when a button is pressed

AppButton
-> decides how the button is rendered
```

## Trade-off

Creating too many very small components can make a small project harder to navigate.

## Impact if Requirement Changes

Shared UI changes can be made in one component rather than modifying multiple screens.

---

# DD12 - Theme Constants

## Decision

Store theme color definitions inside:

```text
src/constants/theme.js
```

## Reason

Color definitions are constants, not state.

ThemeContext manages which theme is active.

`theme.js` only defines available color values.

## Impact if Requirement Changes

Additional themes or colors can be added without changing screen logic.

---

# DD13 - Profile Fallback

## Decision

Use DEFAULT_PROFILE when stored Profile data is:

- missing
- corrupted
- invalid

## Reason

Local storage cannot be assumed to always contain valid data.

The application must remain usable even if stored data is damaged.

## Impact if Requirement Changes

Future versions may implement storage migration or data repair.

---

# DD14 - Theme Fallback

## Decision

Use Light theme when stored Theme is missing or invalid.

## Reason

The application must always have a valid theme value.

## Impact if Requirement Changes

System Theme may later become the default fallback.

---

# Design Summary

The project follows the principle:

```text
Data
-> State Owner
-> Screen
-> Reusable Component
-> UI
```

Shared state:

```text
Profile -> ProfileContext
Theme   -> ThemeContext
```

Local state:

```text
Edit Form -> EditProfileScreen
Activities -> ActivityScreen
```
