<template>
  <view class="order-page">
    <view class="page-title">报修记录</view>
    <view v-if="orderList.length === 0" class="order-empty">
      <text>暂无保修记录</text>
      <button class="repair-btn" @click="toRepair">去提交报修</button>
    </view>
    <view v-else class="order-list">
      <view class="order-item" v-for="item in orderList" :key="item.id">
        <view class="order-header">
          <text class="order-no">工单编号：{{ item.orderNo }}</text>
          <text 
            class="order-status" 
            :class="{
              'status-pending': item.status === 'pending', 
              'status-process': item.status === 'process', 
              'status-done': item.status === 'done'
            }"
          >
            {{ item.statusText }}
          </text>
        </view>
        <!-- 工单内容 -->
        <view class="order-content">
          <text class="content-label">报修内容：</text>
          <text class="content-text">{{ item.content }}</text>
        </view>
        <!-- 报修时间 -->
        <view class="order-time">
          <text>提交时间：{{ item.time }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { get } from '@/utils/request.js';

export default {
  data() {
    return {
      orderList: []
    };
  },
  // 和通知列表一致：页面加载时调用请求方法
  onLoad() {
    this.getOrderList();
  },
  methods: {
    // 和通知列表的getNoticeList写法完全一致
    async getOrderList() {
      const res = await get('/miniprogram/workOrders', { page: 1, size: 10 });
      this.orderList = res.list;
    },
    toRepair() {
      uni.navigateTo({ url: "/pages/repair/index" });
    }
  }
};
</script>

<style scoped>
.order-page {
  padding: 20rpx;
  min-height: 100vh;
  background-color: #F5F5F5;
}
.page-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

/* 工单列表样式 */
.order-list {
  width: 100%;
}
.order-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 15rpx;
  box-shadow: 0 2rpx 8rpx #eee;
}
/* 工单头部（编号+状态） */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15rpx;
  padding-bottom: 10rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.order-no {
  font-size: 26rpx;
  color: #666;
}
/* 不同状态的样式 */
.order-status {
  padding: 5rpx 15rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}
.status-pending {
  background-color: #fff3e0;
  color: #ff9800;
}
.status-process {
  background-color: #e3f2fd;
  color: #2196f3;
}
.status-done {
  background-color: #e8f5e9;
  color: #4caf50;
}

/* 工单内容 */
.order-content {
  margin-bottom: 10rpx;
}
.content-label {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-right: 10rpx;
}
.content-text {
  font-size: 28rpx;
  color: #333;
}

/* 工单时间 */
.order-time {
  font-size: 24rpx;
  color: #999;
}

/* 空状态样式 */
.order-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200rpx;
}
.order-empty text {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
}
/* 按钮样式（原生button，无uni-ui依赖） */
.repair-btn {
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #4CAF50;
  color: #fff;
  border-radius: 40rpx;
  font-size: 28rpx;
  border: none;
}
</style>