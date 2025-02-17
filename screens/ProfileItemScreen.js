import { View } from "react-native";
import { StyleSheet } from "react-native";
import SegmentedBar from "../components/SegmentedBar";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import ProfileItemDetails from "../components/ItemWidgets/ProfileItemDetails";
import ProfileItemReviews from "../components/ItemWidgets/ProfileItemReviews";
import ContactButton from "../components/ItemWidgets/ContactButton";
import ReviewButton from "../components/ItemWidgets/ReviewButton";
import { useUser } from "../components/authentication/useUser";

function ProfileItemScreen() {
    const [selectedOption, setSelectedOption] = useState(0);

    const handleChange = (index) => {
        setSelectedOption(index);
    };

    const route = useRoute();
    const { itemData, owner, user } = route.params;

    return (
        <View style={styles.container}>
            {selectedOption === 0 ? (
                <ProfileItemDetails itemData={itemData} user={user} />
            ) : (
                <ProfileItemReviews user={user} />
            )}

            <View style={styles.column2}>
                <SegmentedBar
                    option1="Details"
                    option2="Reviews"
                    selectedIndex={selectedOption}
                    onChange={handleChange}
                />
            </View>
            {!owner ? (
                <>
                    <View style={styles.button}>
                        {selectedOption === 0 ? (
                            <ContactButton />
                        ) : (
                            <ReviewButton />
                        )}
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.button} />
                </>
            )}
        </View>
    );
}

export default ProfileItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    column2: {
        alignItems: "center",
        paddingHorizontal: "15%",
        justifyContent: "flex-end",
        flex: 1,
        paddingBottom: 10,
        //  marginBottom: 40,
        // position: "absolute",
        // zIndex: 10,
    },
    button: {
        paddingLeft: "60%",
        justifyContent: "flex-end",
        flex: 1,
        paddingBottom: 40,
        paddingRight: 40,
    },
});
