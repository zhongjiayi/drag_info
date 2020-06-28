<template>
  <div
    class="my-outbox"
    :style="{ backgroundColor: InnerStyle.backgroundColor }"
  >
    <div class="my-inbox" ref="box">
      <div
        class="my-list"
        v-for="(item, index) in sendVal"
        :key="index"
        :style="{
          color: InnerStyle.fontColor,
          fontSize: InnerStyle.fontSize + 'px',
          paddingRight: InnerStyle.fontSpacing + 'px',
          fontWeight: InnerStyle.fontWeight,
        }"
      >
        <span class="my-uname">{{ item }}</span>
      </div>
      <!-- 复制 -->
      <div
        class="my-list"
        v-for="(item, index) in sendVal"
        :key="(index + 1) * 100"
        :style="{
          color: InnerStyle.fontColor,
          fontSize: InnerStyle.fontSize + 'px',
          paddingRight: InnerStyle.fontSpacing + 'px',
          fontWeight: InnerStyle.fontWeight,
        }"
      >
        <span class="my-uname">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: "my-marquee-left",
  props: {
    sendVal:{
      type: Array,
      default: function() {
        return [];
      }
    },
    outerCss:{
      type:Object,
      default:function () {
        return {}
      }
    }
  },
  created(){
    console.log(this.outerCss)
    if(this.outerCss){
      this.InnerStyle = this.outerCss || {};
    }
  },
  watch: {
    outerCss: {
      handler: function(value) {
          this.$nextTick(() => {
          this.InnerStyle.fontSpeed = value.fontSpeed;
          this.createFontSpeed();
          console.log(this.InnerStyle);
        })
      },
      deep: true
    }
  },
  data() {
    return {
      InnerStyle:{},
      time: null
    };
  },
  mounted: function() {
    this.createFontSpeed();
  },
  methods: {
    createFontSpeed(){
        var that = this;

        if(that.time){
          clearInterval(that.time);
        }

        var target = that.$refs.box;
        var initLeft = 0;
        that.time = setInterval(function() {
          initLeft++;
          if (initLeft >= target.offsetWidth / 2) {
            initLeft = 0;
          }
          target.style = "transform: translateX(-" + initLeft + "px)";
        }, that.InnerStyle.fontSpeed||16);
    }
  }

};
</script>

<style lang="scss" scoped>
.my-outbox {
  color: #d7bc8d;
  overflow: hidden;
  height: 100%;
  position: relative;
  .my-inbox {
    height: 100%;
    white-space: nowrap;
    position: absolute;
    font-size: 0;
    .my-list {
      text-align: center;
      margin-right: 10px;
      display: inline-block;
      font-size: 13px;
      height: 100%;
      line-height: 100%;
    }
  }
}
</style>
