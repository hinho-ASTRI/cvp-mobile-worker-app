import { TouchableWithoutFeedback, Keyboard } from "react-native";

const DismissKeyboard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
