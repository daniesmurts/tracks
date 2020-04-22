import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from "expo-location";

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    useEffect(() => {
        let subscriber;
        const startWatching = async () => { // this is a helper function
            try {
                await requestPermissionsAsync();
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 5
                }, 
                
                callback // this prop should be added to the dependency list at the bottom
                );
            } catch (e) {
                setErr(e);
            }
        };

        if (shouldTrack) {
            startWatching();
        }else {
            if (subscriber){
            //stop watching
            subscriber.remove();
            }
            subscriber = null;
        }
        return () => {
            if (subscriber){
                subscriber.remove();
            }
        }
        
    }, [shouldTrack, callback]); // this is the dependency list

    return [err];
};


