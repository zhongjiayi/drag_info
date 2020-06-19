<template>
  <div>
    <p
      :style="{
        color: newParams.color,
        fontSize: newParams.fontSize + 'px',
        backgroundColor: newParams.backgroundColor,
      }"
    >
      {{ newParams.name }}
    </p>
  </div>
</template>
<script>
import eventVue from "../conponentEdit/eventBus";
export default {
  props: {
    params: {
      hot: Object,
      default: () => {
        return {
          fontColor: {
            hot: String,
            default: "white",
          },
          fontSize: {
            hot: Number,
            default: 14,
          },
          name: {
            hot: String,
            default: "编辑文字",
          },
          backgroundColor: {
            hot: String,
            default: "white",
          },
        };
      },
    },
  },
  created() {
    if (this.params) {
      console.log(this.newParams);
      this.newParams = this.params;
    }
    this.sumitData();
  },
  data() {
    return {
      newParams: {
        fontColor: "",
        fontSize: null,
        name: "",
        backgroundColor: "",
      },
    };
  },
  mounted() {},
  methods: {
    sumitData: function() {
      eventVue.$on("myFun", (message) => {
        //这里最好用箭头函数，不然this指向有问题
        this.newParams = message;
        console.log(this.newParams);
      });
    },
  },
};
</script>
<style lang="Sass"></style>
