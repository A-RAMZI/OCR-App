import { useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Button, ImageBackground, TextInput } from 'react-native';


export default function  InputView({title,value,setValue,inputType}){

    let __onChange=(value)=> { setValue(value);}

    return (
        <View style={styles.view}>
                        <Text style={styles.title}> {title} :</Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={__onChange}
                                value={value}
                                keyboardType= {(inputType)? inputType : "numbers-and-punctuation"}/>
        </View>  
    )
  }

const styles = StyleSheet.create({

    view:{  
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title:{
        flex:1,
        marginLeft:10
    },
    input:{ 
        flex:3,
        margin: 12,
        borderWidth: 1,
        padding: 10,

    }

})














