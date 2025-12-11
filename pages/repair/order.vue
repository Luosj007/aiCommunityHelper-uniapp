<template>
  <view class="order-page">
    <view class="page-title">我的工单</view>

    <!-- 核心：v-if和v-else 同级且相邻 -->
    <!-- 无工单数据时展示空状态 -->
    <view v-if="orderList.length === 0" class="order-empty">
      <text>暂无工单记录</text>
      <button class="repair-btn" @click="toRepair">去提交报修</button>
    </view>

    <!-- 有工单数据时展示列表（v-else 与上面的v-if 直接相邻） -->
    <view v-else class="order-list">
      <view class="order-item" v-for="item in orderList" :key="item.id">
        <!-- 工单编号 + 状态 -->
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
          <text>提交时间：{{ item.createTime }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 模拟工单数据（3条不同状态的工单）
const orderList = ref([
  {
    id: 1,
    orderNo: "WX20250611001", // 工单编号
    status: "pending", // 状态标识：pending-待处理 process-处理中 done-已完成
    statusText: "待处理",
    content: "小区1栋3单元电梯故障，无法正常使用", // 报修内容
    createTime: "2025-06-11 09:20:30" // 提交时间
  },
  {
    id: 2,
    orderNo: "WX20250610002",
    status: "process",
    statusText: "处理中",
    content: "家中厨房水管漏水，需要维修人员上门",
    createTime: "2025-06-10 14:15:22"
  },
  {
    id: 3,
    orderNo: "WX20250609003",
    status: "done",
    statusText: "已完成",
    content: "楼道感应灯损坏，更换新的感应灯",
    createTime: "2025-06-09 10:05:18"
  }
])

// 跳转到一键报修页
const toRepair = () => uni.navigateTo({ url: "/pages/repair/index" })
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