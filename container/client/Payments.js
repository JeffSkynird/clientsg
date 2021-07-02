import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, Switch, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { obtenerReservaciones ,pagarTotal} from '../../utils/API/payments'
import { Picker } from '@react-native-picker/picker';
import { useToast } from 'react-native-styled-toast'
import ProgressLoader from 'rn-progress-loader';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function Payments({ navigation, route}) {
    const { data ,numero_reserva} = route.params;
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [datos, setDatos] = useState({ client: null, reservations: [] })

    const [number, setNumber] = useState('')
    const [reserva, setReserva] = useState(null)
    const [abono, setAbono] = useState(false)
    const [abonoValue, setAbonoValue] = useState('')
    const [final, setFinal] = useState(false)

    const [documentType, setDocumentType] = useState('')
    const [document, setDocument] = useState('')
    const [names, setNames] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [cellphone, setCellphone] = useState('')

    useEffect(() => {
        
        setDocumentType('01')
        setDocument(data.client.dni)
        setNames(data.client.names+" "+data.client.last_names)
        setAddress(data.client.address)
        setEmail(data.client.email)
        setCellphone(data.client.cellphone)
        obtenerReservaciones(data.client.dni, setDatos, mostrarNotificacion, setLoading)
        setNumber(numero_reserva)
    }
        , [])
    const mostrarNotificacion = (msg, type) => {

        toast({ intent: type.toUpperCase(), message: msg, bg: type, color: type, iconColor: type, iconName: type == "error" ? 'x-circle' : 'check-circle', })



    }
    const pagar = () => {
            if(address!=""&&email!=""&&cellphone!=""&&documentType!=""&&names!=""&&document!=""){
      
                let amount=reserva.balance!=0?reserva.balance!=0:reserva.pending;
                let total=reserva.balance!=0?reserva.balance!=0:reserva.pending;
                let tax="0.0"
                if(abono){
                    amount=abonoValue
                    total=Number(amount)+Number(tax)
                }
                  
          
            let data1 = {
                document : document,
                document_type: documentType,
                full_name:names,
                address  :address,
                mobile: "+593"+cellphone,
                email: email,
                reservation_code:reserva.reservation_code.toString(),
                description:reserva.reservation_code+'-Pago/abono cuota',
                amount: total.toString(),
                amountWithoutTax:total.toString(),
                tax:tax.toString(),
            }
            pagarTotal(data1,navigation,setLoading)
        
           
        }else{
            mostrarNotificacion("No debe dejar campos vacíos",'error')
        }
    }
    const buscar = () => {
        let reserv = null
        datos.reservations.map((e) => {
            if (e.reservation_code == number) {
                reserv = e
            }
        })
        if (reserv != null) {
            setReserva(reserv)
        } else {
            mostrarNotificacion('No se ha encontrado la reserva', 'error')
        }

    }
    return (
        <View style={{ paddingTop: Constants.statusBarHeight, flex: 1, height: windowHeight, width: '100%', resizeMode: "cover", }}>
            <ScrollView style={{ flex: 1, width: '100%', height: windowHeight }}>

                <Image style={{ marginTop: Constants.statusBarHeight, height: 150, width: '100%' }} source={require('../../assets/logo_pago.png')} />

                <View style={{ flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                    <TouchableOpacity

                        onPress={() => navigation.goBack()}
                    ><Feather name="chevron-left" size={24} color="white" />
                    </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>         FORMULARIO DE PAGO</Text>
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
                    elevation: 5, paddingTop: 10, borderRadius: 4, marginBottom: '10%', paddingBottom: '60%'
                }}>
                    {

                        datos.reservations != null && reserva == null ?

                            <React.Fragment>
                                <TextInput
                                    style={{ marginTop: 10, padding: 10, width: '90%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 50, color: '#939393' }}
                                    onChangeText={text => setNumber(text)}
                                    value={number}
                                    keyboardType="numeric"
                                    placeholder="Ingrese su número de reserva"
                                />
                                <TouchableOpacity
                                    style={{ marginTop: 20, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '60%' }}
                                    onPress={buscar}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>INGRESAR</Text>
                                </TouchableOpacity>
                            </React.Fragment>
                            :
                            reserva == null ?
                                <Text style={{ marginTop: 15, paddingHorizontal: '5%', marginBottom: 5, fontSize: 18, textAlign: 'center', color: 'gray' }}>No se han encontrado datos de reservas</Text>
                                :
                                reserva != null && final == false ?
                                    <View style={{ justifyContent: 'center', paddingHorizontal: '10%', width: '100%' }}>
                                        <Text style={{ fontSize: 22, marginTop: 15, color: '#1D397A', fontWeight: 'bold', textAlign: 'center' }}><Feather name="user" size={24} color="#1D397A" /> DATOS DEL USUARIO</Text>

                                        <Text style={{ fontSize: 17, marginTop: 15, color: 'gray', textAlign: 'left' }}>Nombres {datos.client.names}</Text>
                                        <Text style={{ fontSize: 17, marginTop: 5, color: 'gray', textAlign: 'left' }}>Cédula {datos.client.dni}</Text>
                                        <Text style={{ fontSize: 17, marginTop: 5, color: 'gray', }}>Valor pendiente de pago ${reserva.balance} </Text>
                                        <Text style={{ fontSize: 17, marginTop: 5, color: 'gray', }}>Valor que puede adelantar ${reserva.pending} </Text>
                                        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 10, color: 'gray' }}>¿Desea pagar un abono?          </Text>
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#323B62" }}
                                                thumbColor={abono ? "white" : "white"}
                                                ios_backgroundColor="#3e3e3e"
                                                style={{ marginBottom: 15 }}
                                                onValueChange={text => setAbono(!abono)}
                                                value={abono}
                                            />
                                        </View>
                                        {
                                            abono ?
                                                <TextInput
                                                    style={{ padding: 10, width: '100%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 50, color: '#939393' }}
                                                    onChangeText={text => setAbonoValue(text)}
                                                    value={abonoValue}
                                                    keyboardType="numeric"
                                                    placeholder="Ingrese el valor que desea abonar"
                                                />

                                                : null
                                        }
                                        <TouchableOpacity
                                            style={{ marginTop: 20, width: '100%', borderRadius: 5, backgroundColor: '#22428B', padding: 13 }}
                                            onPress={() =>{
                                                if(abono){
                                                    if(abonoValue!=""){
                                                        if(abonoValue>0){
                                                            setFinal(true)
                                                        }else{
                                                            mostrarNotificacion("Ingrese un valor a abonar",'error')
    
                                                        }
                                                    }else{
                                                        mostrarNotificacion("Ingrese un valor a abonar",'error')
                                                    }
                                                }else{
                                                    setFinal(true)
                                                }
                                           
                                            }}
                                        >
                                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>CONTINUAR</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ justifyContent: 'center', paddingHorizontal: '10%', width: '100%' }}>
                                        <Text style={{ fontSize: 22, marginTop: 15, color: '#1D397A', fontWeight: 'bold', textAlign: 'center' }}><Feather name="book" size={24} color="#1D397A" /> DATOS DE CONTACTO</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{ borderWidth: 0.7, borderColor: '#DEE3ED', width: '35%', marginRight: 10 }}>
                                                <Picker
                                                    selectedValue={documentType}

                                                    style={{ color: 'gray', height: 45, width: '100%' }}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        setDocumentType(itemValue)
                                                    } >
                                                    <Picker.Item label="Tipo" value="" />
                                                    <Picker.Item label="CI" value="01" />
                                                    <Picker.Item label="RUC" value="02" />
                                                    <Picker.Item label="PASS" value="03" />
                                                </Picker>
                                            </View>
                                            <TextInput
                                                style={{ padding: 10, width: '60%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 45, color: '#939393' }}
                                                onChangeText={text => setDocument(text)}
                                                value={document}
                                                keyboardType="numeric"
                                                placeholder="Documento"
                                            />
                                        </View>
                                        <TextInput
                                            style={{marginTop:10, padding: 10, width: '100%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 45, color: '#939393' }}
                                            onChangeText={text => setNames(text)}
                                            value={names}
                                            keyboardType="numeric"
                                            placeholder="Nombres completos"
                                        />
                                        <TextInput
                                            style={{marginTop:10, padding: 10, width: '100%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 45, color: '#939393' }}
                                            onChangeText={text => setAddress(text)}
                                            value={address}
                                            keyboardType="numeric"
                                            placeholder="Dirección"
                                        />
    <TextInput
                                            style={{marginTop:10, padding: 10, width: '100%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 45, color: '#939393' }}
                                            onChangeText={text => setEmail(text)}
                                            value={email}
                                            keyboardType="numeric"
                                            placeholder="Correo electrónico"
                                        />
                                        <TextInput
                                            style={{marginTop:10, padding: 10, width: '100%', borderColor: '#DEE3ED', borderWidth: 1, borderStyle: 'solid', fontSize: 16, height: 45, color: '#939393' }}
                                            onChangeText={text => setCellphone(text)}
                                            value={cellphone}
                                            keyboardType="numeric"
                                            placeholder="Celular"
                                        />
                                           <TouchableOpacity
                                            style={{ marginTop: 20, width: '100%', borderRadius: 5, backgroundColor: '#22428B', padding: 13 }}
                                            onPress={pagar}
                                        >
                                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>PAGAR</Text>
                                        </TouchableOpacity>
                                    </View>


                    }

                </View>
                <Text style={{ marginVertical: 10, textAlign: 'center', color: 'gray', fontWeight: 'bold', fontSize: 14, fontStyle: 'italic' }}>© Ambiensa 2021</Text>
                <ProgressLoader
                    visible={loading}
                    isModal={true} isHUD={true}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />
            </ScrollView>
        </View>
    )
}
