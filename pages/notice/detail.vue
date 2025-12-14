<template>
  <view class="notice-detail-page">
    <view class="detail-title">{{ currentNotice.title }}</view>
    <view class="detail-time">{{ currentNotice.time }}</view>
    <view class="detail-content">{{ currentNotice.content }}</view>
  </view>
</template>

<script>
import { get } from '@/utils/request.js';

export default {
  data() {
    return {
      currentNotice: {} // 清空静态数据
    };
  },
  onLoad(options) {
    // 和service一致：onLoad直接调用详情请求方法
    this.getNoticeDetail(options.id);
  },
  methods: {
    // 接口请求：和service的getServiceDetail写法完全一致
    async getNoticeDetail(id) {
      const res = await get(`/miniprogram/notices/${id}`);
      this.currentNotice = res;
    }
  }
};
</script>

<style scoped>
/* 详情页整体样式 */
.notice-detail-page {
  padding: 20rpx;
  background-color: #F5F5F5;
  min-height: 100vh;
}

/* 通知标题 */
.detail-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.6;
  margin-bottom: 15rpx;
}

/* 通知时间 */
.detail-time {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 25rpx;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #eee;
}

/* 通知详细内容 */
.detail-content {
  font-size: 28rpx;
  color: #555;
  line-height: 1.8;
  background-color: #fff;
  padding: 25rpx 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 1rpx 5rpx rgba(0, 0, 0, 0.05);
}
</style>