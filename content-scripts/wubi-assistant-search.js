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

(async () => {
  let { getParameterValue } = await import(
    chrome.runtime.getURL("/third_party/jingjingxyk/frontend-utils/utils.js")
  );
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
  /*
    回车，ASCII码13
    换行，ASCII码10
    空格，ASCII码32

    Return    =   CR   =   13   =   '\x0d'
    NewLine   =   LF   =   10   =   '\x0a'

     */
})();
