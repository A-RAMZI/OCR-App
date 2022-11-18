import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" style={styles.loader} color="#ADAFAC"/>
  </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    loader: {
        transform: [{ scaleX: 5 }, { scaleY: 5 }]
    }
});

export default Loading;