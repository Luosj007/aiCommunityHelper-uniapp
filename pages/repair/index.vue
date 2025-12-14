<template>
  <view class="repair-page">
    <view class="page-title">一键报修</view>

    <!-- 报修内容输入框 -->
    <view class="form-item">
      <text class="label">报修内容：</text>
      <textarea 
        class="content-input" 
        v-model="content" 
        placeholder="请详细描述您的报修问题（例如：小区1栋3单元电梯故障）"
        maxlength="200"
        @input="clearError"  
      ></textarea>
    </view>

    <!-- 提交按钮 -->
    <button 
      class="submit-btn" 
      @click="submitOrder"
      :disabled="loading"
      hover-class="submit-btn-hover"  
    >
      <text v-if="loading">提交中...</text>
      <text v-else>提交报修</text>
    </button>

    <!-- 错误提示 -->
    <view v-if="errorMsg" class="error-tip">{{ errorMsg }}</view>
  </view>
</template>

<script>
import { post } from '@/utils/request.js';

export default {
  data() {
    return {
      content: '',       // 用户输入的报修内容
      loading: false,    // 提交加载状态
      errorMsg: ''       // 错误提示信息
    };
  },
  methods: {
    clearError() {
      this.errorMsg = '';
    },

    formatCurrentTime() {
      const date = new Date();
      const padZero = num => num.toString().padStart(2, '0');
      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());
      const hour = padZero(date.getHours());
      const minute = padZero(date.getMinutes());
      const second = padZero(date.getSeconds());
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },

    generateOrderNo() {
      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 900 + 100); // 100-999的随机数，避免短数字
      return `WX${timestamp}${randomNum}`;
    },

    async submitOrder() {
      // 1. 前端强校验：报修内容不能为空/纯空格
      const trimContent = this.content.trim();
      if (!trimContent) {
        this.errorMsg = '请输入报修内容，不能为空';
        uni.showToast({ title: '请输入报修内容', icon: 'none', duration: 2000 });
        return;
      }

      try {
        this.loading = true;
        this.errorMsg = ''; 

        // 2. 构造后端要求的参数
        const orderParams = {
          order_no: this.generateOrderNo(), // 自动生成工单编号
          status: 'pending',                // 默认状态：待处理
          status_text: '待处理',             // 状态文本
          content: trimContent,             // 用户输入的报修内容（去空格）
          time: this.formatCurrentTime()    // 当前时间（自动格式化）
        };

        // 3. 调用后端新增工单接口（原有request.js：code=200会resolve，否则reject）
        await post('/miniprogram/addWorkOrders', orderParams);
        
        // 4. 走到这里说明提交成功（因为失败会进catch）
        // 清空输入框
        this.content = '';
        
        // 提交成功提示
        uni.showToast({
          title: '报修提交成功！',
          icon: 'success',
          duration: 2000,
          mask: true // 遮罩层，防止重复点击
        });
        
				// 延迟跳转（仅保留tabBar页核心跳转逻辑）
				setTimeout(() => {
					uni.switchTab({ 
						url: '/pages/repair/order'
					});
				}, 2000);

      } catch (err) {
        // 5. 异常处理（网络错误/后端code≠200）
        const errMsg = err || '提交失败，请稍后重试';
        this.errorMsg = errMsg;
        uni.showToast({ title: errMsg, icon: 'none', duration: 3000 });
        console.error('报修提交失败：', err);
      } finally {
        // 6. 重置加载状态
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.repair-page {
  padding: 20rpx 30rpx;
  min-height: 100vh;
  background-color: #F5F5F5;
}

.page-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
  margin: 0 0 30rpx 0;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #eee;
}

.form-item {
  margin-bottom: 40rpx;
}

.label {
  font-size: 28rpx;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.content-input {
  width: 100%;
  min-height: 200rpx;
  padding: 15rpx;
  background-color: #fff;
  border: 1rpx solid #eee;
  border-radius: 10rpx;
  font-size: 26rpx;
  color: #333;
  box-sizing: border-box;
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #4CAF50;
  color: #fff;
  border-radius: 10rpx;
  font-size: 28rpx;
  border: none;
}

/* 按钮点击态 */
.submit-btn-hover {
  background-color: #43A047;
  opacity: 0.9;
}

/* 加载中按钮样式（禁用态） */
.submit-btn[disabled] {
  background-color: #ccc;
  color: #999;
}

.error-tip {
  margin-top: 20rpx;
  font-size: 26rpx;
  color: #f56c6c;
  text-align: center;
  line-height: 1.5;
}
</style>