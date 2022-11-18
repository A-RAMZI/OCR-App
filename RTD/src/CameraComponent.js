import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function CameraComponent({flashMode,previewVisible,capturedImage}) {

  
    return (
      <View style={styles.container}>
          {previewVisible && capturedImage ? 
          
            <TouchableOpacity>
                <FontAwesome5 name="home" size={50}><Text> SHara</Text></FontAwesome5>
            </TouchableOpacity>
            

           : 
          (<Camera style={styles.camera} flashMode={flashMode} ref={(r)=>{camera=r}}>
          </Camera>)
        }
      </View>
    );
  }

const styles = StyleSheet.create({
    container:{
        flex:5,
    }
    ,camera:{
        flex:1,
    }
});











