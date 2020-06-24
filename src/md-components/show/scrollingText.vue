<template>
  <div class="sub-panel">
    <div v-if="model === 'edit'">
      <span
        :style="{
          width:'100%',
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight,
        letterSpacing:attribute.fontSpacing+'px'}"
      >{{attribute.textContent}}</span>
    </div>
    <div v-if="model === 'play'">
      <span
        :style="{
          width:'100%',
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight,
        letterSpacing:attribute.fontSpacing+'px'}"
      >{{contents}}</span>
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
      timer: null,
      contents: ""
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
    this.contents = this.attribute.textContent;
    this.show();
  },

  mounted() {},

  beforeDestroy() {
    this.stop();
  },
  methods: {
    show() {
      debugger
      console.log(this.attribute.fontSpeed)
      if (this.timer != null) return;
      this.timer = setInterval(() => {
        let start = this.contents.substring(0, 1);
        let end = this.contents.substring(1);
        this.contents = end + start;
      }, this.attribute.fontSpeed);
    },
    stop() {
      console.log("执行暂停");
      clearInterval(this.timer);
      this.timer = null;
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
