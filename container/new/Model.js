import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground, Linking } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import fondo from '../../assets/fondoValidacion.jpg'
import { Modal, ScaleAnimation, ModalContent } from 'react-native-modals';
import { Entypo } from '@expo/vector-icons';
import Header from '../components/Header'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import Swiper from 'react-native-swiper'
 
import Initializer from '../../store/Initializer'

export default function Projects({ navigation, route }) {
    const initializer = React.useContext(Initializer);

    const { id, nombre, images, cuartos, baños, detalle, terreno, construccion, ficha_tecnica } = route.params.item;
    const [selected, setSelected] = React.useState('')
    const renderItem = ({ item }) => {
    
        return (
            <Image style={{ height: 200, marginRight: 10, width: windowWidth, resizeMode: "cover", }} source={{ uri: item }} />




        )
    }
    return (
        <ImageBackground source={fondo} style={{ paddingTop: Constants.statusBarHeight, flex: 1, height: windowHeight, width: '100%', resizeMode: "cover", }}>
            <ScrollView style={{ flex: 1, width: '100%', height: windowHeight }}>

                <Header  navigation={navigation}/>
                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                    <TouchableOpacity

                        onPress={() => navigation.goBack()}
                    ><Feather name="chevron-left" size={24} color="white" />
                    </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> {nombre}</Text>
                </View>
                <View style={{

                    flex: 1, marginBottom: '3%', marginHorizontal: '5%', backgroundColor: 'white', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5, paddingTop: 10
                }}>

                    <Swiper style={{ height: 250 }} showsPagination={false} nextButton={(<View style={{ justifyContent: 'center', alignItems: 'center', height: 30, width: 30, backgroundColor: '#274589', }}><Text style={{ paddingBottom: 10, textAlign: 'center', fontSize: 36, color: 'white' }}>›</Text></View>
                    )} prevButton={(<View style={{ justifyContent: 'center', alignItems: 'center', height: 30, width: 30, backgroundColor: '#274589', }}><Text style={{ paddingBottom: 10, textAlign: 'center', fontSize: 36, color: 'white' }}>‹</Text></View>
                    )} showsButtons={true} autoplay={true} >
                        {
                            images.map((e, i) => (
                                <TouchableOpacity onPress={() => setSelected(e)} key={i} style={{

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Image style={{ height: 250, marginRight: 10, width: windowWidth, resizeMode: "cover", }} source={{ uri: e }} />

                                </TouchableOpacity>


                            ))
                        }
                    </Swiper>
                    <View style={{ flex: 2 }}>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ height: 50, resizeMode: 'contain', width: 50 }} source={require('../../assets/icon1.png')} />
                                <Text style={{ color: 'black', textAlign: 'center' }}>{cuartos} dormitorios</Text>

                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ height: 50, resizeMode: 'contain', width: 50 }} source={require('../../assets/icon2.png')} />
                                <Text style={{ color: 'black', textAlign: 'center' }}>{baños} baños</Text>

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Text style={{ color: 'black', textAlign: 'center' }}>Terrreno: {terreno} m2</Text>
                            <Text style={{ color: 'black', textAlign: 'center' }}>Construcción: {construccion} m2</Text>
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', }}>
                            {detalle.map((e, i) => (
                                <Text key={i} style={{ fontSize: 13, flexBasis: '50%', color: 'black' }}>   <Entypo name="dot-single" size={18} color="black" /> {e.length > 19 ? e.substr(0, 17) + "..." : e}</Text>
                            ))}

                        </View>
                        <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 80, resizeMode: 'contain', width: '50%' }} source={require('../../assets/paseoSol.jpg')} />
                            <Image style={{ height: 70, resizeMode: 'contain', width: '50%' }} source={require('../../assets/logo.png')} />

                        </View>
                        <View style={{ marginBottom:15,marginTop: 5, width: '100%', justifContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL(ficha_tecnica)}
                                style={{ marginTop: 10, borderRadius: 5, borderWidth: 0.5, borderColor: '#22428B', borderStyle: 'solid', padding: 13, width: '60%' }}
                            >
                                <Text style={{ color: 'gray', textAlign: 'center' }}><Feather name="download" size={18} color="#5FB0DA" /> Descargar ficha técnica</Text>
                            </TouchableOpacity>
         {/*                    {
                                initializer.prospect!=null?
                                initializer.prospect.asesor!=null?
                                    <TouchableOpacity
                                    style={{ marginTop: 5, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '80%' }}

                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>SOLICITAR COTIZACIÓN</Text>
                                </TouchableOpacity>

                                :null
                                :null
                            } */}
                      <View >
   
                      {
                          initializer.prospect!=null?
                          initializer.prospect.asesor!=null?
                          <View style={{marginTop:15}}>
                                                   <Text style={{marginBottom:5, fontSize: 18, textAlign: 'center', color: '#204089' }}>Mi asesor</Text>

                                                   <View style={{ flexDirection: 'row', width: '100%' }}>
                                                       <View style={{ marginRight: 10, height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: '#204089', borderStyle: 'solid', borderWidth: 0.5 }}>
                                                           <Image style={{ borderRadius: 60, height: 60, width: 60, resizeMode: 'contain' }} source={{uri:'http://192.168.10.17:88/storage/assesor_storage/'+initializer.prospect.asesor.dni+'-profile.png'}} />
                                                       </View>
                           
                           
                                                       <View style={{ width: '71%' }}>
                                                           <Text style={{ fontSize: 16, marginBottom: 5, color: 'gray', }}>{initializer.prospect.asesor.names} {initializer.prospect.asesor.last_names}</Text>
                           
                                                           <View style={{ flexDirection: 'row', width: '100%', alignItems: 'baseline', }}>
                                                               <TouchableOpacity
                                                                   style={{ flexDirection: 'row', width: 55, marginRight: 35, marginBottom: 5, }}
                                                                   onPress={() =>           Linking.openURL(`tel:${initializer.prospect.asesor.cellphone}`)}
                                                               >
                                                                   <View style={{ marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#204089', borderRadius: 5, height: 24, width: 24 }}>
                                                                       <Feather name="phone-call" size={16} color="white" />
                                                                   </View>
                           
                           
                                                                   <Text style={{ fontSize: 14, color: 'gray', }}>Llamada</Text>
                                                               </TouchableOpacity>
                                                               <TouchableOpacity
                                                                   style={{ flexDirection: 'row', width: 50, marginRight: 30, marginBottom: 5, }}
                                                                   onPress={() =>  Linking.openURL('mailto:'+initializer.prospect.asesor.email+'?subject=Tengo una inquietud&body=Saludos, soy '+initializer.prospect.client.names+' '+initializer.prospect.client.last_names+', por favor, ayúdeme resolviendo la siguiente inquietud sobre el modelo de villa '+nombre+'...') }
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
                                                  
                          </View>
                          
                       :
                       null
                      :
                     null
                      }
                    </View>
                  
                        </View>



                    </View>


                </View>
                <Text style={{ textAlign: 'center', marginBottom: 5, color: 'white', fontSize: 12, fontStyle: 'italic' }}>© Ambiensa 2021</Text>
                <Modal
                    containerStyle={{ margin: 5 }}
                    visible={selected != ""}
                    onTouchOutside={() => {
                        setSelected("")
                    }}
                    modalAnimation={new ScaleAnimation({
                        initialValue: 0, // optional
                        useNativeDriver: true, // optional
                    })}
                >
                    <ModalContent>


                        <Image style={{ height: 250, width: windowWidth - 7, resizeMode: "contain", }} source={{ uri: selected }} />
                        <TouchableOpacity
                            style={{ marginTop: 10, borderRadius: 5, borderWidth: 0.5, borderColor: '#22428B', borderStyle: 'solid', padding: 13, width: '100%' }}
                            onPress={() => setSelected("")}
                        >
                            <Text style={{ color: '#204089', fontWeight: 'bold', textAlign: 'center' }}><Feather name="x" size={16} color="#204089" /> Cerrar</Text>
                        </TouchableOpacity>
                    </ModalContent>
                </Modal>


            </ScrollView>
        </ImageBackground>


    )
}
