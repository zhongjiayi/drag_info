<template>
  <div
    class="my-outbox"
    ref="outbox"
    :style="{height: '100%',
    backgroundColor:InnerStyle.backgroundColor}"
  >
    <div class="my-inbox" ref="movebox" style="height: 100%;">
      <div class="my-listbox" v-for="(item,index) in sendVal" :key="index" style="height: 100%;">
        <div
          class="my-title"
          :style="{
            color:InnerStyle.fontColor,
            fontSize:InnerStyle.fontSize + 'px',
            paddingRight:InnerStyle.fontSpacing + 'px',
            fontWeight:InnerStyle.fontWeight,
          }"
        >{{item}}</div>
      </div>
      <div class="my-listbox" v-for="(item,index) in sendVal" :key="index">
        <div
          class="my-title"
          :style="{
            color:InnerStyle.fontColor,
            fontSize:InnerStyle.fontSize + 'px',
            letterSpacing:InnerStyle.fontSpacing+ 'px',
            fontWeight:InnerStyle.fontWeight,
          }"
        >{{item}}</div>
      </div>
      <div v-if="isShow">
        <div class="my-listbox" v-for="(item,index) in sendVal" :key="(index+1)*100">
          <div
            class="my-title"
            :style="{
            color:InnerStyle.fontColor,
            fontSize:InnerStyle.fontSize + 'px',
            letterSpacing:InnerStyle.fontSpacing+ 'px',
            fontWeight:InnerStyle.fontWeight,
          }"
          >{{item}}</div>
        </div>
      </div>
      <div class="my-listbox" v-for="(item,index) in sendVal" :key="index">
        <div
          class="my-title"
          :style="{
            color:InnerStyle.fontColor,
            fontSize:InnerStyle.fontSize + 'px',
            letterSpacing:InnerStyle.fontSpacing + 'px',
            fontWeight:InnerStyle.fontWeight,
          }"
        >{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='js'>
export default {
  name: "my-marquee-top",
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
      console.log(this.InnerStyle)
    }
  },
  data() {
    return {
      isShow: true,
      InnerStyle:{}
    };
  },
  watch: {
    attribute: {
      handler: function() {
          this.$nextTick(() => {
          this.InnerStyle.fontSpeed = this.attribute.fontSpeed;
          console.log(this.InnerStyle);
        })
      },
      deep: true
    }
  },
  mounted: function() {
    console.log(this.InnerStyle.fontSpeed)
    var moveTarget = this.$refs.movebox;
    var outbox = this.$refs.outbox;
    // if (outbox.offsetHeight > moveTarget.offsetHeight / 2) {
    //   this.isShow = false;
    //   return;
    // }
    var initTop = 0;
    setInterval(function() {
      initTop++;
      if (initTop >= moveTarget.offsetHeight / 2) {
        initTop = 0;
      }
      moveTarget.style = "transform: translateY(-" + initTop + "px)";
    }, this.InnerStyle.fontSpeed || 16);
  }
};
</script>

<style lang="scss" scoped>
.my-outbox {
  color: #fee7b1;
  height: 100%;
  padding: 5px;
  overflow: hidden;
  border: 2px solid #c46302;
  .my-inbox {
    margin: 0 45px;
    .my-listbox {
      padding: 20px 0;
      font-size: 18px;
      border-bottom: 1px solid #c7beb1;
      .my-title {
        height: 100%;
        margin-bottom: 10px;
        clear: both;
        overflow: hidden;
        .my-utel {
          font-size: 16px;
          margin-left: 20px;
        }
        .my-addr {
          font-size: 16px;
          float: right;
        }
      }
      .my-content {
        text-align: justify;
        word-break: break-all;
        font-size: 14px;
        color: #53565d;
      }
    }
  }
}
</style>