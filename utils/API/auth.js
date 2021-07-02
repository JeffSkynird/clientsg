import { guardarSession,obtenerSession,removeSession } from '../session'
import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'

const axios = require('axios');

export const iniciarSesion = (email, password, store,toast,setLoading) => {
  const { cargarUsuario } = store
  var raw = {
    "email": email,
    "password": password
  }
  let url = ENTRYPOINT+"auth/login/"
  let setting = {
    method: "POST",
    url: url,
    data: raw,
    body:raw,
    headers: { 'Accept': 'application/json' }

  };

  setLoading(true)
  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      let user={
        user:response.user,
        token: response.token
      }
      let encrypt= encriptarJson(JSON.stringify(user))
      cargarUsuario(encrypt)
      guardarSession(encrypt);
      setLoading(false)
     }else{
      toast(response.message,'error')
      setLoading(false)
     }
    })
    .catch((error) => {
      toast("Error de red",'error')
      setLoading(false)
      


    });
}

export const iniciarSesionCliente = (data,toast,setLoading, store) => {
  const { cargarUsuario } = store

  let url = ENTRYPOINT+"auth/client/login"
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body:data,
    headers: { 'Accept': 'application/json' }

  };

  setLoading(true)
  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      let user={
        user:response.user,
        token: response.token
      }
      let encrypt= encriptarJson(JSON.stringify(user))
      cargarUsuario(encrypt)
      guardarSession(encrypt);

      toast(response.message,'success')
      setLoading(false)
     }else{
      toast(response.message,'error')
      setLoading(false)
     }
    })
    .catch((error) => {
  
      toast("Error de red",'error')
      setLoading(false)
      


    });
}
export const verificarCodigoUsuario = (data,toast,setLoading) => {


  let url = ENTRYPOINT+"user/verify_code"
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body:data,
    headers: { 'Accept': 'application/json' }

  };

  setLoading(true)
  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
     
      toast(response.message,'success')
      setLoading(false)
     }else{
      toast(response.message,'error')
      setLoading(false)
     }
    })
    .catch((error) => {
      console.log(error)
      toast("Error de red",'error')
      setLoading(false)
      


    });
}
export const obtenerTipoLogin = (dni,redirect,toast,setLoading) => {


  let url = ENTRYPOINT+"login/type?dni="+dni;
  console.log(url)
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

        redirect(response.status,response.id,response.password_changed);
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

export const cerrarSesion = (store,toast,setLoading,navigation) => {
  const { usuario,logout} = store

  let url = ENTRYPOINT+"logout"
  let setting = {
    method: "POST",
    url: url,

    headers: {
       'Accept': 'application/json',
      'Authorization':'Bearer '+JSON.parse(desencriptarJson(usuario)).token
      }

  };

  setLoading(true)
  axios(setting)
    .then((res) => {
      logout()
      removeSession()
   
      toast(res.data.message,"success")
    
      setLoading(false)
navigation.navigate('Splash')
    })
    .catch((error) => {

      setLoading(false)

      toast("Error de red","error")

   
    });
}
