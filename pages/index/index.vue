<template>
  <view class="index-page">

    <view class="qa-title">常见问题</view>
    <!-- 常用问题 -->
    <view class="quick-qa-bar">
      <button class="quick-qa-btn" @click="onSearch('物业费')">物业费</button>
      <button class="quick-qa-btn" @click="onSearch('报修')">报修</button>
      <button class="quick-qa-btn" @click="onSearch('垃圾分类')">垃圾分类</button>
      <button class="quick-qa-btn" @click="onSearch('快递柜在哪')">快递柜</button>
      <button class="quick-qa-btn" @click="onSearch('电梯坏了')">电梯</button>
      <button class="quick-qa-btn" @click="onSearch('小区门禁卡')">门禁</button>
      <button class="quick-qa-btn" @click="onSearch('车位租赁')">车位租赁</button>
      <button class="quick-qa-btn" @click="onSearch('噪音投诉')">噪音投诉</button>
    </view>
    <!-- 回答区域 -->
    <view class="qa-result" v-if="qaResult">
      <view class="qa-result-header">
        <text class="qa-label">回答：</text>
        <button class="clear-btn" @click="clearResult">返回</button>
      </view>
      <view class="qa-result-content">
        <text>{{ qaResult }}</text>
      </view>
    </view>

    <!-- 核心功能 -->
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

    <!-- 为你推荐 -->
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
      <!-- 新增：点击查看更多 -->
      <view class="view-more" @click="toService">
        <text>点击查看更多</text>
      </view>
    </view>

    <!-- 社区通知 -->
    <view class="notice-area" v-if="!qaResult">
      <text class="notice-title">社区通知</text>
      <view class="notice-item" v-for="item in noticeList" :key="item.id" @click="toNotice">
        <text class="notice-content">{{item.content}}</text>
        <text class="notice-time">{{item.time}}</text>
      </view>
      <!-- 新增：点击查看更多 -->
      <view class="view-more" @click="toNotice">
        <text>点击查看更多</text>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.css' 

const recommendList = ref([
  { id: 1, img: "/static/shop1.png", name: "仁心社区药店", desc: "医保定点 | 24小时营业" },
  { id: 2, img: "/static/shop2.png", name: "悦家专业家政服务中心", desc: "专业保洁 | 上门服务" }
])
const noticeList = ref([
  { id: 1, content: "6月10日小区停水通知（9:00-18:00）", time: "2025-06-09" },
  { id: 2, content: "亲子手工活动报名开始啦！", time: "2025-06-08" }
])
const qaResult = ref('')
const qaLib = {
  "物业费": "本小区物业费按建筑面积收取，住宅1.8元/㎡/月，商铺3.5元/㎡/月，每月5日前缴纳，可在物业中心或小程序缴费。",
  "报修": "你可点击首页“一键报修”按钮，填写故障位置、描述并上传照片，物业维修人员会在2小时内联系你，维修完成后可在“我的工单”查看进度。",
  "垃圾分类": "本小区垃圾分类投放时间为7:00-9:00、18:00-20:00；可回收物投蓝色桶、厨余垃圾投绿色桶、有害垃圾投红色桶、其他垃圾投灰色桶。",
  "快递柜在哪": "小区快递柜位于1栋大门右侧、5栋中庭旁，支持丰巢、菜鸟驿站两种柜体，24小时可取件。",
  "电梯坏了": "小区电梯故障可优先拨打应急电话：020-12345678，同时在小程序提交报修工单，物业会立即联系维保单位处理。",
  "小区门禁卡": "小区门禁卡可到物业中心办理，需携带身份证+房产证（或租房合同），工本费10元/张，办理时间：9:00-17:00。",
  "车位租赁": "小区地下车位租赁价格为350元/月，可在物业中心办理租赁手续，需提供车辆行驶证复印件和车主身份证复印件。",
  "噪音投诉": "若遇到装修或生活噪音扰民，建议打物业电话处理，物业将在30分钟内到场处理。非工作时间可拨打值班电话：020-87654321。"
}

const onSearch = (question) => {
  qaResult.value = qaLib[question] 
}
const clearResult = () => {
  qaResult.value = ''
}
const toQA = () => uni.navigateTo({ url: "/pages/qa/index" })
const toGarbage = () => uni.navigateTo({ url: "/pages/garbage/index" })
const toRepair = () => uni.navigateTo({ url: "/pages/repair/index" })
const toService = () => uni.navigateTo({ url: "/pages/service/index" })
const toNotice = () => uni.switchTab({ url: "/pages/notice/index" })
</script>
