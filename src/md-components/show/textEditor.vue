<template>
  <div class="sub-panel">
    <div @click="elemOnClick" class="editBox" v-if="model == 'edit' && isEdit" style="width:'100%'">
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
      v-if="(model == 'edit' && !isEdit) ||(model == 'play')"
      :style="{
      width:'100%',
        color: attribute.fontColor,
        fontSize: attribute.fontSize + 'px',
        backgroundColor: attribute.backgroundColor,
        fontWeight:attribute.fontWeight,
        letterSpacing:attribute.fontSpacing+'px'
      }"
    >
      <textarea
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
        readonly
        :value="attribute.textContent"
        cols="30"
        rows="10"
      ></textarea>
    </div>
  </div>
</template>

<script>
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
      isEdit: false,
      attribute: {},
      timer: null,
      contents: ""
    };
  },
  watch: {
    isEdit() {
      this.$nextTick(() => {
        this.contents = this.attribute.textContent;
      });
    }
  },
  created() {
    this.attribute = this.elemData.elemSupAttr || {};
    this.contents = this.attribute.textContent;
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    onBlur() {
      this.$parent.setEditIndex(-1);
    },
    elemOnClick(event) {
      console.log("阻止冒泡");
      event.stopPropagation();
    }
  }
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
