import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ErrorMessage from "../../components/ErrorMessage";
import MainButton from "../../components/MainButton";
import PicturePicker from "../../components/PicturePicker";
import { useState } from "react";
import Colors from "../../constants/colors";
import BulletPointWidget from "../../components/BulletPointWidget";
import { useUser } from "../../hooks/auth/useUser";
import { addGroup } from "../../services/apiGroups";
import InputField from "../../components/authentication/InputField";
import Toast from "react-native-toast-message";

function AmbassadorRequestScreen({ navigation }) {
    const [ groupName, setGroupName ] = useState();
    const [ address, setAddress ] = useState();
    const [ profileImage, setProfileImage ] = useState();
    const [ description, setDescription ] = useState();
    const [ pointsList, setPointsList ] = useState([]); 
    const [ requestError, setRequestError ] = useState(null);
    const user = useUser();
    console.log(user.user.user.id);

    function addNameHandler(enteredName) {
        setGroupName(enteredName);
    }

    function addAddressHandler(enteredAddress) {
        setAddress(enteredAddress);
    }

    function addDescriptionHandler(enteredDescription) {
        setDescription(enteredDescription);
    }

    const handleImageSelected = (newAvatarUri) => {
        setProfileImage(newAvatarUri);
    };

    const submitHandler = async () => {
        const addressPattern = /^[\w\s]+,\s*\d{4}$/;
        console.log(groupName, description, address, pointsList.length, profileImage);
        if (!groupName || !address || !profileImage || pointsList.length === 0 || !description) {
            setRequestError("Invalid or Missing details. Please try again.");
            console.log("1");
            return
        } 
        
        if (!addressPattern.test(address.trim())) {
            setRequestError("Enter a valid address in 'Street, Postcode' format.");
            return;
        }

        console.log("success");
       
        try {
            const newGroup = {
                name: groupName,
                description: description,
                location: address,
                rules: pointsList,
                numberOfMem: 1,
                avatar: profileImage,
                ambassadorId: user.user.user.id,
                status: "pending"
            };
            await addGroup({ group: newGroup });
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "InApp",
                    },
                ],
            });
        } catch (error) {
            console.error("Request not sent: ", error);
            Toast.show({
            type: 'error',
            text1: 'Failed to create group',
            text2: 'Please try again',
        });
        }
    }

    return(
            <View style={styles.container}>

                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <PicturePicker onImageSelected={handleImageSelected} userPicture={profileImage} imageStyle={styles.image}/>
                    </View>
                    {/* <View > */}
                        <InputField
                            placeholder="Unimelb"
                            text="Group Name"
                            onChangeText={addNameHandler}
                            value={groupName}
                            containerStyle={styles.containerStyle}
                        />
                        <InputField
                            placeholder="ParkVille, 3010"
                            text="Address"
                            onChangeText={addAddressHandler}
                            value={address}
                            containerStyle={styles.containerStyle}
                        />
                        <BulletPointWidget pointsList={pointsList} setPointsList={setPointsList} />
                        <InputField
                            placeholder="Describe the group..."
                            text="Description"
                            onChangeText={addDescriptionHandler}
                            value={description}
                            multiline={true}
                            numberOfLines={5}
                            maxLength={200}
                            containerStyle={styles.fieldContainer}
                            
                        />
                        <View style={styles.linkContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Postcode")}
                            >
                                <Text style={styles.link}>Join a{" "}
                                    <Text style={styles.bold}>Group</Text>
                                    <Text>{" "}instead</Text>

                                </Text>
                            </TouchableOpacity>
                        
                        </View>
                        <MainButton
                            title="REQUEST"
                            style={{ width: 200 }}
                            onPress={submitHandler}
                            variant="primary"
                        />
                        <View style={styles.requestError}>
                            <ErrorMessage error={requestError} />
                        </View>
                    {/* </View> */}
                </View>
            </View>
        );
}

export default AmbassadorRequestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.impact,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    contentContainer: {
        borderRadius: 51,
        backgroundColor: "white",
        opacity: 0.9,
        shadowColor: "black",
        shadowOpacity: 0.24,
        shadowRadius: 8.5,
        shadowOffset: { width: 4, height: 5 },
        height: 750,
        width: 340,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingVertical: 30,
        paddingLeft: 25,
    },
    link: {
        color: Colors.primary2,
        fontSize: 15,
        fontFamily: "Raleway_500Medium",
    },
    bold: {
        fontFamily: "Raleway_700Bold"
    },
    linkContainer: {
        marginTop: 20,
        marginBottom: 15,
        gap: 7,
    },
    register: {
        fontFamily: "Raleway_700Bold",
    },
    loginError: {
        width: 170,
        paddingTop: 10,
        height: 45,
    },
    imageContainer: {
        alignSelf: "flex-start",
        paddingLeft: 20,

    },
    fieldContainer: {
        borderColor: Colors.primary2,
        borderWidth: 1,
        borderRadius: 10, 
        opacity: 0.76,
        paddingVertical: 3,
        //marginLeft: 30,
        paddingLeft: 13,
        width: 280,
        height: 100,
       // opacity: 0.76,
        minHeight: 40, 
        maxHeight: 120,
        alignSelf: "center",
    },
    addressContainer: {
       height: 60,
    },
    inputText: {
        alignSelf: "flex-end",
        paddingRight: 20,
        fontFamily: "RalewayMedium",
        color: Colors.primary2,
        fontSize: 15,
    },
    image: {
        width: 112,
        height: 114,
        backgroundColor: Colors.secondary2,
        borderRadius: 21,
    },
    containerStyle: {
        borderColor: Colors.primary2,
        borderWidth: 1,
        borderRadius: 10, 
        opacity: 0.76,
        paddingVertical: 15,
        //marginLeft: 30,
        paddingLeft: 13,
        width: 280,
        height: 50,
       // opacity: 0.76,
        minHeight: 40, 
        maxHeight: 120,
        alignSelf: "center",
    }
})