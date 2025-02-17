import Svg, { Defs, G, Path } from "react-native-svg";

function WarningIcon() {
    return (
        <Svg
            width="99px"
            height="99px"
            viewBox="0 0 200 200"
            data-name="Layer 1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
        >
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <G id="SVGRepo_iconCarrier">
                <Path
                    fill="#ffffff"
                    d="M180.77,164a11.28,11.28,0,0,1-10.82,8H30a11.33,11.33,0,0,1-9.81-17l70-121.16a11.32,11.32,0,0,1,19.62,0l70,121.16A11.15,11.15,0,0,1,180.77,164Z"
                />
                <Path
                    fill="#FFE6EA"
                    d="M180.77,164H36.07c-8.72,0-5.17-9.44-.81-17l68.3-118.3a11.2,11.2,0,0,1,6.25,5.1l70,121.16A11.15,11.15,0,0,1,180.77,164Z"
                />
                <Path
                    fill="#004A0E"
                    d="M101.69,139.57q-2.92-.07-5.84,0A4.72,4.72,0,0,1,91,135.15l-3.7-58.79a4.74,4.74,0,0,1,4.55-5q6.9-.25,13.81,0a4.74,4.74,0,0,1,4.55,5l-3.7,58.79A4.72,4.72,0,0,1,101.69,139.57Z"
                />
                <Path
                    fill="#004A0E"
                    d="M105.62,149.69a6.88,6.88,0,0,1-13.69,0c-0.27-3.54,2.8-6.66,6.84-6.66S105.88,146.15,105.62,149.69Z"
                />
                <Path
                    fill="none"
                    stroke="#004A0E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={6}
                    d="M20.23,154.92l70-121.16a11.33,11.33,0,0,1,19.63,0l70,121.16a11.33,11.33,0,0,1-9.81,17H30A11.33,11.33,0,0,1,20.23,154.92Z"
                />
            </G>
        </Svg>
    );
}

export default WarningIcon;
