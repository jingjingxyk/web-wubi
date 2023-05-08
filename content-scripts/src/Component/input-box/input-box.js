import { bindinputMethod } from "./input-method.js";
import { show_input_box_ui } from "./input-method-ui.js";

let boxBindInputBox = () => {
  bindinputMethod();
  show_input_box_ui();
};

export { boxBindInputBox };
