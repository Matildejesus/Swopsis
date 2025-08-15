import { View, Image, Text, StyleSheet } from "react-native";
// import { StarRatingDisplay } from "react-native-star-rating-widget";
import { AirbnbRating } from "react-native-ratings";
import Colors from "../../constants/colors";

function ItemReviewWidget({ review }) {
    const { name, avatar, text, rating } = review;
    const currentDate = Date.now();

    return (
        <View style={styles.container}>
            <View style={styles.reviewUser}>
                <View style={styles.avatarContainer}>{avatar}</View>
                <View style={styles.column2}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.reviewText}>{text}</Text>
                </View>
            </View>
            <View style={styles.ratingContainer}>
                <Text style={styles.daysAgoText}>{"4 days ago"}</Text>
                {/* <StarRatingDisplay
                    rating={rating}
                    starSize={18}
                    enableHalfStar={true}
                /> */}
                <AirbnbRating
                    count={5}
                    defaultRating={rating}
                    size={18}
                    showRating={false}
                    isDisabled={true} 
                />
            </View>
        </View>
    );
}

export default ItemReviewWidget;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 10,
        marginBottom: 25,
    },
    reviewUser: {
        flexDirection: "row",
        // width: "80%",
    },
    name: {
        fontFamily: "Raleway_700Bold",
        fontSize: 20,
        color: Colors.primary2,
    },
    avatarContainer: {
        marginRight: 16,
    },
    reviewText: {
        fontFamily: "RalewayRegular",
        fontSize: 15,
        color: Colors.primary2,
        width: 208,
    },
    ratingContainer: {
        flexDirection: "row",
        gap: 70,
    },
    daysAgoText: {
        fontFamily: "RalewayRegular",
        fontSize: 15,
        color: Colors.primary2,
    },
});
