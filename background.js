chrome.runtime.onInstalled.addListener( (details) => {
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(request, sender,JSON.stringify(request));
    //查询码表返回数据
    sendResponse(request)
    return
    let url = 'http://127.0.0.1:9502/api/query'
    let result = await postData(url, request)
    sendResponse(result)
});


async function postData(url, data) {
    if (!url || !data) {
        console.log('no data')
        return null
    }
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).catch(error => console.log(error));
    console.log(response.statusText)
    return response.json(); // parses JSON response into native JavaScript objects
}



