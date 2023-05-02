chrome.runtime.onInstalled.addListener(async (details) => {});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender);
  //查询码表返回数据
  sendResponse(request);
});
