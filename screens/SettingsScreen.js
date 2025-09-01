import { View, Text, StyleSheet, useWindowDimensions, Alert, Linking } from "react-native";
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
import supabase from "../services/supabase";
import ErrorMessage from "../components/ErrorMessage";
import ModalListWidget from "../components/modals/ModalLIstWidget";
import { useBlocked } from "../hooks/useBlocked";
import { deleteMyAccount } from "../services/apiDeleteUser";

function SettingsScreen() {
    const { logout } = useLogout();
    const { user} = useUser();
    const { blocked } = useBlocked();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const { updateUser, isUpdating } = useUpdateUser();
    const [ inputError, setInputError ] = useState("");

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

    const [userName, setUserName] = useState(currentUserName);
    const [userEmail, setUserEmail] = useState(email);
    const [userAvatar, setUserAvatar] = useState(currentAvatar);
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

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
    
    function updateOldPassword(enteredOldPassword) {
        setOldPassword(enteredOldPassword);
    }

    function updateNewPassword(enteredNewPassword) {
        setNewPassword(enteredNewPassword);
    }
    
    function updateVerifyPassword(enteredVerifyPassword) {
        setVerifyPassword(enteredVerifyPassword);
    }

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const onPressDelete = () => {
        console.log(user?.user?.user_metadata?.ambassador);
        if (user?.user?.user_metadata?.ambassador) {
            // Ambassadors → just open mail
            const subject = "Delete my account";
            const body =
            `Please delete my Swopsis account.\n` +
            `Registered email: ${user.user.email}\n` +
            `Reason (optional): _____\n` +
            `Ambassador account? Yes\n` +
            `If Ambassador: proposed new ambassador email: _____`;
            const url = `mailto:swopsisters@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            Linking.openURL(url).catch(() => {
            setInputError("Could not open email app.");
            });
            return;
        }

        // Normal users → proceed with delete flow
        Alert.alert(
            "Delete account?",
            "This will permanently delete your account, items, and images.",
            [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                try {
                    await deleteMyAccount();
                    logout();
                } catch (e) {
                    setInputError(e?.message || "Delete failed");
                }
                },
            },
            ]
        );
    };


    async function handleSubmit() {
        console.log("Submitting user data:", userName);
        if (!userName) return;

        if (oldPassword || newPassword || verifyPassword) {
            if (!oldPassword || !newPassword || !verifyPassword) {
                setInputError("Missing input for password change.")
                return;
            } 

            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: userEmail,
                password: oldPassword,
            });


            if (signInError) {
                setInputError("Current password does not match")
                return;
            } 

            if (newPassword !== verifyPassword) {
                setInputError("Re-entered password does not match.")
                return;
            } 
        }

        console.log("gonna update now");
        updateUser({ updateData: { userName, password: newPassword }, userId: id });
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
                    onChangeText={updateOldPassword}
                    secureTextEntry={true}
                    editable={true}
                    value={oldPassword}
                />
                <SettingsInputField
                    placeholder={"**********"}
                    text={"New Password"}
                    onChangeText={updateNewPassword}
                    secureTextEntry={true}
                    editable={true}
                    value={newPassword}

                />
                <SettingsInputField
                    placeholder={"**********"}
                    text={"Confirm Password"}
                    onChangeText={updateVerifyPassword}
                    secureTextEntry={true}
                    editable={true}
                    value={verifyPassword}
                />
            </View>
            <Line />
            <View style={styles.error}>
                <ErrorMessage error={inputError} />
            </View>
            <View style={styles.buttonContainer}>
                <MainButton
                    title="LOG OUT"
                    onPress={logout}
                    variant="second"
                />
                <MainButton
                    title="UPDATE"
                    onPress={handleSubmit}
                    style={{width: 120}}
                    variant="second"
                />
            </View>
            <View style={styles.buttonContainer}>
                <MainButton
                    title="DELETE"
                    onPress={onPressDelete}
                    variant="primary"
                    style={{ width: 120 }}
                />
                <MainButton
                    title="BLOCKED"
                    onPress={openModal}
                    variant="second"
                     style={{width: 120}}
                    // style={{borderRadius: 0, borderWidth: 0, marginLeft: 20}}
                    textStyle={{fontSize: 17}}
                />
                <ModalListWidget
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                    blocked={blocked}
                />
            </View>
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: vs(10),
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
        marginBottom: 10,
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
