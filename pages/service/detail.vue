<template>
  <view class="detail-page">
    <!-- 顶部大图 -->
    <image :src="service.img" class="detail-banner" mode="aspectFill"></image>
    
    <!-- 核心信息区 -->
    <view class="core-info">
      <text class="detail-name">{{ service.name }}</text>
      <text class="detail-desc">{{ service.desc }}</text>
      <text class="detail-label">发布时间：</text>
      <text class="detail-value">{{ service.createdAt }}</text>
    </view>

    <!-- 详细信息区（渲染所有字段） -->
    <view class="detail-list">
      <view class="detail-row">
        <text class="detail-label">营业时间：</text>
        <text class="detail-value">{{ service.time }}</text>
      </view>
      <view class="detail-row">
        <text class="detail-label">距离小区：</text>
        <text class="detail-value">{{ service.distance }}</text>
      </view>
      <view class="detail-row">
        <text class="detail-label">联系电话：</text>
        <text class="detail-value">{{ service.phone }}</text>
      </view>
      <view class="detail-row full-width">
        <text class="detail-label">服务详情：</text>
        <text class="detail-value content-text">{{ service.content }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { get } from '@/utils/request.js';
import { baseUrl } from '@/utils/request.js';
import { formatUTC8 } from '@/utils/format.js';
export default {
  data() {
    return { service: {} };
  },
  onLoad(options) {
    this.getServiceDetail(options.id);
  },
  methods: {
    formatUTC8,

    async getServiceDetail(id) {
      const res = await get(`/miniprogram/services/${id}`);
      // 拼接完整图片地址
      if (res.img && !res.img.startsWith('http')) {
        res.img = baseUrl + res.img;
      }
      res.createdAt = formatUTC8(res.createdAt);
      res.updatedAt = formatUTC8(res.updatedAt);
      this.service = res;
    }
  }
};
</script>

<style scoped>
/* 详情页整体样式 */
.detail-page {
  background-color: #F5F5F5;
  min-height: 100vh;
}

/* 顶部banner图 */
.detail-banner {
  width: 100%;
  height: 300rpx;
  border-radius: 0 0 20rpx 20rpx;
}

/* 核心信息 */
.core-info {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 15rpx;
}
.detail-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}
.detail-desc {
  font-size: 24rpx;
  color: #666;
  display: block;
}

/* 详细信息列表 */
.detail-list {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 12rpx;
  margin: 0 20rpx;
}

/* 信息行通用样式 */
.detail-row {
  display: flex;
  align-items: flex-start;
  padding: 10rpx 0;
  border-bottom: 1px solid #f5f5f5;
}
/* 最后一行去掉下划线 */
.detail-row:last-child {
  border-bottom: none;
}

/* 适配content长文本的行 */
.full-width {
  flex-direction: column;
}

/* 标签样式 */
.detail-label {
  font-size: 22rpx;
  color: #999;
  width: 120rpx;
  flex-shrink: 0; /* 固定标签宽度 */
}
/* 长文本值样式 */
.content-text {
  font-size: 22rpx;
  color: #333;
  line-height: 1.6;
  margin-top: 5rpx;
}

/* 普通值样式 */
.detail-value {
  font-size: 22rpx;
  color: #333;
  flex: 1;
}
</style>