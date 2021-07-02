import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput,Dimensions, ScrollView, ImageBackground } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import fondo from '../../assets/fondoValidacion.jpg'
import Header from '../components/Header'
import { useToast } from 'react-native-styled-toast'
import ProgressLoader from 'rn-progress-loader';

const windowHeight = Dimensions.get('window').height;
import {verificarCodigoUsuario} from '../../utils/API/auth'
export default function Projects({ navigation, route }) {
    const { id } = route.params;
    const { toast } = useToast()
    const [loading,setLoading] = useState(false)

    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

const verificarCodigo = ()=>{
    if(verificarIgualdad()){
        verificarCodigoUsuario({client_id:id,code:code,password:password},mostrarNotificacion,setLoading)

    }else{
        mostrarNotificacion("Las contraseñas no coinciden",'error')
    }
}
const mostrarNotificacion=(msg,type)=>{
    if(type!="success"){
        toast({intent: type.toUpperCase(), message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })

    }
    if(type=="success"){
        
        navigation.navigate('SuccesRegister')
    }
}
const verificarIgualdad=()=>{
    if(password==rePassword){
        return true;
    }else{
        return false
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
                    <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 17, marginBottom: 10, color: 'gray', }}>Por favor llena los siguientes campos</Text>
                    <TextInput
                        style={{ marginTop: 10, padding: 10, width: '90%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 50, color: '#939393' }}
                        onChangeText={text => setCode(text)}
                        value={code}
                        keyboardType="numeric"
                        placeholder="Ingrese el código de verificación"
                    />
                     <TextInput
                        style={{ marginTop: 10, padding: 10, width: '90%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 50, color: '#939393' }}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                  
                        placeholder="Ingrese una nueva contraseña"
                    />
                      <TextInput
                        style={{ marginTop: 10, padding: 10, width: '90%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 50, color: '#939393' }}
                        onChangeText={text => setRePassword(text)}
                        value={rePassword}
                        secureTextEntry={true}
                      
                        placeholder="Vuelva a ingresar la nueva contraseña"
                    />
                    <TouchableOpacity>
                    <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 14, marginBottom: 10, color: '#22428B', }}>Vuelve a enviar el código de verificación</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 20, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '60%' }}
                        onPress={verificarCodigo}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>CONTINUAR</Text>
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