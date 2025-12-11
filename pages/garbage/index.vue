<template>
  <view class="garbage-page">
    <!-- 标题 -->
    <view class="page-title">垃圾分类识别</view>

    <!-- 图片预览区（选图/拍照后显示） -->
    <view class="img-preview" v-if="imgUrl">
      <image :src="imgUrl" mode="aspectFill"></image>
    </view>

    <!-- 未选图时的提示 -->
    <view class="no-img-tip" v-else>
      <text>请上传垃圾图片进行识别</text>
    </view>

    <!-- 操作按钮：选图+拍照 -->
    <view class="btn-group">
      <button class="oper-btn" @click="chooseImage">选择图片</button>
      <button class="oper-btn primary" @click="takePhoto">拍照识别</button>
    </view>

    <!-- 识别结果展示区 -->
    <view class="result-area" v-if="garbageResult">
      <view class="result-title">识别结果</view>
      <view class="result-item">
        <text class="label">垃圾名称：</text>
        <text class="value">{{ garbageResult.name }}</text>
      </view>
      <view class="result-item">
        <text class="label">垃圾类型：</text>
        <text class="value" :style="{ color: typeColor }">{{ garbageResult.type }}</text>
      </view>
      <view class="result-item">
        <text class="label">投放指引：</text>
        <text class="value">{{ garbageResult.guide }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "", // 选中的图片临时路径
      garbageResult: null, // 识别结果
      typeColor: "" // 垃圾类型对应的颜色
    };
  },
  methods: {
    // 1. 从相册选择图片
    chooseImage() {
      uni.chooseImage({
        count: 1, // 只能选1张
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success: (res) => {
          this.imgUrl = res.tempFilePaths[0];
          this.garbageResult = null; // 清空旧结果
          this.recognizeGarbage(res.tempFilePaths[0]); // 调用识别
        }
      });
    },

    // 2. 拍照识别
    takePhoto() {
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["camera"],
        success: (res) => {
          this.imgUrl = res.tempFilePaths[0];
          this.garbageResult = null;
          this.recognizeGarbage(res.tempFilePaths[0]);
        }
      });
    },

    // 3. 模拟识别（先不用API，前端写死结果）
    recognizeGarbage(imgPath) {
      uni.showLoading({ title: "识别中..." });

      // 模拟识别延迟（更真实）
      setTimeout(() => {
        try {
          const mockResult = this.getMockResult();
          this.garbageResult = mockResult;
          this.setTypeColor(mockResult.type);
          uni.hideLoading();
        } catch (err) {
          uni.hideLoading();
          uni.showToast({ title: "识别失败", icon: "none" });
        }
      }, 800);
    },

    // 辅助：模拟识别结果（前端写死，不用API）
    getMockResult() {
      const mockData = [
        {
          name: "矿泉水瓶",
          type: "可回收物",
          guide: "请清洗后投入蓝色可回收物垃圾桶"
        },
        {
          name: "剩菜剩饭",
          type: "厨余垃圾",
          guide: "请沥干水分后投入绿色厨余垃圾桶"
        },
        {
          name: "废旧电池",
          type: "有害垃圾",
          guide: "请投入红色有害垃圾桶"
        },
        {
          name: "用过的纸巾",
          type: "其他垃圾",
          guide: "请投入灰色其他垃圾桶"
        }
      ];
      // 随机返回一个结果
      return mockData[Math.floor(Math.random() * mockData.length)];
    },

    // 辅助：给垃圾类型设置颜色
    setTypeColor(type) {
      switch (type) {
        case "可回收物":
          this.typeColor = "#2196F3";
          break;
        case "厨余垃圾":
          this.typeColor = "#4CAF50";
          break;
        case "有害垃圾":
          this.typeColor = "#F44336";
          break;
        case "其他垃圾":
          this.typeColor = "#9E9E9E";
          break;
        default:
          this.typeColor = "#333";
      }
    }
  }
};
</script>

<style scoped>
.garbage-page {
  padding: 20rpx;
  min-height: 100vh;
  background-color: #F5F5F5;
}
.page-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
}
.img-preview {
  width: 100%;
  height: 400rpx;
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  overflow: hidden;
}
.img-preview image {
  width: 100%;
  height: 100%;
}
.no-img-tip {
  width: 100%;
  height: 400rpx;
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 28rpx;
}
.btn-group {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}
.oper-btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  border: 1rpx solid #4CAF50;
  color: #4CAF50;
  background-color: #fff;
}
.oper-btn.primary {
  background-color: #4CAF50;
  color: #fff;
  border: none;
}
.result-area {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 8rpx #eee;
}
.result-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 20rpx;
}
.result-item {
  display: flex;
  margin-bottom: 15rpx;
  font-size: 28rpx;
}
.label {
  color: #666;
  width: 120rpx;
}
.value {
  color: #333;
  flex: 1;
  line-height: 1.5;
}
</style>