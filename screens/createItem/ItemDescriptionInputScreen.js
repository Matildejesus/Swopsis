import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from "react-native";
import InputField from "../../components/authentication/InputField.js";
import { useState } from "react";
import DropDownMenu from "../../components/DropDownMenu.js";
import Categories, {
    Conditions,
    Colors as ColorsList,
} from "../../constants/itemCategories.js";
import MainButton from "../../components/MainButton.js";
import ErrorMessage from "../../components/ErrorMessage.js";
import ColorSwitch from "../../components/ColorSwitch.js";
import CalendarModal from "../../components/CalendarModal.js";
import Colors from "../../constants/colors.js";
import { useAddItem } from "../../hooks/items/useAddItem.js";
import { getSubcategoryDetails } from "../../services/apiItemConvert.js";
import { useUser } from "../../hooks/auth/useUser.js";
import { useUpdateUserMetadata } from "../../hooks/auth/useUpdateUserMetadata.js";

function ItemDescriptionInputScreen() {
    const route = useRoute();
    const { title, category, avatar, method } = route.params;
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [unavailableDates, setUnavailableDates] = useState({});
    const [description, setDescription] = useState("");

    const navigation = useNavigation();
    const { addItem, isLoading: isAddingItem } = useAddItem();
    const { updateUserMetadata } = useUpdateUserMetadata();

    let fields = [];
    let sizeList = [];
    const { user: userData } = useUser();

    const user = userData?.user;

    const {
        group,
        coins,
        totalWeight,
        totalLitres,
        totalCarbon,
        itemsSwapped,
    } = user?.user_metadata || {};

    const userId = user?.id;

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

    const handleSaveDates = async (dates) => {
        setIsModalVisible(false);

        addItem({
            item: {
                userId,
                category,
                image: avatar,
                title,
                description,
                method,
                unavailableDates: dates,
                group
            },
            itemDetails: {
                subcategory: subcategory,
                ...(category !== "Accessories" && { size: size }),
                weight,
                ...(category === "Accessories" ? { material } : { fabric }),
                condition: condition,
                color: selectedColor,
                ...(category === "Shoes" && { length }),
            },
        });

        try {
            const itemConversion = await getSubcategoryDetails({
                item: subcategory,
            });
            setSubcategoryDetails(itemConversion);

            // Once details are retrieved, perform calculations
            const litresSaved = totalLitres + itemConversion.litres;

            let carbonSaved = totalCarbon;

            if (itemConversion.scalable === "true") {
                carbonSaved += itemConversion.carbon * weight;
            } else {
                carbonSaved += itemConversion.carbon;
            }

            const weightSaved = totalWeight + parseFloat(weight);

            const itemsSaved = itemsSwapped + 1;
            const newCoins = coins + 1;

            // Update user data after calculations
            await updateUserMetadata({
                newCoins,
                totalLitres: litresSaved,
                totalCarbon: carbonSaved,
                totalWeight: parseFloat(weightSaved.toFixed(2)),
                itemsSwapped: itemsSaved,
            });
            navigation.replace("InApp");
            
        } catch (error) {
            console.error("Error fetching subcategory details:", error);
            setSubcategoryDetails(null);
        }
    };

    const submitHandler = async () => {
        if (
            !subcategory ||
            !weight ||
            !description ||
            !condition ||
            !selectedColor ||
            (category !== "Accessories" ? !size || !fabric : !material) ||
            (category === "Shoes" && !length)
        ) {
            setInputError("Missing inputs.");
        } else if (isNaN(weight)) {
            setInputError("Weight must be in numbers.");
        }
        else {
            if (method == "loan") { 
                setIsModalVisible(true);

            } else {
                handleSaveDates();
            }
        }
    };
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Image style={styles.image} source={{ uri: avatar }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <DropDownMenu
                        value={subcategory}
                        category={category}
                        addCategoryHandler={setSubcategory}
                        dropDownStyle={styles.dropDownStyle}
                        title="Subcategory"
                    />
                </View>
                {/* <View style={styles.rowContainer}> */}
                <View style={styles.input}>
                    <InputField
                        text="Weight(kg)"
                        textStyle={styles.inputTextStyle}
                        containerStyle={styles.weightField}
                        placeholder="1.5"
                        inputStyle={styles.text}
                        onChangeText={setWeight}
                        value={weight}
                        secureTextEntry={false}
                    />
                    {category != "Accessories" && (
                    <DropDownMenu
                        value={size}
                        data={sizeList}
                        addCategoryHandler={setSize}
                        dropDownStyle={styles.sizeStyle}
                        title="Size"
                    />
                )}
                </View>
                <View style={{flexDirection: "row"}}>
                <DropDownMenu
                    value={condition}
                    data={Conditions}
                    addCategoryHandler={setCondition}
                    dropDownStyle={styles.conditionStyle}
                    title="Condition"
                />
                <InputField
                    text={fields[0] &&
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
                )}
                <Text style={styles.colorStyle}>Color</Text>
                <View style={{height: 90}}>
                    <FlatList
                        data={ColorsList}
                        numColumns={7}
                        renderItem={({ item }) => (
                            <ColorSwitch
                                color={item.hex}
                                isSelected={selectedColor === item.hex}
                                onPress={setSelectedColor}
                            />
                        )}
                        keyExtractor={(item) => item.name}
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
                <View style={styles.error}>
                    <ErrorMessage error={inputError} />
                </View>
                <View style={styles.buttonContainer}>
                    <MainButton
                        title={"UPLOAD"}
                        style={styles.button}
                        onPress={submitHandler}
                        variant="primary"
                    />
                </View>
                {method == "loan" && 
                <CalendarModal 
                    visible={isModalVisible}
                    onSave={handleSaveDates}
                    onBackdropPress={() => setIsModalVisible(false)}
                />}
            </View>
        </ScrollView>
    );
}

export default ItemDescriptionInputScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 30,
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
        fontFamily: "Raleway_400Regular",
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
    },
    text: {
        color: Colors.primary2,
        fontFamily: "InterRegular",
        fontSize: 15,
    },
    sizeStyle: {
        width: 110 ,
    },
    conditionStyle: {
        width: 140,
    },
    inputField: {
        width: 170,
        height: 50

    },
    weightField: {
        width: 110,
        height: 50,
    },
    input: {
        flexDirection: "row",
        //  paddingLeft: 16,
    },
    textStyle: {
        fontFamily: "Raleway_700Bold",
        fontSize: 15,
        color: Colors.primary1,
        width: 100,
    },
    inputTextStyle: {
        fontFamily: "Raleway_700Bold",
        fontSize: 15,
        color: Colors.primary1,
        paddingRight: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rowContainer: {
        flexDirection: "row",
    },
    button: {
        width: 141,
        height: 52,
        paddingTop: 10
    },
    buttonContainer: {
        alignSelf: "flex-end",
        paddingBottom: 20,
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
        fontFamily: "Raleway_700Bold",
        fontSize: 15,
        color: Colors.primary1,
    },
    descriptionField: {
        width: 243,
        height: 150,
    },
});
