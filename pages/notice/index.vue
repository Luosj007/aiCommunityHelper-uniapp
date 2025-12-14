<template>
  <view class="notice-center-page">
    <!-- 页面标题 -->
    <view class="page-title">相关通知</view>
    <!-- 通知列表 -->
    <view class="notice-list">
      <view 
        class="notice-item" 
        v-for="item in noticeList" 
        :key="item.id" 
        @click="goToDetail(item.id)"
      >
        <text class="notice-title">{{ item.title }}</text>
        <text class="notice-time">{{ item.time }}</text>
      </view>
    </view>
  </view>
</template>

<script>
// 接口逻辑：和service完全一致的导入+写法
import { get } from '@/utils/request.js';

export default {
  data() {
    return {
      noticeList: [] // 仅清空静态数据，结构和service一致
    };
  },
  onLoad() {
    // 和service一致：onLoad直接调用请求方法
    this.getNoticeList();
  },
  methods: {
    // 接口请求：和service的getServiceList写法完全一致
    async getNoticeList() {
      const res = await get('/miniprogram/notices', { page: 1, size: 10 });
      this.noticeList = res.list;
    },
    // 跳转逻辑：和service的goToDetail写法完全一致
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/notice/detail?id=${id}`
      });
    }
  }
};
</script>

<style scoped>
/* 页面整体样式 */
.notice-center-page {
  padding: 20rpx;
  background-color: #F5F5F5;
  min-height: 100vh;
}

/* 页面标题 */
.page-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
  margin: 0 0 25rpx 10rpx;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #eee;
}

/* 通知列表布局 */
.notice-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

/* 通知项卡片 */
.notice-item {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx 18rpx;
  box-shadow: 0 1rpx 5rpx rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

/* 通知标题（列表页核心展示） */
.notice-title {
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
  display: block;
  margin-bottom: 10rpx;
}

/* 通知时间 */
.notice-time {
  font-size: 24rpx;
  color: #999;
}
</style>