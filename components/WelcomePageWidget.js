import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton.js";
import Colors from "../constants/colors.js";

function WelcomePageWidget({ text1, text2, navigation, image1, image2 }) {
    const [page, setPage] = useState(0);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const viewWidth = event.nativeEvent.layoutMeasurement.width;
        const newPage = Math.round(contentOffsetX / viewWidth);
        setPage(newPage);
    };

    const renderText = () => {
        const displayedText = page === 0 ? text1 : text2;
        if (displayedText.includes("/n")) {
            const items = displayedText.split(" /n ");
            return (
                <View style={styles.bulletList}>
                    {items.map((item, index) => (
                        <Text key={index.toString()} style={styles.bulletItem}>
                            • {item}
                        </Text>
                    ))}
                </View>
            );
        } else {
            return <Text style={styles.text}>{displayedText}</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                decelerationRate="fast"
            >
                <Image source={image1} style={styles.girlsImage} />
                <Image source={image2} style={styles.girlsImage} />
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

            {renderText()}

            <View style={styles.btnContainer}>
                <PrimaryButton
                    title="REGISTER"
                    onPress={() => navigation.navigate("Register")}
                />
                <SecondaryButton
                    title="LOG IN"
                    onPress={() => navigation.navigate("Login")}
                />
            </View>
        </View>
    );
}

export default WelcomePageWidget;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#fff",
        // gap: 10,
    },
    girlsImage: {
        width: 390,
        height: 497,
        flexShrink: 0,
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "center",
        //  marginBottom: 50,
        gap: 6,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 19,
        marginBottom: 50,
    },
    text: {
        color: Colors.primary1,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 30,
        marginTop: 30,
        fontFamily: "RalewayBold",
    },
    bulletItem: {
        textAlign: "center",
        color: Colors.primary1,
        fontSize: 25,
        fontWeight: "700",
    },
    bulletList: {
        flexDirection: "column",
        marginTop: 30,
        marginBottom: 33,
    },
});
