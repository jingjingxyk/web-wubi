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

export { send };
