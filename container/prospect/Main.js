import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity,Linking, Dimensions, ScrollView, ImageBackground } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import fondo from '../../assets/fondoValidacion.jpg'
import { obtenerDataCliente } from '../../utils/API/clients'
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Initializer from '../../store/Initializer'
import Header from '../components/Header'
const windowHeight = Dimensions.get('window').height;

export default function Projects({ navigation, route }) {
    const initializer = React.useContext(Initializer);

    const { id } = route.params;

    const [data, setData] = useState(null)
    const [status,setStatus] = useState('Paso 1')
    useEffect(() => {
     
        obtenerDataCliente("", id, setData, initializer)
    }, [])
    useEffect(()=>{
        if(data!=null){
            setStatus(data.client.color)
        }
    },[data])
    const retornarPuntos = () => {
        let dots = ['#DEDEDE', '#DEDEDE', '#DEDEDE']
        if (status == "Paso 1") {
            dots = ['#204089', '#DEDEDE', '#DEDEDE']
        } else if (status == "Paso 2") {
            dots = ['#204089', '#204089', '#DEDEDE']
        } else if (status == "Paso 3" || status == "Negado" || status == "Revision") {
            dots = ['#204089', '#204089', '#204089']
        } else {
            dots = ['#204089', '#204089', '#204089']
        }
        return dots
    }
    const retornarText = () => {
        let text = "Tienes pendiente 3 pasos del formulario"
        if (status == "Paso 1") {
            text = "Tienes pendiente 2 pasos del formulario"
        } else if (status == "Paso 2") {
            text = "Tienes pendiente 1 paso del formulario"
        } else if (status == "Paso 3" || status == "Negado" || status == "Revision") {
            text = "Ha completado el formulario de 3 pasos"
        } else {
            text = "Ha completado el formulario de 3 pasos"
        }
        return text
    }
    const generarUrl=()=>{
       let url="http://192.168.10.17:89/formulario"
        if(status=="Paso 1"){
            url = 'http://192.168.10.17:89/formulario?step=2&client_id='+id
        }else if(status=="Paso 2"){
            url = 'http://192.168.10.17:89/formulario?step=3&client_id='+id
        }
        return url
    }
    return (
            <ImageBackground source={fondo} style={{ paddingTop: Constants.statusBarHeight, flex: 1,  width: '100%', resizeMode: "cover", }}>
        <ScrollView style={{ flex: 1, width: '100%', }}>
<View style={{ flex: 1,  width: '100%', }}>


                <Header/>
                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                    <TouchableOpacity

                        onPress={() => navigation.goBack()}
                    ><Feather name="chevron-left" size={24} color="white" />
                    </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> MI PERFIL</Text>
                    <TouchableOpacity
                    style={{flex:1,alignItems: 'flex-end',marginRight:10}}
                        onPress={() => {
                            setData(null)
                            obtenerDataCliente("", id, setData, initializer)
                        } }
                    ><Feather name="refresh-cw" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{
                    alignItems: 'center',
                    flex:1, marginHorizontal: '3%', backgroundColor: 'white', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5, paddingTop: 10,paddingBottom:30,borderRadius:4
                }}>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={50} color="#5FB0DA" />
                    <Text style={{ marginBottom: 5, fontSize: 18, marginTop: 10, textAlign: 'center', color: '#204089', fontWeight: 'bold' }}>FORMULARIO DE 3 PASOS</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 5, }}
                    >
                        {
                            retornarPuntos().map((e, i) => (

                                <Octicons style={{ marginRight: 5 }} key={i} name="dot-single" name="primitive-dot" size={28} color={e} />
                            ))
                        }

                    </View>
                    <Text style={{ marginBottom: 10, width: 200, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'center' }}>{retornarText()}</Text>
                    </Text>
                    {
                       retornarText()=="Ha completado el formulario de 3 pasos"?
                     /*   <TouchableOpacity
                       style={{ marginTop: 10, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '70%' }}
                       onPress={() => navigation.navigate('Projects', { data: data })}
                   >
                       <Text style={{ fontSize:16,color: 'white', fontWeight: 'bold', textAlign: 'center' }}>RESERVAR MI CASA</Text>
                   </TouchableOpacity> */
               
                       status!="Valido"&&status!="."?
                       <Text style={{ paddingHorizontal:10,color: 'gray', fontSize: 15, textAlign: 'center' }}><Text style={{fontWeight:'bold',color:'#22428B'}}>{status}</Text>: No ha aprobado la precalificación, por favor, actualice su documentación.</Text>

                       :
null
            
                        :
                        <TouchableOpacity
                        style={{ marginTop: 10, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '70%' }}
                        onPress={() => navigation.navigate('FormularioDinamico', { url:generarUrl() })}
                    >
                        <Text style={{fontSize:16, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>LLENAR FORMULARIO</Text>
                    </TouchableOpacity>
                    }
                    {
                        status!="Paso 1"&&status!="Paso 2"?
                        <TouchableOpacity
                        style={{marginTop:10}}
                              onPress={() => navigation.navigate('FormularioDinamico', { url: 'http://192.168.10.17:89/formulario?step=1&client_id='+id })}
                          >
                              <Text style={{ color: '#4FA8D6', textAlign: 'center' }}><Feather name="edit" size={18} color="#4FA8D6" /> Actualizar / Editar formulario</Text>
                          </TouchableOpacity>
                        :
null
                    }
                
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Projects', { data: data,url:generarUrl() })}
                        style={{ marginTop: 10, borderRadius: 5, borderWidth: 0.5, borderColor: '#22428B', borderStyle: 'solid', padding: 13, width: '60%' }}
                    >
                        <Text style={{ color: 'gray', textAlign: 'center' }}>Ver proyectos y villas</Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 10, borderBottomColor: '#22428B', borderBottomWidth: 0.5, borderStyle: 'solid', height: 10, width: '60%' }}></View>
                    <View >
                        <Text style={{marginBottom:5, fontSize: 18, textAlign: 'center', color: '#204089' }}>Mi asesor</Text>
                      {
                          initializer.prospect!=null?
                          initializer.prospect.asesor!=null?
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ marginRight: 10, height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: '#204089', borderStyle: 'solid', borderWidth: 0.5 }}>
                                <Image style={{ borderRadius: 60, height: 60, width: 60, resizeMode: 'contain' }} source={{uri:'http://192.168.10.17:89/storage/assesor_storage/'+initializer.prospect.asesor.dni+'-profile.png'}} />
                            </View>


                            <View style={{ width: '71%' }}>
                                <Text style={{ fontSize: 16, marginBottom: 5, color: 'gray', }}>{initializer.prospect.asesor.nombres} {initializer.prospect.asesor.apellidos}</Text>

                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'baseline', }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', width: 55, marginRight: 35, marginBottom: 5, }}
                                        onPress={() =>           Linking.openURL(`tel:${initializer.prospect.asesor.celular}`)}
                                    >
                                        <View style={{ marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#204089', borderRadius: 5, height: 24, width: 24 }}>
                                            <Feather name="phone-call" size={16} color="white" />
                                        </View>


                                        <Text style={{ fontSize: 14, color: 'gray', }}>Llamada</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', width: 50, marginRight: 30, marginBottom: 5, }}
                                        onPress={() =>  Linking.openURL('mailto:'+initializer.prospect.asesor.email+'?subject=Tengo una inquietud&body=Saludos, soy '+initializer.prospect.client.nombres+' '+initializer.prospect.client.apellidos+', por favor, ayúdeme resolviendo la siguiente inquietud ...') }
                                    >


                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#204089', borderRadius: 5, height: 24, width: 24 }}>
                                            <Feather name="mail" size={16} color="white" />
                                        </View>

                                        <Text style={{ fontSize: 14, marginLeft: 5, color: 'gray', }}>Correo</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', width: 60,  marginRight: 10, marginBottom: 5, }}
                                        onPress={() => navigation.navigate('CitationNew', { client_id: initializer.prospect.client.id })}
                                    >

                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#204089', borderRadius: 5, height: 24, width: 24 }}>
                                            <Feather name="calendar" size={16} color="white" />
                                        </View>

                                        <Text style={{ fontSize: 14, marginLeft: 5, color: 'gray', }}>Visita en obra</Text>


                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        :
                        <Text style={{marginBottom:5, fontSize: 18, textAlign: 'center', fontWeight:'bold',color: '#204089' }}>No tiene un asesor asignado</Text>
                      :
                      <Text style={{marginBottom:5, fontSize: 18, textAlign: 'center',fontWeight:'bold', color: '#204089' }}>No tiene un asesor asignado</Text>
                      }
                    </View>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('Activities',{dni:initializer.prospect.client.cedula})}
                        style={{ marginTop: 20, borderRadius: 5, borderWidth: 0.5, borderColor: '#22428B', borderStyle: 'solid', padding: 10, width: '80%' }}
                    >
                        <Text style={{ color: 'gray', textAlign: 'center' }}>Ver comunicaciones previas con ambiensa</Text>
                    </TouchableOpacity>
                    <Text style={{ paddingHorizontal:10,marginTop: 15, color: 'gray', textAlign: 'center' }}>¿Necesitas ayuda con la gestión de tu crédito hipotecario?</Text>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('Credit',{id:initializer.prospect.client.id})}
                        style={{ marginTop: 15, borderRadius: 5, borderWidth: 0.5, borderColor: '#22428B', borderStyle: 'solid', padding: 10, width: '65%' }}
                    >
                        <Text style={{ color: 'gray', textAlign: 'center' }}><Feather name="home" size={16} color="#5FB0DA" /> Gestionar crédito hipotecario</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{marginVertical:10, textAlign: 'center',color: 'white', fontSize: 12, fontStyle: 'italic' }}>© Ambiensa 2021</Text>
                
    
</View>
                </ScrollView>
            </ImageBackground>
  

    )
}
