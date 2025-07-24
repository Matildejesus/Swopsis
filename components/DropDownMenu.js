import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/colors";
import { getItemsNames } from "../services/apiItemConvert";
import { useEffect, useState } from "react";

function DropDownMenu({
    value,
    category,
    data,
    addCategoryHandler,
    dropDownStyle,
    title
}) {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false); 

    useEffect(() => {
        if (category && !data) {
            const fetchData = async () => {
                try {
                    const items = await getItemsNames({ category });
                    setItems(items);
                } catch (error) {
                    console.error("Error fetching items:", error);
                }
            };
            fetchData();
        } else if (data) {
            setItems(data);
        }
    }, [category, data]);

    const formattedData = items.map((item) => ({
        label: item,
        value: item,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{title}</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={formattedData}
                setOpen={setOpen}
                setValue={(callback) => {
                    const newValue = callback(value);
                    addCategoryHandler(newValue);
                }}
                setItems={setItems}
                style={[ styles.dropdown, dropDownStyle && dropDownStyle]}
                textStyle={styles.textStyle}
                placeholder="Select item"
                dropDownContainerStyle={styles.dropDownContainerStyle}
                showTickIcon={true}
                modalProps={{
                    animationType: "fade"
                }}
                listMode="MODAL" 
            />
        </View>
    );
}


export default DropDownMenu;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: 13,
    },
    dropdown: {
        width: 243,
        borderRadius: 10,
        alignSelf: "center",
        borderColor: Colors.primary2,
    },
    placeholderStyle: {
        fontSize: 15,
        fontFamily: "Raleway_500Medium",
        color: Colors.primary2,
    },
    textStyle: {
        fontSize: 15,
        fontFamily: "Raleway_500Medium",
        color: Colors.primary2,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    label: {
        color: Colors.primary1,
        fontSize: 15,
        fontFamily: "Raleway_700Bold",
    }
});
