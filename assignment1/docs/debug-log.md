# Debug Log

## MMA301 Assignment 1 - Profile & Activity App

This document records real problems found during development and requirement verification.

Debugging process used:

```text
Symptom
-> Hypothesis
-> Investigation
-> Root Cause
-> Fix
-> Retest
-> Regression Check
```

---

# Debug Record 1

## Bug Title

Invalid Profile Structure Was Accepted from AsyncStorage

## Date

30/09/2026

## Related Requirement

```text
R07 - Persistence
R10 - Error / Fallback Handling
TC18 - Invalid Profile Structure
```

## Symptom

The application could load valid JSON from AsyncStorage even when the stored object did not contain the required Profile fields.

Example invalid stored value:

```json
{
  "abc": 123
}
```

`JSON.parse()` succeeded because the value was valid JSON.

However, the object did not contain:

```text
name
bio
avatar
```

The application could therefore use an invalid object as Profile state instead of falling back to `DEFAULT_PROFILE`.

---

## Initial Hypothesis

The problem was probably not caused by `JSON.parse()` because the JSON syntax was valid.

The suspected problem was that `ProfileContext` only checked whether parsing succeeded and did not validate the structure of the parsed object.

---

## Investigation

### File Checked

```text
src/context/ProfileContext.js
```

### Storage Key

```text
@mma301_profile
```

### Values Checked

Expected Profile:

```json
{
  "name": "Phan Van Cuong",
  "bio": "Software Engineering Student",
  "avatar": ""
}
```

Invalid stored Profile:

```json
{
  "abc": 123
}
```

### Investigation Steps

1. Reviewed `loadProfile()`.
2. Checked the value returned from AsyncStorage.
3. Checked the `JSON.parse()` result.
4. Confirmed that valid JSON was immediately passed to `setProfile()`.
5. Confirmed there was no object structure validation.

---

## Root Cause

The previous implementation only handled JSON parsing errors.

Previous logic:

```js
const parsedProfile = JSON.parse(savedProfile);

setProfile(parsedProfile);
```

Valid JSON with an incorrect structure did not throw an exception.

Therefore, the `catch` block was never executed.

---

## Fix

A Profile validation function was added.

### Before

```js
const parsedProfile = JSON.parse(savedProfile);

setProfile(parsedProfile);
```

### After

```js
const isValidProfile = (value) => {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.name === "string" &&
    typeof value.bio === "string" &&
    typeof value.avatar === "string"
  );
};
```

The loaded value is now checked before updating state:

```js
const parsedProfile = JSON.parse(savedProfile);

if (!isValidProfile(parsedProfile)) {
  console.warn(
    "Invalid profile structure in AsyncStorage. Using default profile.",
  );

  setProfile(DEFAULT_PROFILE);

  return;
}

setProfile(parsedProfile);
```

---

## Retest Procedure

1. Store the following value under `@mma301_profile`:

```json
{
  "abc": 123
}
```

2. Restart the application.
3. Open Profile.
4. Check whether `DEFAULT_PROFILE` is displayed.
5. Confirm the application does not crash.

## Expected Retest Result

```text
DEFAULT_PROFILE is displayed.
Application does not crash.
Invalid stored object is rejected.
```

## Actual Retest Result

```text
REPLACE THIS LINE AFTER RUNNING TC18
```

## Status

```text
CHANGE TO PASS ONLY AFTER ACTUAL RETEST
```

## Regression Check

After fixing the issue, also verify:

```text
TC03 - Profile Read
TC05 - Valid Profile Update
TC12 - Profile Persistence
TC16 - Missing Profile Storage
TC17 - Corrupted Profile JSON
TC18 - Invalid Profile Structure
```

---

# Debug Record 2

## Bug Title

Home Subtitle Did Not Follow Dark Theme

## Date

30/09/2026

## Related Requirement

```text
R05 - Application-wide Theme
TC07 - Dark Theme
```

## Symptom

When Dark Mode was enabled, the HomeScreen background and title used theme colors, but the subtitle did not explicitly use a ThemeContext color.

The subtitle was:

```text
Welcome to Profile & Activity App
```

This could make its color inconsistent or difficult to read in Dark Mode.

---

## Initial Hypothesis

ThemeContext was working because:

- Home background changed
- Home title changed
- Other components used theme colors

Therefore, the problem was suspected to be local to the subtitle styling.

---

## Investigation

### File Checked

```text
src/screens/HomeScreen.js
```

### State Checked

```text
colors.background
colors.text
colors.subText
```

### Investigation Steps

1. Opened `HomeScreen.js`.
2. Checked the root View styling.
3. Confirmed `colors.background` was used.
4. Checked the title styling.
5. Confirmed `colors.text` was used.
6. Checked the subtitle styling.
7. Found that the subtitle used only `styles.subtitle`.

---

## Root Cause

The subtitle did not consume the current theme color.

### Before

```jsx
<Text style={[styles.subtitle]}>Welcome to Profile & Activity App</Text>
```

There was no:

```js
color: colors.subText;
```

Therefore, the subtitle was not explicitly connected to the application theme.

---

## Fix

### After

```jsx
<Text
  style={[
    styles.subtitle,
    {
      color: colors.subText,
    },
  ]}
>
  Welcome to Profile & Activity App
</Text>
```

---

## Retest Procedure

1. Start the application in Light Mode.
2. Open HomeScreen.
3. Check the subtitle.
4. Open Settings.
5. Enable Dark Mode.
6. Return to HomeScreen.
7. Check the subtitle again.
8. Open Profile and Activity to check related theme behavior.

## Expected Retest Result

```text
Home subtitle uses the correct color in both Light and Dark themes.
The text remains readable.
```

## Actual Retest Result

```text
REPLACE THIS LINE AFTER RUNNING TC07
```

## Status

```text
CHANGE TO PASS ONLY AFTER ACTUAL RETEST
```

## Regression Check

Also verify:

```text
TC07 - Dark Theme
TC08 - Light Theme
TC13 - Theme Persistence
TC15 - Responsive Layout
```

---

# Debugging Summary

| Bug                       | Root Cause                                                 | Fix                                             |
| ------------------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| Invalid Profile Structure | Parsed JSON was accepted without validating Profile fields | Added Profile structure validation and fallback |
| Home subtitle theme       | Subtitle did not use ThemeContext color                    | Added `colors.subText`                          |

---

# Debugging Checklist

- [x] Real bug identified
- [x] Symptom described
- [x] Initial hypothesis recorded
- [x] Investigation documented
- [x] Root cause identified
- [x] Source fix documented
- [ ] Retest performed on emulator/device
- [ ] Regression tests performed
- [ ] Final PASS results recorded

The last three items must only be checked after the application has actually been executed and tested.
