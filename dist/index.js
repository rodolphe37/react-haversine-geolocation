// src/useGeolocationManager.ts
import { useState, useCallback } from "react";

// src/utils.ts
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// src/useGeolocationManager.ts
function useGeolocationManager({
  distanceThreshold = 100,
  loadHistory,
  saveHistory
}) {
  const [history, setHistory] = useState({ locations: [] });
  const init = useCallback(async () => {
    const existing = await loadHistory();
    if (existing) {
      setHistory(existing);
    }
  }, [loadHistory]);
  const addLocation = useCallback(
    async (newLocation) => {
      let updatedHistory = { ...history };
      const lastLocation = updatedHistory.locations.at(-1);
      let isSameCoords = false;
      if (lastLocation) {
        const distance = getDistanceInMeters(
          lastLocation.coords.latitude,
          lastLocation.coords.longitude,
          newLocation.coords.latitude,
          newLocation.coords.longitude
        );
        isSameCoords = distance < distanceThreshold;
      }
      if (isSameCoords && lastLocation) {
        lastLocation.timestamp = newLocation.timestamp;
      } else {
        updatedHistory.locations.push(newLocation);
      }
      setHistory(updatedHistory);
      await saveHistory(updatedHistory);
    },
    [history, distanceThreshold, saveHistory]
  );
  return {
    history,
    init,
    addLocation
  };
}
export {
  getDistanceInMeters,
  useGeolocationManager
};
//# sourceMappingURL=index.js.map