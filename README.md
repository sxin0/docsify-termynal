# docsify-termynal

[![License](https://img.shields.io/github/license/sxin0/docsify-termynal)](./LICENSE)
[![Contributors](https://img.shields.io/github/contributors/sxin0/docsify-termynal)](https://github.com/sxin0/docsify-termynal/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/sxin0/docsify-termynal)](https://github.com/sxin0/docsify-termynal/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](http://makeapullrequest.com)

>  A [Docsify](https://docsify.js.org) plugin to render modern animated terminal blocks from markdown.

---

##  Demo

> [https://docs.jsx6.com](https://docs.jsx6.com) (deployed from the latest code on the main branch)

```term
$ php -v
PHP 7.3.23 (cli) (built: Apr 20 2022 15:59:45)
$ pip install fastapi
>> 100%
# Choose an option (y/n)
$ y
// This is a comment
```

![Demo](https://github.com/sxin0/docsify-termynal/assets/29392026/6cbc0179-c27c-4c0d-9dc1-7f9993a1850a)

---

##  Installation

### Via CDN [jsdelivr.com](https://www.jsdelivr.com/)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/css/termynal.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/css/custom.css">

<!-- JS -->
<script src="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/js/termynal.js"></script>
<script src="https://cdn.jsdelivr.net/gh/sxin0/docsify-termynal@main/dist/js/custom.js"></script>
```

---

##  Configuration

Add the following configuration into window.$docsify:

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

## Full usage example

below is a complete usage example

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

## Nginx Configuration

When deploying with Nginx, you need to configure it properly to handle docsify's routing system. Here's a recommended configuration:

```nginx
server {
    listen       443 ssl http2;
    server_name  your-domain.com;
    
    # SSL configuration
    ssl_certificate     /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    
    root /path/to/your/docsify-termynal;
    
    location / {
        add_header Cache-Control no-store;
        index  index.html;
        
        # Handle directory access
        if (-d $request_filename) {
            rewrite ^(.*)$ /index.html last;
        }
        
        # Handle all routes
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~ .*\.(js|css)?$ {
        expires 1h;
    }
    
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
        expires 30d;
    }
    
    # Deny access to hidden files
    location ~ /\.(?!well-known) {
        deny all;
    }
}
```

Key points to note:
1. All directory access should be redirected to `index.html`
2. Static assets should be cached appropriately
3. Hidden files (except `.well-known`) should be denied
4. SSL configuration is recommended for production use

---

##  License

Licensed under the [MIT License](./LICENSE.md).
