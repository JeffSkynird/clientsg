import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { dateFormatA, getHours } from '../../utils/Date'
import Initializer from '../../store/Initializer'
import { useToast } from 'react-native-styled-toast'
import { Picker } from '@react-native-picker/picker';
import { obtenerLeadsPorAsesor } from "../../utils/API/leads.js";
import ProgressLoader from 'rn-progress-loader';
import Header from '../components/Header'
import { crearCita } from '../../utils/API/citation'
export default function CitationEdit({ route, navigation }) {
    
    const initializer = React.useContext(Initializer);
    const { client_id } = route.params;

    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);


    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [clientsData, setClientsData] = React.useState([])
    const [client, setClient] = React.useState('')
    const [fecha, setFecha] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [effective, setEffective] = React.useState(false);

    const [hora, setHora] = React.useState('');
    const [observation, setObservation] = React.useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const mostrarNotificacion = (msg, type) => {
       
        toast({ message: msg, bg: type, color: type, iconColor: type, iconName: type == "error" ? 'x-circle' : 'check-circle', })
        if(type=="success"){
            navigation.goBack()
        }
    }
    const editar = () => {
        crearCita({ title, description, date, observation, address, client_id: client_id }, mostrarNotificacion, setLoading)
    }

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

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                <TouchableOpacity

                    onPress={() => navigation.goBack()}
                ><Feather name="chevron-left" size={24} color="white" />
                </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> AGENDAR UNA CITA</Text>
            </View>
            <View style={{ paddingHorizontal: '5%', marginTop: 10 }} >
           
                <TextInput
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                    onChangeText={text => setTitle(text)}
                    value={title}
                    placeholder="Título"
                />
                <TextInput
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                    onChangeText={text => setDescription(text)}
                    value={description}
                    placeholder="Descripción"
                />
                <TextInput
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                    onChangeText={text => setAddress(text)}
                    value={address}
                    placeholder="Dirección"
                />
                <TouchableOpacity
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, alignItems: 'flex-start', padding: 10 }}
                    onPress={showDatepicker}
                >
                    <Text style={{ color: 'black', textAlign: 'center' }}><Feather name="calendar" size={18} color="black" />   Seleccionar fecha ({dateFormatA(date)})</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showTimepicker}
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, alignItems: 'flex-start', padding: 10 }}
                >
                    <Text style={{ color: 'black', textAlign: 'center' }}><Feather name="calendar" size={18} color="black" />   Seleccionar hora ({getHours(date)})</Text>
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
                <TextInput
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                    onChangeText={text => setObservation(text)}
                    value={observation}
                    placeholder="Observación"
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 15 }}>


                <TouchableOpacity
                    style={{ marginHorizontal: '5%', borderRadius: 10, marginTop: 15, backgroundColor: '#1D397A', padding: 13 }}
                    onPress={editar}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="save" size={18} color="white" />   AGENDAR</Text>
                </TouchableOpacity>



            </View>
            <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
