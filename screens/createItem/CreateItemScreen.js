import { StyleSheet, Text, View } from "react-native";
import PicturePicker from "../../components/PicturePicker";
import Colors from "../../constants/colors";
import PrimaryButton from "../../components/PrimaryButton";
import InputField from "../../components/authentication/InputField.js";
import { useState } from "react";
import DropDownMenu from "../../components/DropDownMenu.js";
import { useNavigation } from "@react-navigation/native";
import Categories from "../../constants/itemCategories.js";
import { useMemo } from "react";
import RadioGroup from 'react-native-radio-buttons-group';
import ErrorMessage from "../../components/ErrorMessage.js";

function CreateItemScreen() {
    const [title, setTitle] = useState("Black Heals");
    const [description, setDescription] = useState("YSL HEALS!!! red bottoms");
    const [category, setCategory] = useState(null);
    const [avatar, setAvatar] = useState("");
    const [selectedId, setSelectedId] = useState();
    const [inputError, setInputError] = useState(null);
    let method = "";
   
    const radioButtons = useMemo(() => ([
        { id: '1', label: "SWAP", value: "SWAP"},
        {id: '2', label: "LOAN", value: "LOAN"}
    ]), []);

    console.log(Object.keys(Categories));

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
            {if (selectedId == 1) {
                method = "swap";
            } else {
                method = "loan";
            }}
            // addItem({ 
            //     item: {
            //         userId, category: category.value, image: avatar, title, description, method: selectedId 
            //     }
            // });
            navigation.navigate("ItemDescriptionInput", {
                title: title, 
                description: description, 
                category: category.value,
                avatar: avatar, 
                method: method
            }); 
        }
    }

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
            <View>
	        <View style={styles.view2}>
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
	        </View>
            </View>
	        <View style={styles.row}>
		        <Text style={styles.label}>Category</Text>
                <DropDownMenu value={category} data={Object.keys(Categories)} addCategoryHandler={setCategory}/>
	        </View>
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
                <PrimaryButton title={"NEXT"} style={styles.button} onPress={submitHandler}/>
            </View>
        </View>
    )
}

export default CreateItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 40,
        gap: 15,
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
        fontFamily: "RalewayBold",
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
        width: 243,
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
    error: {
        height: 30,
    }
})