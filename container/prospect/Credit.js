import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Linking, Dimensions, ScrollView, ImageBackground } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import fondo from '../../assets/fondoValidacion.jpg'
import Header from '../components/Header'
import { Picker } from '@react-native-picker/picker';
import projectsJS from './data/projects.json'
import villagesJS from './data/villages.json'
import { useToast } from 'react-native-styled-toast'
import ProgressLoader from 'rn-progress-loader';
import {creditoHipotecario} from '../../utils/API/clients'
import yearsJS from './data/years.json'
export default function Credit({ navigation, route }) {
    const { id } = route.params;
    const { toast } = useToast()

    const [project, setProject] = useState('')
    const [projectData, setProjectData] = useState([])
    const [villageData, setVillageData] = useState({ data: [], backup: [] })
    const [village, setVillage] = useState("")
    const [loading,setLoading] = useState(false)

    const [years, setYears] = useState('')
    const [yearsData, setYearsData] = useState([])
    useEffect(() => {
        setProjectData(projectsJS)
        setVillageData({ data: villagesJS, backup: villagesJS })
        setYearsData(yearsJS)
    }, [])
    const filtrar = (value) => {
        let newArray = []
        villageData.backup.map((e) => {
            if (value == e.project_id) {
                newArray.push({ ...e })
            }
        })

        setProject(value)
        setVillageData({ backup: villageData.backup, data: newArray })
    }
    const getProjectName=(value)=>{
        let name="";
        projectData.map((e)=>{
            if(e.id==value){
                name=e.nombre
            }
        })
        return name
    }
    const getVillageName=(value)=>{
        let name="";
        villageData.backup.map((e)=>{
            if(e.id==value){
                name=e.nombre
            }
        })
        return name
    }
    const getYearsName=(value)=>{
        let name="";
        yearsData.map((e)=>{
            if(e.id==value){
                name=e.nombre
            }
        })
        return name
    }
    const realizarCredito=()=>{
        creditoHipotecario({village:getVillageName(village),years:getYearsName(years),project:getProjectName(project),client_id:id},mostrarNotificacion,setLoading)

    }
    const mostrarNotificacion=(msg,type)=>{
        console.log(type)
        toast({intent: type.toUpperCase(), message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })
    }
 
    return (
        <ImageBackground source={fondo} style={{ paddingTop: Constants.statusBarHeight, flex: 1, width: '100%', resizeMode: "cover", }}>
            <ScrollView style={{ flex: 1, width: '100%', }}>

                <Header />
                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                    <TouchableOpacity

                        onPress={() => navigation.goBack()}
                    ><Feather name="chevron-left" size={24} color="white" />
                    </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> CRÉDITO HIPOTECARIO</Text>
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
                    <Text style={{ textAlign: 'center', padding: 15, color: 'gray' }}>Te aseguramos y ayudamoms en la gestión de tu crédito hipotecario con entidades bancarias afiliadas a nosotros.</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ borderRadius: 60, height: 70, width: 160, resizeMode: 'contain', marginRight: 5 }} source={require('../../assets/bancoPacifico.png')} />

                        <Image style={{ borderRadius: 60, height: 70, width: 160, resizeMode: 'contain' }} source={require('../../assets/bancoPichincha.png')} />

                    </View>
                    <View style={{ borderWidth: 0.7, borderColor: 'gray', width: '90%' }}>
                        <Picker
                            selectedValue={project}

                            style={{ color: 'gray', height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                filtrar(itemValue)
                            } >
                            <Picker.Item label="Proyecto de tu interés" value="" />
                            {projectData.map((e) => (
                                <Picker.Item label={e.nombre} key={e.id} value={e.id} />
                            ))}
                        </Picker>
                    </View>

                    <View style={{marginTop:10, borderWidth: 0.7, borderColor: 'gray', width: '90%' }}>
                        <Picker
                            selectedValue={village}
                            style={{ color: 'gray', height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                setVillage(itemValue)
                            } >
                            <Picker.Item label="Villa de tu interés" value="" />
                            {villageData.data.map((e) => (
                                <Picker.Item label={e.nombre} key={e.id} value={e.id} />
                            ))}
                        </Picker>
                    </View>
                    <View style={{ marginTop:10,borderWidth: 0.7, borderColor: 'gray', width: '90%' }}>
                        <Picker

                            selectedValue={years}
                            style={{ color: 'gray', height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                setYears(itemValue)
                            } >
                            <Picker.Item label="Plazo en años" value="" />
                            {yearsData.map((e) => (
                                <Picker.Item label={e.nombre} key={e.id} value={e.id} />
                            ))}
                        </Picker>
                    </View>

                    <TouchableOpacity
                        style={{ marginVertical: 50, borderRadius: 5, backgroundColor: '#22428B', padding: 13, width: '80%' }}
                        onPress={realizarCredito}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ENVIAR</Text>
                    </TouchableOpacity>

                </View>
                <Text style={{ marginVertical: 10, textAlign: 'center', color: 'white', fontSize: 12, fontStyle: 'italic' }}>© Ambiensa 2021</Text>

                <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
            </ScrollView>
        </ImageBackground>
    )
}
