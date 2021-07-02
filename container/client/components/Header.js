import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons';


export default function Header(props) {
    const {data} = props

    return (
    
        data!=null?
          <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '3%', width: '100%' }}>
          <Image style={{ height: 48, width: '28%' }} source={require('../../../assets/logo.png')} />
          <View
             style={{flexDirection:'row',justifyContent: 'center',alignItems:'center'}}
          >
              <View style={{marginTop:5,width:110,marginRight:5}}>
              <Text style={{textAlign:'right', color: '#1D397A',fontSize: 12.5, }}>{data.client.names+" "+data.client.last_names} </Text>
              <TouchableOpacity onPress={()=>props.navigation.navigate('EditAccount',{client_id:data.client.id})}>
              <Text style={{textAlign:'right',fontSize: 12.5,fontWeight:'bold',color:'#1D397A'}}><Feather name="edit" size={14} color="#1D397A" /> Editar datos</Text>

              </TouchableOpacity>
              
              </View>
              
             
             <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#1D397A',height:35,width:35,borderRadius:35}}>
             <Feather name="user" size={20} color="white" />
             </View>
             
          </View>

      </View>

          :
          <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '3%', width: '100%' }}>
          <Image style={{ height: 48, width: '28%' }} source={require('../../../assets/logo.png')} />
          <TouchableOpacity
              style={{ borderRadius: 5, backgroundColor: '#22428B', padding: 10, width: '50%' }}
              //onPress={() => props.navigation.navigate('Projects')}
          >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>¡Rerserva la casa ahora!</Text>
          </TouchableOpacity>
      </View>

    
             
     
    )
}
