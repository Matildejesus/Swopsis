import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from "react-native";
import PicturePicker from "../../components/PicturePicker";
import Colors from "../../constants/colors";
import MainButton from "../../components/MainButton.js";
import InputField from "../../components/authentication/InputField.js";
import { useState } from "react";
import DropDownMenu from "../../components/DropDownMenu.js";
import { useNavigation } from "@react-navigation/native";
import Categories from "../../constants/itemCategories.js";
import { useMemo } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import ErrorMessage from "../../components/ErrorMessage.js";

function CreateItemScreen() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(null);
    const [avatar, setAvatar] = useState("");
    const [selectedId, setSelectedId] = useState();
    const [inputError, setInputError] = useState(null);
    let method = "";

    const radioButtons = useMemo(
        () => [
            { id: "1", label: "SWAP", value: "SWAP" },
            { id: "2", label: "LOAN", value: "LOAN" },
        ],
        [],
    );

    const handleImageSelected = (newAvatarUri) => {
        setAvatar(newAvatarUri);
    };

    const navigation = useNavigation();

    const submitHandler = () => {
        if (!title || !category || !avatar || !selectedId) {
            setInputError("Missing inputs");
        } else {
            {
                if (selectedId == 1) {
                    method = "swap";
                } else {
                    method = "loan";
                }
            }

            navigation.navigate("ItemDescriptionInput", {
                title: title,
                category: category,
                avatar: avatar,
                method: method,
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
            <View style={styles.container}>
            <PicturePicker
                onImageSelected={handleImageSelected}
                imageStyle={styles.imageStyle}
                userPicture={avatar}
                style={styles.picturePicker}
            />
            <InputField
                text="Title"
                textStyle={styles.label}
                containerStyle={styles.titleField}
                placeholder="Write a post caption..."
                inputStyle={styles.text}
                onChangeText={setTitle}
                value={title}
                secureTextEntry={false}
            />
            <DropDownMenu
                value={category}
                data={Object.keys(Categories)}
                addCategoryHandler={setCategory}
                title="Category"
            />
            <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
                layout="row"
            />
            <View style={styles.error}>
                <ErrorMessage error={inputError} />
            </View>
            <View style={styles.buttonContainer}>
                <MainButton
                    title={"NEXT"}
                    style={styles.button}
                    onPress={submitHandler}
                    variant="secon"
                />
            </View>
            
        </View>
    </ScrollView>
    );
}

export default CreateItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 20,
        gap: 10,
    },
    picturePicker: {
        width: "100%",
        height: 244,
        backgroundColor: Colors.secondary2,
        aspectRatio: 1,
        borderRadius: 21,
    },
    imageStyle: {
        width: "85%",
        height: 244,
        alignSelf: "center",
        borderRadius: 21,
        aspectRatio: 1,
        position: "relative"
    },
    button: {
        width: 141,
    },
    buttonContainer: {
        alignSelf: "flex-end",
        paddingRight: 70,
        marginBottom: 40
    },
    label: {
        color: Colors.primary1,
        fontSize: 15,
        fontFamily: "Raleway_700Bold",
        marginRight: 20,
    },
});
