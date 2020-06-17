<template>
  <div>
    <a-card hoverable :style="{ height: height, width: width }">
      <img slot="cover" alt="example" :src="src" />
    </a-card>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      hot: String,
      default: "100px",
    },
    width: {
      hot: String,
      default: "100px",
    },
    src: {
      hot: String,
      default: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    rate: {
      hot: String,
      default: "default", //default(默认) fitScreen(适合屏幕缩放)
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
