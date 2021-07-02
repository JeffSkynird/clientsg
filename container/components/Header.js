import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Initializer from '../../store/Initializer'

export default function Header(props) {
    const initializer = React.useContext(Initializer);
    const {prospect} = initializer


    return (
    
        prospect!=null?
          <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '3%', width: '100%' }}>
          <Image style={{ height: 48, width: '28%' }} source={require('../../assets/logo.png')} />
          <View
             style={{flexDirection:'row',justifyContent: 'center',alignItems:'center'}}
          >
              <View style={{width:110,marginTop:2}}>
              <Text style={{textAlign:'center', color: '#1D397A',fontSize: 12.5, }}>{prospect.client.names+" "+prospect.client.last_names} </Text>
              </View>
              
             
             <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#1D397A',height:35,width:35,borderRadius:35}}>
             <Feather name="user" size={20} color="white" />
             </View>
             
          </View>
      </View>

          :
          <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '3%', width: '100%' }}>
          <Image style={{ height: 48, width: '28%' }} source={require('../../assets/logo.png')} />
          <TouchableOpacity
              style={{ borderRadius: 5, backgroundColor: '#22428B', padding: 10, width: '50%' }}
              onPress={()=>props.navigation.navigate('Formulario')}
          >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>¡Rerserva la casa ahora!</Text>
          </TouchableOpacity>
      </View>

    
             
     
    )
}
