import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../constants/colors";

function DropDownMenu( {value, data, addCategoryHandler} ) {
 // console.log("data", data);
  const formattedData = data.map((item) => ({
      label: item, 
      value: item 
  }))
    return (
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={formattedData}
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={value}
        onChange={addCategoryHandler}
       />
    )
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
})