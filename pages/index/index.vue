<template>
  <view class="index-page">
    <!-- 常见问题标题 -->
    <view class="qa-title">常见问题</view>
    
    <!-- 常用问题快捷按钮组（无更多问题） -->
    <view class="quick-qa-bar">
      <button class="quick-qa-btn" @click="onSearch('物业费')">物业费</button>
      <button class="quick-qa-btn" @click="onSearch('报修')">报修</button>
      <button class="quick-qa-btn" @click="onSearch('垃圾分类')">垃圾分类</button>
      <button class="quick-qa-btn" @click="onSearch('快递柜在哪')">快递柜</button>
      <!-- <button class="quick-qa-btn" @click="onSearch('电梯坏了')">电梯</button>
      <button class="quick-qa-btn" @click="onSearch('小区门禁卡')">门禁</button> -->

    </view>

    <!-- 常见问题结果展示（有回答时显示） -->
    <view class="qa-result" v-if="qaResult">
      <view class="qa-result-header">
        <text class="qa-label">回答：</text>
        <button class="clear-btn" @click="clearResult">返回</button>
      </view>
      <view class="qa-result-content">
        <text>{{ qaResult }}</text>
      </view>
    </view>

    <!-- 核心功能区（无回答时显示） -->
    <view class="func-area" v-if="!qaResult">
      <view class="func-item" @click="toQA">
        <text class="func-icon">❓</text>
        <text class="func-text">智能问答</text>
      </view>
      <view class="func-item" @click="toGarbage">
        <text class="func-icon">🗑️</text>
        <text class="func-text">垃圾分类</text>
      </view>
      <view class="func-item" @click="toRepair">
        <text class="func-icon">🔧</text>
        <text class="func-text">一键报修</text>
      </view>
      <view class="func-item" @click="toService">
        <text class="func-icon">🏪</text>
        <text class="func-text">便民服务</text>
      </view>
    </view>

    <!-- 便民推荐区（无回答时显示） -->
    <view class="recommend-area" v-if="!qaResult">
      <text class="recommend-title">为你推荐</text>
      <view class="recommend-list">
        <view class="recommend-item" v-for="item in recommendList" :key="item.id" @click="toService">
          <image :src="item.img" class="item-img" mode="aspectFill"></image>
          <view class="item-info">
            <text class="item-name">{{item.name}}</text>
            <text class="item-desc">{{item.desc}}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 社区通知（无回答时显示） -->
    <view class="notice-area" v-if="!qaResult">
      <text class="notice-title">社区通知</text>
      <view class="notice-item" v-for="item in noticeList" :key="item.id" @click="toNotice">
        <text class="notice-content">{{item.content}}</text>
        <text class="notice-time">{{item.time}}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 模拟推荐数据（无回答时显示）
const recommendList = ref([
  { id: 1, img: "/static/shop1.png", name: "XX药店", desc: "24小时营业 | 500米" },
  { id: 2, img: "/static/shop2.png", name: "XX家政", desc: "上门服务 | 好评98%" }
])

// 模拟通知数据（无回答时显示）
const noticeList = ref([
  { id: 1, content: "6月10日小区停水通知（9:00-18:00）", time: "2025-06-09" },
  { id: 2, content: "亲子手工活动报名开始啦！", time: "2025-06-08" }
])

// 常见问题回答结果（核心响应式数据）
const qaResult = ref('')
// 常见问答库
const qaLib = {
  "物业费": "本小区物业费按建筑面积收取，住宅1.8元/㎡/月，商铺3.5元/㎡/月，每月5日前缴纳，可在物业中心或小程序缴费。",
  "物业费怎么交": "你可以通过本小程序“便民服务”板块的“物业费缴纳”入口在线支付，也可到小区物业办公室现场缴纳。",
  "报修": "你可点击首页“一键报修”按钮，填写故障位置、描述并上传照片，物业维修人员会在2小时内联系你，维修完成后可在“我的工单”查看进度。",
  "电梯坏了": "小区电梯故障可优先拨打应急电话：020-12345678，同时在小程序提交报修工单，物业会立即联系维保单位处理。",
  "垃圾分类": "本小区垃圾分类投放时间为7:00-9:00、18:00-20:00；可回收物投蓝色桶、厨余垃圾投绿色桶、有害垃圾投红色桶、其他垃圾投灰色桶。",
  "矿泉水瓶是什么垃圾": "矿泉水瓶属于可回收物，请清洗后投入蓝色可回收物垃圾桶，小区每栋楼下均设有分类投放点。",
  "快递柜在哪": "小区快递柜位于1栋大门右侧、5栋中庭旁，支持丰巢、菜鸟驿站两种柜体，24小时可取件。",
  "小区门禁卡": "小区门禁卡可到物业中心办理，需携带身份证+房产证（或租房合同），工本费10元/张，办理时间：9:00-17:00。"
}
// 点击常用问题→显示对应回答
const onSearch = (question) => {
  qaResult.value = qaLib[question] 
}
// 清空回答结果
const clearResult = () => {
  qaResult.value = ''
}

// 跳转页面方法
const toQA = () => uni.navigateTo({ url: "/pages/qa/index" })
const toGarbage = () => uni.navigateTo({ url: "/pages/garbage/index" })
const toRepair = () => uni.navigateTo({ url: "/pages/repair/index" })
const toService = () => uni.navigateTo({ url: "/pages/service/index" })
const toNotice = () => uni.switchTab({ url: "/pages/notice/center" })
</script>

<style scoped>
.index-page {
  padding: 16rpx;
  background-color: #F5F5F5;
  min-height: 100vh;
}

/* 常见问题标题 */
.qa-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 12rpx;
  padding-left: 8rpx;
}

/* 快捷按钮组 */
.quick-qa-bar {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 16rpx 20rpx;
  box-shadow: 0 1rpx 5rpx #eee;
  margin-bottom: 20rpx;
}
.quick-qa-btn {
  flex: 1;
  margin: 0 8rpx;
  padding: 12rpx 0;
  background-color: #e8f5e9;
  color: #4CAF50;
  border: 1rpx solid #4CAF50;
  border-radius: 40rpx;
  font-size: 26rpx;
}

/* 回答结果样式 */
.qa-result {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 8rpx #eee;
}
.qa-result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15rpx;
  padding-bottom: 10rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.qa-label {
  font-size: 30rpx;
  font-weight: bold;
  color: #4CAF50;
}
.clear-btn {
  padding: 6rpx 20rpx;
  background-color: #e8f5e9;
  color: #4CAF50;
  border: none;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: 500;
}
.clear-btn:active {
  opacity: 0.8;
}
.qa-result-content {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
}

/* 功能区样式 */
.func-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  margin-bottom: 30rpx;
}
.func-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2rpx 10rpx #eee;
}
.func-icon {
  font-size: 40rpx;
  color: #4CAF50;
  margin-bottom: 10rpx;
}
.func-text {
  font-size: 28rpx;
  color: #333;
}

/* 推荐区样式 */
.recommend-area, .notice-area {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx #eee;
}
.recommend-title, .notice-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF9800;
  margin-bottom: 10rpx;
}
.recommend-list {
  width: 100%;
}
.recommend-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15rpx;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.item-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-right: 15rpx;
}
.item-info {
  flex: 1;
}
.item-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5rpx;
}
.item-desc {
  font-size: 24rpx;
  color: #666;
  display: block;
}

/* 通知区样式 */
.notice-item {
  padding: 10rpx 0;
  border-bottom: 1rpx solid #eee;
}
.notice-content {
  font-size: 28rpx;
  color: #333;
  display: block;
}
.notice-time {
  font-size: 24rpx;
  color: #666;
  display: block;
  margin-top: 5rpx;
}
</style>