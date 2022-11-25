import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity ,Button, ImageBackground, TextInput, ScrollView,Alert } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import api from './ConnectApi';
import InputView from './InputView';

export default function  ResultComponent ({navigation}){

    const [clientNum, setClientNum] = useState( navigation.getParam("id_client")? navigation.getParam("id_client") : "123456" );
    const [magasinNum, setMagasinNum] = useState(navigation.getParam("id_magasin") ? navigation.getParam("id_magasin"): "123456" );
    const [factureNum, setFactureNum] = useState( navigation.getParam("id_facture")? navigation.getParam("id_facture") : "123456" );
    const [t, setT] = useState( navigation.getParam("total")? navigation.getParam("total") : "0.0" );
    const [tVendu, setTVendu] = useState( navigation.getParam("t_vendu")? navigation.getParam("t_vendu"): "0.0" );
    const [tRetour,setTRetour] = useState(navigation.getParam("t_retour")? navigation.getParam("t_retour"): "0.0" );
    let __onChangeFacture = (value)=> { setFactureNum(value)}
    let __onChangeClient= (value)=> { setClientNum(value)}
    let __onChangeMagasin = (value)=> { setMagasinNum(value)}
    let __onChangeVendu = (value)=> { setTVendu(value)}
    let __onChangeRetour = (value)=> { setTRetour(value)}
    let __onChangeTotal = (value)=> { setT(value)}
    let __validateData= async ()=> { 
        var formData = new FormData();
        formData.append("image",navigation.getParam("image"));
        formData.append("id_facture",factureNum);
        formData.append("id_client",clientNum);
        formData.append("id_magasin",magasinNum);
        formData.append("t_vendu",tVendu);
        formData.append("t_retour",tRetour);
        formData.append("total",t);
        let result ={ factureNum,
                    clientNum,
                    magasinNum,
                    tVendu,
                    tRetour,
                    t,
                };
        await api.post('/api/factures/',formData
        ).then(
            function (response) {
            console.log(response.data);
            Alert.alert(
                "Success",
                "Invoice added with success ",
                [ { text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            navigation.goBack();
        }
        ).catch(function (error) {
            Alert.alert(
            "Error",
            "Error occurred while sending data",
            [ { text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            
            console.log(error);
        });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <InputView title="Facture"      value={factureNum}  setValue={__onChangeFacture}    inputType="numeric"></InputView>
            <InputView title="Client"       value={clientNum}   setValue={__onChangeClient}     inputType="numeric"></InputView>
            <InputView title="Magasin"      value={magasinNum}  setValue={__onChangeMagasin}    inputType="numeric"></InputView>
            <InputView title="Vendu ($)"    value={tVendu}      setValue={__onChangeVendu}      ></InputView>
            <InputView title="Retour ($)"   value={tRetour}     setValue={__onChangeRetour}     ></InputView>
            <InputView title="Total ($)"    value={t}           setValue={__onChangeTotal}      ></InputView>
            <View style={styles.bttn}>
                <TouchableOpacity onPress={__validateData}>
                  <FontAwesome5Icon  name="check" size={50}></FontAwesome5Icon>
                </TouchableOpacity>
            </View>          
        </ScrollView>
        
    )
  }

const styles = StyleSheet.create({
    container:{
        flexGrow: 1, 
        justifyContent: 'center' ,
        
    },
    bttn :{
        alignSelf:"flex-end",
        marginRight:20
    }

})










