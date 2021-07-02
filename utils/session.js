
import AsyncStorage from '@react-native-async-storage/async-storage';


export const guardarSession = async (value) => {
    try {
      await AsyncStorage.setItem('auth-client', value)
    } catch (e) {
      // saving error
    }
  }
  export  const obtenerSession = async () => {
    try {
      const value = await AsyncStorage.getItem('auth-client')
      return value
    } catch(e) {
      // error reading value
    }
  }
  export const removeSession = async ()=> {
    try {
        await AsyncStorage.removeItem("auth-client");
        return true;
    }
    catch(exception) {
        return false;
    }
}