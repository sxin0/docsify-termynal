# docsify-termynal

[![許可證](https://img.shields.io/github/license/sxin0/docsify-termynal)](./LICENSE)
[![貢獻者](https://img.shields.io/github/contributors/sxin0/docsify-termynal)](https://github.com/sxin0/docsify-termynal/graphs/contributors)
[![問題](https://img.shields.io/github/issues/sxin0/docsify-termynal)](https://github.com/sxin0/docsify-termynal/issues)
[![歡迎提交 PR](https://img.shields.io/badge/PRs-welcome-brightgreen)](http://makeapullrequest.com)

> 一個 [Docsify](https://docsify.js.org) 插件，用於從 Markdown 渲染現代動畫終端區塊。

---

## 演示

[線上演示](https://wiki.jsx6.com/#/?id=docsify-termynal)

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

## 授權

根據 [MIT 許可證](./LICENSE) 授權。
