import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
    return {
        timestamp: 1587459143,
        coords: {
            speed: 0,
            heading: 224,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 49.066888 + increment * tenMetersWithDegrees,
            latitude: 55.836998 +  increment * tenMetersWithDegrees,
        }
    };
};

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter ++;
}, 1000);