<template>
  <div class="sub-panel">
    <div :name="attribute.name" class="carousel" :style="{ width: '100%', height: '100%' }">
      <!-- v-if="model === 'edit'" -->
      <a-carousel
        ref="carousel"
        autoplay
        :autoplaySpeed="speeds"
        :dotPosition="attribute.dotPosition"
        :effect="attribute.effect"
        :afterChange="afterChange"
      >
        <div v-for="imageUrl of attribute.imageSrc" :key="imageUrl.id">
          <img :src="imageUrl.img" alt srcset />
        </div>
      </a-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    elemData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 元素数据
    model: {
      type: String,
      default: "edit"
    }
    // 播放模式  edit or play
  },
  data() {
    return {
      isEdit: false,
      attribute: {},
      autoSpeeds: 0
    };
  },
  computed: {
    // 监听资源类型判断间隔时间
    //假设外部传进来一个时长
    speeds(value) {
      console.log("监听");
      var handleSpeed = this.attribute.duration;
      for (const index in this.content) {
        if (this.content[index].elemType == "videos") {
          this.autoSpeeds = handleSpeed * 10000;
        } else {
          this.autoSpeeds = this.attribute.interval;
        }
      }
    }
  },
  created() {
    this.attribute = this.elemData.elemSupAttr || {};
  },

  mounted() {},

  beforeDestroy() {},
  methods: {
    afterChange() {
      console.log("afterChange");
    }
  }
};
</script>

<style scoped lang="scss">
$fontColor3: rgb(153, 153, 153);
.sub-panel-body {
  transition: height 0.3s;
  // overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.panel-horizon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ant-carousel,
.carousel {
  height: 100%;
}

.ant-carousel >>> .slick-slider {
  width: 100%;
  height: 100%;
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
