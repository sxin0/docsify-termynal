# docsify-termynal

[![License](https://img.shields.io/github/license/sxin0/docsify-termynal)](./LICENSE)  
[![Contributors](https://img.shields.io/github/contributors/sxin0/docsify-termynal)](https://github.com/sxin0/docsify-termynal/graphs/contributors)  
[![Issues](https://img.shields.io/github/issues/sxin0/docsify-termynal)](https://github.com/sxin0/docsify-termynal/issues)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](http://makeapullrequest.com)

> 一个 [Docsify](https://docsify.js.org) 插件，用于从 markdown 渲染现代化的动画终端块。

---

## 演示

[现场示范](https://docs.jsx6.com)

```term
$ php -v
PHP 7.3.23 (cli) (built: Apr 20 2022 15:59:45)
$ pip install fastapi
>> 100%
# 选择一个选项 (y/n)
$ y
// 这是注释
```

![Demo](https://github.com/sxin0/docsify-termynal/assets/29392026/6cbc0179-c27c-4c0d-9dc1-7f9993a1850a)

---

### 安装

### 通过 CDN [jsdelivr.com](https://www.jsdelivr.com/)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/css/termynal.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/css/custom.css" />

<!-- JS -->
<script src="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/js/termynal.js"></script>
<script src="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/js/custom.js"></script>
```

---

## 配置

在 `window.$docsify` 中加入以下设置：

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

---

## 完整使用范例

以下是完整的使用范例：

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

## 许可证

以 [MIT License](./LICENSE) 授权。

---

## Nginx 配置说明

使用 Nginx 部署时，需要正确配置以支持 docsify 的路由系统。以下是推荐的配置：

```nginx
server {
    listen       443 ssl http2;
    server_name  your-domain.com;
    
    # SSL 配置
    ssl_certificate     /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    
    root /path/to/your/docsify-termynal;
    
    location / {
        add_header Cache-Control no-store;
        index  index.html;
        
        # 处理目录访问
        if (-d $request_filename) {
            rewrite ^(.*)$ /index.html last;
        }
        
        # 处理所有路由
        try_files $uri $uri/ /index.html;
    }
    
    # 缓存静态资源
    location ~ .*\.(js|css)?$ {
        expires 1h;
    }
    
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
        expires 30d;
    }
    
    # 禁止访问隐藏文件
    location ~ /\.(?!well-known) {
        deny all;
    }
}
```

需要注意的关键点：
1. 所有目录访问都应该重定向到 `index.html`
2. 静态资源应该适当缓存
3. 隐藏文件（除了 `.well-known`）应该被禁止访问
4. 生产环境建议配置 SSL