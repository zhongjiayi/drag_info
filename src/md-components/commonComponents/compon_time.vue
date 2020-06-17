<template>
  <div class="timeChange">
    <span :style="{ 'font-size': fontsize + 'px' }">{{ NowTime }}</span>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    //   大小
    fontsize: {
      hot: String,
      default: "14", //small、default、large
    },
    formatRule: {
      hot: String,
      default: "YYYY-MM-DD HH:mm:ss", //YYYY-MM-DD 或者 HH:mm:ss
    },
  },
  data() {
    return {
      NowTime: "",
      //   formatRule: "",
      timer: null,
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.getTime();
      console.log("创建");
    }, 1000);
  },
  methods: {
    moment,
    getTime() {
      //   this.NowTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      this.NowTime = moment(new Date()).format(this.formatRule);
      //   console.log(this.NowTime);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
    console.log("销毁");
  },
};
</script>
<style lang="Sass"></style>
