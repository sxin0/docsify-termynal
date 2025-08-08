/**
 * Simple AI Chatbot Plugin for Docsify
 * 支持多种AI服务：OpenAI、Claude、本地模型等
 * 
 * @author Your Name
 * @version 1.0.0
 * @license MIT
 */

(function() {
  'use strict';

  // 配置选项
  const defaultConfig = {
    // 服务类型：'openai', 'claude', 'local', 'custom'
    service: 'openai',
    
    // OpenAI 配置
    openai: {
      apiKey: '',
      model: 'gpt-3.5-turbo',
      endpoint: 'https://api.openai.com/v1/chat/completions'
    },
    
    // Claude 配置
    claude: {
      apiKey: '',
      model: 'claude-3-sonnet-20240229',
      endpoint: 'https://api.anthropic.com/v1/messages'
    },
    
    // 本地模型配置
    local: {
      endpoint: 'http://localhost:11434/api/generate',
      model: 'llama2'
    },
    
    // 自定义配置
    custom: {
      endpoint: '',
      headers: {},
      method: 'POST',
      bodyTransform: null // 自定义请求体转换函数
    },
    
    // UI 配置
    ui: {
      position: 'bottom-right',
      theme: 'light',
      language: 'zh-CN',
      placeholder: '有什么问题吗？',
      welcomeMessage: '你好！我是AI助手，有什么可以帮助你的吗？',
      buttonText: '🤖',
      title: 'AI助手'
    }
  };

  // 创建聊天界面
  function createChatInterface(config) {
    const chatContainer = document.createElement('div');
    chatContainer.id = 'ai-chatbot-container';
    chatContainer.className = `ai-chatbot ${config.ui.theme} ${config.ui.position}`;
    
    const chatButton = document.createElement('div');
    chatButton.className = 'ai-chatbot-button';
    chatButton.innerHTML = config.ui.buttonText;
    chatButton.title = config.ui.title;
    
    const chatWindow = document.createElement('div');
    chatWindow.className = 'ai-chatbot-window';
    chatWindow.style.display = 'none';
    
    const chatHeader = document.createElement('div');
    chatHeader.className = 'ai-chatbot-header';
    chatHeader.innerHTML = `
      <span>${config.ui.title}</span>
      <button class="ai-chatbot-close">×</button>
    `;
    
    const chatMessages = document.createElement('div');
    chatMessages.className = 'ai-chatbot-messages';
    
    const chatInput = document.createElement('div');
    chatInput.className = 'ai-chatbot-input';
    chatInput.innerHTML = `
      <input type="text" placeholder="${config.ui.placeholder}" />
      <button class="ai-chatbot-send">发送</button>
    `;
    
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(chatMessages);
    chatWindow.appendChild(chatInput);
    
    chatContainer.appendChild(chatButton);
    chatContainer.appendChild(chatWindow);
    
    return chatContainer;
  }

  // 发送消息到不同的AI服务
  async function sendMessage(message, config) {
    try {
      let response;
      
      switch (config.service) {
        case 'openai':
          response = await sendToOpenAI(message, config.openai);
          break;
        case 'claude':
          response = await sendToClaude(message, config.claude);
          break;
        case 'local':
          response = await sendToLocal(message, config.local);
          break;
        case 'custom':
          response = await sendToCustom(message, config.custom);
          break;
        default:
          throw new Error(`Unsupported service: ${config.service}`);
      }
      
      return response;
    } catch (error) {
      console.error('AI API Error:', error);
      return '抱歉，我现在无法回答你的问题。请稍后再试。';
    }
  }

  // OpenAI API
  async function sendToOpenAI(message, config) {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: '你是一个有用的AI助手，专门帮助用户解答关于文档的问题。'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Claude API
  async function sendToClaude(message, config) {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    return data.content[0].text;
  }

  // 本地模型 API
  async function sendToLocal(message, config) {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: config.model,
        prompt: message,
        stream: false
      })
    });

    const data = await response.json();
    return data.response;
  }

  // 自定义 API
  async function sendToCustom(message, config) {
    const body = config.bodyTransform ? 
      config.bodyTransform(message) : 
      { message: message };

    const response = await fetch(config.endpoint, {
      method: config.method,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return data.response || data.message || data.content || '收到回复';
  }

  // 初始化插件
  function init(config) {
    const finalConfig = { ...defaultConfig, ...config };
    
    // 检查配置
    if (!isConfigValid(finalConfig)) {
      console.warn('AI Chatbot: Invalid configuration');
      return;
    }

    addStyles();
    
    const chatContainer = createChatInterface(finalConfig);
    document.body.appendChild(chatContainer);
    
    const chatButton = chatContainer.querySelector('.ai-chatbot-button');
    const chatWindow = chatContainer.querySelector('.ai-chatbot-window');
    const closeButton = chatContainer.querySelector('.ai-chatbot-close');
    const messagesContainer = chatContainer.querySelector('.ai-chatbot-messages');
    const input = chatContainer.querySelector('.ai-chatbot-input input');
    const sendButton = chatContainer.querySelector('.ai-chatbot-send');
    
    // 添加欢迎消息
    if (finalConfig.ui.welcomeMessage) {
      addMessage('assistant', finalConfig.ui.welcomeMessage, messagesContainer);
    }
    
    // 切换聊天窗口
    chatButton.addEventListener('click', () => {
      chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
      if (chatWindow.style.display === 'flex') {
        input.focus();
      }
    });
    
    // 关闭聊天窗口
    closeButton.addEventListener('click', () => {
      chatWindow.style.display = 'none';
    });
    
    // 发送消息
    function sendMessageHandler() {
      const message = input.value.trim();
      if (!message) return;
      
      addMessage('user', message, messagesContainer);
      input.value = '';
      
      // 显示加载状态
      const loadingMessage = addMessage('assistant', '正在思考...', messagesContainer);
      
      // 发送到AI服务
      sendMessage(message, finalConfig).then(response => {
        // 移除加载消息
        loadingMessage.remove();
        addMessage('assistant', response, messagesContainer);
      });
    }
    
    sendButton.addEventListener('click', sendMessageHandler);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessageHandler();
      }
    });
  }
  
  // 检查配置是否有效
  function isConfigValid(config) {
    switch (config.service) {
      case 'openai':
        return !!config.openai.apiKey;
      case 'claude':
        return !!config.claude.apiKey;
      case 'local':
        return !!config.local.endpoint;
      case 'custom':
        return !!config.custom.endpoint;
      default:
        return false;
    }
  }
  
  // 添加消息到聊天窗口
  function addMessage(role, content, container) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-chatbot-message ${role}`;
    messageDiv.innerHTML = `
      <div class="ai-chatbot-message-content">${content}</div>
    `;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    return messageDiv;
  }

  // 添加样式
  function addStyles() {
    if (document.getElementById('ai-chatbot-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'ai-chatbot-styles';
    style.textContent = `
      .ai-chatbot {
        position: fixed;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .ai-chatbot.bottom-right {
        bottom: 20px;
        right: 20px;
      }
      
      .ai-chatbot.bottom-left {
        bottom: 20px;
        left: 20px;
      }
      
      .ai-chatbot.top-right {
        top: 20px;
        right: 20px;
      }
      
      .ai-chatbot.top-left {
        top: 20px;
        left: 20px;
      }
      
      .ai-chatbot-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
      }
      
      .ai-chatbot-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      }
      
      .ai-chatbot-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .ai-chatbot-header {
        padding: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .ai-chatbot-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .ai-chatbot-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        background: #f8f9fa;
      }
      
      .ai-chatbot-message {
        margin-bottom: 12px;
        display: flex;
        align-items: flex-start;
      }
      
      .ai-chatbot-message.user {
        justify-content: flex-end;
      }
      
      .ai-chatbot-message-content {
        max-width: 80%;
        padding: 8px 12px;
        border-radius: 12px;
        word-wrap: break-word;
      }
      
      .ai-chatbot-message.user .ai-chatbot-message-content {
        background: #667eea;
        color: white;
      }
      
      .ai-chatbot-message.assistant .ai-chatbot-message-content {
        background: white;
        color: #333;
        border: 1px solid #e1e5e9;
      }
      
      .ai-chatbot-input {
        padding: 16px;
        border-top: 1px solid #e1e5e9;
        display: flex;
        gap: 8px;
      }
      
      .ai-chatbot-input input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #e1e5e9;
        border-radius: 20px;
        outline: none;
        font-size: 14px;
      }
      
      .ai-chatbot-input input:focus {
        border-color: #667eea;
      }
      
      .ai-chatbot-send {
        padding: 8px 16px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.3s ease;
      }
      
      .ai-chatbot-send:hover {
        background: #5a6fd8;
      }
    `;
    document.head.appendChild(style);
  }

  // 注册插件
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(function(hook, vm) {
    hook.ready(function() {
      // 检查是否有配置
      if (window.$docsify.aiChatbot) {
        init(window.$docsify.aiChatbot);
      }
    });
  }, window.$docsify.plugins || []);

})(); 