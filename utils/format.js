// utils/format.js - 统一时间格式化工具

const pad = (n) => String(n).padStart(2, '0')

/**
 * 格式化日期值（支持时间戳、ISO字符串、Date对象）
 * @param {*} val - 日期值
 * @returns {string} "YYYY-MM-DD HH:mm:ss"
 */
export const formatDate = (val) => {
  if (!val) return ''
  const d = new Date(val)
  if (isNaN(d.getTime())) return String(val)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

/**
 * 获取当前时间的格式化字符串
 * @returns {string} "YYYY-MM-DD HH:mm:ss"
 */
export const formatNow = () => formatDate(new Date())

/**
 * 格式化 UTC 时间为东八区时间（UTC+8）
 * @param {*} val - 日期值
 * @returns {string} "YYYY-MM-DD HH:mm:ss"
 */
export const formatUTC8 = (val) => {
  if (!val) return ''
  const d = new Date(val)
  if (isNaN(d.getTime())) return String(val)
  d.setHours(d.getHours() + 8)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
