import { StyleSheet, View, Text, StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import {GOOGLE_MAPS_APIKEY} from "@env"
import MapViewDirections from 'react-native-maps-directions';

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      // height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      // top: -(StatusBar.currentHeight),
    },
   });

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
      if (!origin || !destination) {
        return;
      }    
      // Zoom and Fit markers
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });    
    }, [origin, destination])
    
      
    useEffect(() => {
      if (!origin || !destination) {return;}
      // google metrix to calculate the price base on the length
      const getTravelTime = async () => {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?`
        const response = await fetch(url + 'origins=' + `${origin.location.lat},${origin.location.lng}` + '&destinations=' + `${destination.location.lat},${destination.location.lng}` + '&key=' + GOOGLE_MAPS_APIKEY);
        const data = await response.json();
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        console.log('data', data);
      };
      
      getTravelTime()
    }, [origin, destination, GOOGLE_MAPS_APIKEY])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} translucent barStyle="dark-content" />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="mutedStandard"
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
        >   
            {origin && destination && (
                <MapViewDirections
                    origin={{                      
                      latitude: origin.location.lat,
                      longitude: origin.location.lng,
                    }}
                    destination={{                      
                      latitude: destination.location.lat,
                      longitude: destination.location.lng,
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title='Origin'
                    description={origin.description}
                    identifier="origin"
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title='destination'
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    </SafeAreaView>
  )
}

export default Map

