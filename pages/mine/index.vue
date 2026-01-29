<template>
  <view class="my-page">
    <!-- 顶部绿色通栏（头像+用户名） -->
    <view class="top-green-bar">
      <view :class="['avatar-box', !isLogin ? 'clickable' : '']" @click="goToLogin">
        <view class="avatar-container">
          <image 
            v-if="isLogin" 
            class="avatar" 
            src="/static/at.png" 
            mode="aspectFill"
          ></image>
          <view v-else class="avatar-placeholder"></view>
        </view>
        <text class="username">{{ isLogin ? '飞翔的鹰' : '点击头像登录' }}</text>
      </view>
    </view>

    <!-- 功能入口卡片：仅登录后显示 -->
    <view v-if="isLogin" class="func-card">
      <view class="func-item">
        <image class="func-icon" src="/static/activity-icon.png"></image>
        <text class="func-text">8 推荐</text>
      </view>
      <view class="func-item">
        <image class="func-icon" src="/static/notice-icon.png"></image>
        <text class="func-text">24 通知</text>
      </view>
    </view>

    <!-- 功能列表（含常见问题/社区规则） -->
    <view class="func-list">
      <!-- 常见问题 -->
      <view class="menu-item" @click="goToProblem">
        <view class="menu-icon">
          <uni-icons type="help-filled" size="36rpx" color="#666"></uni-icons>
        </view>
        <view class="menu-text">常见问题</view>  
        <uni-icons type="right" size="28rpx" color="#ccc"></uni-icons>
      </view>
      <!-- 社区规则 -->
      <view class="menu-item" @click="goToRule">
        <view class="menu-icon">
          <uni-icons type="chatboxes" size="36rpx" color="#666"></uni-icons>
        </view>
        <view class="menu-text">社区规则</view>
        <uni-icons type="right" size="28rpx" color="#ccc"></uni-icons>
      </view>
    </view>

    <!-- 退出登录按钮：仅登录后显示，调整位置避免留白 -->
    <button v-if="isLogin" class="logout-btn" @click="logout">退出登录</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      userInfo: {}
    };
  },

  onLoad() {
    this.checkLoginStatus();
  },

  methods: {
    checkLoginStatus() {
      const token = uni.getStorageSync('wx_token');
      const userInfo = uni.getStorageSync('wx_userInfo') || {};
      if (token && userInfo.nickName) {
        this.isLogin = true;
        this.userInfo = userInfo;
      }
    },

    goToLogin() {
      if (!this.isLogin) {
        uni.navigateTo({ url: '/pages/mine/login' });
      }
    },

    // 跳转常见问题
    goToProblem() {
      uni.navigateTo({ url: '/pages/mine/problem' });
    },

    // 跳转社区规则
    goToRule() {
      uni.navigateTo({ url: '/pages/mine/rule' });
    },

    logout() {
      uni.showModal({
        title: '确认退出',
        content: '是否确定退出登录？',
        success: (res) => {
          if (res.confirm) {
            uni.removeStorageSync('wx_token');
            uni.removeStorageSync('wx_userInfo');
            this.isLogin = false;
            this.userInfo = {};
            uni.showToast({ title: '已退出登录', icon: 'success' });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
/* 页面基础样式 */
.my-page {
  background-color: #f8f8f8;
  min-height: 100vh;
}

/* 顶部绿色通栏 */
.top-green-bar {
  background: linear-gradient(to bottom, #34d399, #10b981);
  padding: 80rpx 30rpx 50rpx;
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
  text-align: center;
}

.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25rpx;
}

/* 未登录时可点击样式 + 点击反馈 */
.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}
.clickable:active {
  opacity: 0.9;
  transform: scale(0.98);
}

.avatar-container {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 5rpx solid #ffffff;
  box-shadow: 0 6rpx 15rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #e6e6e6; /* 灰白色背景 */
}

.username {
  font-size: 32rpx;
  color: #ffffff;
  font-weight: 600;
}

/* 功能入口卡片：登录后显示，优化间距 */
.func-card {
  background-color: #ffffff;
  margin: 30rpx 20rpx;
  padding: 35rpx 0;
  border-radius: 20rpx;
  box-shadow: 0 3rpx 12rpx rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-around;
}

.func-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  transition: all 0.2s ease;
}
.func-item:active {
  opacity: 0.8;
  transform: scale(0.95);
}

.func-icon {
  width: 55rpx;
  height: 55rpx;
}
.func-text {
  font-size: 28rpx;
  color: #666666;
}

/* 功能列表：优化未登录时的间距，避免空洞 */
.func-list {
  background-color: #ffffff;
  margin: 30rpx 20rpx;
  border-radius: 20rpx;
  box-shadow: 0 3rpx 12rpx rgba(0, 0, 0, 0.06);
}

/* 菜单项样式 + 点击反馈 */
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 35rpx 30rpx;
  border-bottom: 1rpx solid #f3f3f3;
  transition: all 0.2s ease;
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-item:active {
  background-color: #f8f8f8;
}

.menu-icon {
  margin-right: 25rpx;
}
.menu-text {
  font-size: 30rpx;
  color: #333333;
  flex: 1;
}

/* 退出登录按钮：优化样式和间距 */
.logout-btn {
  background-color: transparent;
  color: #ef4444;
  font-size: 30rpx;
  margin: 0 20rpx 30rpx;
  padding: 22rpx 0;
  border: 1rpx solid #ef4444;
  border-radius: 12rpx;
  transition: all 0.2s ease;
}
.logout-btn:active {
  background-color: #fef2f2;
}
</style>