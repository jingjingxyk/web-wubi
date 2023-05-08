

//浏览器控制台执行代码
(() => {
    let script = document.createElement("script");
    script.setAttribute(
        "src",
        "http:/localhost:8000/content-scripts/app-web.js"
    ),
        script.setAttribute("type", "module"),
        //script.setAttribute("type", "application/javascript"),
        script.setAttribute("charset", "utf-8"),
        document.body.appendChild(script);

})();


// 单行如下，浏览器新建一个空白书签，把下面这段复制到书签地址栏

javascript:(()=>{let script=document.createElement("script");script.setAttribute("src", "http://localhost:8000/content-scripts/app-web.js"),script.setAttribute("type", "module"),script.setAttribute("charset", "utf-8"),document.body.appendChild(script);})();



// 保存为书签使用 (把多行空白字符去掉，变成一行即可）


//一些站点有CSP （Content-Security-Policy） 限制，那么就只能使用扩展的方式  (站点被解除CSP的除外） ： 解除CSP 也很简单，就是剥离 http 响应头



