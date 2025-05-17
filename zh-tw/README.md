# docsify-termynal

[![許可證](https://img.shields.io/github/license/sxin0/docsify-termynal)](./LICENSE)
[![貢獻者](https://img.shields.io/github/contributors/sxin0/docsify-termynal)](https://github.com/sxin0/docsify-termynal/graphs/contributors)
[![問題](https://img.shields.io/github/issues/sxin0/docsify-termynal)](https://github.com/sxin0/docsify-termynal/issues)
[![歡迎提交 PR](https://img.shields.io/badge/PRs-welcome-brightgreen)](http://makeapullrequest.com)

> 一個 [Docsify](https://docsify.js.org) 插件，用於從 Markdown 渲染現代動畫終端區塊。

---

## 演示

[線上演示](https://docs.jsx6.com)

```term
$ php -v
PHP 7.3.23 (cli)（建置於：2022 年 4 月 20 日 15:59:45）
$ pip install fastapi
>> 100%
# 選擇一個選項 (y/n)
$ y
// 這是一則註解
```

![演示](https://github.com/sxin0/docsify-termynal/assets/29392026/6cbc0179-c27c-4c0d-9dc1-7f9993a1850a)

---

## 安裝

### 通過 CDN [jsdelivr.com](https://www.jsdelivr.com/)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/css/termynal.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/css/custom.css">

<!-- JS -->
<script src="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/js/termynal.js"></script>
<script src="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/js/custom.js"></script>
```

---

## 設定

將以下設定新增至 `window.$docsify`：

```js
window.$docsify = {
  // ...
  plugins: [
    function (hook, vm) {
      hook.beforeEach(content => beforeEach(content));
      hook.doneEach(() => {
        setupTermynal();
        showRandomAnnouncement('announce-left', 5000);
        showRandomAnnouncement('announce-right', 10000);
      });
    }
  ]
};
```

## 完整使用範例

以下是完整的使用範例：

```html
<!DOCTYPE html>
<html>
<head>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/css/custom.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/css/termynal.css"
/>
</head>
<body>
<div id="app"></div>

<script>
window.$docsify = {
  // ...
  plugins: [
    function (hook, vm) {
      hook.beforeEach(content => beforeEach(content));
      hook.doneEach(() => {
        setupTermynal();
        showRandomAnnouncement('announce-left', 5000);
        showRandomAnnouncement('announce-right', 10000);
      });
    }
  ]
};
</script>

<script src="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/js/termynal.js"></script>
<script src="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/js/custom.js"></script>
</body>
</html>
```

---

## Nginx 設定說明

使用 Nginx 部署時，需要正確設定以支援 docsify 的路由系統。以下是建議的設定：

```nginx
server {
    listen       443 ssl http2;
    server_name  your-domain.com;
    
    # SSL 設定
    ssl_certificate     /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    
    root /path/to/your/docsify-termynal;
    
    location / {
        add_header Cache-Control no-store;
        index  index.html;
        
        # 處理目錄存取
        if (-d $request_filename) {
            rewrite ^(.*)$ /index.html last;
        }
        
        # 處理所有路由
        try_files $uri $uri/ /index.html;
    }
    
    # 快取靜態資源
    location ~ .*\.(js|css)?$ {
        expires 1h;
    }
    
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
        expires 30d;
    }
    
    # 禁止存取隱藏檔案
    location ~ /\.(?!well-known) {
        deny all;
    }
}
```

需要注意的關鍵點：
1. 所有目錄存取都應該重定向到 `index.html`
2. 靜態資源應該適當快取
3. 隱藏檔案（除了 `.well-known`）應該被禁止存取
4. 生產環境建議設定 SSL

## 授權

根據 [MIT 許可證](./LICENSE) 授權。
