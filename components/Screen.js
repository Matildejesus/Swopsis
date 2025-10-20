import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({ children, center = false, style, maxWidth = 900 }) {
    return (
        <SafeAreaView style={styles.safe}>
        <View style={[styles.container, center && styles.center, { maxWidth }, style]}>
            {children}
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        paddingHorizontal: 16,
        paddingTop: Platform.OS === "web" ? 24 : 12,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
});
