<template>
  <div
    :name="attribute.name"
    class="carousel"
    :style="{ width: '100%', height: '100%' }"
    v-if="update"
  >
    <a-carousel
      :autoplay="!isActive"
      :autoplaySpeed="attribute.interval"
      :dotPosition="attribute.dotPosition"
      :arrows="isActive"
      :effect="attribute.effect"
    >
      <div v-for="imageUrl of imageSrc" :key="imageUrl.id">
        <img :src="imageUrl.img" alt srcset />
      </div>
    </a-carousel>
  </div>
</template>
<script>
import eventVue from "../conponentEdit/eventBus";
export default {
  props: {
    value: {
      hot: Object,
      default: () => {
        return {
          name: "轮播图",
          type: "carousel",
          attributes: [
            {
              code: "interval",
              name: "间隔",
              type: "NUMBER",
              value: 3000
            },
            {
              name: "方向",
              code: "dotPosition",
              type: "ENUM",
              options: [
                {
                  label: "上下切换",
                  value: "right"
                },
                {
                  label: "左右切换",
                  value: "bottom"
                }
              ],
              value: "bottom"
            },
            {
              name: "特效",
              code: "s",
              type: "MENU",
              options: [
                {
                  label: "渐显",
                  value: "fade"
                },
                {
                  label: "线性",
                  value: "linear"
                }
              ],
              value: "linear"
            }
          ]
        };
      }
    },
    isActive: {
      hot: Boolean,
      default: false
    }
  },

  watch: {
    isActive() {
      // 移除组件
      this.update = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true;
      });
    }
    // data() {
    //   this.attributes = this.getAttribute(this.data.attributes);
    // }
  },

  data() {
    return {
      isSelect: false,
      attribute: {},
      update: true,
      imageSrc: [
        {
          img:
            "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
          id: 1
        },
        {
          img:
            "http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658",
          id: 2
        }
      ]
    };
  },
  created() {
    this.attribute = this.getAttribute(this.value.attributes);
    // console.log("初始化", this.attribute);
    this.sumitData();
    // console.log(this.isActive);
  },
  methods: {
    getAttribute(attributes) {
      const attribute = {};
      for (var key in attributes) {
        attribute[attributes[key].code] = attributes[key].value;
      }
      return attribute;
    },
    sumitData: function() {
      eventVue.$on("myFun", message => {
        //这里最好用箭头函数，不然this指向有问题
        this.attribute = { ...message };
        // 移除组件
        this.update = false;
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
          this.update = true;
        });

        const newData = {
          ...this.value,
          attributes: this.value.attributes.map(v => ({
            ...v,
            value: this.attribute[v.code]
          }))
        };
        // console.log(newData, message);
        this.$emit("input", newData);
      });
    }
  }
};
</script>
<style scoped>
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
