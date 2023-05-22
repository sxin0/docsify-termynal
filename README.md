# docsify-tabs

A [docsify.js](https://docsify.js.org) plugin for lightweight and modern animated terminal window from markdown.

**Demo**
````
```term
# 我是测试 (y/n) $ y
// install fastapi
$ pip install fastapi
>> 100%
```
````

![Video_2023-05-22_160550_AdobeExpress](https://github.com/sxin0/docsify-termynal/assets/29392026/86865182-ab4a-41e3-9454-dc3ccff48553)


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
