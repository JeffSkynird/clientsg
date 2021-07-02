import React, { useState, useEffect }  from 'react'
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants';
import { obtenerActivities } from '../../../utils/API/clients'
import {dateFormatB,dateFormatA,getHours} from '../../../utils/Date'
import { Feather } from '@expo/vector-icons';
export default function Notificacitons(props) {
    const {dni} = props
    const [activities, setActivities] = useState({ citations: [], calls: [] })
    const [data,setData] = useState([])
    useEffect(() => {
        obtenerActivities(dni, setActivities,parsingData)
    }, [])

    const parsingData=(datos)=>{
 
        let array = datos.citations.concat(datos.calls);

        array.sort(function(a, b) {
            var keyA = new Date(a.creado_en),
              keyB = new Date(b.creado_en);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          });
          array.reverse()
         console.log("datos")
console.log(datos)
        setData(array)
    }
    function convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
    }
    const getUTC = (fecha)=>{
       
        let mydate = new Date(fecha.replace(' ', 'T'));
        return mydate//convertTZ(mydate, "America/Guayaquil")

    }
    const citasEfectivas = (item)=>{
        //LLMAMDAS
        let text = "";
        if(item.hasOwnProperty('destination')){
          
            if(item.es_efectiva){
                text = "El asesor ha realizado una llamada a su celular "+item.destino
            }else{
                text = "Tiene una llamada perdida a su celular "+item.destino
            }
        }else{
  
            text = "Se ha agendado una cita para el día "+dateFormatB(new Date(item.fecha))+" "+getHours(new Date(item.fecha))
        }
      return text
    }
    const numeroDeNotificaciones = ()=>{
        let count = 0;
        data.map((e)=>{
            let f1 = new Date();
            let f2 = new Date(getUTC(e.creado_en));
            f1.setHours(0,0,0,0);
            f2.setHours(0,0,0,0);
         
            if (f1.getTime() == f2.getTime()){
              
               count++
            }
        })
        if(count==0){
            return "No hay notificaciones para hoy"
        }else{
            return "Hay "+count+" notificaciones hoy"
        }
       
    }
    const renderItem = ({ item }) => {
    let f1 = new Date();
    let f2 = new Date(getUTC(item.creado_en));
    f1.setHours(0,0,0,0);
    f2.setHours(0,0,0,0);
    let esHoy =false;
    if (f1.getTime() == f2.getTime()){
      
        esHoy=true
    }
    
        return (
                    <View style={{borderBottomWidth:0.5,marginBottom:5, padding:5,borderLeftWidth:esHoy?4:0,borderLeftColor:'#FE6C02', width: '100%'}}>
                        <Text style={{ color: 'gray',  fontSize: 16,marginBottom:10 }}>{citasEfectivas(item)}</Text>

                        <Text style={{ color: 'gray',  fontSize: 13 }}>{dateFormatA(getUTC(item.creado_en))+" "+getHours(getUTC(item.creado_en))}</Text>

                    </View>





        )
    }
    console.log("es"+data)
    return (
        <View>
           
            <Text style={{color:'#204089',fontWeight:'bold',fontSize:18,marginBottom:10}}>{numeroDeNotificaciones()}</Text>
            <FlatList
                
        
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}

            />
        </View>
        
        
    )
}
