import React from 'react';
import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-native-styled-toast'

import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { ModalPortal } from 'react-native-modals';

import Login from './container/login/Login'
import Splash from './container/login/Inicial'
import Validacion from './container/login/Validacion'
import New from './container/new/Main'
import Prospect from './container/prospect/Main'
import Projects from './container/new/Projects'
import Project from './container/new/Project'
import Amenities from './container/new/Amenities'
import Model from './container/new/Model'
import CitationNew from './container/prospect/CitationNew'
import Activities from './container/prospect/Activities'
import Credit from './container/prospect/Credit'
import Verification from './container/login/Verification'
import ModelClient from './container/client/Model'
import Account from './container/client/Account'
import Payment from './container/client/Payments'
import PaymentFrame from './container/client/PaymentFrame'
import Formulario from './container/new/Formulario'
import EditAccount from './container/client/EditAccount'
import FormularioDinamico from './container/prospect/FormularioDinamico'

import Client from './container/client/Main'
import SuccesRegister from './container/login/components/RegistroExitoso'
import theme from './config/theme'
import Store from './store/Store'
import Initializer from './store/Initializer'
import { cerrarSesion } from './utils/API/auth'
const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();
/* function DrawerMenu() {
  return (

    <Drawer.Navigator  >
      <Drawer.Screen name="Lead" component={List} options={{ title: 'Clientes' }} />
      <Drawer.Screen name="Main" component={Registro} options={{ title: 'Registro' }} />
      <Drawer.Screen name="Map" component={Map} options={{ title: 'Mapa' }} />

      <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />

    </Drawer.Navigator>

  );
} */


function MainContainer(props) {
  const initializer = React.useContext(Initializer);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {
          initializer.usuario != null ?
            <React.Fragment >
              {/*  <Stack.Screen name="Drawer" component={DrawerMenu} /> */}

              <Stack.Screen name="Client" component={Client} />
              <Stack.Screen name="ModelClient" component={ModelClient} />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="PaymentFrame" component={PaymentFrame} />
              <Stack.Screen name="FormularioDinamico" component={FormularioDinamico} />
              <Stack.Screen name="EditAccount" component={EditAccount} />

              
            </React.Fragment>
            :
            <React.Fragment >
                  <Stack.Screen name="Splash" component={Splash} />
                                          <Stack.Screen name="Validacion" component={Validacion} />

                                      
                                          <Stack.Screen name="Formulario" component={Formulario} />
                                          <Stack.Screen name="FormularioDinamico" component={FormularioDinamico} />

                                          
              <Stack.Screen name="Login" component={Login} />

                            <Stack.Screen name="Verification" component={Verification} />

                            <Stack.Screen name="Activities" component={Activities} />

                            <Stack.Screen name="Credit" component={Credit} />
                            <Stack.Screen name="SuccesRegister" component={SuccesRegister} />
                            <Stack.Screen name="Client" component={Client} />

              <Stack.Screen name="New" component={New} />
              <Stack.Screen name="Projects" component={Projects} />
              <Stack.Screen name="Project" component={Project} />
              <Stack.Screen name="Amenities" component={Amenities} />
              <Stack.Screen name="CitationNew" component={CitationNew} />

              <Stack.Screen name="Model" component={Model} />

              <Stack.Screen name="Prospect" component={Prospect} />
            </React.Fragment>
        }


      </Stack.Navigator>
    </NavigationContainer>)
}
export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Store>


          <MainContainer />

          <ModalPortal />
        </Store>

      </ToastProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
