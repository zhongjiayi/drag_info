<template>
  <div :name="name" class="carousel" :style="{ width: width, height: height }">
    <a-carousel
      :autoplay="autoplay"
      :autoplaySpeed="interval"
      arrows
      :effect="effectStyle"
      :dot-position="dotPosition"
    >
      <!-- 添加左右按钮 -->
      <div
        v-if="HandleButton"
        slot="prevArrow"
        class="custom-slick-arrow"
        style="left: 10px;zIndex: 1"
      >
        <a-icon type="left-circle" />
      </div>
      <!-- slot-scope="props" -->
      <div
        v-if="HandleButton"
        slot="nextArrow"
        class="custom-slick-arrow"
        style="right: 10px"
      >
        <a-icon type="right-circle" />
      </div>
      <div v-for="imageUrl of imageSrc" :key="imageUrl.id">
        <img :src="imageUrl.img" alt="" srcset="" />
      </div>
    </a-carousel>
  </div>
</template>
<script>
export default {
  props: {
    //   组件名
    name: {
      hot: String,
      default: "",
    },
    // 自动播放
    autoplay: { hot: Boolean, default: true },
    // 宽度
    width: { hot: String, default: "auto" },
    // 高度（未生效）
    height: { hot: String, default: "auto" },
    // 轮播时间间隔
    interval: { hot: Number, default: 1000 },
    // 是否显示面板指示点
    dots: {
      hot: Boolean,
      default: true,
    },
    // 面板指示点位置 top bottom left right
    dotPosition: {
      hot: String,
      default: "bottom",
    },
    // 是否显示左右按钮
    HandleButton: {
      hot: Boolean,
      default: true,
    },
    // 切换特效
    effectStyle: {
      hot: String,
      default: "scrollx", //fade
    },
    // 图片资源
    imageSrc: {
      hot: Array,
      default: () => [
        {
          img:
            "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
          id: 1,
        },
        {
          img:
            "http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658",
          id: 2,
        },
      ],
    },
  },
  data() {
    return {
      //   autoplaySpeed: PropTypes.number.def(500),
      //   imageSrc: [],
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.ant-carousel >>> .slick-slide {
  width: 200px;
  text-align: center;
  /* height: 160px;
  line-height: 160px; */
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

.ant-carousel >>> .slick-slide img {
  display: inline-block;
}
</style>
