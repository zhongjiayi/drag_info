<template>
  <div>
    <p
      :style="{
        fontSize: fontSize + 'px',
        width: width,
        backgroundColor: backgroundColor,
      }"
    >
      {{ name }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    fontSize: {
      hot: Number,
      default: 14,
    },
    width: {
      hot: String,
      default: "100px",
    },
    name: {
      hot: String,
      default: "请输入编辑文字",
    },
    backgroundColor: {
      hot: String,
      default: "transparent",
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="Sass"></style>
