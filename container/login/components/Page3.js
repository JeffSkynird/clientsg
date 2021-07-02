import React from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, ScrollView, Dimensions } from 'react-native'
import Constants from 'expo-constants';

import fondoS from '../../../assets/fondoS.jpg'
const windowHeight = Dimensions.get('window').height;
export default function Page3(props) {
    return (
            <ImageBackground source={fondoS} style={{ paddingTop: Constants.statusBarHeight, flex: 1, height: windowHeight, width: '100%', resizeMode: "cover", }}>
                <View style={{ flex: 1, alignItems: 'center', flex: 1, paddingHorizontal: '5%', width: '100%' }}>
                    <Image style={{ marginTop: 30, marginBottom: 30, height: 100, width: '60%' }} source={require('../../../assets/logo.png')} />
                    <Text style={{ fontSize: 18, marginBottom: 10, color: '#204089', fontWeight: 'bold' }}>TIPS FINANCIEROS</Text>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>Sigue estos consejos para estar más cerca de cumplir tu sueño de tener casa propia.</Text>
                    <Image style={{ marginTop: 30, marginBottom: 30, height: 120, resizeMode: 'contain', width: '50%' }} source={require('../../../assets/iconPage3.png')} />
                    <Text style={{ fontSize: 18, marginBottom: 10, color: '#204089', fontWeight: 'bold' }}>¡Mantén tu mirada hacia el futuro!</Text>
                    <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 10, color: 'black' }}>No te dejes entusiasmar por todas las promociones que veas. Piensa en tu futura casa.</Text>
                    <TouchableOpacity
                            style={{marginTop:60, borderRadius: 10, backgroundColor: '#22428B', padding: 13, width: '60%' }}
                            onPress={()=>props.navigation.navigate('Validacion')}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>  LISTO</Text>
                        </TouchableOpacity>
                 



                </View>





            </ImageBackground>

    )
}
