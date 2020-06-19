<template>
  <div
    :name="newParams.name"
    class="carousel"
    :style="{ width: newParams.width, height: newParams.height }"
  >
    <a-carousel
      :autoplay="newParams.autoplay"
      :autoplaySpeed="newParams.interval"
      arrows
      :effect="newParams.effectStyle"
      :dot-position="newParams.dotPosition"
    >
      <!-- 添加左右按钮 -->
      <div
        v-if="newParams.HandleButton"
        slot="prevArrow"
        class="custom-slick-arrow"
        style="left: 10px;zIndex: 1"
      >
        <a-icon type="left-circle" />
      </div>
      <!-- slot-scope="props" -->
      <div
        v-if="newParams.HandleButton"
        slot="nextArrow"
        class="custom-slick-arrow"
        style="right: 10px"
      >
        <a-icon type="right-circle" />
      </div>
      <div v-for="imageUrl of newParams.imageSrc" :key="imageUrl.id">
        <img :src="imageUrl.img" alt="" srcset="" />
      </div>
    </a-carousel>
  </div>
</template>
<script>
import eventVue from "../conponentEdit/eventBus";
export default {
  props: {
    params: {
      hot: Object,
      default: () => {
        return {
          //   组件名
          name: {
            hot: String,
            default: "",
          },
          // 自动播放
          autoplay: { hot: Boolean, default: true },
          // 宽度
          width: { hot: String, default: "200px" },
          // 高度（未生效）
          height: { hot: String, default: "150px" },
          // 轮播时间间隔
          interval: { hot: Number, default: 1000 },
          // 是否显示面板指示点
          dots: {
            hot: Boolean,
            default: true,
          },
          // 方向 bottom right
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
        };
      },
    },
  },

  data() {
    return {
      newParams: {
        name: "",
        autoplay: null,
        width: "",
        height: "",
        interval: 1000,
        dotPosition: "",
        HandleButton: null,
        effectStyle: "",
        imageSrc: "",
      },
    };
  },
  created() {
    if (this.params) {
      this.newParams = this.params;
      console.log(this.newParams);
    }
    this.sumitData();
  },
  methods: {
    sumitData: function() {
      eventVue.$on("myFun", (message) => {
        //这里最好用箭头函数，不然this指向有问题
        this.newParams = message;
        console.log(message);
      });
    },
  },
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
