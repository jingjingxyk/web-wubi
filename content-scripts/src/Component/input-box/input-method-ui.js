import { show_input_box_options } from "./input-method-options.js";
let show_input_box_ui = (key, code, keyword = []) => {
  //输入框 样式 参考 https://github.com/yanhuacuo/css/blob/master/01.png
  //show_input_box_options()
  //todo
  input_box_ui();
};

let input_box_ui = () => {
  let box = document.createElement("div");
  box.setAttribute("id", "web-wubi-intput-box");
  let wrap = document.createElement("div");
  wrap.setAttribute("class", "web-wubi-input-box-wrap");
  let main = document.createElement("div");
  main.setAttribute("class", "web-wubi-input-main");
  let ol = document.createElement("ol");

  main.appendChild(ol);
  wrap.appendChild(main);
  box.appendChild(wrap);
  document.body.appendChild(box);
};

//最好用双向绑定，操作模板
let show_input_method_options = (data) => {
  let ol = document.querySelector(".web-wubi-input-main ol");
  let html = "";
  if (data && data.options) {
    html += `<li>${data["keyword"]}</li>`;
    data.options.forEach((value, key, arr) => {
      html += `<li>${key + 1}  ${value}</li>`;
    });
  }
  ol.innerHTML = html;
};

export { show_input_box_ui, show_input_method_options };
