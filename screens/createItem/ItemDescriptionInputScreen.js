import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/colors";
import InputField from "../../components/authentication/InputField";
import { useState } from "react";
import { useUser } from "../../components/authentication/useUser.js";
import DropDownMenu from "../../components/DropDownMenu.js";
import Categories, {
    Conditions,
    Colors as ColorsList,
} from "../../constants/itemCategories.js";
import PrimaryButton from "../../components/PrimaryButton";
import { addItem } from "../../services/apiItems.js";
import ErrorMessage from "../../components/ErrorMessage.js";
import ColorSwitch from "../../components/ColorSwitch.js";
import ColorCircle from "../../components/icons/ColorCircle.js";
import { updateUserData } from "../../services/apiAuth.js";
import { getSubcategoryDetails } from "../../services/apiItemConvert.js";

function ItemDescriptionInputScreen() {
    const route = useRoute();
    const { title, description, category, avatar, method } = route.params;
    const [size, setSize] = useState();
    const [weight, setWeight] = useState();
    const [fabric, setFabric] = useState("");
    const [material, setMaterial] = useState("");
    const [subcategory, setSubcategory] = useState();
    const [condition, setCondition] = useState();
    const [length, setLength] = useState();
    const [selectedColor, setSelectedColor] = useState("");
    const [inputError, setInputError] = useState(null);
    const [subcategoryDetails, setSubcategoryDetails] = useState();

    const navigation = useNavigation();

    let fields = [];
    let sizeList = [];

    const {
        user: {
            id: userId,
            user_metadata: {
                coins,
                totalWeight,
                totalLitres,
                totalCarbon,
                itemsSwapped,
            },
        },
    } = useUser();

    switch (category) {
        case "Clothing":
            fields = Categories.Clothing.fields;
            sizeList = Categories.Clothing.size;
            break;
        case "Shoes":
            fields = Categories.Shoes.fields;
            sizeList = Categories.Shoes.size;
            break;
        case "Accessories":
            fields = Categories.Accessories.fields;
            break;
    }

    const submitHandler = async () => {
        if (
            !subcategory ||
            !weight ||
            !condition ||
            !selectedColor ||
            (category !== "Accessories" ? !size || !fabric : !material) ||
            (category === "Shoes" && !length)
        ) {
            setInputError("Missing inputs");
        } else {
            // Add item before retrieving subcategory details
            addItem({
                item: {
                    userId,
                    category,
                    image: avatar,
                    title,
                    description,
                    method,
                },
                itemDetails: {
                    subcategory: subcategory.value,
                    ...(category !== "Accessories" && { size: size.value }),
                    weight,
                    ...(category === "Accessories" ? { material } : { fabric }),
                    condition: condition.value,
                    color: selectedColor,
                    ...(category === "Shoes" && { length }),
                },
            });
    
            try {
                const itemConversion = await getSubcategoryDetails({
                    item: subcategory.value,
                });
                setSubcategoryDetails(itemConversion);
    
                // Once details are retrieved, perform calculations
                console.log("itemconversion: ", itemConversion.carbon);
                const litresSaved = totalLitres + itemConversion.litres;

                let carbonSaved = totalCarbon;
    
                if (itemConversion.scalable === "true") {
                    carbonSaved += itemConversion.carbon * weight;
                } else {
                    carbonSaved += itemConversion.carbon;
                }
    
                const weightSaved = totalWeight + parseFloat(weight);
                console.log("totalWeight: ", totalWeight);
                console.log("weight: ", weight);
                console.log("Weight saved: ", weightSaved);

                const itemsSaved = itemsSwapped + 1;
                const newCoins = coins + 1;
                console.log(newCoins);
                console.log(weightSaved.toFixed(2), itemsSaved, carbonSaved, litresSaved);
    
                // Update user data after calculations
                await updateUserData({
                    newCoins,
                    totalLitres: litresSaved,
                    totalCarbon: carbonSaved,
                    totalWeight: parseFloat(weightSaved.toFixed(2)),
                    itemsSwapped: itemsSaved,
                });
    
                // Navigate to Profile after update
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "InApp",
                        },
                    ],
                });
    
            } catch (error) {
                console.error("Error fetching subcategory details:", error);
                setSubcategoryDetails(null);
            }
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Image style={styles.image} source={{ uri: avatar }} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.textStyle}>Subcategory</Text>
                <DropDownMenu
                    value={subcategory}
                    category={category}
                    addCategoryHandler={setSubcategory}
                    dropDownStyle={styles.dropDownStyle}
                />
            </View>
            {/* <View style={styles.rowContainer}> */}
            <View style={styles.input}>
                <InputField
                    text="Weight(kg)"
                    textStyle={styles.inputTextStyle}
                    containerStyle={styles.inputField}
                    placeholder="1.5"
                    inputStyle={styles.text}
                    onChangeText={setWeight}
                    value={weight}
                    secureTextEntry={false}
                />
            </View>
            {/* </View> */}

            <View style={styles.row}>
                <Text style={styles.textStyle}>Condition</Text>
                <DropDownMenu
                    value={condition}
                    data={Conditions}
                    addCategoryHandler={setCondition}
                    dropDownStyle={styles.dropDownStyle}
                />
            </View>
            <View style={styles.input}>
                <InputField
                    text={
                        fields[0].charAt(0).toUpperCase() + fields[0].slice(1)
                    }
                    textStyle={styles.inputTextStyle}
                    containerStyle={styles.inputField}
                    placeholder="made of"
                    inputStyle={styles.text}
                    onChangeText={
                        fields[0] == "fabric" ? setFabric : setMaterial
                    }
                    value={fields[0] === "fabric" ? fabric : material}
                    secureTextEntry={false}
                />
            </View>
            {category == "Shoes" && (
                <View style={styles.input}>
                    <InputField
                        text="Length"
                        textStyle={styles.inputTextStyle}
                        containerStyle={styles.inputField}
                        placeholder="short"
                        inputStyle={styles.text}
                        onChangeText={setLength}
                        value={length}
                        secureTextEntry={false}
                    />
                </View>
            )}
            {category != "Accessories" && (
                <View style={styles.row}>
                    <Text style={styles.textStyle}>Size</Text>
                    <DropDownMenu
                        value={size}
                        data={sizeList}
                        addCategoryHandler={setSize}
                        dropDownStyle={styles.dropDownStyle}
                    />
                </View>
            )}
            <Text style={styles.colorStyle}>Color</Text>
            <FlatList
                data={ColorsList}
                numColumns={7}
                renderItem={({ item }) => (
                    <>
                        {/* <Text>{item.hex}</Text> */}
                        <ColorSwitch
                            color={item.hex}
                            isSelected={selectedColor === item.hex}
                            onPress={setSelectedColor}
                        />
                    </>
                )}
                keyExtractor={(item) => item.name}
            />
            <View style={styles.error}>
                <ErrorMessage error={inputError} />
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    title={"UPLOAD"}
                    style={styles.button}
                    onPress={submitHandler}
                />
            </View>
        </View>
    );
}

export default ItemDescriptionInputScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 40,
        gap: 10,
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
        height: 70,
        width: 230,
    },
    titleContainer: {
        flexDirection: "row",
        gap: 12,
        alignContent: "center",
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
    inputField: {
        height: 37,
        marginHorizontal: 16,
        borderRadius: 10,
        borderColor: Colors.primary2,
        borderWidth: 1,
        width: 200,
        paddingHorizontal: 13,
        justifyContent: "center",
    },
    input: {
        flexDirection: "row",
        //  paddingLeft: 16,
    },
    textStyle: {
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary1,
        width: 100,
    },
    inputTextStyle: {
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary1,
        marginTop: 7,
        marginLeft: 22,
        width: 100,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 22,
    },
    rowContainer: {
        flexDirection: "row",
    },
    button: {
        width: 141,
        height: 49,
    },
    buttonContainer: {
        alignSelf: "flex-end",
        paddingBottom: 48,
        paddingRight: 20,
    },
    error: {
        height: 20,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 100 / 2,
    },
    colorStyle: {
        alignSelf: "flex-start",
        marginLeft: 37,
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary1,
    },
});
