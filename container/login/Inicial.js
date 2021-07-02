import React from 'react'
import { View, Image,Text,StyleSheet } from 'react-native'

import Swiper from 'react-native-swiper'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import Page3 from './components/Page3'

const Inicial = (props) => {
  
    return (
        <View style={{ flex: 1 }}>
            <Swiper  showsButtons={false} autoplay={true} autoplayTimeout={4.5}>
                <View  style={styles.slide1}>
                    <Page1 {...props}/>
                </View>
                <View style={styles.slide2}>
                <Page2 {...props} />
                </View>
                <View  style={styles.slide3}>
                <Page3 {...props}/>
                </View>
            </Swiper>
        </View>
    )
}
const styles = StyleSheet.create({

    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })
export default Inicial
