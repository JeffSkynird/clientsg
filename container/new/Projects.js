import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import fondo from '../../assets/fondoValidacion.jpg'
import Header from '../components/Header'
const windowHeight = Dimensions.get('window').height;

export default function Projects(props) {
   console.log(props)

    return (
        <ScrollView style={{ flex: 1, width: '100%', height: windowHeight }}>
            <ImageBackground source={fondo} style={{ paddingTop: Constants.statusBarHeight, flex: 1, height: windowHeight, width: '100%', resizeMode: "cover", }}>
                <Header {...props} />
                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                    <TouchableOpacity

                        onPress={() => props.navigation.goBack()}
                    ><Feather name="chevron-left" size={24} color="white" />
                    </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> PROYECTOS</Text>
                </View>
                <View style={{
                  alignItems:'center',
                    flex: 1, marginBottom: '10%', marginHorizontal: '5%', backgroundColor: 'white', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,paddingTop:10
                }}>
                   <Text style={{ fontSize: 18, marginTop: 10, textAlign:'center',color: '#204089', fontWeight: 'bold' }}>SELECCIONA UNO DE NUESTROS PROYECTOS</Text>
                   <TouchableOpacity
                   onPress={()=>props.navigation.navigate('Project',{id:1,name:'PASEO DEL SOL'})}
style={{marginTop:15,height: 120,width:'100%',justifyContent: 'center',alignItems:'center',}}
>
                   <Image style={{ height: 120, resizeMode: 'contain', width: '50%' }} source={require('../../assets/paseoSol.jpg')} />
                   </TouchableOpacity>
                   <TouchableOpacity
                                      onPress={()=>props.navigation.navigate('Project',{id:2,name:"VILLA GERANIO"})}
style={{marginTop:15,height: 120,width:'100%',justifyContent: 'center',alignItems:'center',}}
>
                   <Image style={{   height: 120, resizeMode: 'contain', width: '50%' }} source={require('../../assets/villaGeranio.jpg')} />
                   </TouchableOpacity>
                   <TouchableOpacity
                        style={{ marginTop: 15, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '60%' }}
                      onPress={()=>{
                          if( typeof props.route.params === 'undefined'||props.route.params==null){
                            props.navigation.navigate('Formulario')
                          }else{
                            if(props.route.params.hasOwnProperty('url')){
                                props.navigation.navigate('FormularioDinamico',{url:props.route.params.url})
                               }else{
                                
                               }
                          }
                     
                       
                        
                      }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>LLENAR FORMULARIO</Text>
                    </TouchableOpacity>
                  </View>   
                    <Text style={{ textAlign: 'center', marginBottom: 10, color: 'white', fontSize: 12, fontStyle: 'italic' }}>© Ambiensa 2021</Text>
            </ImageBackground>
        </ScrollView>

    )
}
