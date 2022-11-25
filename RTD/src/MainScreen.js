import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView, ImageBackground, Image ,Alert} from 'react-native';
import * as React from "react";
import { Camera, FlashMode } from 'expo-camera';
import CameraComponent from './CameraComponent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';
import Loading from './Loading';
import api from './ConnectApi';
import axios from 'axios';
export default function MainScreen({navigation}) {
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState("0.00");
  const controller = new AbortController();

  let __retakePicture = () => {
      if(isLoading){
        Alert.alert(
          "Alert",
          "Image already Uploading "+ progress +"% ! want to abort ?",
          [ { text: "No", onPress: () => console.log("NO Pressed") },
          { text: "Yes", onPress: () => {controller.abort() ;console.log("yes Pressed");setIsLoading(false);setProgress("0.00"); }},
        ]
        ); 
        return;
       }
      setCapturedImage(null)
      setPreviewVisible(false)
  }
  let __nextFlashMode= (currentMode)=>{
      switch(currentMode){
        case FlashMode.torch : return FlashMode.off;
        /*case FlashMode.off : return FlashMode.on;
        case FlashMode.on : return FlashMode.auto;*/
        case FlashMode.off : return FlashMode.torch;
      }
      return FlashMode.torch ;
  }
  let __changeFlashMode=async()=>{
    setFlashMode(__nextFlashMode(flashMode));
    getData();
  }
  const getData = async () => {
    api.get('')
      .then(res => {
       console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      });
  };
  let getU  = async ()=>{
    const res = await axios.get('http://api-ocr-mobile.ipconnex.com/').then(
      r=>{console.log(r)}
    ).catch(e=>{console.log(e)})
    console.log(res)
  }  
  let __takePicture = async () => {
    if (!camera || previewVisible ) return
    const photo = await camera.takePictureAsync({flashMode:FlashMode.auto})
    console.log(photo)
    setCapturedImage(photo)
    setPreviewVisible(true)
    
  }

  let __progressUpdate=(progressEvent)=>{
    let rate=progressEvent.progress*100;
    rate =rate.toFixed(2);
    console.log(progressEvent);
    setProgress(rate);
  }
  let __sendPicture= async ()=>{
      if(isLoading){
        Alert.alert(
          "Alert",
          "Image already Uploading "+ progress +"%",
          [ { text: "OK", onPress: () => console.log("OK Pressed") }]
        );

        return ;
      } 
      Alert.alert(
        "Upload Image",
        "The upload has started ",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      setIsLoading(true);
      console.log('picture send');
      let formData = new FormData();
      formData.append("image", {
        uri:
          Platform.OS === "android"
            ? capturedImage.uri
            : capturedImage.uri.replace("file://", ""),
        name: "tata.jpeg",
        type: "image/jpeg",
      });
      let localUri =capturedImage.uri;
      /*let formData = new FormData()
      formData.append("image",localUri,'img1.jpg');;*/
      console.log(formData)

      let r= await api.post('/api/captures/',formData,{
        signal: controller.signal,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress:progressEvent=> __progressUpdate(progressEvent),
      }).then(function (response) {
          console.log(response.data);
          setProgress("0.00");
          navigation.navigate("Validation des résultats",response.data);
          setFlashMode(FlashMode.off);
          setIsLoading(false);
          //setPreviewVisible(false);
          
        })
        .catch(function (error) {
          setIsLoading(false);
          Alert.alert(
            "Error",
            "Error occurred while sending data",
            [ { text: "OK", onPress: () => console.log("OK Pressed") }]
          );
          console.log(error);
          console.log (r);
        });
        

  }
  return (
        
        (  !previewVisible )?
            <SafeAreaView style={styles.view} >
              { (false) && 
              <Loading >

              </Loading>
              }

              { (!false) && 
              <CameraComponent style={styles.viewCamera} flashMode={flashMode}  >

              </CameraComponent>
              }
              <View style={styles.viewBttns}>
                  <View style={styles.bttn}>
                    <TouchableOpacity style={styles.button} onPress={__changeFlashMode}>
                      <FontAwesome5Icon  name="bolt" size={50} color={(flashMode==FlashMode.off)? "#000000" : "#888888"}></FontAwesome5Icon>
                    </TouchableOpacity>
                  </View>            
              
                  <View style={styles.bttn}>
                      <TouchableOpacity style={styles.button} onPress={__takePicture}>
                        <FontAwesome5Icon name="camera" size={50} /> 
                      </TouchableOpacity>
                  </View>   
              </View>
          </SafeAreaView> :
        <SafeAreaView  style={styles.view}  >
            <View
          style={{
            backgroundColor: 'transparent',
            flex: 7,
            width: '100%',
            height: '100%'
          }}
        >
          <ImageBackground
            source={{uri: capturedImage && capturedImage.uri}}
            style={{ 
              zIndex:-1,
              backgroundColor:"#ffffff",
              flex: 1
            }}>
          </ImageBackground>
        </View>
        <View style={styles.viewBttns}>
            <View style={styles.viewBttns}>
              <View style={styles.bttn}>
                <TouchableOpacity onPress={__sendPicture}>
                  <FontAwesome5Icon  name="share" size={50}></FontAwesome5Icon>
                </TouchableOpacity>
              </View>
              <View style={styles.bttn}>
                  <TouchableOpacity onPress={__retakePicture}>
                    <FontAwesome5Icon  name="undo" size={50}></FontAwesome5Icon>
                  </TouchableOpacity>
              </View>  
            </View>
          </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  view: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding:20,
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "stretch",
  },
  viewCamera:{
    flex: 50,
  },
  previewBttns:{
    flex:1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    
  },
  viewBttns:{
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  bttn:{alignSelf: 'center',flex: 1,alignItems: 'center'},
  arrounded:{
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#888888'
    }
});












