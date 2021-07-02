import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Linking, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import fondo from '../../assets/fondoValidacion.jpg'
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Initializer from '../../store/Initializer'
import Header from './components/Header'
import { cerrarSesion } from '../../utils/API/auth'
import ProgressLoader from 'rn-progress-loader';
import { useToast } from 'react-native-styled-toast'
import { SimpleLineIcons } from '@expo/vector-icons';
import history from './data/history.json'
const windowHeight = Dimensions.get('window').height;
import { obtenerClienteAuth } from '../../utils/API/clients'
import { Modal, ScaleAnimation, ModalContent } from 'react-native-modals';

export default function Projects({ navigation, route }) {
    const initializer = React.useContext(Initializer);
    const { toast } = useToast()

    const { data, saldo,numero_reserva,dataManagerCobranza,dataManagerCredito } = route.params;

    const [visible, setVisible] = useState(false)
    const [datos, setDatos] = useState([])


    const renderItem = ({ item }) => {

        return (

            <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 7, width: 85, marginVertical: 3, marginHorizontal: 3, backgroundColor: item.status == "REALIZADO" ? '#5FB0DA' : item.status == "PENDIENTE" ? "#FF6D00" : "#B3B3B3" }}>
                {
                    item.id == saldo.length ?
                        (
                            <Feather name="home" size={18} color="white" />

                        )

                        :
                        item.status == "PENDIENTE" ?
                            <Feather name="alert-circle" size={15} color="white" />
                            :
                            item.status == "REALIZADO" ?
                                <Feather name="check-circle" size={15} color="white" />
                                : null
                }
                <Text style={{ color: 'white', fontSize: 14 }}>PAGO {item.id}</Text>
                <Text style={{ color: 'white', fontSize: 14 }}>{item.fecha}</Text>
                <Text style={{ color: item.status != "PENDIENTE" ? '#22428B' : "white", fontWeight: 'bold', fontSize: 14 }}>{item.status}</Text>



            </View>








        )
    }
    console.log(datos)
    return (
        <ImageBackground source={fondo} style={{ paddingTop: Constants.statusBarHeight, flex: 1, width: '100%', resizeMode: "cover", }}>
            <View style={{ flex: 1, width: '100%', }}>


                <Header data={data} navigation={navigation}/>
                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                    <TouchableOpacity

                        onPress={() => navigation.goBack()}
                    ><Feather name="chevron-left" size={24} color="white" />
                    </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> ESTADO DE CUENTA</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    flex: 1, marginHorizontal: '3%', backgroundColor: 'white', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5, paddingTop: 10, borderRadius: 4
                }}>

                    <Text style={{ marginHorizontal: '3%', marginTop: 5, textAlign: 'center', fontSize: 16, marginBottom: 10, color: 'gray', }}>Recuerda mantenerte al día en tus pagos para no perder los beneficios y promociones de los que eres acreedor.</Text>

                    <TouchableOpacity
                        style={{ marginTop: 5, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '70%' }}
                        onPress={() => navigation.navigate('Payment', { data: data,numero_reserva })}
                    >
                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>REALIZAR PAGO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setVisible(true)}
                        style={{ marginTop: 10, borderRadius: 5, borderWidth: 0.5, borderColor: '#22428B', borderStyle: 'solid', padding: 5, width: '60%' }}
                    >
                        <Text style={{ color: 'gray', textAlign: 'center' }}><SimpleLineIcons name="present" size={18} color="#22428B" /> Premios y promociones</Text>
                    </TouchableOpacity>
                  
                    <View style={{marginTop:10}}>
                    <Text style={{ marginBottom: 5, paddingHorizontal: '15%', fontSize: 18, textAlign: 'center', color: '#204089' }}>Contactar a mi asesor de Credito y Finanzas</Text>
                            {
                            
                            dataManagerCredito != null ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 }}>
                                            <View style={{ marginRight: 10, height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: '#204089', borderStyle: 'solid', borderWidth: 0.5 }}>
                                                <Image style={{ borderRadius: 60, height: 60, width: 60, resizeMode: 'contain' }} source={{ uri: 'http://api.ambiensa.info/storage/assesor_storage/' + dataManagerCredito.dni + '-profile.png' }} />
                                            </View>


                                            <View style={{ width: '50%' }}>
                                                <Text style={{ fontSize: 16, marginBottom: 5, color: 'gray', }}>{dataManagerCredito.names} {dataManagerCredito.last_names}</Text>

                                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'baseline', }}>
                                                    <TouchableOpacity
                                                        style={{ flexDirection: 'row', width: 55, marginRight: 35, marginBottom: 5, }}
                                                        onPress={() => Linking.openURL(`tel:${dataManagerCredito.cellphone}`)}
                                                    >
                                                        <View style={{ marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#204089', borderRadius: 5, height: 24, width: 24 }}>
                                                            <Feather name="phone-call" size={16} color="white" />
                                                        </View>


                                                        <Text style={{ fontSize: 14, color: 'gray', }}>Llamada</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{ flexDirection: 'row', width: 50, marginRight: 30, marginBottom: 5, }}
                                                        onPress={() => Linking.openURL('mailto:' + creditoFinanzas.credito + '?subject=Tengo una inquietud&body=Saludos, soy ' + data.client.names + ' ' + data.client.last_names + ', por favor, ayúdeme resolviendo la siguiente inquietud ...')}
                                                    >


                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#204089', borderRadius: 5, height: 24, width: 24 }}>
                                                            <Feather name="mail" size={16} color="white" />
                                                        </View>

                                                        <Text style={{ fontSize: 14, marginLeft: 5, color: 'gray', }}>Correo</Text>

                                                    </TouchableOpacity>

                                                </View>
                                            </View>

                                        </View>
                                        :
                                       null
                                 
                            }
                              {
                            
                            dataManagerCobranza != null ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 }}>
                                            <View style={{ marginRight: 10, height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: '#204089', borderStyle: 'solid', borderWidth: 0.5 }}>
                                                <Image style={{ borderRadius: 60, height: 60, width: 60, resizeMode: 'contain' }} source={{ uri: 'http://api.ambiensa.info/storage/assesor_storage/' + dataManagerCobranza.dni + '-profile.png' }} />
                                            </View>


                                            <View style={{ width: '50%' }}>
                                                <Text style={{ fontSize: 16, marginBottom: 5, color: 'gray', }}>{dataManagerCobranza.names} {dataManagerCobranza.last_names}</Text>

                                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'baseline', }}>
                                                    <TouchableOpacity
                                                        style={{ flexDirection: 'row', width: 55, marginRight: 35, marginBottom: 5, }}
                                                        onPress={() => Linking.openURL(`tel:${dataManagerCobranza.cellphone}`)}
                                                    >
                                                        <View style={{ marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#204089', borderRadius: 5, height: 24, width: 24 }}>
                                                            <Feather name="phone-call" size={16} color="white" />
                                                        </View>


                                                        <Text style={{ fontSize: 14, color: 'gray', }}>Llamada</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{ flexDirection: 'row', width: 50, marginRight: 30, marginBottom: 5, }}
                                                        onPress={() => Linking.openURL('mailto:' + creditoFinanzas.cobranza + '?subject=Tengo una inquietud&body=Saludos, soy ' + data.client.names + ' ' + data.client.last_names + ', por favor, ayúdeme resolviendo la siguiente inquietud ...')}
                                                    >


                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#204089', borderRadius: 5, height: 24, width: 24 }}>
                                                            <Feather name="mail" size={16} color="white" />
                                                        </View>

                                                        <Text style={{ fontSize: 14, marginLeft: 5, color: 'gray', }}>Correo</Text>

                                                    </TouchableOpacity>

                                                </View>
                                            </View>

                                        </View>
                                        :
                                       null
                                 
                            }
                        </View>


                    <FlatList
                        style={{ width: '100%', marginTop: 10 }}
                        numColumns={4}
                        data={saldo}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}

                    />
                </View>
                <Text style={{ marginVertical: 10, textAlign: 'center', color: 'white', fontSize: 12, fontStyle: 'italic' }}>© Ambiensa 2021</Text>


            </View>
            <Modal

                visible={visible}
                onTouchOutside={() => {
                    setVisible(false)
                }}
                modalAnimation={new ScaleAnimation({
                    initialValue: 0, // optional
                    useNativeDriver: true, // optional
                })}
            >
                <ModalContent>

                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Image style={{ marginTop: 30, marginBottom: 30, height: 100, width: '55%' }} source={require('../../assets/logo.png')} />

                    </View>
                    <Text style={{ marginTop: 10, textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginBottom: 10, color: '#22428B', }}>PREMIOS Y PROMOCIONES</Text>

                    <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 16, marginBottom: 10, color: 'gray', }}>Te recordamos que por tu reserva ganaste:</Text>
                    <Text style={{ marginHorizontal: '3%', marginTop: 10, textAlign: 'left', fontSize: 16, marginBottom: 10, color: 'gray', }}>* {data.client.work_place!=null&&data.client.work_place!=""?data.client.work_place:"No posee premio"}</Text>
                    <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 16, marginBottom: 10, color: 'gray', }}>Estos premios serán entregados en el momento que entreguemos tu casa. La entrega de tu casa está planificada para {history[23].date}</Text>

                    <TouchableOpacity
                        style={{ marginTop: 10, borderRadius: 5, borderWidth: 0.5, borderColor: '#22428B', borderStyle: 'solid', padding: 13, width: '100%' }}
                        onPress={() => setVisible(false)}
                    >
                        <Text style={{ color: '#204089', fontWeight: 'bold', textAlign: 'center' }}><Feather name="x" size={16} color="#204089" /> Cerrar</Text>
                    </TouchableOpacity>
                </ModalContent>
            </Modal>


        </ImageBackground>


    )
}
