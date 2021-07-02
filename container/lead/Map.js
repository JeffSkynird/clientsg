import React, { useEffect, useContext, useState } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import MapView,{Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Initializer from '../../store/Initializer'
import { obtenerInitCoords } from '../../utils/API/clients'
export default function Map(props) {
    const initializer = useContext(Initializer);
    const [data, setData] = useState([])
    const [center, setCenter] = useState({lat:-3.328911,lng:-79.782747})

    useEffect(() => {
        if (initializer.usuario != null) {
            obtenerInitCoords(setData)
        }
    }, [initializer.usuario])
    useEffect(() => {
        if (data.length != 0) {

            let centerT = getFisrtCoords(data)
            if (centerT != null) {
                let centerAR = centerT.split(',')
                setCenter({ lat: parseFloat(centerAR[0]), lng: parseFloat(centerAR[1]) })
            }


        }
    }, [data])
    const getFisrtCoords = (dat) => {
        let coords = null
        dat.map((e) => {
            if (e.init_coords != null) {
                coords = e.init_coords
            }
        })
        return coords
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Mapa de registros </Text>
                <TouchableOpacity
                    onPress={() => props.navigation.openDrawer()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="menu" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: center.lat,
                    longitude: center.lng,
                    latitudeDelta: 0,
                    longitudeDelta: 2,
                }}
                >
                {data.map((place, index) => {
               
                       let centerAR = {lat:-3.328911,lng:-79.782747}
                       if(place.init_coords!=null){
                       centerAR = {lat:parseFloat(place.init_coords.split(',')[0]),lng:parseFloat(place.init_coords.split(',')[1])}
                       }
                    return (
                    <Marker
                      key={index}
                      coordinate={{ latitude : centerAR.lat , longitude : centerAR.lng }}
                      title={place.names+" "+place.last_names}
                      description={place.dni}
                    />
                  )
                    })}
                   </MapView>
          
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#323B62',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 55
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
