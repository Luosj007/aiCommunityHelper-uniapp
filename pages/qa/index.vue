<template>
  <view class="container">
    <view class="header">
      <text class="title">🤖 智邻助手</text>
    </view>
    
    <scroll-view 
      class="chat-container" 
      scroll-y 
      :scroll-into-view="'last-msg'"
    >
      <view 
        v-for="(msg, index) in messages" 
        :key="index"
        :class="['msg-wrapper', msg.role === 'user' ? 'user-wrapper' : 'assistant-wrapper']"
      >
        <view v-if="msg.role === 'user'" class="message user-message-inner">
          <view class="content">
            <text>{{ msg.content }}</text>
          </view>
          <view class="avatar">👤</view>
        </view>
        
        <view v-else class="message assistant-message-inner">
          <view class="avatar">🤖</view>
          <view class="content">
            <text>{{ msg.content }}</text>
          </view>
        </view>
      </view>
      <view id="last-msg"></view>
      <!-- 加载中 -->
      <view v-if="loading" class="msg-wrapper assistant-wrapper">
        <view class="message assistant-message-inner">
          <view class="avatar">🤖</view>
          <view class="content loading">
            <text>正在思考中...</text>
          </view>
        </view>
      </view>

    </scroll-view>
    
    <!-- 输入区域 -->
    <view class="input-area">
      <input 
        class="input" 
        v-model="inputText" 
        placeholder="请输入问题..."
        :disabled="loading"
        @confirm="sendMessage"
      />
      <button 
        class="send-btn" 
        :disabled="!inputText.trim() || loading"
        @tap="sendMessage"
      >
        {{ loading ? '发送中' : '发送' }}
      </button>
    </view>
    
    <!-- 清空按钮 -->
    <button 
      class="clear-btn" 
      v-if="messages.length > 0" 
      @tap="clearChat"
    >
      清空对话
    </button>
  </view>
</template>

<script>
const DEEPSEEK_API_KEY = ''

export default {
  data() {
    return {
      messages: [],
      inputText: '',
      loading: false
    }
  },
  onLoad() {
    this.loadHistory()
  },
  onUnload() {
    this.saveHistory()
  },
  methods: {
    async sendMessage() {
      const text = this.inputText.trim()
      if (!text || this.loading) return
      
      this.messages.push({
        role: 'user',
        content: text
      })
      this.inputText = ''
      this.loading = true
      
      try {
        const response = await this.callDeepSeekAPI()
        this.messages.push({
          role: 'assistant',
          content: response
        })
        this.saveHistory()
      } catch (error) {
        console.error('API调用失败:', error)
        uni.showToast({
          title: '请求失败，请重试',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    async callDeepSeekAPI() {
      const requestData = {
        model: 'deepseek-chat',
        messages: this.messages.slice(-10), 
        stream: false,
        max_tokens: 2000
      }
      const response = await uni.request({
        url: 'https://api.deepseek.com/v1/chat/completions',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        data: requestData,
        timeout: 30000 
      })
      if (response.statusCode === 200) {
        return response.data.choices[0].message.content
      } else {
        throw new Error(`API错误: ${response.statusCode}`)
      }
    },
    
    clearChat() {
      uni.showModal({
        title: '提示',
        content: '确定要清空对话吗？',
        success: (res) => {
          if (res.confirm) {
            this.messages = []
            uni.removeStorageSync('deepseek_chat_history')
            uni.showToast({
              title: '已清空',
              icon: 'success'
            })
          }
        }
      })
    },
    
    saveHistory() {
      if (this.messages.length > 0) {
        uni.setStorageSync('deepseek_chat_history', this.messages)
      }
    },
    
    loadHistory() {
      const history = uni.getStorageSync('deepseek_chat_history')
      if (history && Array.isArray(history)) {
        this.messages = history
      }
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  padding: 40rpx 30rpx 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #e0e0e0;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.chat-container {
  flex: 1;
  padding: 30rpx 20rpx; 
  overflow-y: auto;
}

/* 调整外层容器padding，确保图标和边界间距一致 */
.msg-wrapper {
  display: flex;
  margin-bottom: 30rpx;
  animation: fadeIn 0.3s ease-in;
  padding: 0 10rpx; 
}
/* 用户消息：整体靠右 */
.user-wrapper {
  justify-content: flex-end;
}
/* 助手消息：整体靠左 */
.assistant-wrapper {
  justify-content: flex-start;
}

.message {
  display: flex;
  align-items: flex-start;
  max-width: 75%; 
}

.user-message-inner {
  flex-direction: row;
}

.assistant-message-inner {
  flex-direction: row;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  min-height: 80rpx;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  flex-shrink: 0; /* 禁止挤压图标 */
  line-height: 80rpx;
  text-align: center;
  margin: 0 5rpx; /* 图标自身加小间距，避免贴内容 */
}

.content {
  max-width: 70%;
  padding: 20rpx 30rpx;
  border-radius: 20rpx; 
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.user-wrapper .content {
  background-color: #007aff;
  color: white;
  margin-left: 20rpx; 
}

.assistant-wrapper .content {
  background-color: white;
  margin-right: 20rpx; 
}

.content text {
  font-size: 28rpx;
  line-height: 1.6;
}

.loading {
  color: #666;
  font-style: italic;
}

.input-area {
  display: flex;
  padding: 20rpx 30rpx;
  background-color: white;
  border-top: 1rpx solid #e0e0e0;
  align-items: center;
}

.input {
  flex: 1;
  height: 80rpx;
  padding: 0 30rpx;
  background-color: #f0f0f0;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.send-btn {
  margin-left: 20rpx;
  width: 150rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #007aff;
  color: white;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.send-btn[disabled] {
  background-color: #ccc;
  color: #999;
}

.clear-btn {
  margin: 20rpx 30rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: white;
  color: #ff3b30;
  border: 1rpx solid #ff3b30;
  border-radius: 40rpx;
  font-size: 28rpx;
}
</style>