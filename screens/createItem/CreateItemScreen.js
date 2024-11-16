import { StyleSheet, Text, View } from "react-native";
import PicturePicker from "../../components/PicturePicker";
import Colors from "../../constants/colors";
import PrimaryButton from "../../components/PrimaryButton";
import InputField from "../../components/authentication/InputField.js";
import { useState } from "react";
import DropDownMenu from "../../components/DropDownMenu.js";
import { useNavigation } from "@react-navigation/native";
import Categories from "../../constants/itemCategories.js";

function CreateItemScreen() {
    const [title, setTitle] = useState("Black Heals");
    const [description, setDescription] = useState("YSL HEALS!!! red bottoms");
    const [category, setCategory] = useState();
    const [avatar, setAvatar] = useState();

    const handleImageSelected = (newAvatarUri) => {
        setAvatar(newAvatarUri);
      };

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <PicturePicker 
             //   style={styles.picturePicker} 
                onImageSelected={handleImageSelected} 
                imageStyle={styles.imageStyle} 
                userPicture={avatar}
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
            <View style={styles.buttonContainer}>
                <PrimaryButton title={"NEXT"} style={styles.button} onPress={() => navigation.navigate("ItemDescriptionInput", {
        avatar: avatar,
        title: title,
        description: description,
        category: category
    })}/>
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
        gap: 30,
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
        alignItems: "flex-start",
        alignContent: "flex-start",
        alignItems: "flex-start",
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
       //justifyContent: "center",
        borderColor: Colors.primary2,
        borderWidth: 1,
        paddingHorizontal: 13,
        paddingTop: 5,
    },
    categoryField: {
        width: 204,
        height: 37,
        paddingHorizontal: 13,
        marginHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        borderColor: Colors.primary2,
        borderWidth: 1,
    }
})