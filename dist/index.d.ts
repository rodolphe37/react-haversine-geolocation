type TLocation = {
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
type TLocationHistory = {
    locations: TLocation[];
};
type GeolocationOptions = {
    distanceThreshold?: number;
    loadHistory: () => Promise<TLocationHistory | null>;
    saveHistory: (history: TLocationHistory) => Promise<void>;
};

declare function useGeolocationManager({ distanceThreshold, loadHistory, saveHistory, }: GeolocationOptions): {
    history: TLocationHistory;
    init: () => Promise<void>;
    addLocation: (newLocation: TLocation) => Promise<void>;
};

declare function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number;

export { type GeolocationOptions, type TLocation, type TLocationHistory, getDistanceInMeters, useGeolocationManager };
