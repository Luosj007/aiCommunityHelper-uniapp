<template>
  <view class="login-page">
    <view class="login-wrap">
      <text class="login-title">微信一键登录</text>
      <button class="login-btn" type="primary" @click="wxLogin">微信授权登录</button>
    </view>
  </view>
</template>

<script>
import { post } from '@/utils/request.js';

export default {
  methods: {
    async wxLogin() {
      try {
        // 1. 获取用户授权
        const userProfileRes = await new Promise((resolve, reject) => {
          uni.getUserProfile({
            desc: '用于登录系统',
            success: resolve,
            fail: reject
          });
        });
        const { nickName, avatarUrl } = userProfileRes.userInfo;

        // 2. 获取登录code
        const loginRes = await new Promise((resolve, reject) => {
          uni.login({
            success: resolve,
            fail: reject
          });
        });
        if (!loginRes.code) {
          uni.showToast({ title: '获取登录凭证失败', icon: 'none' });
          return;
        }

        // 3. 调用后端登录接口
        const res = await post('/miniprogram/login', {
          code: loginRes.code,
          nickName,
          avatarUrl
        });

        if (res.code === 200) {
          // 存储登录状态
          uni.setStorageSync('wx_token', res.data.token);
          uni.setStorageSync('wx_userInfo', { nickName, avatarUrl });
          // 登录成功返回我的页面
          uni.navigateBack();
          uni.showToast({ title: '登录成功' });
        } else {
          uni.showToast({ title: res.msg, icon: 'none' });
        }
      } catch (err) {
        uni.showToast({ title: '登录失败，请重试', icon: 'none' });
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}
.login-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40rpx;
  padding: 60rpx 40rpx;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05);
}
.login-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
}
.login-btn {
  width: 400rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 30rpx;
}
</style>