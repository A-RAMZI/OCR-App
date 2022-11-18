import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView,Button,Image, PermissionsAndroid  } from 'react-native';
import { useEffect,useRef,useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from  'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import CheckAutorisation from './src/Autorisation';
import Autorisation from './src/Autorisation';
import MainScreen from './src/MainScreen';
import { AUTORISATIONS_TYPES } from './src/ActionTypes';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import ResultComponent from './src/ResultComponent';
import Navigator from './routes/homeStack'; 
import Loading from './src/Loading';
export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);


  if(!hasCameraPermission || !hasMediaLibraryPermission) {return (<Loading></Loading>);}
  return (
    <Navigator/>);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});












