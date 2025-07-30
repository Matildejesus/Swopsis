import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import PicturePicker from "../components/PicturePicker";
import SettingsInputField from "../components/SettingsInputField";

import Colors from "../constants/colors";
import Line from "../components/Line";

import { useState } from "react";

import MainButton from "../components/MainButton";

import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from "../utils/responsive";
import { useUser } from "../hooks/auth/useUser";
import { useUpdateUser } from "../hooks/auth/useUpdateUser";
import { useLogout } from "../hooks/auth/useLogout";

function SettingsScreen() {
    const { logout, isLoading } = useLogout();
    const { user, isLoading: isUserLoading } = useUser();

    const { width: screenWidth, height: screenHeight } = useWindowDimensions();

    const profileHeight = screenHeight * 0.15;
    const profileWidth = screenWidth * 0.3;

    const profileStyle = {
        width: profileWidth,
        height: profileHeight
    }

     const {
        id = '',
        email = '',
        user_metadata: { 
            userName: currentUserName = '', 
            avatar: currentAvatar = null 
        } = {}
    } = user.user || {};

    const { updateUser, isUpdating } = useUpdateUser();

    const [userName, setUserName] = useState(currentUserName);
    const [userEmail, setUserEmail] = useState(email);
    const [userAvatar, setUserAvatar] = useState(currentAvatar);

    const handleImageSelected = (newAvatarUri) => {
        setUserAvatar(newAvatarUri);
        updateUser({ avatar: newAvatarUri}, user.id);
    };

    function updateUserNameHandler(enteredUserName) {
        setUserName(enteredUserName);
    }

    function updateEmailHandler(enteredEmail) {
        setUserEmail(enteredEmail);
    }

    function handleSubmit() {
        console.log("Submitting user data:",  userName );
        if (!userName) return;
        updateUser({ updateData: { userName }, userId: id });
    }

    return (
        <View style={styles.container}>
            <View>
                <PicturePicker
                    userPicture={userAvatar}
                    onImageSelected={handleImageSelected}
                    imageStyle={styles.profileImage}
                />
            </View>
            <View style={styles.groupContainer}>
                <Text style={styles.header}>Info</Text>
                <SettingsInputField
                    placeholder={userName}
                    text={"Username"}
                    onChangeText={updateUserNameHandler}
                    editable={true}
                    // value={userName}
                />
                <SettingsInputField
                    placeholder={email}
                    text={"Email"}
                    onChangeText={updateEmailHandler}
                    editable={false}
                    value={userEmail}
                />
            </View>
            <View style={styles.groupContainer}>
                <Text style={styles.header}>Change Password</Text>
                <SettingsInputField
                    placeholder={"**********"}
                    text={"Current Password"}
                    secureTextEntry={true}
                />
                <SettingsInputField
                    placeholder={"**********"}
                    text={"New Password"}
                    secureTextEntry={true}
                />
                <SettingsInputField
                    placeholder={"**********"}
                    text={"Confirm Password"}
                    secureTextEntry={true}
                />
            </View>
            <Line />
            <View style={styles.buttonContainer}>
                <MainButton
                    title="LOG OUT"
                    onPress={logout}
                    variant="second"
                />
                <MainButton
                    title="UPDATE"
                    onPress={handleSubmit}
                    variant="primary"
                />
            </View>
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: vs(20),
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    header: {
        color: Colors.primary1,
        fontFamily: "InterRegular",
        fontSize: 18,
        marginBottom: 18,
    },
    groupContainer: {
        marginLeft: 43,
        marginBottom: 35,
    },
    buttonContainer: {
        marginTop: 18,
        flexDirection: "row",
        gap: 50,
        alignSelf: "center",
    },
    profileImage: {
        width: 112,
        height: 114,
        borderRadius: 21,
    }
});
