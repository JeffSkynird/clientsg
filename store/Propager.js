import React from 'react'
import Initializer from './Initializer'

import {obtenerSession } from '../utils/session'
export default function Propager(props) {


    const {usuario,cargarUsuario}=React.useContext(Initializer)
    React.useEffect(()=>{
        if(usuario==null){      
       
            let auth = obtenerSession()
           
            auth.then((val)=>{
         
                if(val!=null){
                    cargarUsuario(val)
                }
            })
           
         
        }
    },[])

    return (
        props.children
    )
}
