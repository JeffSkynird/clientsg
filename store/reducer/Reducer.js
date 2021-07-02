import {
    CARGAR_USUARIO,CARGAR_PROSPECT,
    LOGOUT,MOSTRAR_NOTIFICACION,MOSTRAR_LOADER
  } from "../actions/Actions";
  
  export default (state, action) => {
    switch (action.type) {
        case CARGAR_USUARIO:
            return { ...state, usuario: action.payload };
        case LOGOUT:
            return { ...state, usuario: null,};
        case MOSTRAR_NOTIFICACION:
            return { ...state, notificacion: action.payload ,};
            case CARGAR_PROSPECT:
                return { ...state, prospect: action.payload ,};
    
        case MOSTRAR_LOADER:
            return { ...state, loader: action.payload ,};
            
        default:
            return state;
    }
  };
  