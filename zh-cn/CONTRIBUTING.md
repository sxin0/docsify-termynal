# 为 docsify-termynal 做出贡献

感谢您对 **docsify-termynal** 的贡献。本文档概述了参与项目的准则，包括报告问题、提交补丁以及提出新功能。

---

## 开始使用

1. 在 GitHub 上 **Fork** 仓库。
2. **克隆**您的分叉仓库：

```term
foo@bar:~/root/to/project$
$ git clone https://github.com/<your-username>/docsify-termynal.git
>> 正在从 GitHub 克隆仓库...
克隆到 'docsify-termynal'...
remote： 枚举对象：57, done.
remote： 计数对象：100% (57/57)，完成。
remote： 压缩对象：Total 57 (delta 18), reused 52 (delta 13), pack-reused 0
接收对象：100% (57/57), 385.24 KiB | 1.50 MiB/s, 完成。
解析 delta：100% (18/18)，完成。
✅ 克隆成功！

foo@bar:~/root/to/project$
$ cd docsify-termynal/
📂 已进入 'docsify-termynal' 目录。
```

1. 为你的更改创建新分支：

```term
foo@bar:~/root/to/project$
$ git checkout -b feature/your-feature-name
>> 创建新分支：feature/your-feature-name...
切换到新分支 'feature/your-feature-name'
✅ 分支 'feature/your-feature-name' 创建并签出完成。

foo@bar:~/root/to/project (feature/your-feature-name)$ 
# 🎯 当前正在开发『feature/your-feature-name』
# 🔧 是时候开发一些好东西啦！
```

4. 修改并提交：

```term
foo@bar:~/root/to/project (feature/your-feature-name)$
$ git commit -m "清楚描述您的更改"
[feature/your-feature-name abc1234] 清楚描述您的更改
 ✨ 修改 3 个文件，42 行新增，7 行删除
 🧼 清理：移除未使用的引入
 🛠️ 更新 main.js 中的逻辑
 🎨 美化头部组件样式

✅ 提交成功！

foo@bar:~/root/to/project (feature/your-feature-name)$ 
# 💾 更改已保存至本地历史记录。
# 🚀 准备推送您的精彩改动啦！
```

5. 推送到您的 fork，并在主仓库发起一个 **Pull Request**。

---

## 开发指南

* 入口 HTML 文件是 `index.html`。
* 自定义样式位于 `dist/css/`。
* 脚本位于 `dist/js/`。
* 侧边栏内容在 `_sidebar.md`。
* 页脚内容位于 `_footer.md`。

要在本地预览网站，可使用静态文件服务器：

```term
$ npx serve .

┌──────────────────────────────────────────────┐
│                                              │
│  正在提供服务！                               │
│                                              │
│  - 本地：http://localhost:3000                │
│  - 网络：http://172.27.219.221:3000           │
│                                              │
│  本地地址已复制到剪贴板！                      │
│                                              │
└──────────────────────────────────────────────┘

# 或使用 Python：
$ python3 -m http.server

┌──────────────────────────────────────────────┐
│                                              │
│  正在 0.0.0.0 的 8000 端口提供 HTTP 服务...    │
│  (http://localhost:8000/)                    │
│                                              │
└──────────────────────────────────────────────┘

# 要停止服务器，请按 Ctrl + C
```

---

## 贡献指引

* 保持 Pull Request 聚焦于单一主题或功能。
* 遵循当前的代码风格。
* 编写清晰的提交信息。
* 如适用，请在 PR 描述中附带相关 issue。
* 对于较大更改，请先创建 issue 讨论方案。

---

## 报告问题

请在报告 bug 时提供以下内容：

* 清晰、具描述性的标题。
* 重现问题的步骤。
* 期望行为与实际行为。
* 如有可能，请附截图。

---

## 授权协议

通过贡献，您同意您的贡献将以 [MIT License](LICENSE.md) 授权。
