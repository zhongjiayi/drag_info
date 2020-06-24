<template>
  <div class="sub-panel">
    <div class="timeChange">
      <span
        :style="{
        padding: '0 10px',
        borderRadius:'4px',
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight
      }"
      >{{weekFormat}}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
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
      attribute: {},
      week: null,
      timer: null
    };
  },
  computed: {
    weekFormat() {
      switch (this.week) {
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        case 0:
          return "星期天";
      }
    }
  },

  created() {
    this.attribute = this.elemData.elemSupAttr || {};
  },

  mounted() {
    this.timer = setInterval(() => {
      this.getWeek();
    }, 1000);
  },

  methods: {
    moment,
    getWeek() {
      this.week = moment(new Date()).day();
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
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
</style>
