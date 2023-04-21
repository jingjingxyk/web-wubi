let boxInit = ()=>{
    let link = document.createElement("link");
    link.setAttribute('rel','stylesheet')
    link.href= chrome.runtime.getURL("/content-scripts/src/Bundle/css/app.css")
    document.querySelector('head').appendChild(link)

    let box= document.createElement("div");
    box.setAttribute('id',"web-wubi-input-method-box")
    let wrap = document.createElement("div");
    wrap.classList.add('wrap')
    let main = document.createElement("div");
    main.classList.add('main')
    let input_method_box = document.createElement("div");
    input_method_box.classList.add('input_method_box')
    input_method_box.innerText='⌨︎'
    input_method_box.style.fontSize="62px"
    main.appendChild(input_method_box)
    wrap.appendChild(main)
    box.appendChild(wrap)
    document.querySelector('body').appendChild(box)
}

let boxBindEvent=()=>{
    let input_method_box = document.querySelector('#web-wubi-input-method-box .input_method_box')
    input_method_box.addEventListener('click',(event)=>{
        let state=event.target.getAttribute('data-switch')
        if(state === "off"){
            event.target.setAttribute('data-switch',"on")
        } else if (state === "on") {
            event.target.setAttribute('data-switch',"off")
        } else {
            event.target.setAttribute('data-switch',"on")
        }
    })
}


function send(keyword, callback) {
    chrome.runtime.sendMessage(
        {
            action: "get_keyword_code_meta",
            content: {
                keyword: keyword,
            },
            namespace: "wubi-online-input-method",
        },
        function (response) {
            console.log(response);
            callback(response);
        }
    );
}

let input=()=>{

    let keyword = [];
    let capital = 0;
    document.addEventListener(
        "keydown",
        (event) => {
            if (event.defaultPrevented) {
                return; // 如果事件已经在进行中，则不做任何事。
            }

            let str =
                "KeyboardEvent: key='" + event.key + "' | code='" + event.code + "'";
            let el = document.createElement("span");
            el.innerHTML = str + "<br/>";
            let parent = document.body;
            let first_element = parent.firstElementChild;
            parent.insertBefore(el, first_element);
            // //let code  = String.fromCharCode(event.code);

            let pattern = /^\w$/;
            let re = null;
            let input_word = "";
            re = pattern.exec(event.key);
            if (re) {
                input_word = re[1];
                console.log(re, input_word);
                console.log(keyword);
                keyword.push(input_word);
                let queryString = keyword.join("");
                //去查表
                send(queryString.toLowerCase(), (response) => {
                    //查询结果
                    console.log(response);
                });
                keyword = [];
            }

            switch (event.key) {
                case "ArrowUp":
                    // 按“↑”方向键时要做的事。
                    break;
                case "ArrowDown":
                    // 按“↓”方向键时要做的事。
                    break;
                case "ArrowLeft":
                    // 按“←”方向键时要做的事。
                    break;
                case "ArrowRight":
                    // 按“→”方向键时要做的事。
                    break;
                case "Enter":
                    // 按“回车”键时要做的事。
                    break;
                case "Escape":
                    // 按“ESC”键时要做的事。
                    break;
                default:
                    return; // 什么都没按就退出吧。
            }
            // 取消默认动作，从而避免处理两次。
            event.preventDefault();
            return;
        },
        true
    );
}


export default ()=>{
    boxInit()
    boxBindEvent()
    input()
}