<template>
  <div class="timeChange">
    <span
      :style="{
        color: attribute.TfontColor,
        fontSize: attribute.TfontSize + 'px',
        backgroundColor: attribute.TbackgroundColor,
        fontWeight:attribute.TfontWeight
      }"
    >
      {{
      NowTime
      }}
    </span>
  </div>
</template>
<script>
import eventVue from "../componentEdit/eventBus";
import moment from "moment";
export default {
  props: {
    value: {
      hot: Object,
      default: () => {
        return {
          name: "编辑时间",
          type: "componTime",
          attributes: [
            {
              code: "TfontColor",
              name: "时间字体颜色",
              type: "COLOR",
              value: "white"
            },
            {
              code: "TbackgroundColor",
              name: "时间背景颜色",
              type: "COLOR",
              value: "blue"
            },
            {
              code: "TfontSize",
              name: "时间字号",
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
              code: "TfontWeight",
              name: "时间字体粗细",
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
            },
            {
              name: "时间展示格式",
              code: "TshowContent",
              type: "ENUM",
              options: [
                {
                  label: "显示日期",
                  value: "YYYY-MM-DD"
                },
                {
                  label: "显示时间",
                  value: "HH:mm:ss"
                },
                {
                  label: "日期时间",
                  value: "YYYY-MM-DD HH:mm:ss"
                }
              ],
              value: "YYYY-MM-DD HH:mm:ss"
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
    this.sumitData();
    this.attribute = this.getAttribute(this.value.attributes);
    console.log("初始化", this.attribute);
  },

  mounted() {
    this.timer = setInterval(() => {
      this.getTime();
      // console.log("创建");
    }, 1000);
  },
  methods: {
    moment,
    getTime() {
      console.log(this.attribute.TshowContent)
      this.NowTime = moment(new Date()).format(this.attribute.TshowContent);
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
    // console.log("销毁");
  }
};
</script>
<style scoped lang="scss">
</style>

