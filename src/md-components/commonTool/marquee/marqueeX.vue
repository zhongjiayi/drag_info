<template>
  <div class="my-outbox" :style="{backgroundColor:InnerStyle.backgroundColor}">
    <div class="my-inbox" ref="box">
      <div class="my-list" v-for="(item,index) in sendVal" :key="index">
        <span
          class="my-uname"
          :style="{
      color:InnerStyle.fontColor,
      fontSize:InnerStyle.fontSize + 'px',
      paddingRight:InnerStyle.fontSpacing + 'px',
      fontWeight:InnerStyle.fontWeight,
    }"
        >{{item}}</span>
      </div>
      <!-- 复制 -->
      <div class="my-list" v-for="(item,index) in sendVal" :key="(index+1)*100">
        <span
          class="my-uname"
          :style="{
      color:InnerStyle.fontColor,
      fontSize:InnerStyle.fontSize + 'px',
      paddingRight:InnerStyle.fontSpacing + 'px',
      fontWeight:InnerStyle.fontWeight,
    }"
        >{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script lang='js'>
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
  data() {
    return {
      InnerStyle:{}
    };
  },
  mounted: function() {
    var that = this;
    var target = this.$refs.box;
    var initLeft = 0;
    setInterval(function() {
      initLeft++;
      if (initLeft >= target.offsetWidth / 2) {
        initLeft = 0;
      }
      target.style = "transform: translateX(-" + initLeft + "px)";
    }, 16);
  }
};
</script>

<style lang="scss" scoped>
.my-outbox {
  color: #d7bc8d;
  overflow: hidden;
  height: 35px;
  position: relative;
  .my-inbox {
    white-space: nowrap;
    position: absolute;
    font-size: 0;
    .my-list {
      margin-right: 10px;
      display: inline-block;
      font-size: 13px;
      height: 35px;
      line-height: 35px;
    }
  }
}
</style>