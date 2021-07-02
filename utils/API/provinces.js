
import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");

export const obtenerTodos = (setData, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"provinces/all";
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
        mostrarNotificacion({ type: "success", message: response.message });
      } else {
        mostrarNotificacion({ type: "error", message: response.message });
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

      mostrarNotificacion({ type: "error", message: error.message });
    });
};
export const obtenerTodosProvincia = (setData) => {

  let url = ENTRYPOINT+"provinces";
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
     
    },
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData({data:response.data,backup:response.data});
        
 
      } else {
       
      }
    })
    .catch((error) => {
      
    });
};
export const obtenerTodosProvincias = (setData,setData2) => {

  let url = ENTRYPOINT+"province/all";
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
     
    },
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData({data:response.data,backup:response.data});
        setData2({data:response.data,backup:response.data});

      } else {
       
      }
    })
    .catch((error) => {
      
    });
};
export const editarProvincia = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"provinces/edit";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
   export const registrarProvincia = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"provinces/register";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }
  export const eliminarProvincia = (country_id,store,cargarData) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"provinces/delete";
    var raw = {
        province_id:country_id,
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
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data
        if(res.data.type!="error"){
        
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          cargarData()
        }else{
        
          mostrarLoader(false);
          mostrarNotificacion({ type: "error", message: response.message });
        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: error.message });
      });
  };
  