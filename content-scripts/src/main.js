import input_method_box from "./Component/input-method-box/box.js"
export default ()=>{
    let URLObj = new URL(location.href);
    console.log(URLObj);
    input_method_box()
}