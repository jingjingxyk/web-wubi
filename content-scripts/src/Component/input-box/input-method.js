import {input_method_core} from "./input-method-core.js";

let bindinputMethod = () => {
    document.addEventListener(
        "keydown",
        (event) => {
            let str =
                "KeyboardEvent: key='" + event.key + "' | code='" + event.code + "'";
            console.log(str);
            //console.log(event.target, event.target.nodeType, event.target.nodeName);

            // 只处理 文本输入元素标签  input 和 textarea
            // 特殊情况： 比如可编辑模式 和 超级模式 ：https://www.cnblogs.com/jingjingxyk/p/16575750.html
            // contenteditable

            if (
                event.target.nodeName === "TEXTAREA" ||
                event.target.nodeName === "INPUT" ||
                event.target.getAttribute("contenteditable") === true
            ) {
                //console.log("捕获 输入光标 位置 ； 展示输入选项框 和 输入候选项");
                input_method_core(event.key, event.code)
            }

            // event.defaultPrevented
            // 如果事件已经在进行中，则不做任何事。

        },
        true
    );
};


export {
    bindinputMethod
}
