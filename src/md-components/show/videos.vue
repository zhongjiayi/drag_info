<template>
  <div class="sub-panel">
    <div v-if="model == 'play'">
      <video controls :style="{ width: '100%', height: '100%' }" autoplay :muted="attribute.muted">
        <source :src="attribute.source" type="video/webm" />
      </video>
    </div>
    <div v-if="model == 'edit'">
      <video controls :style="{ width: '100%', height: '100%' }" autoplay :muted="attribute.muted">
        <source :src="attribute.source" type="video/webm" />
      </video>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    elemData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 元素数据
    model: {
      type: String,
      default: "edit"
    }
    // 播放模式  edit or play
  },
  data() {
    return {
      attribute: {},
      week: null,
      timer: null
    };
  },
  computed: {},

  created() {
    this.attribute = this.elemData.elemSupAttr || {};
  },

  mounted() {},

  methods: {},
  beforeDestroy() {}
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
</style>
