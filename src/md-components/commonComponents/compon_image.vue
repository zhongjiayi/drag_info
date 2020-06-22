<template>
  <div>
    <a-card
      :name="attribute.name"
      hoverable
      :style="{ width: '100%', height: '100%' }"
      v-if="update"
    >
      <img slot="cover" alt="example" :src="imageSrc.img" />
    </a-card>
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
          name: "图片",
          type: "conponImage",
          attributes: [],
          imageSrc: {
            img:
              "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
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
      imageSrc: {
        img:
          "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
        id: 1
      }
    };
  },
  created() {
    this.attribute = this.getAttribute(this.value.attributes);
    console.log("初始化", this.attribute);
    this.sumitData();
    console.log(this.isActive);
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
        console.log(newData, message);
        this.$emit("input", newData);
      });
    }
  }
};
</script>
<style scoped>
</style>

