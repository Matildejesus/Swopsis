import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";

function ImpactIcon() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Impact")}>
            <View style={styles.container}>
                <Svg fill="#004A0E" width="25px" height="25px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
                    <G id="SVGRepo_iconCarrier"> 
                        <Path d="M24 12.977c-3.866 0-7 3.158-7 7.055 0 2.22 1.020 4.197 2.609 5.491-2.056 1.525-3.609 2.488-3.609 2.488s-14-8.652-14-15.622c0-4.2 2.583-8.399 7.5-8.399 4.5 0 6.5 4.296 6.5 4.296s1.75-4.296 6.5-4.296 7.416 4.115 7.416 8.399c0 0.958-0.272 1.943-0.716 2.932-1.281-1.436-3.134-2.344-5.2-2.344zM24 13.984c3.313 0 6 2.707 6 6.047s-2.687 6.048-6 6.048c-3.314 0-6-2.708-6-6.048s2.686-6.047 6-6.047zM21 21.039h2v2.016h2v-2.016h2v-2.016h-2v-2.016h-2v2.016h-2v2.016z"></Path> 
                    </G>
                </Svg>
                <Text style={styles.text}>Impact</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ImpactIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 4,
    },
    text: {
        paddingTop: 13,
        color: "#004A0E",
        // font-family: Raleway;
        fontSize: 12,
        fontWeight: "600",
    },
    image: {
        width: 28,
        height: 28,
    },
});
