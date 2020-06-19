<template>
  <div>
    <video controls :width="width" :height="height" autoplay :muted="muted">
      <source :src="src" type="video/webm" />
    </video>
  </div>
</template>
<script>
export default {
  props: {
    // 视频高度
    height: {
      hot: String,
      default: "400px",
    },
    // 视频宽度
    width: {
      hot: String,
      default: "400px",
    },
    // 视频资源名称
    src: {
      hot: String,
      default:
        "https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm",
    },
    // 静音输出
    muted: {
      hot: Boolean,
      default: false,
    },
    // 循环次数
    repeatTime: {
      hot: Number,
      default: 1,
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
