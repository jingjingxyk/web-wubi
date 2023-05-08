import { boxInitIcon, boxBindEvent } from "./input-box-icon/box-init-icon.js";
import { boxBindInputBox } from "./input-box/input-box.js";

export default () => {
  boxInitIcon();
  boxBindEvent();
  boxBindInputBox();
};
