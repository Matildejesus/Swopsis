import Svg, { Path } from "react-native-svg";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function CalendarIcon() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
            <View style={styles.container}>
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="28"
                    viewBox="0 0 25 28"
                    fill="none"
                >
                    <Path
                        d="M0.0344133 0V6.88267H24.1238V0H0.0344133ZM0.0344133 10.324V27.2209C0.0344133 27.393 0.172067 27.5307 0.344133 27.5307H23.7796C23.9517 27.5307 24.0893 27.393 24.0893 27.2209V10.324H0H0.0344133ZM3.47575 13.7653H6.91708V17.2067H3.47575V13.7653ZM10.3584 13.7653H13.7997V17.2067H10.3584V13.7653ZM17.2411 13.7653H20.6824V17.2067H17.2411V13.7653ZM3.47575 20.648H6.91708V24.0893H3.47575V20.648ZM10.3584 20.648H13.7997V24.0893H10.3584V20.648Z"
                        fill="#004A0E"
                    />
                </Svg>
                <Text style={styles.text}>Calendar</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CalendarIcon;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
});
