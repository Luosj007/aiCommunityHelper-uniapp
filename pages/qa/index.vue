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
        <!-- 用户消息 -->
        <view v-if="msg.role === 'user'" class="message user-message-inner">
          <view class="content">
            <text>{{ msg.content }}</text>
          </view>
          <view class="avatar">👤</view>
        </view>

        <!-- AI 消息 -->
        <view v-else class="message assistant-message-inner">
          <view class="avatar">🤖</view>
          <view class="content">
            <rich-text :nodes="msg.html"></rich-text>
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
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  breaks: true
})

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

      // 用户消息
      this.messages.push({
        role: 'user',
        content: text
      })

      this.inputText = ''
      this.loading = true

      try {
        const aiText = await this.callAI()

        this.messages.push({
          role: 'assistant',
          content: aiText,
          html: md.render(aiText)
        })

        this.saveHistory()
      } catch (e) {
        uni.showToast({
          title: '请求失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },

    // ✅ 调用 Egg 后端（已对齐）
    async callAI() {
      const res = await uni.request({
		url: 'https://jerrold-unintermitting-nonsegmentally.ngrok-free.dev/api/ai/chat',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          messages: this.messages.slice(-10).map(m => ({
            role: m.role,
            content: m.content
          }))
        },
        timeout: 30000
      })

      if (!res.data || !res.data.content) {
        throw new Error('AI 返回数据异常')
      }
      return res.data.content
    },

    clearChat() {
      this.messages = []
      uni.removeStorageSync('deepseek_chat_history')
    },

    saveHistory() {
      uni.setStorageSync('deepseek_chat_history', this.messages)
    },

    loadHistory() {
      const history = uni.getStorageSync('deepseek_chat_history')
      if (Array.isArray(history)) {
        this.messages = history.map(m =>
          m.role === 'assistant'
            ? { ...m, html: m.html || md.render(m.content) }
            : m
        )
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.header {
  padding: 40rpx 30rpx 20rpx;
  background: #fff;
  border-bottom: 1rpx solid #e0e0e0;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
}

.chat-container {
  flex: 1;
  padding: 30rpx 20rpx;
}

.msg-wrapper {
  display: flex;
  margin-bottom: 30rpx;
}

.user-wrapper {
  justify-content: flex-end;
}

.assistant-wrapper {
  justify-content: flex-start;
}

.message {
  display: flex;
  max-width: 75%;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #f0f0f0;
  text-align: center;
  line-height: 80rpx;
  font-size: 40rpx;
}

.content {
  max-width: 70%;
  padding: 20rpx 30rpx;
  border-radius: 20rpx;
  background: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,.1);
}

.user-wrapper .content {
  background: #007aff;
  color: #fff;
}

.loading {
  color: #666;
  font-style: italic;
}

/* Markdown 基础样式 */
.content h1,
.content h2,
.content h3 {
  font-weight: bold;
  margin: 20rpx 0;
}

.content ul {
  padding-left: 30rpx;
}

.content pre {
  background: #f6f8fa;
  padding: 20rpx;
  border-radius: 12rpx;
  overflow-x: auto;
  font-size: 26rpx;
}

.input-area {
  display: flex;
  padding: 20rpx 30rpx;
  background: #fff;
}

.input {
  flex: 1;
  height: 80rpx;
  padding: 0 30rpx;
  background: #f0f0f0;
  border-radius: 40rpx;
}

.send-btn {
  margin-left: 20rpx;
  width: 150rpx;
  height: 80rpx;
  background: #007aff;
  color: #fff;
  border-radius: 40rpx;
}

.clear-btn {
  margin: 20rpx 30rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background: #fff;
  border: 1rpx solid #ff3b30;
  color: #ff3b30;
}
</style>
