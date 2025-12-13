<template>
  <view class="service-page">
    <view class="page-title">便民服务</view>
    <view class="service-list">
      <view class="service-card" v-for="item in serviceList" :key="item.id">
        <!-- 1. 服务名称（单独放在最上方） -->
        <text class="service-name">{{ item.name }}</text>
        <!-- 2. 下方区域：左图 + 右信息 -->
        <view class="content-wrap">
          <!-- 左侧：固定尺寸图片（不管原图多大，显示一致） -->
          <view class="img-area">
            <image :src="item.img" class="service-img" mode="aspectFill"></image>
          </view>
          <!-- 右侧：紧凑排列的信息 -->
          <view class="info-area">
            <text class="service-desc">{{ item.desc }}</text>
            <view class="detail-row">
              <text class="detail-label">营业时间：</text>
              <text class="detail-value">{{ item.time }}</text>
            </view>
            <view class="detail-row">
              <text class="detail-label">距离小区：</text>
              <text class="detail-value">{{ item.distance }}</text>
            </view>
            <view class="detail-row">
              <text class="detail-label">联系电话：</text>
              <text class="detail-value">{{ item.phone }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		serviceList: [
			{
				id: 1,
				img: "/static/shop1.png",
				name: "仁心社区药店",
				desc: "医保定点 | 24小时营业",
				time: "全天24小时",
				distance: "500米",
				phone: "020-87654321"
			},
			{
				id: 2,
				img: "/static/shop2.png",
				name: "悦家专业家政服务中心",
				desc: "专业保洁 | 上门服务",
				time: "08:00-22:00",
				distance: "800米",
				phone: "020-12345678"
			},
			{
				id: 3,
				img: "/static/shop3.png",
				name: "鲜丰邻里生鲜超市",
				desc: "新鲜果蔬 | 配送到家",
				time: "07:00-23:00",
				distance: "300米",
				phone: "020-86547321"
			},
			{
				id: 4,
				img: "/static/shop4.png",
				name: "爱心宠物医院",
				desc: "专业兽医 | 24小时急诊",
				time: "09:00-22:00（急诊24小时）",
				distance: "1.2公里",
				phone: "020-99998888"
			}
		]
    };
  }
};
</script>

<style scoped>
.service-page {
  padding: 20rpx;
  background-color: #F5F5F5;
  min-height: 100vh;
}

.page-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #FF9800;
  margin: 0 0 20rpx 10rpx;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 15rpx; /* 压缩卡片间距 */
}

/* 卡片：垂直布局（先名字，再内容） */
.service-card {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 15rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.03);
}

/* 1. 服务名称（最上方，加粗突出） */
.service-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx; /* 减少与下方区域的间距 */
}

/* 2. 下方内容容器：左图 + 右信息（紧凑排列） */
.content-wrap {
  display: flex;
  align-items: center; /* 垂直居中，减少空隙 */
}

/* 左侧图片：固定宽高（不管原图多大，显示一致） */
.img-area {
  width: 100rpx;  /* 固定宽度 */
  height: 100rpx; /* 固定高度 */
  border-radius: 8rpx;
  overflow: hidden;
  margin-right: 15rpx; /* 压缩图片与信息的间距 */
}
/* 图片填满固定区域，不变形 */
.service-img {
  width: 100%;
  height: 100%;
  mode: "aspectFill"; /* 保持比例并填满容器 */
}

/* 右侧信息区域：紧凑排版 */
.info-area {
  flex: 1;
}

/* 服务描述 */
.service-desc {
  font-size: 22rpx;
  color: #666;
  display: block;
  margin-bottom: 8rpx;
}

/* 详细信息行：压缩间距 */ 
.detail-row {
  display: flex;
  font-size: 20rpx; /* 缩小字体，提升利用率 */
  margin-bottom: 3rpx; /* 减少行间距 */
}
.detail-label {
  color: #999;
  width: 120rpx; /* 压缩标签宽度 */
}
.detail-value {
  color: #333;
}
</style>