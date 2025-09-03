import Svg, { G, Path } from "react-native-svg";

function EventIcon() {
    return (
        <Svg fill="#8E0040" viewBox="0 0 24 24" width="40px" height="40px" stroke="#8E0040">
            <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
            <G id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier"> 
                <G> 
                    <Path d="M20,7.4v10.5c0,1.7-1.3,3-3,3H5.9c0,1.1,0.9,2,2,2H18c2.2,0,4-1.8,4-4V9.4C22,8.3,21.1,7.4,20,7.4z"></Path> 
                    <G> 
                        <Path d="M5,1.1v2H4c-1.1,0-2,0.9-2,2v12c0,1.1,0.9,2,2,2h12.2c1.1,0,2-0.9,2-2v-12c0-1.1-0.9-2-2-2h-1v-2h-2v2H7v-2 C7,1.1,5,1.1,5,1.1z M4,8.1h12.2v9H4V8.1z"></Path> 
                        <Path d="M13.7,16.3l-2.4-1.4L9,16.3l0.6-2.7l-2.1-1.8l2.8-0.2L11.4,9l1.1,2.5l2.8,0.3l-2.1,1.8L13.7,16.3z"></Path> 
                    </G> 
                </G>  
            </G>
        </Svg>
    )
}

export default EventIcon;