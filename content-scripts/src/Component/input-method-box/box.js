let boxInit = () => {
  let link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.href = chrome.runtime.getURL("/content-scripts/src/Bundle/css/app.css");
  document.querySelector("head").appendChild(link);

  let box = document.createElement("div");
  box.setAttribute("id", "web-wubi-input-method-box");
  let wrap = document.createElement("div");
  wrap.classList.add("wrap");
  let main = document.createElement("div");
  main.classList.add("main");
  let input_method_box = document.createElement("div");
  input_method_box.classList.add("input_method_box");
  input_method_box.innerText = "⌨︎";
  input_method_box.style.fontSize = "62px";
  main.appendChild(input_method_box);
  wrap.appendChild(main);
  box.appendChild(wrap);
  document.querySelector("body").appendChild(box);
};

let boxBindEvent = () => {
  let input_method_box = document.querySelector(
    "#web-wubi-input-method-box .input_method_box"
  );
  input_method_box.addEventListener("click", (event) => {
    let state = event.target.getAttribute("data-switch");
    if (state === "off") {
      event.target.setAttribute("data-switch", "on");
    } else if (state === "on") {
      event.target.setAttribute("data-switch", "off");
    } else {
      event.target.setAttribute("data-switch", "on");
    }
  });
};

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

let input = () => {
  let keyword = [];
  let capital = 0;
  document.addEventListener(
    "keydown",
    (event) => {
      let str =
        "KeyboardEvent: key='" + event.key + "' | code='" + event.code + "'";
      console.log(str);
      console.log(event.target, event.target.nodeType, event.target.nodeName);

      //只处理 文本输入元素标签  input 和 textarea
      // 特殊情况： 比如可编辑模式 和 超级模式 ：https://www.cnblogs.com/jingjingxyk/p/16575750.html
      // contenteditable

      if (
        event.target.nodeName === "TEXTAREA" ||
        event.target.nodeName === "INPUT" ||
        event.target.getAttribute("contenteditable") === true
      ) {
        console.log("捕获 输入光标 位置");
        console.log("展示输入法图标 和 输入法候选项");
      } else {
        //
        return;
      }

      if (event.defaultPrevented) {
        return; // 如果事件已经在进行中，则不做任何事。
      }

      let pattern = /^\w$/;
      let re = null;
      let input_word = "";
      re = pattern.exec(event.key);
      if (re) {
        input_word = re.input;
        console.log(re, input_word);
        keyword.push(input_word);
        console.log(keyword);

        //去查表
        send(JSON.stringify(keyword), (response) => {
          //查询结果
          console.log(response);
        });
      }
      if (keyword.length > 4) {
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
          keyword = [];
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
};

/*
  回车，ASCII码13
  换行，ASCII码10
  空格，ASCII码32

  Return    =   CR   =   13   =   '\x0d'
  NewLine   =   LF   =   10   =   '\x0a'

   */

export default () => {
  boxInit();
  boxBindEvent();
  input();
};
