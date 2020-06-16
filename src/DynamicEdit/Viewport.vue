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
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component({})
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

  created() {
    // this.
  }

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

  // 放下时的操作
  drop_handler(ev: any) {
    // console.log("放下了", ev.dataTransfer.getData("data"));
    ev.preventDefault();

    var id = ev.dataTransfer.getData("text");
    // Only Move the element if the source and destination ids are both "move"
    if (id == "text" && ev.target.id == "text")
    console.log(id,ev.target.id);
    // ev.target.appendChild(document.getElementById(id));
    if (id == "text" && ev.target.id == "text") {
      // var nodeCopy = document.getElementById(id).cloneNode(true);
      var nodeCopy = document.getElementById(id).cloneNode(true);
      // nodeCopy.id = "textNew";
      console.log(nodeCopy)
      ev.target.appendChild(nodeCopy);
    }
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
</style>
