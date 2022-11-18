import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView,Button,Image, PermissionsAndroid  } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from  'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import Lottie from 'lottie-react-native';
import { AUTORISATIONS_TYPES } from './ActionTypes';
import { useEffect,useRef,useState } from 'react';
export default function Autorisation({type}) {

  
  return (
    <View style={styles.col}>
      <View style={styles.titleRow}></View>
      <View style={styles.animationRow}>
          { type[AUTORISATIONS_TYPES.CAMERA_AUTORISATION] &&
            <View style={styles.view}>
              <Lottie source={require('../lotties/camera-permission.json')} autoPlay loop />
            </View>

          }
          { type[AUTORISATIONS_TYPES.MEDIA_AUTORISATION] && 
            <View style={styles.view}>
                <Lottie source={require('../lotties/storage-permissions.json')} autoPlay loop />
            </View>
          }
      </View>
      
      <View style={styles.contentRow}>
        <Text>
          Des autorisations sont nécessaires pour accéder aux fonctionnalités de l'application
        </Text>

      </View>
    </View>
);
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  animationRow:{
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "stretch",
  },
  col:{
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "stretch",
  },
  contentRow:{
    flex:1,
  },
  titleRow:{
    flex:1,
  },

});












