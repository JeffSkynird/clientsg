import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput,Dimensions, ScrollView, ImageBackground } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import fondo from '../../assets/fondoValidacion.jpg'
import Header from '../components/Header'
import { useToast } from 'react-native-styled-toast'
import ProgressLoader from 'rn-progress-loader';
import Initializer from '../../store/Initializer'

const windowHeight = Dimensions.get('window').height;
import {verificarCodigoUsuario,iniciarSesionCliente} from '../../utils/API/auth'
export default function Projects(props) {
    const initializer = React.useContext(Initializer);

    const { toast } = useToast()
    const [loading,setLoading] = useState(false)

    const [dni, setDni] = useState('')
    const [password, setPassword] = useState('')

const iniciarSesion = ()=>{
    iniciarSesionCliente({dni:dni,password:password},mostrarNotificacion,setLoading, initializer)
}
const mostrarNotificacion=(msg,type)=>{
 
        toast({intent: type.toUpperCase(), message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })

    if(type=="success"){
        
        props.navigation.navigate('Client')
    }
}

    return (
        <ScrollView style={{ flex: 1, width: '100%', height: windowHeight }}>
            <ImageBackground source={fondo} style={{ paddingTop: Constants.statusBarHeight, flex: 1, height: windowHeight, width: '100%', resizeMode: "cover", }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Image style={{ marginTop: 30, marginBottom: 30, height: 100, width: '55%' }} source={require('../../assets/logo.png')} />

                </View>


                <View style={{
                    alignItems: 'center',
                    flex: 1, marginBottom: '10%', marginHorizontal: '5%', backgroundColor: 'white', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5, paddingTop: 10
                }}>
                    <Text style={{ marginTop: 10,paddingHorizontal:'15%', textAlign: 'center', fontSize: 18, marginBottom: 10, color: 'gray', }}>Por favor ingresa los siguientes datos</Text>
                    <TextInput
                        style={{ marginTop: 10, padding: 10, width: '90%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 50, color: '#939393' }}
                        onChangeText={text => setDni(text)}
                        value={dni}
                        keyboardType="numeric"
                        placeholder="Ingresa tu número de cédula"
                    />
                     <TextInput
                        style={{ marginTop: 10, padding: 10, width: '90%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 50, color: '#939393' }}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                  
                        placeholder="Ingresa tu contraseña"
                    />
                     
                    <TouchableOpacity>
                    <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 14, marginBottom: 10, color: '#22428B', }}>¿Olvidaste tu contraseña?</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 20, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '60%' }}
                        onPress={iniciarSesion}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>INGRESAR</Text>
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