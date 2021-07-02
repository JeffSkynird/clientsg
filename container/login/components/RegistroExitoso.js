import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
const windowHeight = Dimensions.get('window').height;

export default function Projects(props) {
    
  

    return (
        <View style={{ flex: 1, width: '100%',backgroundColor:'white' }}>
               
               <View style={{ width: '100%', alignItems: 'center' }}>
                    <Image style={{ marginTop: 30, marginBottom: 30, height: 100, width: '55%' }} source={require('../../../assets/logo.png')} />

                </View>
                <View style={{
                  alignItems:'center',flex:1,
                   marginBottom: '10%', marginHorizontal: '5%', backgroundColor: 'white', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,paddingTop:10
                }}>
                 <Text style={{paddingHorizontal:15, fontSize:22,marginTop: 20, color: '#1D397A', fontWeight: 'bold', textAlign: 'center' }}>HAZ COMPLETADO CON ÉXITO TU REGISTRO</Text>
                 <Text style={{fontSize:18,marginTop: 20, color: 'gray',  textAlign: 'center' }}>Se ha guardado tu nueva contraseña. Utilizala para iniciar sesión</Text>
                 <Image style={{ marginTop: 30, marginBottom: 30, height: 180,width:180, }} source={require('../../../assets/succesLogo.png')} />

                 <TouchableOpacity
                        style={{ marginTop: 20, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '60%' }}
                        onPress={()=>props.navigation.navigate('Login')}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>IR A INICIO DE SESIÓN</Text>
                    </TouchableOpacity>
                  </View>   
                  <Text style={{ textAlign: 'center', marginBottom: 10, color: 'gray', fontWeight:'bold',fontSize: 12, fontStyle: 'italic' }}>© Ambiensa 2021</Text>

        </View>

    )
}
