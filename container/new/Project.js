import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import fondo from '../../assets/fondoValidacion.jpg'
import data from './data/data.json'
import Header from '../components/Header'
const windowHeight = Dimensions.get('window').height;

export default function Project1({ navigation, route }) {
    const { id,name } = route.params;
    const [dataNueva, setDataNueva] = React.useState([])
    React.useEffect(() => {
        let array = []
        data.map((e) => {
            if (e.id == id) {
                array = e.models
            }
        })
        setDataNueva(array)
    }, [])
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity

                onPress={() => navigation.navigate('Model', { item: item })}
            >
                <ImageBackground source={{ uri: item.images[0] }} style={{ marginBottom: 10, flex: 1, height: 200, width: '100%', resizeMode: "cover", }}>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: '#274589', opacity: 0.8 }}>

                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}> {item.nombre}</Text>

                        </View>


                    </View>



                </ImageBackground>
            </TouchableOpacity>



        )
    }
    return (
        <View style={{backgroundColor:'white', paddingTop: Constants.statusBarHeight, flex: 1, height: windowHeight, width: '100%', resizeMode: "cover", }}>

<Header navigation={navigation}/>
            <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                <TouchableOpacity

                    onPress={() => navigation.goBack()}
                ><Feather name="chevron-left" size={24} color="white" />
                </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> {name}</Text>

            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                {
                    name=="PASEO DEL SOL"?
                    <Image style={{ marginTop: 15, height: 120, resizeMode: 'contain', width: '50%' }} source={require('../../assets/paseoSol.jpg')} />

                    :
                    <Image style={{ marginTop: 15, height: 120, resizeMode: 'contain', width: '50%' }} source={require('../../assets/villaGeranio.jpg')} />

                }
                <TouchableOpacity
                    onPress={() => navigation.navigate('Amenities', { id: id })}
                    style={{ marginTop: 10, borderRadius: 5, borderWidth: 0.5, borderColor: 'gray', borderStyle: 'solid', padding: 13, width: '60%' }}
                >
                    <Text style={{ color: 'gray', textAlign: 'center' }}>Ver amenities de la urbanización</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 20, color: '#1D397A', fontWeight: 'bold', textAlign: 'center' }}>SELECCIONE UNO DE LOS MODELOS DE VILLA</Text>

            </View>


            <FlatList
            showsVerticalScrollIndicator={false}

                data={dataNueva}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}

            />


            <Text style={{ textAlign: 'center', marginBottom: 10, color: 'white', fontSize: 12, fontStyle: 'italic' }}>© Ambiensa 2021</Text>
        </View>

    )
}
