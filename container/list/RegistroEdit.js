import React, { useState, useEffect, useContext } from 'react'
import { Dimensions,View, Text, TouchableOpacity, Switch, StyleSheet, TextInput, Platform, ScrollView,ImageBackground } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Initializer from '../../store/Initializer'
import { obtenerTodosProvincias } from "../../utils/API/provinces.js";
import { obtenerTodos } from "../../utils/API/cities.js";
import { obtenerRecomendaciones } from "../../utils/API/recomendations.js";
import { eliminarCliente,editarCliente } from "../../utils/API/clients.js";
import {dateFormatA, convertirDate} from '../../utils/Date'
import { useToast } from 'react-native-styled-toast'

import {obtenerTodosAmount} from '../../utils/API/amount'

import ProgressLoader from 'rn-progress-loader';


export default function ClientEdit({ navigation,route }) {
    const { toast } = useToast()

    const initializer = React.useContext(Initializer);
    const {  item } = route.params;
    const [dni, setDni] = useState('')
    const [names, setNames] = useState('')
    const [lastNames, setLastNames] = useState('')
    const [email, setEmail] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [landline, setLandLine] = useState('')
    const [address, setAddress] = useState('')
    const [calle2, setCalle2] = useState('')
    const [villa, setVilla] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [nacimiento, setNacimiento] = useState('')
    const [province, setProvince] = useState('')
    const [provinceData, setProvinceData] = useState({data:[],backup:[]})
    const [city, setCity] = useState('')
    const [cityData, setCityData] = useState({ data: [], backup: [] })
    const [civil, setCivil] = useState('')
    const [isWorking, setIsWorking] = useState(false)
    const [charges, setCharges] = useState('')
    const [rooms, setRooms] = useState(1)
    const [loading, setLoading] = React.useState(false);


    const [cargos, setCArgos] = useState(1);

    const [answerProvince, setAnswerProvince] = useState('')
    const [provinceDataAnswer, setProvinceDataAnswer] = useState({data:[],backup:[]})
    const [answerCity, setAnswerCity] = useState('')
    const [cityDataAnswer, setCityDataAnswer] = useState({ data: [], backup: [] })

    const [amount, setAmount] = useState(0)
    const [amountData, setAmountData] = useState([])

    const [location, setLocation] = useState("")

    //CONYUGE
 

    const [dniS, setDniS] = useState('')
    const [namesS, setNamesS] = useState('')
    const [lastNamesS, setLastNamesS] = useState('')
    const [emailS, setEmailS] = useState('')
    const [cellphoneS, setCellphoneS] = useState('')
    const [landlineS, setLandLineS] = useState('')
     

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [data,setData] = useState(null)
    useEffect(() => {
        obtenerTodosProvincias(setProvinceData,setProvinceDataAnswer)
        obtenerTodos(setCityData,setCityDataAnswer)
        obtenerTodosAmount(setAmountData)
        findCoordinates()
    }, [])
   const  findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const loc = JSON.stringify(position);
                let locF = JSON.parse(loc)
                setLocation(locF.coords.latitude+','+locF.coords.longitude)
               
               
			},
			error => console.log(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
    };

    useEffect(() => {
        if(item!=null){
            setDni(item.dni)
            setNames(item.names)
            setLastNames(item.last_names)
            setEmail(item.email)
            setCellphone(item.cellphone)
            setLandLine(item.landline)
            setAddress(item.street1)
            setCalle2(item.street2)
            setDescripcion(item.description)
            setVilla(item.village)
           // setProvince(item.client.province)
            setCity(parseInt(item.city.id))
         
            setIsWorking(item.answer.is_working==1?true:false)
            setRooms(item.answer.rooms)
            setCharges(item.answer.charges)
          
            setAmount(item.answer.amount_id)
            setAnswerCity(item.answer.city_id)

            if ( item.born_date instanceof Date && !isNaN(item.born_date)) {
           
                setDate(convertirDate(item.born_date))
              }
          
            setCivil(item.civil);

            //SPOUSE
            if(item.spouse!=null){
                setDniS(item.spouse.dni)
                setNamesS(item.spouse.names)
                setLastNamesS(item.spouse.last_names)
                setCellphoneS(item.spouse.cellphone)
                setEmailS(item.spouse.email)
                setLandLineS(item.spouse.landline)
               
                
            }
        }
    }, [item])

    const guardar = () => {
        /* spouse_id: data.spouse != null ? data.spouse.id : "",
             spouse_dni: dniS,
             spouse_names: names,
             spouse_last_names: lastNamesS,
             spouse_born_date: nacimientoS,
             spouse_cellphone: cellphoneS,
             spouse_email: emailS */
             

         if (item != null) {
            let dat = {client_id:item.id,spouse_id:item.spouse_id,is_working:isWorking==true?1:0,charges:charges,rooms:rooms,answer_city:answerCity,amount_id:amount,location:location,spouse_dni:dniS,spouse_names:namesS,spouse_email:emailS,spouse_last_names:lastNamesS,spouse_cellphone:cellphoneS,spouse_landline:landlineS,dni:dni,names:names,last_names:lastNames,email:email,cellphone,landline,city_id:city,civil,born_date:date,street1:address,street2:calle2,village:villa,description:descripcion}
        
            if (validarCedula(dni)) {
                editarCliente(
                    dat,
                    initializer,mostrarNotificacion,navigation,setLoading
                );
            } else {
                initializer.mostrarNotificacion({
                    type: "error",
                    message: "Cédula inválida",
                });
            }
        }
 
    }
    const getId = (nombre) => {
        let datos = [
          {
            id: 1,
            name: "CASADO(A)",
          },
          {
            id: 2,
            name: "SEPARADO(A) JUDICIALMENTE",
          },
          {
            id: 3,
            name: "DIVORCIADO(A)",
          },
          {
            id: 4,
            name: "VIUDO(A)",
          },
          {
            id: 5,
            name: "UNION DE HECHO",
          },
          {
            id: 6,
            name: "SOLTERO(A)",
          },
        ];
        let id_civil = "";
        datos.map((e) => {
          if (nombre == e.name) {
            id_civil = e.id;
          }
        });
        return id_civil;
      };
      const mostrarNotificacion=(msg,type)=>{
        toast({ message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })
    }
    const getName = (id) => {
        let datos = [
          {
            id: 1,
            name: "CASADO(A)",
          },
          {
            id: 2,
            name: "SEPARADO(A) JUDICIALMENTE",
          },
          {
            id: 3,
            name: "DIVORCIADO(A)",
          },
          {
            id: 4,
            name: "VIUDO(A)",
          },
          {
            id: 5,
            name: "UNION DE HECHO",
          },
          {
            id: 6,
            name: "SOLTERO(A)",
          },
        ];
        let id_civil = "";
        datos.map((e) => {
          if (id == e.id) {
            id_civil = e.name;
          }
        });
        return id_civil;
      };
  
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const filtrar = (id) => {

        let newArray = []
        cityData.backup.map((e) => {
            if (id == e.province_id) {
                newArray.push({ ...e })
            }
        })

        setProvince(id)
        setCityData({ backup: cityData.backup, data: newArray })

    };
    const filtrarA = (id) => {

        let newArray = []
        cityDataAnswer.backup.map((e) => {
            if (id == e.province_id) {
                newArray.push({ ...e })
            }
        })

        setAnswerProvince(id)
        setCityDataAnswer({ backup: cityDataAnswer.backup, data: newArray })

    };
    function validarCedula(cad) {
        if(cad!=null){

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
      const eliminar = ()=>{
        eliminarCliente(item.id,initializer,mostrarNotificacion,navigation,setLoading)
    }
    return (
        <ImageBackground source={require('../../assets/fondoWhite.png')} style={{ paddingTop:Constants.statusBarHeight,flex: 1,height:windowHeight, width: '100%', resizeMode: "cover", }}>

            <ScrollView style={{ flex: 1, height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24 }}>Editar cliente</Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: '5%' }}>
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setDni(text)}
                        keyboardType="numeric"
                        value={dni}
                        placeholder="Cédula"
                    />
                    {!validarCedula(dni)?
                         <Text style={{fontWeight:'bold',color:'#E8505C'}} >Cédula inválida</Text>
                    :null}
               
                    
                    <TextInput
                        style={{  height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setNames(text)}
                        value={names}
                        autoCapitalize='characters' 
                        placeholder="Nombres"
                    />
                  
                    <TextInput
                        style={{   height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setLastNames(text)}
                        value={lastNames}
                        autoCapitalize='characters' 
                        placeholder="Apellidos"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder="Correo electrónico"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setCellphone(text)}
                        value={cellphone}
                        keyboardType="numeric"
                        placeholder="Celular"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setLandLine(text)}
                        value={landline}
                        keyboardType="numeric"
                        placeholder="Teléfono"
                    />
                    <TextInput
                        style={{   height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setAddress(text)}
                        value={address}
                        autoCapitalize='characters' 
                        placeholder="Calle 1"
                    />
                    <TextInput
                        style={{   height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setCalle2(text)}
                        value={calle2}
                        autoCapitalize='characters' 
                        placeholder="Calle 2"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setVilla(text)}
                        value={villa}
                        placeholder="Villa"
                    />
                    <TextInput
                        style={{   height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setDescripcion(text)}
                        value={descripcion}
                        autoCapitalize='characters' 
                        placeholder="Otra descripción de dirección"
                    />
                    <TouchableOpacity
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, alignItems: 'flex-start', padding: 10 }}
                        onPress={showDatepicker}
                    >
                        <Text style={{ color: 'black', textAlign: 'center' }}><Feather name="calendar" size={18} color="black" />   Seleccionar fecha ({dateFormatA(date)})</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <Picker
                        key={1}
                        id={1}
                        selectedValue={province}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            filtrar(itemValue)
                        } >
                        <Picker.Item label="Seleccione una provincia" value="" />
                        {provinceData.data.map((e) => (
                            <Picker.Item label={e.name} key={e.id} value={e.id} />
                        ))}
                    </Picker>
                    <Picker
                        key={2} id={2}
                        selectedValue={city}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setCity(itemValue)
                        } >
                        <Picker.Item label="Seleccione una ciudad" value="" />
                        {cityData.data.map((e) => (
                            <Picker.Item label={e.name} key={e.id} value={e.id} />
                        ))}
                    </Picker>
              
                    <Picker
                        selectedValue={civil}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setCivil(itemValue)
                        } >
                        <Picker.Item label="Estado civil" value="" />
                        <Picker.Item label="Casado(a)" value='CASADO(A)' />
                        <Picker.Item label="Separado(a) judicialmente" value={'SEPARADO(A) JUDICIALMENTE'} />
                        <Picker.Item label="Divorciado(a)" value={'DIVORCIADO(A)'} />
                        <Picker.Item label="Viudo(a)" value={'VIUDO(A)'} />
                        <Picker.Item label="Unión de hecho(a)" value={'UNION DE HECHO'} />
                        <Picker.Item label="Soltero(a)" value={'SOLTERO(A)'} />

                    </Picker>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, }}></View>
          
                    {
                        civil=='CASADO(A)'||civil=='UNION DE HECHO'?

                  <View>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, }}></View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Datos del Cónyuge</Text>
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setDniS(text)}
                        value={dniS}
                        keyboardType="numeric"
                        placeholder="Cédula"
                     
                    />
                       {!validarCedula(dniS)?
                            <Text style={{fontWeight:'bold',color:'#E8505C'}} >Cédula inválida</Text>
                       :null}
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setNamesS(text)}
                        value={namesS}
                        autoCapitalize='characters' 
                        placeholder="Nombres"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setLastNamesS(text)}
                        value={lastNamesS}
                        autoCapitalize='characters' 
                        placeholder="Apellidos"
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Información de contacto</Text>
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setEmailS(text)}
                        value={emailS}
                        placeholder="Correo"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setCellphoneS(text)}
                        value={cellphoneS}
                        keyboardType="numeric"
                        placeholder="Celular"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setLandLineS(text)}
                        value={landlineS}
                        keyboardType="numeric"
                        placeholder="Teléfono convencional"
                    />
                  
                     
                </View>
              
                
                        :null
                    }
<Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10,marginTop:10 }}>Preguntas</Text>
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 10 }}>¿Actualmente está trabajando?</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#323B62" }}
                            thumbColor={isWorking ? "white" : "white"}
                            ios_backgroundColor="#3e3e3e"
                            style={{ marginBottom: 15 }}
                            onValueChange={text => setIsWorking(!isWorking)}
                            value={isWorking}
                        />
                    </View>
                  
                    <TextInput
                    
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setCharges(text)}
                        value={charges.toString()}
                        keyboardType="numeric"
                        placeholder="¿Cuántas cargas familiares tiene?"
                    />
                     
            
                     <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 10 }}>¿En qué ciudad le gustaría comprar su vivienda?</Text>

                        <Picker
                       key={3} id={3}
                        selectedValue={answerProvince}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            filtrarA(itemValue)
                        } >
                        <Picker.Item label="Seleccione una provincia" value="" />
                        {provinceDataAnswer.data.map((e) => (
                            <Picker.Item label={e.name} key={e.id} value={e.id} />
                        ))}
                    </Picker>
                    <Picker
                        key={4} id={4}
                        selectedValue={answerCity}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setAnswerCity(itemValue)
                        } >
                        <Picker.Item label="Seleccione una ciudad" value="" />
                        {cityDataAnswer.data.map((e) => (
                            <Picker.Item label={e.name} key={e.id} value={e.id} />
                        ))}
                    </Picker>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 10 }}>¿Cuántos cuartos te gustaría tener?</Text>

                    <Slider
                        style={{width: '100%', height: 40}}
                        minimumValue={1}
                        maximumValue={5}
                        minimumTrackTintColor="#323B62"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#323B62"
                        value={rooms}
                        onSlidingComplete={(e)=>setRooms(e)}
                        step={1}
                    />
                     <Text style={{ fontWeight:'bold',textAlign:'center',fontSize: 16, marginBottom: 10 }}>{rooms}</Text>
                     <Picker
                        key={5} id={5}
                        selectedValue={amount}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setAmount(itemValue)
                        } >
                        <Picker.Item label="Valor estimado de la vivienda" value="" />
                        {amountData.map((e) => (
                            <Picker.Item label={e.range} key={e.id} value={e.id} />
                        ))}
                    </Picker>
                    <View style={{flexDirection:'row',width:'100%',jsutifyContent:'center',alignItems:'center',}}>
                    <TouchableOpacity
                    style={{ borderRadius: 10, marginBottom: 10, backgroundColor: '#FDB813', padding: 13,width:'90%' }}
                  onPress={guardar}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="save" size={18} color="white" />   EDITAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={{width:'10%',marginBottom: 10, justifyContent:'center',alignItems:'center'}}
                        onPress={eliminar}
                    >
                        <Feather name="trash-2" size={24} color="#E8505C" />
                    </TouchableOpacity>

                    </View>
                    
              
            </View>
            <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
        </ScrollView>
        </ImageBackground >
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#323B62',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 55
    }
});
