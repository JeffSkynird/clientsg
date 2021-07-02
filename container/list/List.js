import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, FlatList,RefreshControl,ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { obtenerTodosClientes } from '../../utils/API/clients'
import Initializer from '../../store/Initializer'

const windowHeight = Dimensions.get('window').height;
export default function Citations(props) {
    const initializer = React.useContext(Initializer);

    const [serch, setSearch] = React.useState("")
    const [data, setData] = React.useState({data:[],backup:[]})
    const [refreshing,setRefreshing] = React.useState(true)
    React.useEffect(() => {
        obtenerTodosClientes(setData,setRefreshing,initializer)
    }, [])
    function onRefresh() {
      
      
        
        obtenerTodosClientes(setData,setRefreshing,initializer)
      }
    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={()=>props.navigation.navigate('RegistroEdit',{item:item})} style={{ backgroundColor: '#F8F8F8', padding: 10, borderRadius: 10, marginHorizontal: '5%' }}>
                <View style={{ flex: 1,flexDirection: 'row',justifyContent:'space-between' }}>
                <Text style={{backgroundColor:'white', fontWeight: 'bold', fontSize: 16 }}>{item.dni}</Text>
                <View style={{ backgroundColor: '#FDB813', paddingHorizontal: 4, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>{item.civil}</Text>
                    </View>
                </View>
               
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1}}>
                        <View style={{flexDirection:'row' }}>
                        <Text style={{ color: '#808080' }}>{item.names} {item.last_names}</Text>
                       
                        </View>
                        
                     
                        <View style={{ borderBottomColor: '#D2D2D2', borderBottomWidth: 1 }}></View>
                        <Text style={{ color: '#808080' }}>{item.email}</Text>
                    </View>
                  
                </View>
              
            </TouchableOpacity>
        )
    }
    const searching =(text)=>{
     
        let dataB = data.backup.filter(l => {
            return l.dni.toLowerCase().match( text.toLowerCase() );
           });
        setData({data:dataB,backup:data.backup})
        setSearch(text)
    }
    return (
        <ImageBackground source={require('../../assets/fondoWhite.png')} style={{ paddingTop:Constants.statusBarHeight,flex: 1,height:windowHeight, width: '100%', resizeMode: "cover", }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Lista de registros </Text>
                <TouchableOpacity
                    onPress={() => props.navigation.openDrawer()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="menu" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 15, borderRadius: 16, backgroundColor: '#EEEEEE', flexDirection: 'row', height: 50, marginHorizontal: '5%', marginTop: 15, alignItems: 'center' }}>
                <Feather name="search" size={24} color="#939393" />

                <TextInput
                    style={{ marginLeft: 10, fontSize: 16, color: '#939393' }}
                    onChangeText={text => searching(text)}
                    value={serch}
                    placeholder="Buscar"
                />
            </View>
            <View style={{ marginTop: 15 }}>
                <FlatList
                    data={data.data}
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


        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
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
