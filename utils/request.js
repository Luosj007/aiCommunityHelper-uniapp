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
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url, // 拼接完整地址
      method,
      data,
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
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