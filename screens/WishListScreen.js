import { StyleSheet, Text, View } from "react-native";

function WishList() {
    return (
        <View style={styles.container}>
            <Text>This the wishlist.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
