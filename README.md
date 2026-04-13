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

### 5. Storage — AsyncStorage (Offline-first)

**Library:** `@react-native-async-storage/async-storage`

**Why:**

- Simple key-value storage available out of the box in Expo
- No native setup required
- Sufficient for MVP and prototyping
- Fast local data access without network dependency

**Use case in this project:**

- Store all records locally
- Each record is saved immediately after processing
- Data is available even when offline

**Data model:**

```ts
type RecordItem = {
  id: string;
  audioUri?: string;
  rawText?: string;
  parsedItems?: { item: string; quantity: number }[];
  status: "pending" | "synced" | "failed";
  createdAt: number;
};

**Offline-first approach:**
- Records are created and persisted locally immediately after processing
- `pending` status indicates data not yet synchronized
- The system is designed to support background sync in the next steps

**Alternatives considered:**
- SQLite
  → better for large datasets, but adds complexity for MVP
- Realm
  → powerful but overkill for this use case
- Remote-only storage
  → breaks offline-first UX

**Decision:**
AsyncStorage was chosen as a simple and reliable solution to implement offline-first behavior at an early stage.

---

### 6. Recording Pipeline — Service Orchestration

**Approach:** Dedicated `recordService` for handling the full recording flow

**Responsibilities:**
- Stop recording
- Perform transcription (mocked)
- Parse text into structured data
- Create a record entity
- Persist data to storage

**Why:**
- Isolates business logic from UI
- Keeps `RecordScreen` simple and focused
- Makes the pipeline reusable
- Improves testability and extensibility

**Alternatives considered:**
- Keeping logic inside the component
  → quickly becomes hard to read and maintain

**Decision:**
The pipeline was extracted into a dedicated service to maintain separation of concerns and support future scalability.
```

### 7. Sync Queue — Offline to Online Synchronization

**Approach:** Client-side sync queue with status tracking (`pending → synced / failed`)

**What it does:**

- Stores records locally with `pending` status
- Attempts to send data to a remote API (simulated)
- Updates record status based on result:
  - `synced` on success
  - `failed` on error

**Why:**

- Enables offline-first behavior
- Prevents data loss when network is unavailable
- Provides visibility into sync state
- Lays foundation for background synchronization

**How it works:**

1. Record is created and saved locally (`pending`)
2. Sync process filters all `pending` records
3. Each record is sent to API
4. Status is updated based on response

**Decision:**
A simulated API with random failures was chosen to better reflect real-world conditions and validate sync robustness.
