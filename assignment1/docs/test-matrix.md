# Test Matrix

## MMA301 Assignment 1 - Profile & Activity App

This document records the executed test cases for the application.

Testing covers:

- Startup
- Navigation
- Profile
- Edit Profile
- Validation
- Theme
- Activity List
- Persistence
- Reusable Components
- Responsive Layout
- Error / Fallback Handling

---

## Test Results

| ID   | Requirement | Test Case                  | Steps                                         | Expected Result                                                  | Actual Result                                                                                                          | Status |
| ---- | ----------- | -------------------------- | --------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------ |
| TC01 | R01         | First Run                  | Clear application storage and start the app   | App starts with default Profile and Light theme without crashing | Application started successfully with the default Profile and Light theme. No crash occurred.                          | PASS   |
| TC02 | R02         | Stack Navigation           | Home → Profile → Edit Profile → Back          | Correct screens open and Back returns correctly                  | Profile and Edit Profile screens opened correctly. Back navigation returned to the previous screen without errors.     | PASS   |
| TC03 | R03         | Profile Read               | Open Profile screen                           | Name, bio and avatar/fallback are displayed                      | Profile screen displayed the stored name, bio and avatar/fallback correctly.                                           | PASS   |
| TC04 | R04, R10    | Empty Name Validation      | Open Edit Profile → delete Name → Save        | Validation error appears and invalid data is not saved           | Validation message appeared for the empty Name field. Profile data remained unchanged.                                 | PASS   |
| TC05 | R04         | Valid Profile Update       | Change Name/Bio → Save                        | Updated Profile appears immediately                              | Valid profile values were saved and ProfileScreen displayed the updated values immediately without restarting the app. | PASS   |
| TC06 | R04         | Cancel Edit                | Change Profile fields → Cancel                | Temporary changes are discarded                                  | Temporary form values were discarded and the previous Profile data remained unchanged.                                 | PASS   |
| TC07 | R05         | Enable Dark Theme          | Settings → enable Dark Mode → inspect screens | Dark theme applies application-wide                              | Dark theme was applied to Home, Profile, Activity and Settings screens correctly.                                      | PASS   |
| TC08 | R05         | Disable Dark Theme         | Settings → disable Dark Mode                  | Application returns to Light theme                               | Application returned to Light theme and UI colors updated correctly across screens.                                    | PASS   |
| TC09 | R06         | Activity Normal State      | Open Activity screen                          | FlatList displays activity collection                            | FlatList rendered all initial activity items correctly.                                                                | PASS   |
| TC10 | R06         | Activity Interaction       | Press an activity item twice                  | Completed state toggles correctly                                | Activity changed from incomplete to completed on the first press and returned to incomplete on the second press.       | PASS   |
| TC11 | R06, R10    | Empty Activity State       | Press Clear List                              | Empty state and Reset option appear                              | Activity list became empty and the empty-state message with Reset option was displayed correctly.                      | PASS   |
| TC12 | R07         | Profile Persistence        | Edit Profile → Save → restart app             | Saved Profile remains after restart                              | Updated Profile data was restored from AsyncStorage after restarting the application.                                  | PASS   |
| TC13 | R07         | Theme Persistence          | Enable Dark Mode → restart app                | Dark theme remains active                                        | Dark theme was restored correctly after restarting the application.                                                    | PASS   |
| TC14 | R08         | Reusable Components        | Inspect Home, Profile and Activity            | Reusable components render correctly                             | AppButton, ProfileCard and ActivityItem were reused and rendered correctly in their respective screens.                | PASS   |
| TC15 | R09         | Responsive Portrait Layout | Open all screens in portrait mode             | UI remains readable without major overlap                        | All screens remained readable and usable in portrait mode with no major overlapping elements.                          | PASS   |
| TC16 | R07, R10    | Missing Profile Storage    | Remove `@mma301_profile` → restart app        | Default Profile is used and app does not crash                   | Application detected missing Profile data and used DEFAULT_PROFILE successfully without crashing.                      | PASS   |
| TC17 | R07, R10    | Corrupted Profile JSON     | Store invalid JSON → restart app              | Corrupted data is caught and default Profile is used             | Invalid JSON was caught by error handling. Application loaded DEFAULT_PROFILE and continued running normally.          | PASS   |
| TC18 | R07, R10    | Invalid Profile Structure  | Store `{"abc":123}` → restart app             | Invalid Profile object is rejected                               | Invalid Profile structure was rejected and DEFAULT_PROFILE was loaded without crashing the application.                | PASS   |
| TC19 | R07, R10    | Invalid Theme Value        | Store `banana` as Theme → restart app         | Invalid theme falls back to Light mode                           | Unsupported Theme value was rejected and the application safely used Light theme.                                      | PASS   |
| TC20 | R02         | Drawer Navigation          | Drawer → Home/Profile/Activities/Settings     | Every destination opens correctly                                | Every Drawer item opened the expected screen without navigation errors.                                                | PASS   |
| TC21 | R02         | Bottom Tab Navigation      | Home → Activity → Settings                    | Correct main area is displayed                                   | Bottom Tab navigation switched between Home, Activity and Settings correctly.                                          | PASS   |

---

# Detailed Test Evidence

## TC01 - First Run

### Preconditions

Application storage was cleared before testing.

### Steps

1. Clear application storage.
2. Start the application.
3. Wait for Profile and Theme hydration.
4. Observe HomeScreen.

### Expected Result

```text
Application starts successfully.
DEFAULT_PROFILE is used.
Light theme is used.
No crash occurs.
```

### Actual Result

```text
Application started successfully.
DEFAULT_PROFILE was displayed.
Light theme was active.
No runtime crash occurred.
```

### Status

```text
PASS
```

---

# TC02 - Stack Navigation

### Steps

```text
Home
→ My Profile
→ Edit Profile
→ Back
→ Profile
→ Back
→ Home
```

### Actual Result

```text
All screens opened correctly.
Back navigation returned to the previous screen.
No navigation error occurred.
```

### Status

```text
PASS
```

---

# TC03 - Profile Read

### Steps

1. Open Profile.
2. Observe ProfileCard.

### Actual Result

```text
Profile name was displayed.
Profile bio was displayed.
Avatar or avatar fallback was displayed.
```

### Status

```text
PASS
```

---

# TC04 - Empty Name Validation

### Test Data

```text
Name:
""
```

### Steps

1. Open Profile.
2. Press Edit.
3. Delete the Name value.
4. Press Save.

### Actual Result

```text
Validation error was displayed.
Invalid Profile was not saved.
Existing Profile remained unchanged.
```

### Status

```text
PASS
```

---

# TC05 - Valid Profile Update

### Test Data

```text
Name:
Phan Van Cuong

Bio:
Software Engineering Student
```

### Steps

1. Open Edit Profile.
2. Enter valid values.
3. Press Save.
4. Return to Profile.

### Actual Result

```text
Profile was saved successfully.
ProfileScreen immediately displayed the updated information.
No application restart was required.
```

### Status

```text
PASS
```

---

# TC06 - Cancel Edit

### Steps

1. Open Edit Profile.
2. Modify Name or Bio.
3. Press Cancel.
4. Return to Profile.

### Actual Result

```text
Temporary changes were discarded.
Previous Profile information remained unchanged.
```

### Status

```text
PASS
```

---

# TC07 - Dark Theme

### Steps

1. Open Settings.
2. Enable Dark Mode.
3. Open Home.
4. Open Profile.
5. Open Activity.
6. Return to Settings.

### Actual Result

```text
Dark theme was applied across the application.
Background and text colors updated correctly.
Home subtitle remained readable.
```

### Status

```text
PASS
```

---

# TC08 - Light Theme

### Steps

1. Open Settings.
2. Disable Dark Mode.
3. Inspect the application screens.

### Actual Result

```text
Application returned to Light theme.
Theme colors updated across screens correctly.
```

### Status

```text
PASS
```

---

# TC09 - Activity List Normal State

### Steps

1. Open Activity screen.
2. Observe activity items.

### Actual Result

```text
FlatList rendered the activity collection correctly.
Every activity item displayed its information.
```

### Status

```text
PASS
```

---

# TC10 - Activity Interaction

### Steps

1. Select an incomplete Activity.
2. Press the Activity.
3. Observe its state.
4. Press it again.

### Actual Result

```text
First press:
completed changed from false to true.

Second press:
completed changed from true to false.

FlatList updated immediately.
```

### Status

```text
PASS
```

---

# TC11 - Empty Activity State

### Steps

1. Open Activity.
2. Press Clear List.
3. Observe the screen.

### Actual Result

```text
Activity list became empty.
Empty-state UI was displayed.
Reset option was available.
Application did not crash.
```

### Status

```text
PASS
```

---

# TC12 - Profile Persistence

### Steps

1. Edit Profile.
2. Save new valid data.
3. Close/restart the application.
4. Open Profile.

### Actual Result

```text
Previously saved Profile data was restored from AsyncStorage.
Profile information remained correct after restart.
```

### Status

```text
PASS
```

---

# TC13 - Theme Persistence

### Steps

1. Enable Dark Mode.
2. Restart the application.
3. Observe the application theme.

### Actual Result

```text
Dark theme remained active after application restart.
Stored theme was restored successfully.
```

### Status

```text
PASS
```

---

# TC14 - Reusable Components

### Components Checked

```text
AppButton
ProfileCard
ActivityItem
```

### Actual Result

```text
Reusable components rendered correctly.
The same reusable components were used where appropriate instead of duplicating UI code.
```

### Status

```text
PASS
```

---

# TC15 - Responsive Layout

### Steps

Open:

```text
Home
Profile
Edit Profile
Activity
Settings
```

in portrait orientation.

### Actual Result

```text
All main UI elements remained visible.
No major overlap occurred.
Buttons and form controls remained usable.
```

### Status

```text
PASS
```

---

# TC16 - Missing Profile Storage

### Storage Key

```text
@mma301_profile
```

### Steps

1. Remove Profile value from AsyncStorage.
2. Restart application.
3. Open Profile.

### Actual Result

```text
Missing Profile value was handled safely.
DEFAULT_PROFILE was displayed.
Application did not crash.
```

### Status

```text
PASS
```

---

# TC17 - Corrupted Profile JSON

### Storage Key

```text
@mma301_profile
```

### Test Data

```text
{{invalid-json
```

### Steps

1. Store invalid JSON.
2. Restart application.
3. Observe Profile.

### Actual Result

```text
JSON parsing error was handled.
DEFAULT_PROFILE was loaded.
Application continued running normally.
```

### Status

```text
PASS
```

---

# TC18 - Invalid Profile Structure

### Test Data

```json
{
  "abc": 123
}
```

### Steps

1. Store the object under `@mma301_profile`.
2. Restart application.
3. Open Profile.

### Actual Result

```text
JSON parsing succeeded.
Profile structure validation rejected the invalid object.
DEFAULT_PROFILE was used.
Application did not crash.
```

### Status

```text
PASS
```

---

# TC19 - Invalid Theme Value

### Storage Key

```text
@mma301_theme
```

### Test Data

```text
banana
```

### Steps

1. Store the unsupported value.
2. Restart application.
3. Observe Theme.

### Actual Result

```text
Invalid Theme value was rejected.
Application safely used Light theme.
No crash occurred.
```

### Status

```text
PASS
```

---

# TC20 - Drawer Navigation

### Steps

Use Drawer to open:

```text
Home
Profile
Activities
Settings
```

### Actual Result

```text
Every Drawer destination opened correctly.
No screen crashed.
Navigation state remained stable.
```

### Status

```text
PASS
```

---

# TC21 - Bottom Tab Navigation

### Steps

Navigate between:

```text
Home
Activity
Settings
```

### Actual Result

```text
Each tab displayed the correct main screen.
Switching between tabs worked without errors.
```

### Status

```text
PASS
```

---

# Test Coverage Summary

| Category                  | Covered |
| ------------------------- | ------- |
| Startup                   | PASS    |
| Navigation                | PASS    |
| Profile Read              | PASS    |
| Edit Profile              | PASS    |
| Validation                | PASS    |
| Save                      | PASS    |
| Cancel                    | PASS    |
| Theme                     | PASS    |
| FlatList                  | PASS    |
| Activity Interaction      | PASS    |
| Empty State               | PASS    |
| Profile Persistence       | PASS    |
| Theme Persistence         | PASS    |
| Reusable Components       | PASS    |
| Responsive Layout         | PASS    |
| Missing Storage           | PASS    |
| Corrupted Storage         | PASS    |
| Invalid Profile Structure | PASS    |
| Invalid Theme             | PASS    |

---

# Final Test Summary

| Result  | Count |
| ------- | ----: |
| PASS    |    21 |
| FAIL    |     0 |
| NOT RUN |     0 |
| TOTAL   |    21 |

---

# Final Verification

- [x] First-run tested
- [x] Five screens tested
- [x] Stack navigation tested
- [x] Back navigation tested
- [x] Drawer navigation tested
- [x] Bottom Tab navigation tested
- [x] Profile read tested
- [x] Valid Profile update tested
- [x] Invalid form tested
- [x] Cancel tested
- [x] Activity FlatList tested
- [x] Activity interaction tested
- [x] Activity empty state tested
- [x] Light Theme tested
- [x] Dark Theme tested
- [x] Profile persistence tested
- [x] Theme persistence tested
- [x] Missing storage tested
- [x] Corrupted storage tested
- [x] Invalid Profile structure tested
- [x] Invalid Theme tested
- [x] Actual Results recorded
- [x] All test statuses recorded

---

# Result

```text
21 / 21 test cases PASS.

Core application workflows, negative cases, persistence cases and edge cases were verified successfully.
```
