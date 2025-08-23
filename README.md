[![npm](https://img.shields.io/npm/v/react-haversine-geolocation)](https://www.npmjs.com/package/react-haversine-geolocation) ![downloads](https://img.shields.io/npm/dt/react-haversine-geolocation?color=blue&logo=npm&logoColor=blue)

# react-haversine-geolocation

A **React 19** hook (Web & React Native) to manage a geolocation history, using the **Haversine formula** to filter out nearby points and optimize tracking.

![react-haversine-geolocation demo](demo/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f656d6470726f2f696d6167652f75706c6f61642f76313636313234353234392f64656d6f5f62636d7a6d652e676966.gif)

## 🚀 Installation

```bash
npm install react-haversine-geolocation

```

or with yarn:

```bash
yarn add react-haversine-geolocation
```

---

## ✨ Features

- 📍 Calculate distances in meters using the **Haversine formula**
- 🔄 Manage a geolocation history
- 🎯 Automatically filter out points that are too close to the previous one
- 💾 Flexible persistence (via `localStorage`, `AsyncStorage`, SQLite, etc.)
- 🪶 Compatible with **React 19** (Web & React Native)

---

## 🖥️ Live demo :

https://test-react-haversine-geolocation.netlify.app/

---

## 🔧 Example Usage (React Native)

```tsx
import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useGeolocationManager,
  type TLocationHistory,
  type TLocation,
} from "react-haversine-geolocation";

const STORAGE_KEY = "geolocations";

export default function App() {
  const { history, init, addLocation } = useGeolocationManager({
    distanceThreshold: 100,
    loadHistory: async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as TLocationHistory) : null;
    },
    saveHistory: async (history: TLocationHistory) => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    },
  });

  useEffect(() => {
    init();
  }, []);

  const handleNewCoords = () => {
    const newLocation: TLocation = {
      coords: {
        accuracy: 5,
        altitude: 35,
        altitudeAccuracy: 1,
        heading: 0,
        latitude: 48.8566,
        longitude: 2.3522,
        speed: 0,
      },
      mocked: false,
      timestamp: Date.now(),
    };
    addLocation(newLocation);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>History: {history.locations.length} positions</Text>
      <Button title="Add Position" onPress={handleNewCoords} />
    </View>
  );
}
```

---

## 🌐 Example Usage (React Web)

```tsx
import React, { useEffect } from "react";
import {
  useGeolocationManager,
  type TLocationHistory,
  type TLocation,
} from "react-haversine-geolocation";

const STORAGE_KEY = "geolocations";

export default function App() {
  const { history, init, addLocation } = useGeolocationManager({
    distanceThreshold: 100,
    loadHistory: async () => {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as TLocationHistory) : null;
    },
    saveHistory: async (history: TLocationHistory) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    },
  });

  useEffect(() => {
    init();
  }, []);

  const handleNewCoords = () => {
    const newLocation: TLocation = {
      coords: {
        accuracy: 10,
        altitude: 15,
        altitudeAccuracy: 2,
        heading: 90,
        latitude: 40.7128,
        longitude: -74.006,
        speed: 0,
      },
      mocked: false,
      timestamp: Date.now(),
    };
    addLocation(newLocation);
  };

  return (
    <div>
      <h1>History: {history.locations.length} positions</h1>
      <button onClick={handleNewCoords}>Add Position</button>
    </div>
  );
}
```

---

## 📖 API

### `useGeolocationManager(options)`

#### Options

- `distanceThreshold?: number` → Threshold in meters to consider two positions the same (default: `100`)
- `loadHistory: () => Promise<TLocationHistory | null>` → Function to load the geolocation history
- `saveHistory: (history: TLocationHistory) => Promise<void>` → Function to save the history

#### Returns

- `history: TLocationHistory` → List of stored positions
- `init: () => Promise<void>` → Initialize/load history
- `addLocation: (location: TLocation) => Promise<void>` → Add a new position with Haversine filtering

---

## 🧩 Types

The following TypeScript types are used in `react-haversine-geolocation`:

---

### TLocation

```tsx
export type TLocation = {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  mocked: boolean;
  timestamp: number;
};
```

- coords: GPS coordinates and related data.

- mocked: whether the location is mocked or real.

- timestamp: the time the location was recorded (milliseconds since epoch).

---

### TLocationHistory

```tsx
export type TLocationHistory = {
  locations: TLocation[];
};
```

- locations: an array of TLocation objects, representing the recorded history.

---

### GeolocationOptions

```tsx
export type GeolocationOptions = {
  distanceThreshold?: number; // threshold in meters to consider two positions identical
  loadHistory: () => Promise<TLocationHistory | null>; // function to load saved history
  saveHistory: (history: TLocationHistory) => Promise<void>; // function to save history
};
```

- distanceThreshold (optional): meters to consider two positions the same (default: 100).

- loadHistory: function that returns the saved history or null.

- saveHistory: function that saves the history (can be localStorage, AsyncStorage, SQLite, etc.).

---

## 📐 Distance Calculation (Haversine)

The distance between two GPS points is calculated using the Haversine formula, which determines the great-circle distance between two points on a sphere using their latitude and longitude.

This formula is useful for:

Filtering out GPS points that are too close to each other.

Reducing noise in location tracking.

Optimizing storage and performance by avoiding redundant points.

Function signature:

```ts
getDistanceInMeters(lat1, lon1, lat2, lon2): number
```

- Parameters:

  - lat1, lon1 – latitude and longitude of the first point in decimal degrees.

  - lat2, lon2 – latitude and longitude of the second point in decimal degrees.

- Returns: distance in meters.

### Example

```ts
import { getDistanceInMeters } from "react-haversine-geolocation";

const distance = getDistanceInMeters(48.8566, 2.3522, 40.7128, -74.006);
console.log(`Distance: ${distance.toFixed(2)} meters`);
```

---

## 📜 License

MIT

# react-haversine-geolocation
