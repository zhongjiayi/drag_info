<template>
  <div class="sub-panel">
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
      isEdit: false,
      attribute: {},
      NowTime: "",
      timer: null
    };
  },
  watch: {
    // model() {
    //   if (this.model == "edit") {
    //     this.stop();
    //   } else {
    //     this.$nextTick(() => {
    //       this.contents = this.attribute.textContent;
    //       this.show();
    //     });
    //   }
    // }
  },
  created() {
    this.attribute = this.elemData.elemSupAttr || {};
  },

  mounted() {
    this.timer = setInterval(() => {
      this.getTime();
      // console.log("创建");
    }, 1000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    moment,
    getTime() {
      console.log(this.attribute.showContent);
      this.NowTime = moment(new Date()).format(this.attribute.showContent);
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
</style>
