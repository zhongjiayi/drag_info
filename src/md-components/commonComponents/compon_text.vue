<template>
  <div class="conponText">
    <div class="editBox" v-if="isActive" @dblclick="editText">
      <textarea
        :style="{
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight
      }"
        name="editBox"
        id="editBox"
        v-if="update"
        v-model="attribute.textContent"
        v-text="attribute.textContent"
      ></textarea>
    </div>
    <div class="showBox" v-else>
      <p
        :style="{
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight
      }"
      >{{ attribute.textContent }}</p>
    </div>
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
          name: "编辑文本",
          type: "conponText",
          attributes: [
            {
              code: "fontColor",
              name: "字体颜色",
              type: "COLOR",
              value: "white"
            },
            {
              code: "backgroundColor",
              name: "背景颜色",
              type: "COLOR",
              value: "blue"
            },
            {
              code: "fontSize",
              name: "字号",
              type: "ENUM",
              options: [
                {
                  label: "12",
                  value: "12"
                },
                {
                  label: "14",
                  value: "14"
                },
                {
                  label: "28",
                  value: "28"
                },
                {
                  label: "32",
                  value: "32"
                }
              ],
              value: 28
            },
            {
              code: "textContent",
              name: "文本内容",
              type: "STRING",
              value: "请编辑文字"
            },
            {
              code: "fontWeight",
              name: "字体粗细",
              type: "ENUM",
              options: [
                {
                  label: "标准",
                  value: "normal"
                },
                {
                  label: "粗体",
                  value: "bold"
                }
              ],
              value: "normal"
            }
          ]
        };
      }
    },
    isActive: {
      hot: Boolean,
      default: false
    }
  },

  data() {
    return {
      attribute: {},
      update: false
    };
  },
  watch: {
    isActive() {
      this.update = false;
      this.$nextTick(() => {
        this.update = true;
      });
      console.log(this.isActive);
    }
  },

  created() {
    this.attribute = this.getAttribute(this.value.attributes);
    // console.log("初始化", this.attribute);
    this.sumitData();
  },

  mounted() {},
  methods: {
    getAttribute(attributes) {
      const attribute = {};
      for (var key in attributes) {
        attribute[attributes[key].code] = attributes[key].value;
      }
      return attribute;
    },
    sumitData() {
      eventVue.$on("myFun", message => {
        //这里最好用箭头函数，不然this指向有问题
        this.attribute = { ...message };
        // console.log(message);
        // 移除组件
        this.update = false;
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
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
    },
    editText() {
      console.log(this.update);
      if (!this.update) {
        this.update = true;
      } else {
        this.update = false;
      }
    }
  }
};
</script>
<style scoped lang="scss">
</style>
