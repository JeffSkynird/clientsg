import React,{useEffect,useState,useContext} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput,ImageBackground } from 'react-native'
import Constants from 'expo-constants';
const windowHeight = Dimensions.get('window').height;
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import ProgressLoader from 'rn-progress-loader';
import fondo from '../../assets/fondoValidacion.jpg'

import { useToast } from 'react-native-styled-toast'
import {editPassword} from '../../utils/API/clients'
import Initializer from '../../store/Initializer'

export default function Profile(props) {
    const initializer = React.useContext(Initializer);
    const [previewPassword,setPreviewPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);

   const guardar=()=>{
   
    editPassword({client_id:props.route.params.client_id,password:previewPassword,new_password:newPassword},initializer,mostrarNotificacion,setLoading)
   }
    const mostrarNotificacion=(msg,type)=>{
        toast({ message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })
    }

    return (
        <ImageBackground source={fondo} style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Editar cuenta</Text>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginTop: 15, alignItems: 'center' }}>
            <TextInput
                style={{marginTop:20,padding:10,width:'90%', borderColor:'#DEE3ED',borderWidth:1,borderStyle:'solid',fontSize: 16, height:50,color: '#939393' }}
                 onChangeText={text => setPreviewPassword(text)}
                 secureTextEntry={true}
                    value={previewPassword}
                
                    placeholder="Ingrese su antigua contraseña"
                />
                  <TextInput
                style={{marginTop:20,padding:10,width:'90%', borderColor:'#DEE3ED',borderWidth:1,borderStyle:'solid',fontSize: 16, height:50,color: '#939393' }}
                 onChangeText={text => setNewPassword(text)}
                    value={newPassword}
              
                    secureTextEntry={true}
                    placeholder="Ingrese una nueva contraseña"
                />
                   <TouchableOpacity
          onPress={guardar}
          style={{width:250,marginTop:15,borderRadius: 10,  marginHorizontal: '5%', backgroundColor: '#22428B', padding: 13 }}
      >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="save" size={18} color="white" />   GUARDAR</Text>
      </TouchableOpacity>
                
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
        backgroundColor: '#323B62',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 55
    }
});
