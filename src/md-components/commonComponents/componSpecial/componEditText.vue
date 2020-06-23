<template>
  <div class="componText">
    <div @click="elemOnClick" class="editBox" v-if="isEditing" style="width:'100%'">
      <textarea
        autofocus
        ref="focusTextarea"
        :style="{
          width:'100%',
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight,
        letterSpacing:attribute.fontSpacing+'px',
        position: 'relative',
        'z-index': 100
        }"
        name="editBox"
        id="editBox"
        v-model="attribute.textContent"
        cols="30"
        rows="10"
      ></textarea>
    </div>
    <div
      class="showBox"
      v-else
      :style="{
      width:'100%',
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight,
        letterSpacing:attribute.fontSpacing+'px'
      }"
    >
      <p v-for="(text,index) of contents.split('\u000A')" :key="index">{{text}}</p>
    </div>
  </div>
</template>

<script lang="js">
import eventVue from "../../componentEdit/eventBus";
export default {
  props: {
    value: {
      hot: Object,
      default: () => {
        return {
          name: "编辑文本",
          type: "componText",
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
            },
            {
              code: "direction",
              name: "滚动方向",
              type: "ENUM",
              options: [
                {
                  label: "从左到右",
                  value: "toRight"
                },
                {
                  label: "从右到左",
                  value: "toLeft"
                }
              ],
              value: "toLeft"
            },
            {
              code: "fontSpacing",
              name: "字体间隔",
              type: "SLIDER",
              value: 1
            },
          ]
        };
      }
    },
    isActive: {
      hot: Boolean,
      default: false
    },
    isEditing: {
      hot: Boolean,
      default: false
    }
  },

  data() {
    return {
      attribute: {},
      update: false,
      timer: null,
      contents: ""
    };
  },
  watch: {
    isActive() {
      this.$nextTick(() => {
        this.contents = this.attribute.textContent;
      });
    }
  },

  created() {
    this.attribute = this.getAttribute(this.value.attributes);
    this.sumitData();
    this.contents = this.attribute.textContent;
  },

  // mounted() {
  //   this.$refs.focusTextarea.focus();
  // },

  methods: {
    onBlur(){
      this.$parent.setEditIndex(-1);
    },
    elemOnClick(event) {
      console.log('阻止冒泡')
      event.stopPropagation();
    },
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
<style scoped lang="scss">
div,
ul,
li,
span,
img {
  margin: 0;
  padding: 0;
  display: flex;
  box-sizing: border-box;
}
.componText {
  height: 100%;
}
.marquee {
  width: 100%;
  height: 50px;
  align-items: center;
  color: #3a3a3a;
  background-color: #b3effe;
  display: flex;
  box-sizing: border-box;
}

.marquee_title {
  padding: 0 20px;
  height: 30px;
  font-size: 14px;
  border-right: 1px solid #d8d8d8;
  align-items: center;
}

.marquee_box {
  display: block;
  position: relative;
  width: 60%;
  height: 30px;
  overflow: hidden;
}

.marquee_list {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.showBox {
  display: block;
  p {
    margin-bottom: 10px;
  }
}

.marquee_top {
  transition: all 0.5s;
  margin-top: -30px;
}

.marquee_list li {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 20px;
}

.marquee_list li span {
  padding: 0 2px;
}

.red {
  color: #ff0101;
}
</style>
