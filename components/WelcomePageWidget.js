import { View, Image, Text, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useState } from "react";
import MainButton from "./MainButton.js";
import Colors from "../constants/colors.js";
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from "../utils/responsive";

function WelcomePageWidget({ content, image1, image2, onRegister, onLogin, page, handleScroll }) {
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();

    const imageHeight = screenHeight * 0.65;

    const imageStyle = {
        width: screenWidth,
        height: imageHeight,
        // resizeMode: 'contain'
    }

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                decelerationRate="fast"
            >
                <Image source={image1} style={imageStyle} />
                <Image source={image2} style={imageStyle} />
            </ScrollView>
            <View style={styles.navbar}>
                {page === 0 ? (
                    <>
                        <Svg height="10" width="10" viewBox="0 0 10 10">
                            <Circle cx="5" cy="5" r="5" fill="#FB5099" />
                        </Svg>
                        <Svg height="8" width="8" viewBox="0 0 8 8">
                            <Circle cx="4" cy="4" r="4" fill="#FB5099" />
                        </Svg>
                    </>
                ) : (
                    <>
                        <Svg height="8" width="8" viewBox="0 0 8 8">
                            <Circle cx="4" cy="4" r="4" fill="#FB5099" />
                        </Svg>
                        <Svg height="10" width="10" viewBox="0 0 10 10">
                            <Circle cx="5" cy="5" r="5" fill="#FB5099" />
                        </Svg>
                    </>
                )}
            </View>

            {page === 0 ? (
                <Text style={styles.text}>
                    SWAP AND INSPIRED WITH A SHARED COMMUNITY WARDROBE
                </Text>
            ) : (
                <View style={styles.bulletList}>
                    {["Swap", "Impact", "BE YOU"].map((item, index) => (
                        <Text key={index} style={styles.bulletItem}>• {item}</Text>
                    ))}
                </View>
            )
            }

            <View style={styles.btnContainer}>
                <MainButton
                    title="REGISTER"
                    onPress={onRegister}
                    variant="primary"
                    style={{ width: 141 }}
                />
                <MainButton
                    title="LOG IN"
                    onPress={onLogin}
                    variant="secon"
                    style={{ width: 141 }}
                />
            </View>
        </View>
    );
}

export default WelcomePageWidget;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "center",
        gap: hs(6),
        flex: 1,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: hs(19),
        marginBottom: vs(50),
    },
    text: {
        color: Colors.primary1,
        textAlign: "center",
        fontSize: ms(25),
        // fontWeight: "bold",
        marginVertical: vs(30),
        fontFamily: "Raleway_700Bold",
    },
    bulletItem: {
        textAlign: "center",
        color: Colors.primary1,
        fontSize: ms(25),
        fontWeight: "700",
    },
    bulletList: {
        flexDirection: "column",
        marginVertical: vs(30)
    },
});
