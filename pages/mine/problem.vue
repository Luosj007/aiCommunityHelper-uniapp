<template>
  <view class="problem-page">
    <view class="header">
      <text class="title">常见问题</text>
    </view>
    
    <scroll-view scroll-y class="content-container">
      <!-- 账号相关 -->
      <view class="category">
        <text class="category-title">📱 账号相关</text>
        
        <view class="qa-item">
          <text class="question">Q1: 如何注册账号？</text>
          <text class="answer">在登录页面点击"注册"按钮，按照提示填写手机号、验证码和密码即可完成注册。</text>
        </view>
        
        <view class="qa-item">
          <text class="question">Q2: 忘记密码怎么办？</text>
          <text class="answer">在登录页面点击"忘记密码"，通过手机验证码验证身份后即可重置密码。</text>
        </view>
        
        <view class="qa-item">
          <text class="question">Q3: 如何修改个人信息？</text>
          <text class="answer">登录后进入"我的"页面，点击头像区域即可修改昵称、头像等个人信息。</text>
        </view>
      </view>
      
      <!-- 功能使用 -->
      <view class="category">
        <text class="category-title">⚙️ 功能使用</text>
        
        <view class="qa-item">
          <text class="question">Q1: 如何提交报修？</text>
          <text class="answer">进入"报修记录"页面，点击"新增报修"按钮，填写相关信息并提交即可。</text>
        </view>
        
        <view class="qa-item">
          <text class="question">Q2: 如何查看通知？</text>
          <text class="answer">所有通知都会在"通知中心"显示，未读通知会有红点提示。</text>
        </view>
        
        <view class="qa-item">
          <text class="question">Q3: 推荐功能有什么用？</text>
          <text class="answer">推荐功能会根据您的使用习惯，为您推荐相关的内容和服务。</text>
        </view>
      </view>
      
      <!-- 支付问题 -->
      <view class="category">
        <text class="category-title">💰 支付问题</text>
        
        <view class="qa-item">
          <text class="question">Q1: 支持哪些支付方式？</text>
          <text class="answer">目前支持微信支付、支付宝支付，后续会开通更多支付方式。</text>
        </view>
        
        <view class="qa-item">
          <text class="question">Q2: 支付失败怎么办？</text>
          <text class="answer">请检查网络连接、账户余额，如仍失败请联系客服处理。</text>
        </view>
        
        <view class="qa-item">
          <text class="question">Q3: 如何申请退款？</text>
          <text class="answer">在相关订单详情页申请退款，审核通过后1-7个工作日原路退回。</text>
        </view>
      </view>
      
      <!-- 其他问题 -->
      <view class="category">
        <text class="category-title">❓ 其他问题</text>
        
        <view class="qa-item">
          <text class="question">Q1: 如何联系客服？</text>
          <text class="answer">您可以在工作时间拨打客服热线：400-123-4567，或通过在线客服咨询。</text>
        </view>
        
        <view class="qa-item">
          <text class="question">Q2: 反馈意见到哪里？</text>
          <text class="answer">进入"我的"页面，找到"意见反馈"入口提交您的宝贵建议。</text>
        </view>
        
        <view class="qa-item">
          <text class="question">Q3: 如何查看版本更新？</text>
          <text class="answer">进入应用商店检查更新，或关注官方公告获取最新版本信息。</text>
        </view>
      </view>
      
      <!-- 联系客服 -->
      <view class="contact-section">
        <text class="contact-title">📞 需要更多帮助？</text>
        <text class="contact-info">客服热线：400-123-4567</text>
        <text class="contact-info">服务时间：9:00-18:00（周一至周五）</text>
        <text class="contact-info">邮箱：support@example.com</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.problem-page {
  padding: 30rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

.content-container {
  height: calc(100vh - 150rpx);
}

.category {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.category-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #3b82f6;
  display: block;
  margin-bottom: 25rpx;
  padding-bottom: 15rpx;
  border-bottom: 2rpx solid #e5e7eb;
}

.qa-item {
  margin-bottom: 30rpx;
}

.qa-item:last-child {
  margin-bottom: 0;
}

.question {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 15rpx;
  background-color: #f3f4f6;
  padding: 20rpx;
  border-radius: 10rpx;
}

.answer {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  display: block;
  padding-left: 20rpx;
  padding-right: 20rpx;
}

.contact-section {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 16rpx;
  padding: 40rpx 30rpx;
  margin-top: 20rpx;
  text-align: center;
}

.contact-title {
  font-size: 36rpx;
  font-weight: 600;
  color: white;
  display: block;
  margin-bottom: 25rpx;
}

.contact-info {
  font-size: 30rpx;
  color: rgba(255, 255, 255, 0.9);
  display: block;
  margin-bottom: 15rpx;
  line-height: 1.6;
}

.contact-info:last-child {
  margin-bottom: 0;
}
</style>