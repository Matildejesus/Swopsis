import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import ModalReportWidget from "../modals/ModalReportWidget";
import { useState } from "react";
import { addBlocked } from "../../services/apiBlocked";
import { addReport } from "../../services/apiReport";

function DashboardIcon({ location, text, screen, meId, themId }) {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const blockUser = () =>{
        addBlocked({ user1: meId, user2: themId });

    }
        
    const reportUser = (msg) =>
        addReport({ reporter: meId, reported_user: themId, message: msg });

    return (
        <>
        {screen === "chat" ? (
            <>
            <TouchableOpacity onPress={openModal}>
                <View style={styles.container}>
                <Svg width="24" height="24" viewBox="0 0 24 24">
                    <Path d="M0 0 C2.97 0 5.94 0 9 0 C9 3.63 9 7.26 9 11 C6.03 11 3.06 11 0 11 C0 7.37 0 3.74 0 0 Z M2 2 C2 4.31 2 6.62 2 9 C3.65 9 5.3 9 7 9 C7 6.69 7 4.38 7 2 C5.35 2 3.7 2 2 2 Z" fill="#004A0E" transform="translate(13,11)" />
                    <Path d="M0 0 C2.97 0 5.94 0 9 0 C9 3.63 9 7.26 9 11 C6.03 11 3.06 11 0 11 C0 7.37 0 3.74 0 0 Z M2 2 C2 4.31 2 6.62 2 9 C3.65 9 5.3 9 7 9 C7 6.69 7 4.38 7 2 C5.35 2 3.7 2 2 2 Z" fill="#004A0E" transform="translate(2,2)" />
                    <Path d="M0 0 C2.97 0 5.94 0 9 0 C9 2.31 9 4.62 9 7 C6.03 7 3.06 7 0 7 C0 4.69 0 2.38 0 0 Z M2 2 C2 2.99 2 3.98 2 5 C3.65 5 5.3 5 7 5 C7 4.01 7 3.02 7 2 C5.35 2 3.7 2 2 2 Z" fill="#004A0E" transform="translate(2,15)" />
                    <Path d="M0 0 C2.97 0 5.94 0 9 0 C9 2.31 9 4.62 9 7 C6.03 7 3.06 7 0 7 C0 4.69 0 2.38 0 0 Z M2 2 C2 2.99 2 3.98 2 5 C3.65 5 5.3 5 7 5 C7 4.01 7 3.02 7 2 C5.35 2 3.7 2 2 2 Z" fill="#004A0E" transform="translate(13,2)" />
                </Svg>
                {text ? <Text style={styles.text}>{text}</Text> : null}
                </View>
            </TouchableOpacity>

            <ModalReportWidget
                visible={isModalVisible}
                onRequestClose={closeModal}
                blockUser={async () => { await blockUser(); closeModal(); }}
                reportUser={async (msg) => { await reportUser(msg); closeModal(); }}
            />
            </>
        ) : (
            <TouchableOpacity
            onPress={() =>
                navigation.reset({ index: 0, routes: [{ name: location.stack }] })
            }
            >
            <View style={styles.container}>
                {/* same SVG as above */}
                <Svg width="24" height="24" viewBox="0 0 24 24">
                <Path d="M0 0 C2.97 0 5.94 0 9 0 C9 3.63 9 7.26 9 11 C6.03 11 3.06 11 0 11 C0 7.37 0 3.74 0 0 Z M2 2 C2 4.31 2 6.62 2 9 C3.65 9 5.3 9 7 9 C7 6.69 7 4.38 7 2 C5.35 2 3.7 2 2 2 Z" fill="#004A0E" transform="translate(13,11)" />
                <Path d="M0 0 C2.97 0 5.94 0 9 0 C9 3.63 9 7.26 9 11 C6.03 11 3.06 11 0 11 C0 7.37 0 3.74 0 0 Z M2 2 C2 4.31 2 6.62 2 9 C3.65 9 5.3 9 7 9 C7 6.69 7 4.38 7 2 C5.35 2 3.7 2 2 2 Z" fill="#004A0E" transform="translate(2,2)" />
                <Path d="M0 0 C2.97 0 5.94 0 9 0 C9 2.31 9 4.62 9 7 C6.03 7 3.06 7 0 7 C0 4.69 0 2.38 0 0 Z M2 2 C2 2.99 2 3.98 2 5 C3.65 5 5.3 5 7 5 C7 4.01 7 3.02 7 2 C5.35 2 3.7 2 2 2 Z" fill="#004A0E" transform="translate(2,15)" />
                <Path d="M0 0 C2.97 0 5.94 0 9 0 C9 2.31 9 4.62 9 7 C6.03 7 3.06 7 0 7 C0 4.69 0 2.38 0 0 Z M2 2 C2 2.99 2 3.98 2 5 C3.65 5 5.3 5 7 5 C7 4.01 7 3.02 7 2 C5.35 2 3.7 2 2 2 Z" fill="#004A0E" transform="translate(13,2)" />
                </Svg>
                {text ? <Text style={styles.text}>{text}</Text> : null}
            </View>
            </TouchableOpacity>
        )}
        </>
    );
}

export default DashboardIcon;

const styles = StyleSheet.create({
    container: { 
        flexDirection: "row", 
        gap: 4 
    },
    text: { 
        paddingTop: 13, 
        color: "#004A0E", 
        fontSize: 12, 
        fontFamily: "Raleway_600SemiBold"
    },
});
