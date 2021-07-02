import React,{useEffect,useState,useContext} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image ,ImageBackground} from 'react-native'
import Constants from 'expo-constants';
const windowHeight = Dimensions.get('window').height;
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import {obtenerDataManager} from '../../utils/API/managers'
import {cerrarSesion} from '../../utils/API/auth'
import ProgressLoader from 'rn-progress-loader';
import { useToast } from 'react-native-styled-toast'

import Initializer from '../../store/Initializer'

export default function Profile(props) {
    const initializer = React.useContext(Initializer);
    const [data,setData] = useState(null)
    const [url,setUrl] = useState(null)
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);

    useEffect(()=>{
        obtenerDataManager(setData,initializer);
        
    },[])
  
    const cerrar=()=>{
        cerrarSesion(initializer,mostrarNotificacion,setLoading)
    }
    const mostrarNotificacion=(msg,type)=>{
        toast({ message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })
    }

    return (
        <ImageBackground source={require('../../assets/fondoWhite.png')} style={{ paddingTop:Constants.statusBarHeight,flex: 1,height:windowHeight, width: '100%', resizeMode: "cover", }}>
           
            <View style={{ marginTop:10,flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>Mi perfil</Text>
            <TouchableOpacity
                    onPress={() => props.navigation.openDrawer()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="menu" size={24} color="black" /> </Text>
                </TouchableOpacity>
     
                
            </View>
            <View style={{ flex: 1, marginTop: 15, alignItems: 'center' }}>
                <View style={{  width: 130, height: 130, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 200, height: 130, borderRadius: 130, resizeMode: 'contain' }} 
                        source={require('../../assets/LogoEcuadorBajoTecho.png')} />
                   
                </View>
                <View style={{borderBottomWidth:1,borderBottomColor:'gray',width:'60%'}}></View>
                <Text style={{fontWeight:'bold', color: 'black', fontSize: 20,marginTop:10, marginLeft: 10, marginRight: 10 }}>{data!=null?data.names+" "+data.last_names:""}</Text>
                <View style={{ height:120,justifyContent:'space-between',marginTop: 15, marginHorizontal: '10%',alignSelf:'flex-start' }}>
                    <View style={{  alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="mail" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{data!=null?data.email:""}</Text>
                        </View>
                    </View>
                    <View style={{  alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="v-card" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{data!=null?data.dni:""}</Text>
                        </View>
                    </View>
                    <View style={{  alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="phone" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{data!=null?data.cellphone:""}/{data!=null?data.landline:""}</Text>
                        </View>
                    </View>
                    <View style={{  alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="address" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{data!=null?data.address:""}</Text>
                        </View>
                    </View>
                   
                </View>
                <View style={{flex:1,justifyContent:'flex-end'}}>
                <TouchableOpacity
                   onPress={cerrar}
                   style={{width:250,marginBottom:15,borderRadius: 10,  marginHorizontal: '5%', backgroundColor: '#FDB813', padding: 13 }}
               >
                   <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="log-out" size={18} color="white" />   CERRAR SESIÓN</Text>
               </TouchableOpacity>
                </View>
                
            </View>
            <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        height: windowHeight, width: '100%', resizeMode: "cover",
    },
    header: {
      
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 55
    }
});
