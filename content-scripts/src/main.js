import input_method_box_main from "./Component/box_main.js";
export default () => {
  let URLObj = new URL(location.href);
  console.log(URLObj);
  input_method_box_main();
};
