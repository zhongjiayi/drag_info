<template>
  <div class="timeChange">
    <span
      :style="{
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight
      }"
    >
      {{
      NowTime
      }}
    </span>
  </div>
</template>
<script>
import eventVue from "../conponentEdit/eventBus";
import moment from "moment";
export default {
  props: {
    value: {
      hot: Object,
      default: () => {
        return {
          name: "编辑文本",
          type: "conponText",
          attributes: [
            {
              code: "fontColor",
              name: "字体颜色",
              type: "COLOR",
              value: "white"
            },
            {
              code: "backgroundColor",
              name: "背景颜色",
              type: "COLOR",
              value: "blue"
            },
            {
              code: "fontSize",
              name: "字号",
              type: "ENUM",
              options: [
                {
                  label: "12",
                  value: "12"
                },
                {
                  label: "14",
                  value: "14"
                },
                {
                  label: "28",
                  value: "28"
                },
                {
                  label: "32",
                  value: "32"
                }
              ],
              value: 28
            },
            {
              code: "textContent",
              name: "文本内容",
              type: "STRING",
              value: "请编辑文字"
            },
            {
              code: "fontWeight",
              name: "字体粗细",
              type: "ENUM",
              options: [
                {
                  label: "标准",
                  value: "normal"
                },
                {
                  label: "粗体",
                  value: "bold"
                }
              ],
              value: "normal"
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

  data() {
    return {
      attribute: {},
      NowTime: "",
      timer: null
    };
  },

  created() {
    this.attribute = this.getAttribute(this.value.attributes);
    // console.log("初始化", this.attribute);
    this.sumitData();
  },

  mounted() {
    this.timer = setInterval(() => {
      this.getTime();
      console.log("创建");
    }, 1000);
  },
  methods: {
    moment,
    getTime() {
      this.NowTime = moment(new Date()).format(this.attribute.showContent);
    },
    getAttribute(attributes) {
      const attribute = {};
      for (var key in attributes) {
        attribute[attributes[key].code] = attributes[key].value;
      }
      return attribute;
    },
    sumitData() {
      eventVue.$on("myFun", message => {
        //这里最好用箭头函数，不然this指向有问题
        this.attribute = { ...message };
        // console.log(message);
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
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
    console.log("销毁");
  }
};
</script>
<style scoped lang="scss">
</style>

