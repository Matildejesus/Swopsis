import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";
import MainButton from "./MainButton";
import ErrorMessage from "./ErrorMessage";
import Logo from "./icons/Logo";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../utils/responsive";
import { useMemo } from "react";

function InputTemplateWidget({content, title, handleSearch, link, linkText, anotherLink, submitError, page, groups, loading, spacingStyle}) {
    const { width, height, isTablet, horizontalScale: hs, verticalScale: vs, moderateScale: ms, scaleFont } = useResponsive();
    
    const dynamicStyles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: Colors.impact,
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            },
            contentContainer: {
                borderRadius: vs(51),
                backgroundColor: "white",
                opacity: 0.9,
                shadowColor: "black",
                shadowOpacity: 0.24,
                shadowRadius: 8.5,
                shadowOffset: { width: hs(4), height: vs(5) },
                height: Math.min(vs(432), height * 0.8),
                width: 283,  
                zIndex: 1,
                justifyContent: "center",
                alignItems: "center",
            },
            image: {
                width: hs(173),
                height: vs(200),
            },
            title: {
                fontSize: scaleFont(18),
                fontFamily: "Raleway_700Bold",
                paddingBottom: vs(10),
                color: Colors.primary2,
            },
            text: {
                fontSize: scaleFont(12),
                paddingHorizontal: hs(30),
                paddingTop: vs(18),
                color: Colors.primary2,
                fontFamily: "Raleway_400Regular"
            },
            link: {
                color: Colors.primary2,
                fontSize: 15,
                fontFamily: "Raleway_500Medium",
                paddingBottom: vs(15),
                marginTop: vs(10),
            },
            register: {
                fontFamily: "Raleway_700Bold",
            },
            loginError: {
                width: hs(170),
                height: vs(40),
            },
        }, [width, height, isTablet, hs, vs, ms, scaleFont]);
    })

    const navigation = useNavigation();
    return (
        <View style={dynamicStyles.container}>
            { page !== "postcode" &&
            <Logo />}
            <View style={dynamicStyles.contentContainer}>
                {content()}
                <View style={dynamicStyles.loginError}>
                    <ErrorMessage error={submitError} />
                </View>
                {page === "postcode" && (
                    <MainButton
                        title={loading ? "Loading…" : "View Groups"}
                        style={{ width: 150, opacity: loading || groups.length === 0 ? 0.5 : 1, paddingTop: vs(5)}}
                        disabled={loading || groups.length === 0}
                        onPress={() => navigation.navigate("GroupsList", { groups })}
                    />
                )}
                <View>
                    {anotherLink && anotherLink()}
                    <TouchableOpacity onPress={link}>
                        <Text style={[dynamicStyles.link, spacingStyle]}>
                            {linkText}
                        </Text>
                    </TouchableOpacity>
                </View>
                <MainButton
                    title={title}
                    style={{ width: 200 }}
                    onPress={handleSearch}
                    variant="primary"
                />
            </View>
        </View>
    )
}

export default InputTemplateWidget;