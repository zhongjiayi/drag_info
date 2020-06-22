<template>
  <div :name="attribute.name">
    <video
      controls
      :style="{ width: '100%', height: '100%' }"
      v-if="update"
      autoplay
      :muted="attribute.muted"
    >
      <source :src="video.source" type="video/webm" />
    </video>
  </div>
</template>
<script>
import eventVue from "../conponentEdit/eventBus";
export default {
  props: {
    value: {
      hot: Object,
      default: () => {
        return {
          name: "视频",
          type: "conponVideo",
          attributes: [
            {
              name: "静音播放",
              code: "muted",
              type: "BOOLEAN",
              value: true
            }
          ],
          video: {
            source: "https://www.w3school.com.cn/i/movie.ogg",
            id: 1
          }
        };
      }
    },
    isActive: {
      hot: Boolean,
      default: false
    }
  },

  watch: {
    isActive() {
      // 移除组件
      this.update = false;
      this.$nextTick(() => {
        this.update = true;
      });
    }
  },

  data() {
    return {
      isSelect: false,
      attribute: {},
      update: true,
      video: {
        source: "https://www.w3school.com.cn/i/movie.ogg",
        id: 1
      }
    };
  },
  created() {
    this.attribute = this.getAttribute(this.value.attributes);
    // console.log("初始化", this.attribute);
    this.sumitData();
    // console.log(this.isActive);
  },
  mounted() {
    console.log(this.attribute.muted);
  },
  methods: {
    getAttribute(attributes) {
      const attribute = {};
      for (var key in attributes) {
        attribute[attributes[key].code] = attributes[key].value;
      }
      return attribute;
    },
    sumitData: function() {
      eventVue.$on("myFun", message => {
        this.attribute = { ...message };
        // 移除组件
        this.update = false;
        this.$nextTick(() => {
          this.update = true;
        });

        const newData = {
          ...this.value,
          attributes: this.value.attributes.map(v => ({
            ...v,
            value: this.attribute[v.code]
          }))
        };
        // console.log(newData, message);
        this.$emit("input", newData);
      });
    }
  }
};
</script>
<style scoped>
</style>


