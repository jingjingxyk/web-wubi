(async () => {
  let app = await import(chrome.runtime.getURL("/content-scripts/src/main.js"));
  app.default();
})();
