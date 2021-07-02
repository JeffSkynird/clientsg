import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");
export const obtenerTelefonosCliente  = (lead_id,setData,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"client/get_by_lead?lead_id="+lead_id
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      
        setData({phone1:response.data.client.cellphone,phone2:response.data.client.landline})
      

     }else{
   
     }
    })
    .catch((error) => {
     
  

    });
}
export const obtenerInfoCliente  = (lead_id,setData,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"client/get_by_lead?lead_id="+lead_id
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
 
        setData({...response.data.client,email:response.data.email})
      

     }else{
   
     }
    })
    .catch((error) => {
     
  

    });
}
export const obtenerLeadsPorAsesor  = (setData,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"lead/clients_by_asesor?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',   Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  },

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.data)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerLeadsPorAsesor2  = (setData,store,setRefreshing) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"lead/clients_by_asesor?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',   Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  },

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.data)
        setRefreshing(false)

     }else{
      setRefreshing(false)
     }
    })
    .catch((error) => {
     
      setRefreshing(false)

    });
}
export const obtenerLead = (client_id,setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"lead?client_id="+client_id;
    let setting = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
      },
    };
    mostrarLoader(true);

    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
          setData(response.data);
          mostrarLoader(false);
         
        } else {
        
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
       
      });
  };
  
  export const enviarMensaje = (data, store,toast) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"client/send_custom";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
    };
 
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          toast(response.message,'success')
        } else {
          toast(response.message,'error')
        }
      })
      .catch((error) => {
        toast("Error de red",'error')
      });
  }
  