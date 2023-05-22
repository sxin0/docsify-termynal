# docsify-termynal

A [docsify.js](https://docsify.js.org) plugin for lightweight and modern animated terminal window from markdown.

**Demo**
> [https://wiki.jsx6.com/#/?id=docsify-termynal](https://wiki.jsx6.com/#/?id=docsify-termynal)

````
```term
$ php -v
PHP 7.3.23 (cli) (built: Apr 20 2022 15:59:45) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.23, Copyright (c) 1998-2018 Zend Technologies

# 这个一个选择 (y/n) $ y
// 这是注释
$ pip install fastapi
>> 100%
```
````

![Video_2023-05-22_162348_AdobeExpress](https://github.com/sxin0/docsify-termynal/assets/29392026/6cbc0179-c27c-4c0d-9dc1-7f9993a1850a)


## Installation
```html
<!DOCTYPE html>
<html>
<head>
    <!--docsify-->
    <!--...-->
    
    <!--termynal.js-->
    <link rel="stylesheet" href="termynal.css">
    <link rel="stylesheet" href="custom.css">
</head>
<body>
<div id="app"></div>
<script>
    window.$docsify = {
        /*...*/
        plugins: [
            function (hook, vm) {
                /*termynal.js*/
                hook.beforeEach(function(content){
                    return beforeEach(content);
                })
                hook.doneEach(function (){
                    setupTermynal();
                    showRandomAnnouncement('announce-left', 5000)
                    showRandomAnnouncement('announce-right', 10000)
                });
            }
        ]
    }
</script>

<!--docsify-->
<!--...-->

<!--termynal.js-->
<script src="termynal.js"></script>
<script src="custom.js"></script>
</body>
</html>
```
