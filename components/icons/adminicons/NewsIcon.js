import Svg, { Defs, Image, Pattern, Rect, Use } from "react-native-svg";

function NewsIcon() {
    return (
        <Svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Rect width="25" height="25" rx="5" fill="#FFAD46" />
            <Rect
                x="3"
                y="3"
                width="20"
                height="20"
                fill="url(#pattern0_1380_2672)"
            />
            <Defs>
                <Pattern
                    id="pattern0_1380_2672"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <Use
                        href="#image0_1380_2672"
                        transform="scale(0.0208333)"
                    />
                </Pattern>
                <Image
                    id="image0_1380_2672"
                    width="48"
                    height="48"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABhUlEQVR4nO2ZP0oDQRSHByLYGsHCdnMJNdHKI+gF9ASKXiOFxhv4r7AwVnaSTsEuR0hS2FkqLPnkwYrjEsLuxJl9i/PBQMjs/uZ9JLs7O2NMJBKJqAfoALfABEjxRwqMgRug/ReFLwEXVMe51LCIQJXFf9NzLX4bPXRcBOQ/r4UrFwG5YLUwdhHwebcpS+oioAoTiQQGZZgo8E9/gfus1VJgYGUN6ihwYGUd1k3gE1i1slaAjzoJ9GfkPWgVOAFaQGK15oy8Zu4YOee0agGZsTZKh/+M0Sg66/UlIHRdJLLiu0UH8SkgPAHrJbLXgMcyA/gWEN6A3QK5Oy5veyaAwK+H15xcp4eaCSRwVCD3WLNAkstYlpb7LtEqMMydL/f516y1cn1DjQLP1rn7wLvVJ5/3rP6XEAKpg8SdTCPm9PezY4Isq0zQw8hFQJa4tXDpIrABTNFBu7RAJiHr81Vz5lS8tcHRq6jwqRS/0AaHJbIFXMvFFGCLaSTL6cDmwoVHIpGI8c0X3cSUlXy4764AAAAASUVORK5CYII="
                />
            </Defs>
        </Svg>
    );
}

export default NewsIcon;
