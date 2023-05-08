function send(keyword, callback) {
    let data = {
        action: "get_keyword_code_meta",
        content: {
            keyword: keyword,
        },
        namespace: "wubi-online-input-method",
    }

    //test
    import('./socket.js').then((x) => {
        x.sender(data,(response)=>{
            console.log('接收到数据',response)
           callback(JSON.parse(response))
        })
    });


    return ;
    if (window.wubi_online_runtime_mode !== 'native') {
        chrome.runtime.sendMessage(
            data
            ,
            function (response) {
                callback(response);
            }
        );
    } else {
        //非扩展环境下使用
        import('./../../common.js').then((x) => {

            let server_url = null;
            if (window.wubi_online_method_server_url) {
                server_url = window.wubi_online_method_server_url;
            } else {
                server_url = 'http://localhost:9502/api/query';
            }
            x.postData(server_url, data).then((response) => {
                callback(response)
            });
        });

    }

}

export {send};
