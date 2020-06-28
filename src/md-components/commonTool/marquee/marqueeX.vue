<template>
  <div class="my-outbox" :style="{ backgroundColor: InnerStyle.backgroundColor }">
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

  watch: {
    outerCss: {
      handler: function(value) {
          this.$nextTick(() => {
          this.InnerStyle.backgroundColor = value.backgroundColor;
          this.InnerStyle.fontColor = value.fontColor;
          this.InnerStyle.fontSpeed = value.fontSpeed;
          this.InnerStyle.fontSize = value.fontSize;
          this.InnerStyle.fontSpacing = value.fontSpacing;
          this.InnerStyle.fontWeight = value.fontWeight;
          this.createFontSpeed();
          console.log('监听',this.InnerStyle);
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
    console.log('外部来的属性样式',this.outerCss)
    if(this.outerCss){
      this.InnerStyle = this.outerCss
      // this.InnerStyle.backgroundColor = this.outerCss.backgroundColor;
      // this.InnerStyle.fontColor = this.outerCss.fontColor;
      // this.InnerStyle.fontSpeed = this.outerCss.fontSpeed;
      // this.InnerStyle.fontSize = this.outerCss.fontSize;
      // this.InnerStyle.fontSpacing = this.outerCss.fontSpacing;
      // this.InnerStyle.fontWeight = this.outerCss.fontWeight;
    }
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
