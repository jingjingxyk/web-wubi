import app from "/content-scripts/src/main.js"
window.wubi_online_runtime_mode='native'
window.wubi_online_method_server_url='http://localhost:9502/api/query'
window.wubi_online_method_url_prefix='http://localhost:8000'

app();
