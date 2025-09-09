import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { addGroup } from "../../services/apiGroups";
import { updateUserMetadata } from "../../services/apiAdmin";
import { useNavigation } from "@react-navigation/native";
import { findUserByEmail } from "../../services/apiAdmin";
import PicturePicker from "../../components/PicturePicker";
import InputField from "../../components/authentication/InputField";
import ErrorMessage from "../../components/ErrorMessage";
import MainButton from "../../components/MainButton";

function GroupCreateScreen() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("Unimelb");
    const [avatar, setAvatar] = useState("");
    const [rules, setRules] = useState("");
    const [ambassadorEmail, setAmbassadorEmail] = useState("janedoe@gmail.com");
    const [inputError, setInputError] = useState(null);

    const navigation = useNavigation();

    const handleImageSelected = (newAvatarUri) => {
        setAvatar(newAvatarUri);
    };

    const submitHandler = async () => {
        if (
            !name ||
            !description ||
            !location ||
            !rules ||
            !avatar ||
            !ambassadorEmail
        ) {
            setInputError("Missing inputs");
        } else {
            try {
                const ambassador = await findUserByEmail(ambassadorEmail);
                const groupData = await addGroup({
                    group: {
                        name,
                        description,
                        location,
                        rules,
                        numberOfMem: 1,
                        avatar,
                        ambassador: ambassador.id,
                    },
                });
                await updateUserMetadata(ambassador.id, groupData.id, true);

                navigation.navigate("Groups");
            } catch (error) {
                console.error("Error fetching ambassador: ", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <PicturePicker
                onImageSelected={handleImageSelected}
                imageStyle={styles.imageStyle}
                userPicture={avatar}
                style={styles.picturePicker}
            />
            <View style={styles.row}>
                <InputField
                    text="Name"
                    textStyle={styles.label}
                    containerStyle={styles.titleField}
                    placeholder="Enter group name"
                    inputStyle={styles.text}
                    onChangeText={setName}
                    value={name}
                    secureTextEntry={false}
                />
            </View>
            <View style={styles.view2}>
                <InputField
                    text="Description"
                    textStyle={styles.label}
                    containerStyle={styles.descriptionField}
                    multiline={true}
                    placeholder="Enter group descriptions"
                    inputStyle={styles.text}
                    onChangeText={setDescription}
                    value={description}
                    secureTextEntry={false}
                />
            </View>
            <View style={styles.view2}>
                <InputField
                    text="Rules"
                    textStyle={styles.label}
                    containerStyle={styles.descriptionField}
                    multiline={true}
                    placeholder="Enter a list of rules"
                    inputStyle={styles.text}
                    onChangeText={setRules}
                    value={rules}
                    secureTextEntry={false}
                />
            </View>
            <View style={styles.view2}>
                <InputField
                    text="Ambassador Email"
                    textStyle={styles.label}
                    containerStyle={styles.emailField}
                    multiline={true}
                    placeholder="Enter email"
                    inputStyle={styles.text}
                    onChangeText={setAmbassadorEmail}
                    value={ambassadorEmail}
                    secureTextEntry={false}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Location </Text>
                {/* <PinIcon /> */}
            </View>
            <View style={styles.error}>
                <ErrorMessage error={inputError} />
            </View>
            <View style={styles.buttonContainer}>
                <MainButton
                    title={"CREATE"}
                    style={styles.button}
                    onPress={submitHandler}
                    variant="primary"
                />
            </View>
        </View>
    );
}

export default GroupCreateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 40,
        gap: 15,
    },
    title: {
        fontSize: 24,
        color: Colors.primary1,
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: Colors.primary1,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: Colors.text,
    },
    picturePicker: {
        width: 160,
        height: 164,
        backgroundColor: Colors.secondary2,
        borderRadius: 21,
    },
    imageStyle: {
        width: 165,
        height: 164,
        borderRadius: 21,
    },
    button: {
        width: 141,
        height: 49,
    },
    buttonContainer: {
        alignSelf: "flex-end",
        paddingRight: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    scrollView: {
        alignItems: "flex-start",
        backgroundColor: "#FFFFFF",
        paddingTop: 38,
    },
    label: {
        color: Colors.primary1,
        fontSize: 15,
        fontFamily: "Raleway_700Bold",
    },
    text: {
        color: Colors.primary2,
        fontFamily: "InterRegular",
        fontSize: 15,
    },
    titleField: {
        height: 37,
        marginHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        borderColor: Colors.primary2,
        borderWidth: 1,
        width: 230,
        paddingHorizontal: 13,
    },
    descriptionField: {
        marginTop: 19,
        width: 272,
        height: 75,
        marginHorizontal: 20,
        borderRadius: 10,
        borderColor: Colors.primary2,
        borderWidth: 1,
        paddingHorizontal: 13,
        paddingTop: 5,
    },
    emailField: {
        marginTop: 19,
        width: 272,
        height: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        borderColor: Colors.primary2,
        borderWidth: 1,
        paddingHorizontal: 13,
        paddingTop: 5,
    },
    error: {
        height: 30,
    },
});
