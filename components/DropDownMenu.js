import { StyleSheet } from "react-native";
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
}) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Run only if category is provided and data is not directly passed
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
            // If data is directly provided, use it
            setItems(data);
        }
    }, [category, data]);

    const formattedData = items.map((item) => ({
        label: item,
        value: item,
    }));
    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(callback) => {
                const newValue = callback(value);
                addCategoryHandler(newValue);
            }}
            setItems={setItems}
            style={dropDownStyle ? dropDownStyle : styles.dropdown}
            textStyle={styles.textStyle}
            placeholder="Select item"
            dropDownContainerStyle={styles.dropDownContainerStyle}
            listItemLabelStyle={styles.listItemLabelStyle}
            showTickIcon={true}
            modalProps={{
                animationType: "fade"
            }}
            listMode="MODAL" 
            />
    );
}

export default DropDownMenu;

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        width: 201,
        height: 37,
        borderRadius: 10,
        justifyContent: "center",
        borderColor: Colors.primary2,
        borderWidth: 1,
        paddingHorizontal: 13,
    },
    placeholderStyle: {
        fontSize: 15,
        fontFamily: "RalewayMedium",
        color: Colors.primary2,
    },
    selectedTextStyle: {
        fontSize: 15,
        fontFamily: "RalewayBold",
        color: Colors.primary2,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
