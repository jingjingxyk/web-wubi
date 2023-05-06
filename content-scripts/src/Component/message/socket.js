let sender = (data, callback) => {
    let socket = null;
    if (!window.wubi_online_runtime_socket) {
        socket = new WebSocket('ws://localhost:9502/websocket');
        window.wubi_online_runtime_socket = socket
        socket.onclose = function (event) {
            console.log("WebSocket is closed now.");
            window.wubi_online_runtime_socket = null;
        };

        // Connection opened
        socket.addEventListener('open', function (event) {
            socket.send('Hello Server!');
        });
        // Listen for messages
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
            callback(event.data)
        });

    } else {
        // Create WebSocket connection.
        socket = window.wubi_online_runtime_socket
    }
    let wait_flag = null;
    let event_loop = () => {
        let flag = 0;
        switch (socket.readyState) {
            case socket.CONNECTING: //0   正在链接中
                break;
            case socket.OPEN://1  已经链接并且可以通讯
                flag = 1;
                clearTimeout(wait_flag)
                socket.send(JSON.stringify(data));
                break;
            case socket.CLOSING://2  连接正在关闭
                clearTimeout(wait_flag)
                break;
            case socket.CLOSED://3  连接已关闭或者没有链接成功
                clearTimeout(wait_flag)
                break;
            default:
                break;
        }
        if (flag !== 1) {
            wait_flag = setTimeout(event_loop, 1000);
        }

    }
    if (socket.readyState === 1) {
        socket.send(JSON.stringify(data));
    } else {
        event_loop();
    }


}

export {
    sender
}