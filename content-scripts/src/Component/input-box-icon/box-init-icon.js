let boxInitIcon = () => {
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


export {
    boxInitIcon,
    boxBindEvent
}

