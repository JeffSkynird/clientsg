import React,{useState} from 'react'
import { View, Text,FlatList ,StyleSheet,RefreshControl,ImageBackground,Image,Dimensions,TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import Initializer from '../../store/Initializer'
import { obtenerLeadsPorAsesor2,obtenerTelefonosCliente } from "../../utils/API/leads.js";
import { SwipeablePanel } from 'rn-swipeable-panel';
import {Linking} from 'react-native'

const windowHeight = Dimensions.get('window').height;

export default function Lead(props) {
    const initializer = React.useContext(Initializer);
    const [data,setData] = React.useState([])
    const [refreshing,setRefreshing] = React.useState(true)

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
    openLarge: false,onlySmall:true,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
      });
      const [isPanelActive, setIsPanelActive] = useState(false);
      const [leadSelect, setLeadSelect] = useState(0);
      const [phones, setPhones] = useState({phone1:"",phone2:""});
 
      React.useEffect(()=>{
       
        if(isPanelActive&&leadSelect!=0){
          
            obtenerTelefonosCliente(leadSelect,setPhones,initializer)
        }
      },[isPanelActive,leadSelect])
      function onRefresh() {
      
      
        
        obtenerLeadsPorAsesor2(setData,initializer,setRefreshing)
      }
      const openPanel = (it) => {
       
        setIsPanelActive(true);
        setLeadSelect(it)
      };
    
      const closePanel = () => {
        setIsPanelActive(false);
      };
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerLeadsPorAsesor2(setData, initializer,setRefreshing);
        }
      }, [initializer.usuario]);
    const renderItem = ({ item }) => {
        console.log(item)
        let firstName = item.names.split(' ').slice(0, -1).join(' ');
        let lastName = item.last_names.split(' ').slice(0, -1).join(' ');

        return (
           <View style={{paddingHorizontal:10,marginVertical:5,justifyContent:'space-between',flexDirection:'row'}}>
               <Text style={{fontSize:17}}>{firstName} {lastName}</Text>
               <View style={{flexDirection:'row'}}>
               
                <TouchableOpacity onPress={()=>props.navigation.navigate('Client',{lead_id:item.id})} style={{marginRight:3}} ><Feather name="user" size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={()=>props.navigation.navigate('SendMessage',{lead_id:item.id})} style={{marginRight:3}} ><Feather name="mail" size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={()=>openPanel(item.id)} style={{marginRight:3}}><Feather name="phone" size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={()=>props.navigation.navigate('CitationList',{lead_id:item.id})} style={{marginRight:3}} ><Feather name="calendar" size={24} color="black" /></TouchableOpacity>
                
               </View>
            
           </View>
           

        )
    }
    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.container}>
            
             <View style={styles.header}>
                    <TouchableOpacity  ><Feather name="menu" size={24} color="white" onPress={()=>props.navigation.openDrawer()}/></TouchableOpacity>
                    <Text style={{ color: 'white',fontSize:18 }}>Mis clientes</Text>
                    <Image style={{ height: 30, width: 100 }} source={require('../../assets/LogoAmbiensaWhite.png')} />

                </View>
                <View >
                    <View style={{backgroundColor:'#F4F5F7',flexDirection:'row',margin:10,justifyContent:'space-between',paddingHorizontal:10,alignItems:'center'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#E8505C', height: 15, width: 15, borderRadius: 20, marginRight: 10 }} />
                            <Text style={{ fontSize: 20 }} >Mis clientes</Text>
                        </View>
                        <View style={{ backgroundColor: '#E8505C', borderRadius: 5, padding: 5, height: 18, width: 25, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{data.length}</Text>
                        </View>

                    </View>
                    <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                          //refresh control used for the Pull to Refresh
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                />
                </View>
                <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                <TouchableOpacity
                 onPress={()=>props.navigation.navigate('ClientCreate')}
                   style={{width:250,marginBottom:15,borderRadius: 10,  marginHorizontal: '5%', backgroundColor: '#323B62', padding: 13 }}
               >
                   <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="plus" size={18} color="white" />   NUEVO</Text>
               </TouchableOpacity>
                </View>
                <SwipeablePanel {...panelProps} isActive={isPanelActive}>
                <View style={{margin:10}}>
                    <Text style={{fontWeight:'bold',fontSize:18,marginBottom:15}}>Seleccione un número para llamar</Text>
                    
                    <TouchableOpacity onPress={()=>Linking.openURL(`tel:${phones.phone1}`)} ><Text style={{fontWeight:'bold',fontSize:26}}>{phones.phone1!=""&&phones.phone1!="N/A"?phones.phone1:""}</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>Linking.openURL(`tel:${phones.phone2}`)}  ><Text style={{fontWeight:'bold',fontSize:26}}>{phones.phone2!=""&&phones.phone2!="N/A"?phones.phone2:""}</Text></TouchableOpacity>
                     
                </View>
                    
           
               
            </SwipeablePanel>
            
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
