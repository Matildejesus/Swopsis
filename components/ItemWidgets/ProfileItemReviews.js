import { View, Text, ScrollView, Image, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/colors";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import ItemReviewWidget from "./ItemReviewWidget";
import AvatarTemplate from "../icons/AvatarTemplate";
import ReviewCount from "./ReviewCount";

function ProfileItemReviews() {
	const reviews = [
		{ id: 1, name: "Eden", avatar: <AvatarTemplate/>, text: "Lorem ipsum dolor sit amet consectetur.", rating: 4, date: new Date('2024-11-09T23:30:00') },
		{ id: 2, name: "Angelica", avatar: <AvatarTemplate/>, text: "Lorem ipsum dolor sit amet consectetur.", rating: 4, date: new Date('2024-11-09T23:00:00')},
		{ id: 3, name: "XXX", avatar: <AvatarTemplate/>, text: "Lorem ipsum dolor sit amet consectetur.", rating: 4, date: new Date('2024-11-08T23:30:00') },
		{ id: 4, name: "XXX", avatar: <AvatarTemplate/>, text: "Lorem ipsum dolor sit amet consectetur.", rating: 4 , date: new Date('2024-11-02T23:30:00')},
		{ id: 5, name: "XXX", avatar: <AvatarTemplate/>, text: "Lorem ipsum dolor sit amet consectetur.", rating: 4 , date: new Date('2024-11-02T23:30:00')}
	];

    return (
    <View style={styles.scrollView}>
		<View style={styles.row2}>
			<View style={styles.itemContainer}>
            <Image source={require("../../assets/images/jacket.png")} resizeMode="contain" style={styles.image3}/>
			</View>
			<View style={styles.column}>
				<Text style={styles.itemTitle}>
					{"Black Heels"}
				</Text>
                <View style={styles.rating}>
                    <StarRatingDisplay rating={3.5} starSize={18} enableHalfStar={true} starSpacing={2}/>
                </View>
			</View>
		</View>
		
		<FlatList
			style={styles.flatList}
      		data={reviews}
      		renderItem={({ item }) => (
				<ItemReviewWidget review={item} />  )}
      	keyExtractor={(item) => item.id.toString()}
      	showsVerticalScrollIndicator={true}
      	bounce={false}
    	/>
		<View style={styles.row11}>
			<ReviewCount />
		</View>
		
		
	</View>
    )
}

export default ProfileItemReviews;

const styles = StyleSheet.create({
    rating: {
        flexDirection: "row",
    },
	column: {
		width: 136,
		marginTop: 16,
		marginLeft: 15,
	},
	image3: {
		height: 100,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 14,
		marginHorizontal: 22,
	},
	row2: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 39,
		marginHorizontal: 41,
	},
	row11: {
		flexDirection: "row",
		marginBottom: 20,
		marginHorizontal: 73,
		marginTop: 20,
	},
	scrollView: {

		height: "80%",
		backgroundColor: "#FFFFFF",
		paddingTop: 17,
		
	},
	itemTitle: {
		color: Colors.primary2,
		fontSize: 20,
		marginBottom: 14,
		marginLeft: 8,
        fontFamily: "RalewayBold"
	},
	text9: {
		color: "#FFD400",
		fontSize: 18,
		marginRight: 7,
	},
	text10: {
		color: "#000000",
		fontSize: 16,
		flex: 1,
	},

	itemContainer: {
		width: 137,
		backgroundColor: "#FFFFFF",
		borderColor: Colors.primary2,
		borderRadius: 10,
		borderWidth: 1,
		paddingHorizontal: 16,
        alignItems: "center",
	},
});