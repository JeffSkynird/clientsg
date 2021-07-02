import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
const axios = require('axios');

export const obtenerRecomendaciones = (setData) => {

 
  let url = ENTRYPOINT+"recomendations"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}