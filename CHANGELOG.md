# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.0.33] - 2025-08-24

### Added

- Initial release of `react-haversine-geolocation` hook.
- Hook supports React 19 (Web & React Native).
- Haversine formula for distance calculation.
- Geolocation history management with automatic filtering of nearby points.
- Flexible persistence via localStorage, AsyncStorage, SQLite, etc.
- API: `useGeolocationManager` with options `distanceThreshold`, `loadHistory`, `saveHistory`.
- Example usage included for React Native and React Web.
