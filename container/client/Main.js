import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Linking, Dimensions, ScrollView, ImageBackground } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import fondo from '../../assets/fondoValidacion.jpg'
import { obtenerDataCliente } from '../../utils/API/clients'
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Initializer from '../../store/Initializer'
import Header from './components/Header'
import { cerrarSesion } from '../../utils/API/auth'
import ProgressLoader from 'rn-progress-loader';
import { obtenerReservacionesOnlyData } from '../../utils/API/payments'

import { useToast } from 'react-native-styled-toast'
import { obtenerPlanPagos ,obtenerCreditoFinanzas,obtenerManagerPorEmail} from '../../utils/API/clients'
import { Picker } from '@react-native-picker/picker';
const windowHeight = Dimensions.get('window').height;
import { obtenerClienteAuth } from '../../utils/API/clients'
export default function Projects(props) {
    const initializer = React.useContext(Initializer);
    const { toast } = useToast()

    const [paymentsData, setPaymentsData] = useState([])
    const [payments, setPayments] = useState("")

    const [reservationData, setReservationData] = useState([])


    const [loading, setLoading] = useState(false)
    const [creditoFinanzas, setCreditoFinanzas] = useState({credito:null,cobranza:null})
    const [dataManagerCredito,setDataManagerCredito] = useState(null)

    const [dataManagerCobranza,setDataManagerCobranza] = useState(null)
    const [data, setData] = useState(null)
    useEffect(() => {
        if (data != null) {
            obtenerPlanPagos(data.client.cedula, setPaymentsData)
            obtenerReservacionesOnlyData(data.client.cedula, setReservationData, mostrarNotificacion, setLoading)
        }
    }, [data])
    console.log("DATA")
    console.log(reservationData)
    useEffect(() => {
      
        if (creditoFinanzas.credito != null) {
            setDataManagerCredito(null)
            obtenerManagerPorEmail(creditoFinanzas.credito,setDataManagerCredito)

        }
        if(creditoFinanzas.cobranza!=null){
            setDataManagerCobranza(null)
            obtenerManagerPorEmail(creditoFinanzas.cobranza,setDataManagerCobranza)

        }
    }, [creditoFinanzas.credito,creditoFinanzas.cobranza])

    useEffect(() => {
        if (initializer.usuario != null) {
            setPaymentsData([])
            obtenerClienteAuth(setData, initializer)
        }
    }, [initializer.usuario])
    const mostrarNotificacion = (msg, type) => {

        toast({ intent: type.toUpperCase(), message: msg, bg: type, color: type, iconColor: type, iconName: type == "error" ? 'x-circle' : 'check-circle', })

    }

    const salir = () => {
        cerrarSesion(initializer, mostrarNotificacion, setLoading, props.navigation)
    }
    const obtener=(reserva)=>{
        let fechas = []
        let cuotas = []

        paymentsData.map((e)=>{
            if(e.id_reserva==reserva){
                fechas = e.fecha_cuota
                cuotas = e.saldo_cuota
            }
        })
        fechas.pop()
        cuotas.pop()
       return merge(fechas,cuotas)
       
    }
    const merge = (data1,data2) =>{
        let saldo = []
        data1.map((e,i)=>{
            let text =""
            if(parseFloat(data2[i-1])==0){
                text = "PENDIENTE"
            }else{
                text=""
            }
            saldo.push({id:(i+1),fecha:e,status:(parseFloat(data2[i])==0?'REALIZADO':text)})
        })
        return saldo
    }
   const hayPagosPendientes=(reserva)=>{
       let cuotas = []
    paymentsData.map((e)=>{
        if(e.id_reserva==reserva){
            cuotas = e.saldo_cuota
        }
    })
    let hay = false;
    cuotas.map((e)=>{
        if(parseFloat(e)!=0){
            hay = true
        }
    })
    return hay
   }
    return (
        <ImageBackground source={fondo} style={{ paddingTop: Constants.statusBarHeight, flex: 1, width: '100%', resizeMode: "cover", }}>
            <ScrollView style={{ flex: 1, width: '100%', }}>
                <View style={{ flex: 1, width: '100%', }}>


                    <Header data={data} navigation={props.navigation}/>
                    <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                        <TouchableOpacity

                            onPress={salir}
                        ><Feather name="chevron-left" size={24} color="white" />
                        </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> MI PERFIL</Text>
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
                        elevation: 5, paddingTop: 10, paddingBottom: 30, borderRadius: 4
                    }}>
                        <View style={{width:'100%',paddingHorizontal:'3%'}}>
                             
                        <Picker
                            selectedValue={payments}

                            style={{ color: 'gray', height: 45, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>{
                                console.log("PASO VALR")
                                console.log(itemValue)
                                setPayments(itemValue)
                                
                                setCreditoFinanzas({credito:null,cobranza:null})
                                if(itemValue!=""){
                                    obtenerCreditoFinanzas(itemValue,data.client.cedula,setCreditoFinanzas)
                                }else{
                                    setDataManagerCobranza(null)
                                    setDataManagerCredito(null)
                                }
                                
                                
                            }
                            } >
                                   <Picker.Item label="Seleccione una reserva" value={''} />
                            {
                            reservationData.map((e)=>(
                             
                                <Picker.Item key={e.reservation_code} label={e.reservation_code+ " - "+e.proyect} value={e.reservation_code.toString()} />
                            ))
                            }
                        </Picker>
                        </View>
                       
                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                            <TouchableOpacity disabled={payments!=""?false:true} onPress={() => props.navigation.navigate('ModelClient', { data: data,reserva:payments })} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                                <Image style={{ marginTop: 10, marginBottom: 10, height: 100, width: 100, }} source={require('../../assets/iconCasa.png')} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#22428B' }}>MI FUTURA CASA</Text>

                            </TouchableOpacity>
                            <TouchableOpacity disabled={payments!=""?false:true} onPress={() => props.navigation.navigate('Account', {numero_reserva:payments,dataManagerCredito,dataManagerCobranza, data: data,saldo:obtener(payments)})} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ marginTop: 10, marginBottom: 10, height: 100, width: 100 }} source={require('../../assets/iconMoney.png')} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#22428B' }}>ESTADO DE CUENTA</Text>

                            </TouchableOpacity>
                        </View>
                        {
                            payments!=""?
                            <View style={{ width: '100%', paddingHorizontal: '10%', marginBottom: 10, }}>
                            <Text style={{ marginBottom: 5, textAlign: 'left', fontSize: 16, color: '#22428B' }}><Feather name="check" size={20} color="#00A223" /> Reserva: <Text style={{ color: 'gray' }}>Activa</Text></Text>
                            <Text style={{ marginBottom: 5, fontSize: 16, color: '#22428B' }}><Feather name="check" size={20} color="#00A223" /> Documentos: <Text style={{ color: 'gray' }}>Completos</Text></Text>
                            <Text style={{ marginBottom: 5, fontSize: 16, color: '#22428B' }}><Feather name="check" size={20} color="#00A223" /> Pago de cuotas: <Text style={{ color: 'gray' }}>al día</Text></Text>
                        </View>
                            :
                                <Text style={{marginBottom:10,fontSize:16}}><Feather name="info" size={20} color="red" /> Seleccione un número de reserva</Text>
                        }
                 





                        <TouchableOpacity
                            style={{ marginTop: 10, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '70%' }}
                            onPress={() =>{
                                console.log({ data: data,numero_reserva:payments })
                                props.navigation.navigate('Payment', { data: data,numero_reserva:payments })
                            } }
                        >
                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>REALIZAR PAGO</Text>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 10, borderBottomColor: '#22428B', borderBottomWidth: 0.5, borderStyle: 'solid', height: 10, width: '60%' }}></View>
                        <View >
                            <Text style={{ marginBottom: 5, paddingHorizontal: '15%', fontSize: 18, textAlign: 'center', color: '#204089' }}>Contactar a mi asesor de Crédito y Finanzas</Text>
                            {
                            
                            dataManagerCredito != null ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 }}>
                                            <View style={{ marginRight: 10, height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: '#204089', borderStyle: 'solid', borderWidth: 0.5 }}>
                                                <Image style={{ borderRadius: 60, height: 60, width: 60, resizeMode: 'contain' }} source={{ uri: 'http://192.168.10.17:89/storage/assesor_storage/' + dataManagerCredito.dni + '-profile.png' }} />
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
                                        <Text style={{ marginBottom: 5, fontSize: 18, textAlign: 'center', fontWeight: 'bold', color: '#204089' }}>No tiene un asesor de crédito asignado</Text>
                                 
                            }
                              {
                            
                            dataManagerCobranza != null ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 }}>
                                            <View style={{ marginRight: 10, height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: '#204089', borderStyle: 'solid', borderWidth: 0.5 }}>
                                                <Image style={{ borderRadius: 60, height: 60, width: 60, resizeMode: 'contain' }} source={{ uri: 'http://192.168.10.17:89/storage/assesor_storage/' + dataManagerCobranza.dni + '-profile.png' }} />
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
                                        <Text style={{ marginBottom: 5, fontSize: 18, textAlign: 'center', fontWeight: 'bold', color: '#204089' }}>No tiene un asesor de cobranza asignado</Text>
                                 
                            }
                        </View>


                    </View>
                    <Text style={{ marginVertical: 10, textAlign: 'center', color: 'white', fontSize: 12, fontStyle: 'italic' }}>© Ambiensa 2021</Text>


                </View>
                <ProgressLoader
                    visible={loading}
                    isModal={true} isHUD={true}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />
            </ScrollView>
        </ImageBackground>


    )
}
