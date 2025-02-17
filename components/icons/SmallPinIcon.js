import Svg, { G, Path, Ellipse, Defs, Filter } from "react-native-svg";

function SmallPinIcon() {
    return (
        <Svg
            width="28"
            height="35"
            viewBox="0 0 28 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G filter="url(#filter0_d_1004_3252)">
                <Path
                    d="M23 9.29487C23 16.1984 17.8571 16.6667 14 25C10.1429 16.6667 5 16.1984 5 9.29487C5 2.39131 9.02944 0 14 0C18.9706 0 23 2.39131 23 9.29487Z"
                    fill="#8E0040"
                />
                <Ellipse
                    cx="14"
                    cy="8.97436"
                    rx="4.5"
                    ry="4.48718"
                    fill="#004A0E"
                />
            </G>
        </Svg>
    );
}

export default SmallPinIcon;
