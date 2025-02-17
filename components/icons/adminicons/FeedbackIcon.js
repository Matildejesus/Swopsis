import Svg, { Path, Rect } from "react-native-svg";

function FeedbackIcon() {
    return (
        <Svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Rect width="25" height="25" fill="#F25961" />
            <Path
                d="M5 7V16.375L6.875 14.5H8.75V8.875H14.375V7H5ZM10.625 10.75V18.25H18.125L20 20.125V10.75H10.625Z"
                fill="white"
            />
        </Svg>
    );
}

export default FeedbackIcon;
