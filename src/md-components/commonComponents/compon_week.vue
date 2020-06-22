<template>
  <div class="timeChange">
    <span
      :style="{
        color: attribute.WfontColor,
        fontSize: attribute.WfontSize + 'px',
        backgroundColor: attribute.WbackgroundColor,
        fontWeight:attribute.WfontWeight
      }"
    >{{week}}</span>
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
          name: "编辑星期",
          type: "componWeek",
          attributes: [
            {
              name: "星期颜色",
              code: "WfontColor",
              type: "COLOR",
              value: "white"
            },
            {
              name: "星期背景",
              code: "WbackgroundColor",
              type: "COLOR",
              value: "red"
            },
            {
              name: "星期字体大小",
              code: "WfontSize",
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
              name: "星期字体粗细",
              code: "WfontWeight",
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
      week: null,
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
      this.getWeek();
      // console.log("创建");
    }, 1000);
  },
  computed: {
    // week() {
    //   console.log(this.week);
    //   switch (this.week) {
    //     case 1:
    //       return "星期一";
    //     case 2:
    //       return "星期二";
    //     case 3:
    //       return "星期三";
    //     case 4:
    //       return "星期四";
    //     case 5:
    //       return "星期五";
    //     case 6:
    //       return "星期六";
    //     case 0:
    //       return "星期天";
    //   }
    //   console.log(this.week);
    // }
  },
  watch:{
    if (condition) {
      
    }
  },

  methods: {
    moment,
    getWeek() {
      this.week = moment(new Date()).day();
      // console.log(this.week);
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

