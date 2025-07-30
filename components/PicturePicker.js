import { View, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import ModalPhotoWidget from "./modals/ModalPhotoWidget";
import PictureButton from "./icons/PictureButton";

function PicturePicker({ userPicture, style, onImageSelected, imageStyle }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [avatar, setAvatar] = useState(userPicture);
    
    const requestPermission = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work.");
            return;
        }
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== "granted") {
            alert("Sorry, we need camera permissions to make this work.");
        } else {
            setIsModalVisible(true);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            setIsModalVisible(false);
            onImageSelected(result.assets[0].uri);
        }
    };

    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaType.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            onImageSelected(result.assets[0].uri);
            setIsModalVisible(false);
        }
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <View>
            {avatar ? (
                <Image source={{ uri: avatar }} style={imageStyle} />
            ) : (
                <View style={style ? style : styles.imageContainer} />
            )}

            <PictureButton
                onPress={requestPermission}
                style={style ? styles.camera : undefined}
            />
            <ModalPhotoWidget
                visible={isModalVisible}
                onRequestClose={onModalClose}
                takeImage={takeImage}
                pickImage={pickImage}
            />
        </View>
    );
}

export default PicturePicker;

const styles = StyleSheet.create({
    imageContainer: {
        width: 112,
        height: 114,
        backgroundColor: Colors.secondary2,
        borderRadius: 21,
    },
    camera: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
});
