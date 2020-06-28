<template>
  <div class="sub-panel" style="height: 100%;">
    <div style="height: 100%;">
      <div v-if="model == 'edit' && isEdit" style="height:'100%'">
        <div
          :style="{
          width:'100%',
          height:'100%',
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight,
        letterSpacing:attribute.fontSpacing+'px'}"
        >{{attribute.textContent}}</div>
      </div>
      <div v-if="(model == 'play')||(model == 'edit' && !isEdit)" style="height: 100%;">
        <marqueeX
          v-if="attribute.direction == 'toLeft'"
          :send-val="sumitContent"
          :outer-css="sumitData"
        />
        <marqueeY v-if="attribute.direction == 'toTop'" :send-val="comment" :outer-css="sumitData" />
      </div>
    </div>
  </div>
</template>

<script>
import marqueeX from "../commonTool/marquee/marqueeX";
import marqueeY from "../commonTool/marquee/marqueeY";
export default {
  props: {
    elemData: {
      type: Object
    }, // 元素数据
    model: {
      type: String
    } // 播放模式  edit or play
  },
  components: {
    marqueeX,
    marqueeY
  },
  data() {
    return {
      isEdit: false,
      attribute: {},
      animateUp: false,
      // listData: [
      //   "12***ve 成功邀请12人 已获奖金60元",
      //   "l***e 成功邀请5人 已获奖金40元",
      //   "l***e 成功邀请1人 已获奖金5元"
      // ],
      timer: null,
      sumitContent: [],
      comment: [],
      sumitData: {}
    };
  },
  watch: {
    attribute: {
      handler: function() {
        this.sumitData = { ...this.attribute };
        this.sumitContent = this.sumitData.textContent.split("");
        this.comment = [this.sumitData.textContent || ""];
        console.log("监听attribute", this.sumitData);
      },
      deep: true
    }
  },
  created() {
    this.attribute = this.elemData.elemSupAttr || {};
    console.log("初始化获得属性", this.attribute);
  },
  mounted() {
    // this.timer = setInterval(this.scrollAnimate, 1500);
  },
  methods: {
    // scrollAnimate() {
    //   this.animateUp = true;
    //   setTimeout(() => {
    //     this.listData.push(this.listData[0]);
    //     this.listData.shift();
    //     this.animateUp = false;
    //   }, 500);
    // }
  },
  destroyed() {
    // clearInterval(this.timer);
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

.marquee-wrap {
  width: 80%;
  height: 40px;
  border-radius: 20px;
  background: rgba($color: #000000, $alpha: 0.6);
  margin: 0 auto;
  overflow: hidden;
  .marquee-list {
    li {
      width: 100%;
      height: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 20px;
      list-style: none;
      line-height: 40px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      font-weight: 400;
    }
  }
  .animate-up {
    transition: all 0.5s ease-in-out;
    transform: translateY(-40px);
  }
}
</style>
