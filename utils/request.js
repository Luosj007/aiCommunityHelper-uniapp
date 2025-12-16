// utils/request.js
// 后端基础地址（本地调试用，上线换服务器IP/域名）
const baseUrl = 'http://localhost:7001';

/**
 * UniApp 请求封装
 * @param {string} url 接口路径（如 /miniprogram/services）
 * @param {string} method 请求方法 GET/POST
 * @param {object} data 请求参数
 */
export const request = (url, method = 'GET', data = {}) => {
  // ========== 核心修改1：读取本地token并添加到请求头 ==========
  const token = uni.getStorageSync('wx_token'); // 读取登录存储的token
  const header = {
    'content-type': 'application/json',
  };
  // 有token时，添加Authorization请求头（匹配后端auth中间件）
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url, // 拼接完整地址
      method,
      data,
      header, // 替换为带token的header
      success: (res) => {
        // ========== 核心修改2：处理401 token失效/未提供 ==========
        if (res.data.code === 401) {
          // 清除无效token
          uni.removeStorageSync('wx_token');
          uni.removeStorageSync('wx_userInfo');
          // 提示并跳登录页（排除登录页本身，避免循环）
          uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' });
          const pages = getCurrentPages();
          const currentPage = pages[pages.length - 1];
          if (currentPage.route !== 'pages/mine/login') {
            uni.navigateTo({ url: '/pages/mine/login' });
          }
          reject(res.data.message || '登录已过期');
          return;
        }

        // 原有成功/失败逻辑保留
        if (res.data.code === 200) {
          resolve(res.data.data); // 只返回后端的data部分
        } else {
          reject(res.data.message || '接口请求失败');
        }
      },
      fail: (err) => {
        reject('网络错误，请检查后端服务是否启动');
        console.error('请求失败：', err);
      },
    });
  });
};

// 快捷封装GET请求（简化调用）
export const get = (url, data) => request(url, 'GET', data);
// 快捷封装POST请求（后续有需要可加）
export const post = (url, data) => request(url, 'POST', data);