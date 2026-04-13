# Voice Inventory Lite

Early-stage mobile prototype exploring:

- voice input UX
- offline-first sync
- mobile architecture patterns

## Tech Decisions

### 1. Navigation — Expo Router

**Library:** Expo Router

**Why:**

- File-based routing simplifies navigation setup
- Reduces boilerplate compared to React Navigation
- Tight integration with Expo ecosystem
- Faster iteration speed for MVP

**Alternatives considered:**

- React Navigation  
  → more flexible but requires manual setup and more boilerplate

**Decision:**
Expo Router was chosen for faster development and simpler structure at early stage.

---

### 2. Audio Recording — expo-av

**Library:** expo-av

**Why:**

- Official Expo solution for audio/video
- Works out of the box with Expo (no native setup required)
- Stable API for recording and playback
- Supports both iOS and Android

**Alternatives considered:**

- react-native-audio-recorder-player  
  → requires native setup, less aligned with Expo
- custom native modules  
  → too complex for MVP

**Decision:**
expo-av was chosen for reliability, simplicity, and seamless Expo integration.

---

### 3. Architecture — Service Layer

**Approach:** Service-based separation (audio.service)

**Why:**

- Keeps UI components clean and focused on presentation
- Isolates native API logic
- Makes code easier to test and extend
- Aligns with scalable architecture practices

**Alternatives considered:**

- Putting logic directly in components  
  → leads to tight coupling and harder maintenance

**Decision:**
Service layer introduced early to maintain clean separation of concerns.

---

### 4. Project Structure — Hybrid (Routing + Layers)

**Approach:**

- `/app` → routing and screens (Expo Router requirement)
- `/src` → services, types, business logic

**Why:**

- Keeps routing isolated from business logic
- Improves scalability
- Matches common React Native production patterns

**Alternatives considered:**

- Flat structure  
  → becomes unmaintainable as project grows
- Fully feature-based structure  
  → premature at MVP stage

**Decision:**
Hybrid structure chosen to balance simplicity and scalability.
