<template>
  <view class="notice-detail-page">
    <!-- 通知标题 -->
    <view class="detail-title">{{ currentNotice.title }}</view>
    
    <!-- 通知发布时间 -->
    <view class="detail-time">{{ currentNotice.time }}</view>
    
    <!-- 通知详细内容 -->
    <view class="detail-content">{{ currentNotice.content }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentNotice: {}, // 当前选中的通知详情
      // 完整通知数据：包含id/title/time/content（详情页展示用）
      noticeList: [
        { 
          id: 1, 
          title: "6月10日小区停水通知（9:00-18:00）", 
          time: "2025-06-09",
          content: "尊敬的业主：因小区供水主管道年度维护，本小区将于6月10日9:00-18:00暂停供水。请您提前做好储水准备，停水期间请关闭家中所有水龙头，避免恢复供水后造成漏水。维护完成后将逐步恢复供水，给您带来不便，敬请谅解！"
        },
        { 
          id: 2, 
          title: "亲子手工活动报名开始啦！（6月18日9:00-11:00，仅限30组家庭）", 
          time: "2025-06-08",
          content: "【社区活动通知】为丰富业主亲子生活，物业将于6月18日（周三）9:00-11:00在小区中庭举办“亲子手工DIY”活动，仅限30组家庭参与。活动提供免费材料包，完成的作品可带回家。报名方式：联系物业管家/小程序活动板块报名，截止时间6月16日18:00。"
        },
        { 
          id: 3, 
          title: "小区消防演练通知（6月15日15:00，1栋/2栋业主需配合）", 
          time: "2025-06-12",
          content: "【消防演练通知】为提升小区应急处置能力，物业联合消防部门将于6月15日15:00在1栋、2栋开展消防演练。演练期间1栋/2栋将临时封闭消防通道（时长约30分钟），请相关楼栋业主配合疏散演练，不要惊慌。其他楼栋业主可在安全区域观摩学习。"
        },
        { 
          id: 4, 
          title: "7月物业费开始缴纳（截止6月30日，小程序缴费立减5元）", 
          time: "2025-06-18",
          content: "【缴费通知】7月份物业费已开放缴纳，收费标准为1.8元/㎡/月。请您于6月30日前完成缴费，通过小区小程序缴费可享5元立减优惠。缴费后可在“我的账单”中查看电子收据，如有疑问请联系物业财务：020-87654321转2。"
        },
        { 
          id: 5, 
          title: "小区绿化改造通知（6月20日-25日，3栋旁绿化带暂停使用）", 
          time: "2025-06-15",
          content: "【绿化改造通知】为优化小区环境，物业将于6月20日-25日对3栋旁绿化带进行升级改造（更换绿植+增设休闲座椅）。改造期间该区域暂停使用，请业主绕行，不要靠近施工区域。改造完成后将为您提供更舒适的休闲空间。"
        },
        { 
          id: 6, 
          title: "暑期少儿安全教育讲座报名（6月22日14:00，物业会议室）", 
          time: "2025-06-19",
          content: "【安全教育通知】暑期将至，物业联合辖区派出所举办“少儿暑期安全”讲座，内容包括防溺水、防拐骗、居家安全等。时间：6月22日14:00，地点：物业会议室。限20组家庭参与，报名请联系物业管家，截止时间6月21日12:00。"
        }
      ]
    };
  },
  onLoad(options) {
    // 接收列表页传递的通知ID（转数字类型）
    const noticeId = Number(options.id);
    // 根据ID匹配对应的完整通知数据
    this.currentNotice = this.noticeList.find(item => item.id === noticeId) || {
      title: "通知不存在",
      time: "",
      content: "未找到该通知的详细内容"
    };
  }
};
</script>

<style scoped>
/* 详情页整体样式 */
.notice-detail-page {
  padding: 20rpx;
  background-color: #F5F5F5;
  min-height: 100vh;
}

/* 通知标题 */
.detail-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.6;
  margin-bottom: 15rpx;
}

/* 通知时间 */
.detail-time {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 25rpx;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #eee;
}

/* 通知详细内容 */
.detail-content {
  font-size: 28rpx;
  color: #555;
  line-height: 1.8;
  background-color: #fff;
  padding: 25rpx 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 1rpx 5rpx rgba(0, 0, 0, 0.05);
}
</style>