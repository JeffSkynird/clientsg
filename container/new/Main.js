import React, { useState } from 'react'
import { View, Image, Text, ImageBackground, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import fondo from '../../assets/fondoNew.jpg'
import Constants from 'expo-constants';
import { useToast } from 'react-native-styled-toast'
import { obtenerTipoLogin } from '../../utils/API/auth'
const windowHeight = Dimensions.get('window').height;
import ProgressLoader from 'rn-progress-loader';

export default function New(props) {
    const { toast } = useToast()

    const [dni, setDni] = useState('')
    const [status, setStatus] = useState('')

    const [loading, setLoading] = useState(false)
    const ingresar = () => {
        if (validarCedula(dni)) {
            obtenerTipoLogin(dni, setStatus, mostrarNotificacion, setLoading)
        } else {
            mostrarNotificacion("Cédula inválida", 'error')
        }
    }
    const mostrarNotificacion = (msg, type) => {
        toast({ intent: type, message: msg, bg: type, color: type, iconColor: type, iconName: type == "error" ? 'x-circle' : 'check-circle', })
    }
    function validarCedula(cad) {
        if (cad != null) {

            var total = 0;
            var longitud = cad.length;
            var longcheck = longitud - 1;

            if (cad !== "" && longitud === 10) {
                for (let i = 0; i < longcheck; i++) {
                    if (i % 2 === 0) {
                        var aux = cad.charAt(i) * 2;
                        if (aux > 9) aux -= 9;
                        total += aux;
                    } else {
                        total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                    }
                }

                total = total % 10 ? 10 - (total % 10) : 0;

                if (cad.charAt(longitud - 1) == total) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    return (
        <ScrollView style={{ flex: 1, width: '100%', height: windowHeight }}>
            <ImageBackground source={fondo} style={{ paddingTop: Constants.statusBarHeight, flex: 1, height: windowHeight, width: '100%', resizeMode: "cover", }}>
                <View style={{ alignItems: 'center', paddingHorizontal: '5%', width: '100%' }}>
                    <Image style={{ marginTop: 30, marginBottom: 30, height: 100, width: '60%' }} source={require('../../assets/logo.png')} />
                </View>
                <View style={{
                    alignItems: 'center',
                    flex: 1, marginBottom: '15%', marginHorizontal: '5%', backgroundColor: 'white', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5, paddingTop: 40
                }}>
                    <Text style={{ color: '#204089', fontSize: 24, fontWeight: 'bold' }}>¡BIENVENIDO!</Text>
                    <Text style={{ marginTop: 10, paddingHorizontal: 30, color: '#919191', fontSize: 17, textAlign: 'center' }}>Estamos aquí para ayudarte a que cumplas tu sueño de tener tu casa propia.</Text>
                    <TouchableOpacity
                        style={{ marginTop: 20, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '60%' }}
                    onPress={()=>props.navigation.navigate('Formulario')}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>RESERVA HOY MISMO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={()=>props.navigation.navigate('Projects')}
                        style={{ marginTop: 10, borderRadius: 5,borderWidth:0.5, borderColor:'#22428B',borderStyle:'solid',padding: 13, width: '60%' }}
                    >
                        <Text style={{ color: '#22428B', fontWeight: 'bold', textAlign: 'center' }}>VER PROYECTOS</Text>
                    </TouchableOpacity>


                </View>
                <Text style={{ textAlign: 'center', marginBottom: 10, color: 'white', fontSize: 12, fontStyle: 'italic' }}>© Ambiensa 2021</Text>

                <ProgressLoader
                    visible={loading}
                    isModal={true} isHUD={true}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />
            </ImageBackground>
        </ScrollView>
    )
}
