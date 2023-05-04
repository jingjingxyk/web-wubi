chrome.runtime.onInstalled.addListener((details) => {});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  //查询码表返回数据
  // sendResponse(request)

  let url = "http://127.0.0.1:9502/api/query";
  postData(url, request).then((x) => {
    sendResponse(x);
  });

  return true;
});
