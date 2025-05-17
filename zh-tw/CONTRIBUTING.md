# 為 docsify-termynal 做出貢獻

感謝您有興趣為 docsify-termynal 做出貢獻。本文件概述了貢獻指南，包括回報問題、提交修補程式和提議新功能。

---

## 入門指南

1. 在 GitHub 上 **fork** 此儲存庫。
2. **克隆** 您 fork 的儲存庫：

```term
foo@bar:~/root/to/project$
$ git clone https://github.com/<your-username>/docsify-termynal.git
>> 正在從 GitHub 克隆儲存庫...
正在克隆到「docsify-termynal」...
遠端：正在列舉物件：57，完成。
遠端：正在計數物件：100% (57/57)，完成。
遠端：正在壓縮物件：100% (40/40)，完成。
遠端：總共 57 個（增量 18 個），重複使用 52 個（增量 13 個），重複使用封包 0 個
接收物件：100% (57/57)，385.24 KiB | 1.50 MiB/s，完成。
解析增量：100% (18/18)，完成。
✅ 克隆成功！

foo@bar:~/root/to/project$
$ cd docsify-termynal/
📂 已移動到「docsify-termynal」目錄。
```

3. 為您的更改建立新分支：

```term
foo@bar:~/root/to/project$
$ git checkout -b feature/你的功能名稱
>> 正在建立新分支：「feature/你的功能名稱」...
已切換到新分支「feature/你的功能名稱」
✅ 已建立並切換到分支「feature/你的功能名稱」。

foo@bar:~/root/to/project (feature/你的功能名稱)$
# 🎯 您現在正在處理「feature/你的功能名稱」
# 🔧 是時候開始打造一些精彩的內容了！
```

4. 進行更改並提交：

```term
foo@bar:~/root/to/project (feature/your-feature-name)$
$ git commit -m "清楚描述您的更改"
[feature/your-feature-name abc1234] 清楚描述您的更改
✨ 修改了 3 個檔案，插入了 42 行 (+)，刪除了 7 行 (-)
🧼 清理：移除未使用的匯入
🛠️ 更新了 main.js 中的邏輯
🎨 美化了 header 元件

✅ 提交成功！

foo@bar:~/root/to/project (feature/your-feature-name)$
# 💾 更改已儲存至本地歷史記錄。
# 🚀 準備推送您的精彩內容！
```

5. 推送到您的 fork 分支，然後向主儲存庫提交 **Pull Request**。

---

## 開發指南

* 入口 HTML 檔為 `index.html`。
* 自訂樣式位於 `dist/css/`。
* 腳本位於 `dist/js/`。
* 側邊欄內容位於 `_sidebar.md`。
* 頁腳內容位於 `_footer.md`。

若要在本地預覽網站，請使用靜態檔案伺服器：

```term
$ npx serve .

┌──────────────────────────────────────────────┐
│                                              │
│  正在提供服務！                               │
│                                              │
│  - 本機：http://localhost:3000               │
│  - 網路：http://172.27.219.221:3000          │
│                                              │
│  本機網址已複製到剪貼簿！                      │
│                                              │
└──────────────────────────────────────────────┘

# 或使用 Python：
$ python3 -m http.server

┌──────────────────────────────────────────┐
│                                          │
│  正在 0.0.0.0 的 8000 埠提供 HTTP 服務...  │
│  (http://localhost:8000/)                │
│                                          │
└──────────────────────────────────────────┘

# 若要停止伺服器，請按 Ctrl + C
```

---

## 貢獻準則

* 確保 Pull Request 專注於單一主題或功能。
* 遵循現有的程式碼風格。
* 撰寫清楚的提交訊息。
* 如適用，請在 PR 描述中包含相關議題。
* 若有重大更動，請先建立 Issue 進行討論。

---

## 回報問題

在回報錯誤時，請提供：

* 清楚且具描述性的標題。
* 重現問題的步驟。
* 預期與實際行為。
* 如可能，請附上螢幕截圖。

---

## 授權條款

您的貢獻將依據 [MIT 授權條款](LICENSE.md) 被使用。
