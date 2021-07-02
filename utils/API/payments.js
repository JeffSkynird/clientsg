import { guardarSession,obtenerSession,removeSession } from '../session'
import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
const axios = require('axios');

export const pagarTotal = (data,navigation,setLoading) => {


    let url = "https://crm-api.ambiensa.info/api/v1/payment/request?screen=web"
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body:data,
      headers: { 'Accept': 'application/json' }
  
    };
  console.log(data)
    setLoading(true)
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
       
    //    toast(response.message,'success')


    navigation.navigate('PaymentFrame',{url:response.data.url,token:response.data.token})
        setLoading(false)
       }else{
      //  toast(response.message,'error')
        setLoading(false)
       }
      })
      .catch((error) => {
        //console.log(error)
      //  toast("Error de red",'error')
        setLoading(false)
        console.log(error)
  
  
      });
  }

export const obtenerReservaciones = (dni,setData,toast,setLoading) => {

console.log(dni)
    let url = 'https://crm-api.ambiensa.info/api/v1/payment/reservation/client/'+dni;
    let setting = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json",
        
      },
    };
    setLoading(true)
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
            console.log(response)
            let client = response.data.client;
            let reservations=response.data.reservations;
            setData({client:client,reservations:reservations})
            setLoading(false)
  
        } else {
            setLoading(false)
        
        }
      })
      .catch((error) => {
    console.log(error)
        toast("Error de red",'error')
            setLoading(false)
      });
  }; 
  export const obtenerReservacionesOnlyData = (dni,setData,toast,setLoading) => {

    console.log(dni)
        let url = 'https://crm-api.ambiensa.info/api/v1/payment/reservation/client/'+dni;
        let setting = {
          method: "GET",
          url: url,
          headers: {
            Accept: "application/json",
            
          },
        };
        setLoading(true)
        axios(setting)
          .then((res) => {
            let response = res.data;
            if (response.type != "error") {
                console.log(response)
                let client = response.data.client;
                let reservations=response.data.reservations;
                console.log(dni)
                setData(reservations!=null?reservations:[])
                setLoading(false)
      
            } else {
                setLoading(false)
            
            }
          })
          .catch((error) => {
        console.log(error)
            toast("Error de red",'error')
                setLoading(false)
          });
      }; 
    