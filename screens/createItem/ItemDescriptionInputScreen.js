import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import InputField from "../../components/authentication/InputField";
import { useState } from "react";
import { useUser } from "../../components/authentication/useUser.js";
import DropDownMenu from "../../components/DropDownMenu.js";
import Categories, { Conditions } from "../../constants/itemCategories.js";
import PrimaryButton from "../../components/PrimaryButton";
import { addItem } from "../../services/apiItems.js";
import ErrorMessage from "../../components/ErrorMessage.js";

function ItemDescriptionInputScreen() {
    const route = useRoute();
    const {title, description, category, avatar, method} = route.params;
    const [size, setSize] = useState();
    const [weight, setWeight] = useState();
    const [fabric, setFabric] = useState("");
    const [material, setMaterial] = useState("");
    const [subcategory, setSubcategory] = useState();
    const [condition, setCondition] = useState();
    const [length, setLength] = useState();
    const [color, setColor] = useState();
    const [inputError, setInputError] = useState(null);

    const navigation = useNavigation();

    let fields = [];
    let subcategories = [];
    let sizeList = [];

    const {
        user: {
            id: userId,
        },
    } = useUser();

    switch (category) {
        case "Clothing":
            fields = Categories.Clothing.fields;
            subcategories = Categories.Clothing.subcategories;
            sizeList = Categories.Clothing.size;
            break;
        case "Shoes":
            fields = Categories.Shoes.fields;
            subcategories = Categories.Shoes.subcategories;
            sizeList = Categories.Shoes.size;
            break;
        case "Accessories":
            fields = Categories.Accessories.fields;
            subcategories = Categories.Accessories.subcategories;
            break;
    }


    const submitHandler = () => {
        console.log("submitting!!!");
        if (!subcategory || !weight || !condition || !color || (category != "Accessories" ? (!size || !fabric) : !material) || (category == "Shoes" && !length)) {
            setInputError("Missing inputs");
            console.log(inputError);
        } else {
            addItem({ 
                item: {
                    userId, category, image: avatar, title, description, method 
                },
                itemDetails: {
                    subcategory: subcategory.value, 
                    ...(category != "Accessories" && {size}), 
                    weight, 
                    ...(category == "Accessories" ? {material} : {fabric}), 
                    ...(category == "Shoes" && {length}), 
                    condition: condition.value, 
                    color
                }
            });

            navigation.navigate("Profile"); 
        }
    }

    return (
        <View style={styles.container}> 
            <View style={styles.titleContainer}> 
            <Image  style={styles.image} source={{ uri: avatar }} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View> 
            <View style={styles.row}>
		        <Text style={styles.textStyle}>Subcategory</Text>
                <DropDownMenu value={subcategory} data={subcategories} addCategoryHandler={setSubcategory} dropDownStyle={styles.dropDownStyle}/>
	        </View>
            {category != "Accessories" && 
            <View style={styles.row}>
                <Text style={styles.textStyle}>Size</Text>
                <DropDownMenu value={size} data={category == "Clothing" ? Categories.Clothing.size : Categories.Shoes.size} addCategoryHandler={setSize} dropDownStyle={styles.dropDownStyle}/>
            </View>
            }
            <View style={styles.input}>
                <InputField 
                    text="Weight(kg)"
                    textStyle={styles.textStyle}
                    containerStyle={styles.titleField} 
                    placeholder="1.5" 
                    inputStyle={styles.text}
                    onChangeText={setWeight}
                    value={weight}
                    secureTextEntry={false}
                />
            </View>
            <View style={styles.row}>
		        <Text style={styles.textStyle}>Condition</Text>
                <DropDownMenu value={condition} data={Conditions} addCategoryHandler={setCondition}  dropDownStyle={styles.dropDownStyle}/>
	        </View>
            <View style={styles.input}>
                <InputField 
                    text={fields[0]}
                    textStyle={styles.textStyle}
                    containerStyle={styles.titleField} 
                    placeholder= "made of" 
                    inputStyle={styles.text}
                    onChangeText={fields[0] == "fabric" ? setFabric : setMaterial}
                    value={fields[0] === "fabric" ? fabric : material}
                    secureTextEntry={false}
                />
            </View>
            {category == "Shoes" && 
                <View style={styles.input}>
                    <InputField 
                        text="Length"
                        textStyle={styles.textStyle}
                        containerStyle={styles.titleField} 
                        placeholder="short" 
                        inputStyle={styles.text}
                        onChangeText={setLength}
                        value={length}
                        secureTextEntry={false}
                    />
                </View>
            }
            <View style={styles.input}>
                <InputField 
                    text="Color"
                    textStyle={styles.textStyle}
                    containerStyle={styles.titleField} 
                    placeholder="red" 
                    inputStyle={styles.text}
                    onChangeText={setColor}
                    value={color}
                    secureTextEntry={false}
                />
            </View>
            <View style={styles.error}>
                <ErrorMessage error={inputError} />
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton title={"NEXT"} style={styles.button} onPress={submitHandler}/>
            </View>
        </View>
    )
}

export default ItemDescriptionInputScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 40,
       // gap: 30,
    },
    image: {
        width: 95,
        height: 95,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary2,
    },
    title: {
        fontSize: 20,
        fontFamily: "InterBold",
        color: Colors.primary2,
    },
    description: {
        fontFamily: "RalewayRegular",
        fontSize: 15,
        color: Colors.primary2,
    }, 
    titleContainer: {
        flexDirection: "row",
        gap: 12,
        paddingRight: 40,
    },
    textContainer: {
        marginTop: 8,
        flexDirection: "column",
        gap: 11,
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
        width: 128,
        paddingHorizontal: 13,
    },
    input: {
        flexDirection: "row",
    },
    textStyle: {
        marginTop: 10,
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary1,
       // marginRight: 72,
    }, 
    row: {
        flexDirection: "row",
    },
    dropDownStyle: {
        margin: 16,
        width: 130,
        height: 37,
        borderRadius: 10,
        justifyContent: "center",
        borderColor: Colors.primary2,
        borderWidth: 1,
        paddingHorizontal: 13,
      },
      button: {
        width: 141,
        height: 49,
    },
    buttonContainer: {
        alignSelf: "flex-end",
        paddingRight: 20,
    },
    error: {
        height: 30,
    }
})