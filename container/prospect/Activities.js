import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants';
import Header from '../components/Header'
import { Feather } from '@expo/vector-icons';
import Notifications from './components/Notificacitons'
const windowHeight = Dimensions.get('window').height;

export default function Activities({ navigation, route }) {
    const { dni } = route.params;
    const [tab,setTab] = useState(0)
 console.log("Entro")
    return (
        <View style={{ paddingTop: Constants.statusBarHeight, flex: 1, height: windowHeight, width: '100%', resizeMode: "cover", }}>
                <Header />
                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                    <TouchableOpacity

                        onPress={() => navigation.goBack()}
                    ><Feather name="chevron-left" size={24} color="white" />
                    </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> NOVEDADES</Text>
                </View>
                <View style={{height:40,flexDirection:'row',width:'100%',}}>
                    <TouchableOpacity
                    style={{flex:1,borderColor:'#5FB0DA',borderBottomWidth:tab==0?3:0.5,borderBottomColor:tab==0?'#FE6C02':'#5FB0DA',borderStyle:'solid',borderWidth:0.5,justifyContent: 'center',alignItems:'center'}}
                        onPress={() => setTab(0)}
                    ><Text style={{ color: '#5FB0DA', fontSize: 14, fontWeight: 'bold' }}><Feather name="bell" size={20} color="#5FB0DA" />Notificaciones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flex:1,borderColor:'#5FB0DA',borderBottomWidth:tab==1?3:0.5,borderBottomColor:tab==1?'#FE6C02':'#5FB0DA',borderStyle:'solid',borderWidth:0.5,justifyContent: 'center',alignItems:'center'}}
                        onPress={() => setTab(1)}
                    ><Text style={{ color: '#5FB0DA', fontSize: 14, fontWeight: 'bold' }}><Feather name="book" size={20} color="#5FB0DA" /> Noticias</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flex:1,borderColor:'#5FB0DA',borderBottomWidth:tab==2?3:0.5,borderBottomColor:tab==2?'#FE6C02':'#5FB0DA',borderStyle:'solid',borderWidth:0.5,justifyContent: 'center',alignItems:'center'}}
                        onPress={() => setTab(2)}
                    ><Text style={{ color: '#5FB0DA', fontSize: 14, fontWeight: 'bold' }}><Feather name="tag" size={20} color="#5FB0DA" /> Promociones</Text>
                    </TouchableOpacity>

                </View>
            <View style={{flex:1,marginHorizontal:'2%',marginTop:10}}>
                {
                    tab==0?
                        <Notifications dni={dni}/>
                    :
                    tab==1?
                    <Text style={{color:'#204089',fontWeight:'bold',fontSize:18,marginBottom:10}}>No hay noticias nuevas</Text>
                    :
                    <Text style={{color:'#204089',fontWeight:'bold',fontSize:18,marginBottom:10}}>No hay promociones nuevas</Text>
                }

            </View>
            
           
        </View>
    )
}
