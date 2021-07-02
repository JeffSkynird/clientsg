import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native'
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

const {width,height}= Dimensions.get('window')

export default function Amenities({ navigation, route }) {
   

    return (
        <View style={{paddingTop: Constants.statusBarHeight,flex:1}}>
     
            <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', padding: 6, alignItems: 'center', backgroundColor: '#1D397A' }}>
                <TouchableOpacity

                    onPress={() =>navigation.goBack()}
                ><Feather name="chevron-left" size={24} color="white" />
                </TouchableOpacity><Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}> FORMULARIO DE 3 PASOS</Text>
           
            </View>
            <WebView  scalesPageToFit={false}  domStorageEnabled={true}
                decelerationRate="normal"  style={{ height:height,width:width,resizeMode: 'cover', flex: 1 }}
                injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                startInLoadingState={true} automaticallyAdjustContentInsets={false} javaScriptEnabled={true} source={{ uri:'http://192.168.10.17:89/formulario'}} />
            
        </View>
    )
}
