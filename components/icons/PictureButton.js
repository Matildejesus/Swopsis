import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

function PictureButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <Path
          d="M18.4519 0C18.2274 0 18.0029 0.17958 17.8682 0.404055L13.6481 8.53006C13.5583 8.75453 13.3338 8.93411 13.0645 8.93411H6.73426C3.00797 8.93411 0 11.9421 0 15.6684V35.4671C0 35.6916 0.17958 35.8711 0.404055 35.8711H35.4671C35.6916 35.8711 35.8711 35.6916 35.8711 35.4671V9.38306C35.8711 9.11369 35.6916 8.97901 35.4671 8.97901H31.8306C31.6061 8.97901 31.3816 8.79943 31.247 8.57495L27.0268 0.44895C26.8921 0.224475 26.7126 0.044895 26.4432 0.044895H18.3172L18.4519 0ZM6.82405 13.4685C8.08111 13.4685 9.0688 14.4562 9.0688 15.7133C9.0688 16.9703 8.08111 17.958 6.82405 17.958C5.56699 17.958 4.57929 16.9703 4.57929 15.7133C4.57929 14.4562 5.56699 13.4685 6.82405 13.4685ZM22.5373 13.4685C27.4758 13.4685 31.5163 17.5091 31.5163 22.4475C31.5163 27.386 27.4758 31.4265 22.5373 31.4265C17.5989 31.4265 13.5583 27.386 13.5583 22.4475C13.5583 17.5091 17.5989 13.4685 22.5373 13.4685ZM22.5373 17.958C20.0681 17.958 18.0478 19.9783 18.0478 22.4475C18.0478 24.9168 20.0681 26.937 22.5373 26.937C25.0065 26.937 27.0268 24.9168 27.0268 22.4475C27.0268 19.9783 25.0065 17.958 22.5373 17.958Z"
          fill="#357738"
        />
      </Svg>
    </TouchableOpacity>
  );
}
export default PictureButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 78,
    left: 76,
  },
});
