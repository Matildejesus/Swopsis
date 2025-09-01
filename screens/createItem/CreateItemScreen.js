import { StyleSheet, Text, View } from "react-native";
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
    const [description, setDescription] = useState("");
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
        console.log("submitting!!!");
        if (!title || !description || !category || !avatar || !selectedId) {
            setInputError("Missing inputs");
            console.log(inputError);
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
                description: description,
                category: category,
                avatar: avatar,
                method: method,
            });
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
                    text="Title"
                    textStyle={styles.label}
                    containerStyle={styles.titleField}
                    placeholder="Write a post caption..."
                    inputStyle={styles.text}
                    onChangeText={setTitle}
                    value={title}
                    secureTextEntry={false}
                />
            </View>
                <InputField
                    text="Description"
                    textStyle={styles.label}
                    containerStyle={styles.descriptionField}
                    multiline={true}
                    placeholder="Tell us the brand and more..."
                    inputStyle={styles.text}
                    onChangeText={setDescription}
                    value={description}
                    secureTextEntry={false}
                />
                <DropDownMenu
                    value={category}
                    data={Object.keys(Categories)}
                    addCategoryHandler={setCategory}
                    title="Category"
                />
            {/* </View> */}
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
        width: 240,
        height: 244,
        backgroundColor: Colors.secondary2,
        borderRadius: 21,
    },
    imageStyle: {
        width: 245,
        height: 244,
        borderRadius: 21,
    },
    button: {
        width: 141,
    },
    buttonContainer: {
        alignSelf: "flex-end",
        paddingRight: 70,
    },
    label: {
        color: Colors.primary1,
        fontSize: 15,
        fontFamily: "Raleway_700Bold",
        marginRight: 20,
    },
    descriptionField: {
        width: 243,
        height: 75,
    },
});
