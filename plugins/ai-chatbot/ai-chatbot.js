/**
 * AI Chatbot Plugin for Docsify
 * 
 * @author Your Name
 * @version 1.0.0
 * @license MIT
 */

(function() {
  'use strict';

  // 配置选项
  const defaultConfig = {
    apiKey: '', // OpenAI API Key
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    maxTokens: 1000,
    temperature: 0.7,
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    theme: 'light', // light, dark
    language: 'zh-CN', // zh-CN, en-US
    placeholder: '有什么问题吗？',
    welcomeMessage: '你好！我是AI助手，有什么可以帮助你的吗？'
  };

  // 创建聊天界面
  function createChatInterface(config) {
    const chatContainer = document.createElement('div');
    chatContainer.id = 'ai-chatbot-container';
    chatContainer.className = `ai-chatbot ${config.theme} ${config.position}`;
    
    const chatButton = document.createElement('div');
    chatButton.className = 'ai-chatbot-button';
    chatButton.innerHTML = '🤖';
    chatButton.title = 'AI助手';
    
    const chatWindow = document.createElement('div');
    chatWindow.className = 'ai-chatbot-window';
    chatWindow.style.display = 'none';
    
    const chatHeader = document.createElement('div');
    chatHeader.className = 'ai-chatbot-header';
    chatHeader.innerHTML = `
      <span>AI助手</span>
      <button class="ai-chatbot-close">×</button>
    `;
    
    const chatMessages = document.createElement('div');
    chatMessages.className = 'ai-chatbot-messages';
    
    const chatInput = document.createElement('div');
    chatInput.className = 'ai-chatbot-input';
    chatInput.innerHTML = `
      <input type="text" placeholder="${config.placeholder}" />
      <button class="ai-chatbot-send">发送</button>
    `;
    
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(chatMessages);
    chatWindow.appendChild(chatInput);
    
    chatContainer.appendChild(chatButton);
    chatContainer.appendChild(chatWindow);
    
    return chatContainer;
  }

  // 添加样式
  function addStyles() {
    const style = document.createElement('style');
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
      
      .ai-chatbot.dark {
        color: white;
      }
      
      .ai-chatbot.dark .ai-chatbot-window {
        background: #2d3748;
        color: white;
      }
      
      .ai-chatbot.dark .ai-chatbot-messages {
        background: #1a202c;
      }
      
      .ai-chatbot.dark .ai-chatbot-message.assistant .ai-chatbot-message-content {
        background: #4a5568;
        color: white;
        border-color: #2d3748;
      }
      
      .ai-chatbot.dark .ai-chatbot-input {
        border-top-color: #4a5568;
      }
      
      .ai-chatbot.dark .ai-chatbot-input input {
        background: #4a5568;
        color: white;
        border-color: #2d3748;
      }
      
      .ai-chatbot.dark .ai-chatbot-input input:focus {
        border-color: #667eea;
      }
    `;
    document.head.appendChild(style);
  }

  // 发送消息到AI API
  async function sendMessage(message, config) {
    try {
      const response = await fetch(config.apiEndpoint, {
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
          max_tokens: config.maxTokens,
          temperature: config.temperature
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI API Error:', error);
      return '抱歉，我现在无法回答你的问题。请稍后再试。';
    }
  }

  // 初始化插件
  function init(config) {
    const finalConfig = { ...defaultConfig, ...config };
    
    if (!finalConfig.apiKey) {
      console.warn('AI Chatbot: API Key is required');
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
    if (finalConfig.welcomeMessage) {
      addMessage('assistant', finalConfig.welcomeMessage, messagesContainer);
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
      
      // 发送到AI API
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