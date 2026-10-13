# AI Usage Log

## MMA301 Assignment 1 - Profile & Activity App

AI was used as an engineering support tool during requirement analysis, implementation review, debugging and documentation preparation.

AI output was not treated as automatically correct.

The student remains responsible for understanding, testing and explaining all submitted code.

---

# AI Usage Records

| #   | Task / Prompt / Reference                | Purpose                                     | Output Used? | Student Adaptation                                               | Verification                              |
| --- | ---------------------------------------- | ------------------------------------------- | ------------ | ---------------------------------------------------------------- | ----------------------------------------- |
| 1   | Analyze MMA301 Assignment 1 requirements | Understand mandatory scope and rubric       | Yes          | Converted requirements into R01-R10 checklist                    | Compared with assignment PDF and RTM      |
| 2   | Suggest project structure                | Organize React Native source                | Yes          | Used screens/components/context/data/navigation/constants        | Reviewed imports and source structure     |
| 3   | Explain local/shared/persistent state    | Decide state ownership                      | Yes          | Form and Activity use local state; Profile and Theme use Context | Compared with source and Design Decisions |
| 4   | Suggest ProfileContext approach          | Share and persist Profile                   | Yes          | Adapted Context with AsyncStorage and safe fallback              | TC03, TC05, TC12, TC16-TC18               |
| 5   | Review invalid Profile storage handling  | Handle malformed local data                 | Yes          | Added validation for stored Profile object structure             | TC16-TC18                                 |
| 6   | Suggest ThemeContext approach            | Share theme application-wide                | Yes          | Used Light/Dark Context with AsyncStorage                        | TC07, TC08, TC13, TC19                    |
| 7   | Review Theme persistence behavior        | Avoid inconsistent state when save fails    | Yes          | Persist theme before updating shared state                       | Source review + TC07/TC13                 |
| 8   | Suggest controlled Edit Profile form     | Implement validation and Save/Cancel        | Yes          | Used local state and custom validation rules                     | TC04-TC06                                 |
| 9   | Suggest FlatList implementation          | Implement Activity collection               | Yes          | Used ActivityItem, FlatList and immutable state update           | TC09-TC11                                 |
| 10  | Suggest reusable components              | Reduce duplicated UI logic                  | Yes          | Used AppButton, ProfileCard and ActivityItem                     | TC14                                      |
| 11  | Suggest nested navigation                | Support global/main/hierarchical navigation | Yes          | Used Drawer + Bottom Tabs + Native Stack                         | TC02, TC20, TC21                          |
| 12  | Review Dark Mode UI                      | Check application-wide theme consistency    | Yes          | Added Theme color to Home subtitle                               | TC07, TC08                                |
| 13  | Suggest RTM structure                    | Trace requirements to code/tests            | Yes          | Adapted R01-R10 to actual project files                          | Reviewed against assignment               |
| 14  | Suggest Design Decision Record           | Explain technical choices and trade-offs    | Yes          | Adapted decisions to current architecture                        | Compared with source                      |
| 15  | Suggest Test Matrix                      | Prepare normal/negative/edge tests          | Yes          | Created TC01-TC21                                                | Actual results recorded after execution   |
| 16  | Suggest Debug Log format                 | Record engineering debugging process        | Yes          | Documented two real defects found in project                     | Retest recorded in Debug Log              |
| 17  | Review final documentation               | Check assignment evidence                   | Yes          | Aligned README/RTM/Test/Debug/AI evidence with source            | Compared with submission checklist        |

---

# AI Usage Workflow

The following process was used:

```text
Ask
-> Inspect
-> Adapt
-> Run
-> Explain
-> Record
```

---

# 1. Ask

AI was used for focused questions involving:

- Assignment requirements
- React Native architecture
- Navigation
- Context API
- State ownership
- Controlled forms
- Validation
- FlatList
- AsyncStorage
- Error handling
- Testing
- Debugging
- Documentation

---

# 2. Inspect

AI suggestions were reviewed before being adopted.

The student checked:

- whether the suggestion matched the assignment
- whether the suggestion matched the current project
- whether imports and dependencies were correct
- whether unnecessary complexity was introduced
- whether the solution could be explained during evaluation

---

# 3. Adapt

AI suggestions were modified to fit the project instead of being copied blindly.

Example:

A storage helper layer could be introduced, but this project keeps persistence inside:

```text
ProfileContext
-> AsyncStorage

ThemeContext
-> AsyncStorage
```

because the current Assignment 1 scope is small.

Another example:

The project uses:

```text
Drawer
-> Bottom Tabs
-> Stack
```

to support:

- global navigation
- main application areas
- hierarchical Profile editing

---

# 4. Run and Verify

The application is run using:

```bash
npm install
npm start
```

or:

```bash
npx expo start
```

Verification evidence is recorded in:

```text
docs/test-matrix.md
```

Tests include:

```text
normal cases
negative cases
edge cases
persistence cases
navigation cases
fallback cases
```

A result is marked PASS only after the application behavior has been observed.

---

# 5. Explain

The student is expected to explain the following without relying entirely on AI:

- App startup
- Screen responsibilities
- Props
- State
- Context API
- Controlled inputs
- Validation
- FlatList
- renderItem
- keyExtractor
- immutable state updates
- AsyncStorage
- JSON.stringify
- JSON.parse
- useState
- useEffect
- Context consumer re-render
- nested navigation
- error handling
- fallback handling

---

# Important Execution Flows

## Application Startup

```text
App
-> ProfileProvider
-> ThemeProvider
-> AppNavigator
-> NavigationContainer
-> Screen
-> Component
-> UI
```

## Profile Update

```text
User edits form
-> local form state
-> validation
-> updateProfile()
-> AsyncStorage
-> ProfileContext state
-> consumer re-render
-> updated Profile UI
```

## Theme Update

```text
Settings Switch
-> toggleTheme()
-> AsyncStorage
-> ThemeContext state
-> Context consumers re-render
-> app-wide theme update
```

## Activity Update

```text
User presses ActivityItem
-> toggleActivity(id)
-> setActivities()
-> new array
-> ActivityScreen re-render
-> FlatList receives new data
-> UI updates
```

---

# 6. Record

Significant AI usage is documented in this file.

Testing evidence:

```text
docs/test-matrix.md
```

Debugging evidence:

```text
docs/debug-log.md
```

Requirement evidence:

```text
docs/RTM.md
```

Design reasoning:

```text
docs/design-decisions.md
```

---

# AI Limitations and Responsibility

AI was used only as a support tool.

The student remains responsible for:

- source code
- project configuration
- design decisions
- runtime behavior
- testing
- debugging
- documentation
- AI-assisted output

AI output must be:

```text
reviewed
-> adapted
-> executed
-> verified
-> understood
```

before it is considered part of the final submission.

---

# Final AI Self-Check

- [x] I know which parts were assisted by AI
- [x] I understand the code included in the project
- [x] I reviewed AI suggestions before using them
- [x] I ran the application after modifications
- [x] I completed the Test Matrix
- [x] I retested both Debug Log defects
- [x] I can explain ProfileContext
- [x] I can explain ThemeContext
- [x] I can explain AsyncStorage
- [x] I can explain Edit Profile validation
- [x] I can explain FlatList
- [x] I can explain nested navigation
- [x] I can make a small modification without depending entirely on AI
