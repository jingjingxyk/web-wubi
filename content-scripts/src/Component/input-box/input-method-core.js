/*
  ASCII INFO

  回车，ASCII码13
  换行，ASCII码10
  空格，ASCII码32

  Return    =   CR   =   13   =   '\x0d'
  NewLine   =   LF   =   10   =   '\x0a'

*/

import { show_input_box_ui } from "./input-method-ui.js";
import { send } from "../message/send.js";

let keyword = [];
let input_method_core = (key, code) => {
  //KeyboardEvent: key='Process' | code='KeyZ'
  if (key === "Process") {
    console.log(
      "检测到启用了其他输入法，要使用本输入法，请切换到 默认的英文输入法 "
    );
    return;
  }

  // help 模式
  // z 键 模式
  // 回车上屏   KeyboardEvent: key='Enter'  | code='Enter'
  // 空格上屏   KeyboardEvent:  key=' '      | code='Space'
  // Esc      KeyboardEvent:  key='Escape' | code='Escape'
  //           KeyboardEvent: key='Shift' | code='ShiftLeft'
  //           KeyboardEvent: key='Shift' | code='ShiftLeft'
  // 退格      KeyboardEvent: key='Backspace' | code='Backspace'

  //字母处理模式
  let pattern = /^\w$/;
  let re = null;
  let input_word = "";
  re = pattern.exec(key);
  if (re) {
    input_word = re.input;
    keyword.push(input_word);
    console.log(keyword);
    //去查表
    send(JSON.stringify(keyword), (response) => {
      //查询结果
      console.log(response);
      // show_input_box_ui()
    });
    if (keyword.length > 4) {
      keyword = [];
    }
  }
  //其他处理
};
export { input_method_core };
