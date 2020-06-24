<template>
  <div class="sub-panel">
    <div v-if="model == 'play'">
      <video :style="{ width: '100%', height: '100%' }" autoplay loop :muted="attribute.muted">
        <source :src="attribute.videoSource" type="video/webm" />
      </video>
    </div>

    <div v-if="model == 'edit' && isEdit">
      <video controls :style="{ width: '100%', height: '100%' }" :muted="attribute.muted">
        <source :src="attribute.videoSource" type="video/webm" />
      </video>
    </div>
    
    <div v-if="model == 'edit' && !isEdit">
      <video :style="{ width: '100%', height: '100%' }" :muted="attribute.muted">
        <source :src="attribute.videoSource" type="video/webm" />
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
      timer: null,
      isEdit: false
    };
  },
  computed: {},
  watch: {
    model(value) {
      console.log(value);
    }
  },

  created() {
    this.attribute = this.elemData.elemSupAttr || {};
    console.log(this.model);
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
