<template>
  <div
    class="screen-viewport"
    ref="screenView"
    :style="{
      width: width + 'px',
      height: height + 'px',
      minWidth: width + 'px',
      minHeight: height + 'px',
      transform:
        'matrix(1,0,0,1,' +
        (offsetX * width) / 100 +
        ',' +
        (offsetY * height) / 100 +
        ')',
    }"
  >
    <div
      class="no-zoom-area"
      :style="{
        top: computeScale / 2 + '%',
        left: computeScale / 2 + '%',
        width: 100 - computeScale + '%',
        height: 100 - computeScale + '%',
      }"
    >
      <div v-for="(item, index) of stageDisplay" :key="index">
        <span v-if="item.type === 'text'" class="modelText">
          <!-- <textSet :dragValue="item"></textSet> -->
          <span v-if="!editing" @dblclick="edit">请对文本框进行编辑</span>
          <input v-else type="text" value="请对文本框进行编辑" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import textSet from "../components/componentList/text/textSet";

@Component({ components: { textSet } })
export default class HomePage extends Vue {
  @Prop() resolution!: string; // �ֱ���
  @Prop() offsetX!: string; // x�������
  @Prop() offsetY!: string; // y�������
  @Prop() scale!: number; // ����
  @Prop() playbillBg!: string; // ��Ŀ������ͼ��
  @Prop() program!: Program; // ��Ŀ

  get width() {
    return this.resolution.split("*")[0];
  }

  get height() {
    return this.resolution.split("*")[1];
  }

  get computeScale() {
    return Math.round((1 - this.scale) * 100);
  }

  constructor() {
    super();
    this.drop_handler = this.drop_handler.bind(this);
  }

  // 定义舞台组件的数组
  stageDisplay: Array<any> = [];
  editing: boolean = false;

  created() {}

  mounted() {
    (this.$refs.screenView as Element).addEventListener(
      "drop",
      this.drop_handler
    );
    (this.$refs.screenView as Element).addEventListener(
      "dragover",
      this.dragover_handler
    );
  }

  edit(ev: any) {
    console.log("dbclick");
  }

  // 放下时的操作
  drop_handler(ev: any) {
    console.log("放下了", ev.dataTransfer.getData("data"));
    ev.preventDefault();
    this.stageDisplay.push(JSON.parse(ev.dataTransfer.getData("data") || {}));
    console.log(this.stageDisplay);
    for (const index in this.stageDisplay) {
      console.log(this.stageDisplay[index]);
    }
    // var id = ev.dataTransfer.getData("text");
    // if (id == "text" && ev.target.id == "text")
    // console.log(id,ev.target.id);
    // ev.target.appendChild(document.getElementById(id));
    // if (id == "text" && ev.target.id == "text") {
    //   var nodeCopy = document.getElementById(id).cloneNode(true);
    //   nodeCopy.id = "textNew";
    //   console.log(nodeCopy)
    //   ev.target.appendChild(nodeCopy);
    // }
  }

  dragover_handler(ev: any) {
    ev.preventDefault();
    // console.log("拖动中", ev);
    ev.dataTransfer.dropEffect = "copy";
    console.log("dragOver");
  }
}
</script>

<style scoped>
.screen-viewport {
  position: relative;
}

.no-zoom-area {
  position: absolute;
  pointer-events: none;
  background: white;
}
.modelText {
  z-index: 100;
  background-color: aqua;
}
</style>
