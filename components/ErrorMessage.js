import { Text } from "react-native";

function ErrorMessage({ error }) {
  return error && <Text style={{ color: "red" }}>{error}</Text>;
}

export default ErrorMessage;
