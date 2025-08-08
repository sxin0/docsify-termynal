# Docsify AI 聊天机器人插件

这是一个为 Docsify 文档网站添加 AI 聊天机器人功能的插件。

## 功能特性

- 🤖 智能AI助手，基于OpenAI GPT模型
- 💬 现代化的聊天界面设计
- 🌙 支持明暗主题切换
- 📱 响应式设计，支持移动端
- 🎨 可自定义样式和位置
- 🌍 支持多语言
- ⚡ 轻量级，不影响页面性能

## 安装步骤

### 1. 下载插件文件

将以下文件复制到你的 Docsify 项目中：

```
plugins/
└── ai-chatbot/
    ├── ai-chatbot.js
    └── ai-chatbot.css
```

### 2. 在 HTML 中引入

在你的 `index.html` 文件中添加以下代码：

```html
<!-- 在 head 部分添加 CSS -->
<link rel="stylesheet" href="./plugins/ai-chatbot/ai-chatbot.css" />

<!-- 在 body 底部添加 JS -->
<script src="./plugins/ai-chatbot/ai-chatbot.js"></script>
```

### 3. 配置插件

在 `window.$docsify` 配置中添加：

```javascript
window.$docsify = {
  // ... 其他配置
  
  // AI聊天机器人配置
  aiChatbot: {
    apiKey: 'your-openai-api-key-here', // 必填：OpenAI API Key
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    maxTokens: 1000,
    temperature: 0.7,
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    theme: 'light', // light, dark
    language: 'zh-CN', // zh-CN, en-US
    placeholder: '有什么问题吗？',
    welcomeMessage: '你好！我是AI助手，有什么可以帮助你的吗？'
  }
};
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `apiKey` | string | '' | OpenAI API Key（必填） |
| `apiEndpoint` | string | 'https://api.openai.com/v1/chat/completions' | API端点 |
| `model` | string | 'gpt-3.5-turbo' | 使用的AI模型 |
| `maxTokens` | number | 1000 | 最大token数 |
| `temperature` | number | 0.7 | 温度参数（0-1） |
| `position` | string | 'bottom-right' | 聊天按钮位置 |
| `theme` | string | 'light' | 主题：light/dark |
| `language` | string | 'zh-CN' | 语言设置 |
| `placeholder` | string | '有什么问题吗？' | 输入框占位符 |
| `welcomeMessage` | string | '你好！我是AI助手...' | 欢迎消息 |

## 获取 OpenAI API Key

1. 访问 [OpenAI官网](https://platform.openai.com/)
2. 注册或登录账户
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制并保存到配置中

## 自定义样式

你可以通过修改 `ai-chatbot.css` 文件来自定义样式：

```css
/* 自定义聊天按钮颜色 */
.ai-chatbot-button {
  background: linear-gradient(135deg, #your-color 0%, #your-color 100%) !important;
}

/* 自定义聊天窗口大小 */
.ai-chatbot-window {
  width: 400px !important;
  height: 600px !important;
}
```

## 安全注意事项

1. **不要在前端代码中暴露 API Key**：建议使用环境变量或后端代理
2. **设置 API 使用限制**：在 OpenAI 控制台中设置使用限制
3. **监控使用情况**：定期检查 API 使用量和费用

## 后端代理方案

为了安全起见，建议使用后端代理来处理 API 请求：

```javascript
// 配置使用后端代理
aiChatbot: {
  apiKey: '', // 留空，使用后端代理
  apiEndpoint: '/api/chat', // 指向你的后端代理
  // ... 其他配置
}
```

后端代理示例（Node.js）：

```javascript
const express = require('express');
const app = express();

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

## 故障排除

### 常见问题

1. **聊天机器人不显示**
   - 检查是否正确引入了 JS 和 CSS 文件
   - 确认配置中的 `apiKey` 已设置

2. **API 请求失败**
   - 检查 API Key 是否正确
   - 确认网络连接正常
   - 查看浏览器控制台错误信息

3. **样式显示异常**
   - 检查 CSS 文件路径是否正确
   - 确认没有样式冲突

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基本的聊天功能
- 支持明暗主题
- 响应式设计 