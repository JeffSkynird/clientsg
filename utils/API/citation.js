import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
const axios = require('axios');
export const obtenerByDate  = (date,lead_id,setData,setRefreshing,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"citation/get_by_date?lead_id="+lead_id+"&date="+date+"&asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){

        setData({data:response.data,backup:response.data})
        setRefreshing(false)

     }else{
      setRefreshing(false)
     }
    })
    .catch((error) => {
      setRefreshing(false)


    });
}

export const obtenerTodosPorLead  = (id,setData,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
    let url = ENTRYPOINT+"citation/get_by_lead?lead_id="+id
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }
  
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
  export const obtenerTodosPorLeadList  = (id,setData,setRefreshing,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
    let url = ENTRYPOINT+"citation/get_by_lead?lead_id="+id
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }
  
    };
  
  
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
          setData({data:response.data,backup:response.data})
          setRefreshing(false)
  
       }else{
        setRefreshing(false)
       }
      })
      .catch((error) => {
        setRefreshing(false)
  
  
      });
  }
  export const obtenerPorId  = (id,setData,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
    let url = ENTRYPOINT+"citation/get_by_id?citation_id="+id
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }
  
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
 
  export const obtenerTodosPorAsesor  = (setData,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
    let url = ENTRYPOINT+"citation/get_by_asesor?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }
  
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
  export const registrarCitas = (data, store,toast) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"citation/register";
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
  export const crearCita = (data,toast,setLoading) => {
    
    let url = ENTRYPOINT+"citation/create";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",}
     
    };
 
    setLoading(true)
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          toast(response.message,'success')
          setLoading(false)
        } else {
          toast(response.message,'error')

          setLoading(false)
        }
      })
      .catch((error) => {
        toast("Error de red",'error')
        setLoading(false)
      });
  }
  
  
  export const editarCitas = (data, store,toast) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"citation/editar";
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

  export const eliminarCitation = (citation_id,store,toast) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"citation/delete";
    var raw = {
        citation_id:citation_id,
    };
    let setting = {
      method: "DELETE",
      url: url,
      data: raw,
      body: raw,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  
      }
    };
   
  
    axios(setting)
      .then((res) => {
        let response = res.data
        if(res.data.type!="error"){
        
          toast(response.message,'success')
        }else{
        
          toast(response.message,'error')
        }
        
      })
      .catch((error) => {
        toast("Error de red",'error')
      });
  };
  