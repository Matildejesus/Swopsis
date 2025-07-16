import { Rating } from "react-native-ratings";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

function ReviewCount() {
    const rating = [7, 8, 2, 5, 0];
    let progressList = [];
    const calculateProgressBar = () => {
        const maxNumber = Math.max(...rating);
        for (let i = 0; i < rating.length; i++) {
            progressList.push(rating[i] / maxNumber);
        }
    };
    calculateProgressBar();

    return (
        <View>
            {rating.map((rating, index) => {
                const stars = 5 - index;
                return (
                    <View style={styles.ratingContainer} key={index}>
                        <Text style={styles.text}>{stars}</Text>
                        {/* <StarRatingDisplay
                            maxStars={1}
                            rating={1}
                            starSize={18}
                        /> */}
                        <Rating
                            type='star'
                            ratingCount={1}
                            imageSize={18}
                            startingValue={1}
                            readonly={true}
                            tintColor="#ffffff" // Match your background
                            style={styles.singleStar}
                        />
                        <Progress.Bar
                            progress={progressList[index]}
                            width={130}
                            height={14}
                            color="#fcdd3a"
                            unfilledColor="#D9D9D9"
                            borderWidth={0}
                            marginVertical={4}
                        />
                        <Text style={styles.ratingText}>({rating})</Text>
                    </View>
                );
            })}
        </View>
    );
}

export default ReviewCount;

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: "row",
    },
    text: {
        color: "#fcdd3a",
        fontSize: 18,
        fontFamily: "RalewayBold",
    },
    ratingText: {
        marginLeft: 10,
        fontFamily: "RalewayBold",
        fontSize: 16,
    },
});
