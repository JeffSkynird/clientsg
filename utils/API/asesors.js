
import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");
export const obtenerDatosAsesor= (setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"asessor/get_by_id?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
    let setting = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
      },
    };
    

    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
          setData({...response.data.asesor,email:response.data.email});
       
         
        } else {
        
     
        }
      })
      .catch((error) => {
      
  
       
      });
  };