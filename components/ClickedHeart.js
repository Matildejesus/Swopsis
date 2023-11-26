import { TouchableOpacity } from "react-native";
import HeartIcon from "./icons/HeartIcon";
import { useState } from "react";
import FilledHeartIcon from "./icons/FilledHeartIcon";

function ClickedHeart() {
  const [isClicked, setIsClicked] = useState(false);

  function toggleHeart() {
    setIsClicked(!isClicked);
  }

  return (
    <TouchableOpacity onPress={toggleHeart}>
      {isClicked ? <FilledHeartIcon /> : <HeartIcon />}
    </TouchableOpacity>
  );
}

export default ClickedHeart;
