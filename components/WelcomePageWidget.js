import { View, Text, StyleSheet, ScrollView } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Image } from 'expo-image';
import { useMemo, useState } from "react";
import MainButton from "./MainButton.js";
import Colors from "../constants/colors.js";
import { useResponsive } from "../utils/responsive";
import Screen from "./Screen.js";

function WelcomePageWidget({ onRegister, onLogin, page, handleScroll }) {
    const { width, height, isTablet, horizontalScale: hs, verticalScale: vs, moderateScale: ms, scaleFont } = useResponsive();

    const imageStyle = {
        width,
        height: Math.max(height * 0.55, isTablet ? 420 : 360),
        resizeMode: "cover",
    };

    const dynamicStyles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: "#fff",
            },
            navbar: {
                flexDirection: "row",
                justifyContent: "center",
                gap: hs(6),
                // flex: 1,
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
        }, [width, height, isTablet, hs, vs, ms, scaleFont]);
    })


    return (
        <Screen>
            <View style={dynamicStyles.container}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    decelerationRate="fast"
                >
                    <Image 
                        source="https://ojtjdcpqkljyiralrflf.supabase.co/storage/v1/object/public/public%20assets/girls.png"  
                        style={imageStyle}
                        contentFit="cover"     
                    />
                    <Image 
                        source="https://ojtjdcpqkljyiralrflf.supabase.co/storage/v1/object/public/public%20assets/img4.png" 
                        style={imageStyle} 
                        contentFit="cover"
                    />
                </ScrollView> 

                <View style={dynamicStyles.navbar}>
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
                    <Text style={[dynamicStyles.text, {fontSize: scaleFont(18)}]}>
                        SWAP AND INSPIRED WITH A SHARED COMMUNITY WARDROBE
                    </Text>
                ) : (
                    <View style={dynamicStyles.bulletList}>
                        {["Swap", "Impact", "BE YOU"].map((item, index) => (
                            <Text key={index} style={[dynamicStyles.bulletItem, {fontSize: scaleFont(18)}]}>• {item}</Text>
                        ))}
                    </View>
                )
                }

                <View style={dynamicStyles.btnContainer}>
                    <MainButton
                        title="REGISTER"
                        onPress={onRegister}
                        variant="primary"
                        style={{ width: hs(141) }}
                    />
                    <MainButton
                        title="LOG IN"
                        onPress={onLogin}
                        variant="secon"
                        style={{ width: hs(141) }}
                    />
                </View>
            </View>
        </Screen>
    );
}

export default WelcomePageWidget;
