<template>
  <div class="sub-panel">
    <div v-if="(model == 'play')||(model == 'edit' && !isEdit)">
      <div v-html="immediateData?immediateData:'请双击编辑'"></div>
    </div>
    <div v-if="model == 'edit' && isEdit">
      <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
    </div>
  </div>
</template>

<script>
import EditorBar from "../commonTool/wangEduit/editoritem";

export default {
  props: {
    elemData: {
      type: Object
    }, // 元素数据
    model: {
      type: String
    } // 播放模式  edit or play
  },
  components: { EditorBar },
  data() {
    return {
      isEdit: false,
      attribute: {},
      isClear: false,
      detail: "",
      immediateData: ""
    };
  },
  created() {
    this.attribute = this.elemData.elemSupAttr || {};
    console.log(this.attribute);
  },
  methods: {
    change(val) {
      this.immediateData = val;
      console.log('immediateData', val);
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
