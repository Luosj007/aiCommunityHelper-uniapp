<template>
  <view class="rule-page">
    <view class="header">
      <text class="title">社区规则</text>
    </view>
    
    <scroll-view scroll-y class="content-container">
      <view class="section">
        <text class="section-title">一、总则</text>
        <text class="section-content">
          1. 为了维护社区良好秩序，保障用户合法权益，制定本规则。
          2. 本社区倡导文明、理性、友善的交流氛围。
          3. 所有用户在使用本社区服务时，应当遵守法律法规及本规则。
        </text>
      </view>
      
      <view class="section">
        <text class="section-title">二、行为规范</text>
        <text class="section-content">
          1. 禁止发布违法违规信息，包括但不限于：
            • 危害国家安全、泄露国家秘密
            • 煽动民族仇恨、民族歧视
            • 传播暴力、色情、赌博内容
            • 散布谣言，扰乱社会秩序
            
          2. 禁止恶意攻击、谩骂、侮辱他人
          3. 禁止发布垃圾广告、营销信息
          4. 禁止侵犯他人知识产权
          5. 禁止恶意刷屏、灌水行为
        </text>
      </view>
      
      <view class="section">
        <text class="section-title">三、内容管理</text>
        <text class="section-content">
          1. 用户发布的内容应当真实、准确、合法
          2. 鼓励原创内容，转载需注明出处
          3. 涉及他人隐私的内容需获得授权
          4. 管理员有权对违规内容进行处理
        </text>
      </view>
      
      <view class="section">
        <text class="section-title">四、违规处理</text>
        <text class="section-content">
          1. 轻微违规：警告并删除违规内容
          2. 一般违规：禁言1-7天
          3. 严重违规：禁言30天或永久封禁
          4. 特别严重：上报相关部门处理
        </text>
      </view>
      
      <view class="section">
        <text class="section-title">五、用户权利</text>
        <text class="section-content">
          1. 有权举报违规内容和行为
          2. 有权对处理决定提出申诉
          3. 有权了解社区规则变化
          4. 有权保护个人隐私信息
        </text>
      </view>
      
      <view class="section">
        <text class="section-title">六、附则</text>
        <text class="section-content">
          1. 本规则自发布之日起生效
          2. 社区有权根据实际情况修改规则
          3. 最终解释权归社区所有
          4. 如有疑问请联系客服
        </text>
      </view>
      
      <view class="footer">
        <text class="update-time">最后更新：2024年1月</text>
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
.rule-page {
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

.section {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #10b981;
  display: block;
  margin-bottom: 20rpx;
  border-left: 8rpx solid #10b981;
  padding-left: 20rpx;
}

.section-content {
  font-size: 30rpx;
  color: #555;
  line-height: 1.8;
  display: block;
}

.footer {
  text-align: center;
  margin: 40rpx 0;
}

.update-time {
  font-size: 28rpx;
  color: #999;
}
</style>