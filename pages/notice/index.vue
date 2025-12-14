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
export default {
  data() {
    return {
      noticeList: [
        { id: 1, title: "6月10日小区停水通知（9:00-18:00）", time: "2025-06-09" },
        { id: 2, title: "亲子手工活动报名开始啦！（6月18日9:00-11:00，仅限30组家庭）", time: "2025-06-08" },
        { id: 3, title: "小区消防演练通知（6月15日15:00，1栋/2栋业主需配合）", time: "2025-06-12" },
        { id: 4, title: "7月物业费开始缴纳（截止6月30日，小程序缴费立减5元）", time: "2025-06-18" },
        { id: 5, title: "小区绿化改造通知（6月20日-25日，3栋旁绿化带暂停使用）", time: "2025-06-15" },
        { id: 6, title: "暑期少儿安全教育讲座报名（6月22日14:00，物业会议室）", time: "2025-06-19" }
      ]
    };
  },
  methods: {
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