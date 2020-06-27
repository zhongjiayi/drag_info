<template>
  <div class="elemBox">
    <div
      class="elemBox-elem"
      v-for="(elem,index) of elemList"
      :key="elem.pIndex"
      :style="{width:elem.elemComAttr.width + 'px',height:elem.elemComAttr.height + 'px',top:elem.elemComAttr.pointY + 'px',left:(elem.elemComAttr.pointX > 0 ? elem.elemComAttr.pointX : '-' + Math.abs(elem.elemComAttr.pointX)) + 'px',
         zIndex:elemActive === elem.pIndex ? '8888888' : elemList.length-index}"
    >
      <!--Ԫ��չʾ���-->
      <div
        class="elemBox-elem-content"
        :style="{opacity:elem.elemComAttr.opacity / 100}"
        @mousedown.stop
      >
        <components :is="elem.elemType" :elemData="elem" :model="model"></components>
      </div>
      <div
        class="elemBox-elem-border"
        v-if="model === 'edit'"
        v-show="!(elemActive === elem.pIndex)"
      ></div>
      <div
        class="elemBox-elem-interPlat"
        v-if="model === 'edit' && !isActive"
        :class="{activePlat:(!isActive && elemActive === elem.pIndex)}"
        @mousedown.stop="changeElemActive($event,elem)"
        @dblclick="changeIsEdit"
      >
        <div
          class="interPlat-resizer"
          v-show="!isActive && elemActive === elem.pIndex"
          :style="{fontSize: (14 / scale) + 'px'}"
        >
          <div class="t resizable-handle" @mousedown.stop="getStartPoint($event,'t',elem)"></div>
          <div class="b resizable-handle" @mousedown.stop="getStartPoint($event,'b',elem)"></div>
          <div class="r resizable-handle" @mousedown.stop="getStartPoint($event,'r',elem)"></div>
          <div class="l resizable-handle" @mousedown.stop="getStartPoint($event,'l',elem)"></div>
          <div class="tr resizable-handle" @mousedown.stop="getStartPoint($event,'tr',elem)"></div>
          <div class="tl resizable-handle" @mousedown.stop="getStartPoint($event,'tl',elem)"></div>
          <div class="br resizable-handle" @mousedown.stop="getStartPoint($event,'br',elem)"></div>
          <div class="bl resizable-handle" @mousedown.stop="getStartPoint($event,'bl',elem)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from "vue-property-decorator";
import scrollingText from "../md-components/show/scrollingText.vue";
import images from "../md-components/show/images.vue";
import week from "../md-components/show/week.vue";
import dateTime from "../md-components/show/dateTime.vue";
import videos from "../md-components/show/videos.vue";
import rotationGroup from "../md-components/show/rotationGroup.vue";
import textEditor from "../md-components/show/textEditor.vue";

@Component({
  components: {
    scrollingText,
    images,
    week,
    dateTime,
    videos,
    rotationGroup,
    textEditor
  }
})
export default class ElemBox extends Vue {
  @Prop() elemList!: Elem[];
  @Prop() model!: string;
  @Prop() elemActive!: number;
  @Prop() scale!: number;
  @Prop() resolution!: string;

  private isActive = false;

  @Watch("elemActive")
  resetIsEdit() {
    if (this.isActive === true) {
      this.isActive = false;
      // @ts-ignore
      if (
        this.$children[0] !== undefined &&
        this.$children[0].isEdit !== undefined
      ) {
        // @ts-ignore
        this.$children[0].isEdit = false;
      }
    }
  }

  changeIsEdit() {
    // @ts-ignore
    if (
      this.$children[0] !== undefined &&
      this.$children[0].isEdit !== undefined
    ) {
      // @ts-ignore
      this.$children[0].isEdit = true;
      this.isActive = true;
    }
  }

  // Ԫ���ƶ� && ѡ��
  changeElemActive(e: any, elem: Elem) {
    // @ts-ignore
    this.$parent.$parent.activeElemIndex = elem.pIndex;
    const startX = e.clientX;
    const startY = e.clientY;
    const pointX = elem.elemComAttr.pointX;
    const pointY = elem.elemComAttr.pointY;
    const scale = this.scale;
    const maxX = Number(this.resolution.split("*")[0]) - elem.elemComAttr.width;
    const maxY =
      Number(this.resolution.split("*")[1]) - elem.elemComAttr.height;

    function moveHandle(e: any) {
      let subX = Math.round((e.clientX - startX) / scale);
      let subY = Math.round((e.clientY - startY) / scale);
      subX =
        subX + pointX < 0
          ? -pointX
          : subX + pointX > maxX
          ? maxX - pointX
          : subX;
      subY =
        subY + pointY < 0
          ? -pointY
          : subY + pointY > maxY
          ? maxY - pointY
          : subY;
      elem.elemComAttr.pointX = subX + pointX;
      elem.elemComAttr.pointY = subY + pointY;
    }

    document.addEventListener("mousemove", moveHandle);
    document.addEventListener("mouseup", function clickHandle() {
      document.removeEventListener("mousemove", moveHandle);
      document.removeEventListener("mouseup", clickHandle);
    });
  }

  // �޸�Ԫ�ش�С
  getStartPoint(e: any, direction: string, elem: Elem) {
    const width = elem.elemComAttr.width;
    const pointX = elem.elemComAttr.pointX;
    const startX = e.clientX;
    const height = elem.elemComAttr.height;
    const pointY = elem.elemComAttr.pointY;
    const startY = e.clientY;
    const min = 50;
    const scale = this.scale;
    const maxX = Number(this.resolution.split("*")[0]);
    const maxY = Number(this.resolution.split("*")[1]);

    function moveHandle(e: any) {
      if (/(l|r)/.test(direction)) {
        let sub = Math.round((e.clientX - startX) / scale);
        sub = direction.indexOf("l") !== -1 ? -sub : sub;
        const max =
          direction.indexOf("l") !== -1 ? pointX + width : maxX - pointX;
        sub =
          sub + width < min
            ? min - width
            : sub + width > max
            ? max - width
            : sub;
        if (direction.indexOf("l") !== -1) {
          if (pointX - sub < 0) {
            sub = pointX;
          }
          if (pointX - sub > maxX) {
            sub = pointX - maxX;
          }
        }
        elem.elemComAttr.width = sub + width;
        if (direction.indexOf("l") !== -1) {
          elem.elemComAttr.pointX = pointX - sub;
        }
      }
      if (/(t|b)/.test(direction)) {
        let sub = Math.round((e.clientY - startY) / scale);
        sub = direction.indexOf("t") !== -1 ? -sub : sub;
        const max =
          direction.indexOf("t") !== -1 ? pointY + height : maxY - pointY;
        sub =
          height + sub < min
            ? min - height
            : height + sub > max
            ? max - height
            : sub;
        if (direction.indexOf("t") !== -1) {
          if (pointY - sub < 0) {
            sub = pointY;
          }
          if (pointY - sub > maxY) {
            sub = pointX - maxY;
          }
        }
        elem.elemComAttr.height = sub + height;
        if (direction.indexOf("t") !== -1) {
          elem.elemComAttr.pointY = pointY - sub;
        }
      }
    }

    document.addEventListener("mousemove", moveHandle);
    document.addEventListener("mouseup", function clickHandle() {
      document.removeEventListener("mousemove", moveHandle);
      document.removeEventListener("mouseup", clickHandle);
    });
  }
}
</script>

<style scoped lang="scss">
$activeColor: rgb(25, 106, 212);
.elemBox-elem {
  position: absolute;
  box-sizing: content-box;
}

.elemBox-elem-content,
.elemBox-elem-interPlat,
.elemBox-elem-border,
.interPlat-resizer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
}

.elemBox-elem:hover {
  z-index: 9999 !important;
}

.elemBox-elem:hover > .elemBox-elem-border {
  border: 3px solid $activeColor;
}

.activePlat {
  border: 1px solid $activeColor;
}

.interPlat-resizer .t {
  cursor: n-resize;
  top: -0.5em;
  left: 50%;
  margin-left: -0.5em;
}

.interPlat-resizer .b {
  cursor: s-resize;
  bottom: -0.5em;
  left: 50%;
  margin-left: -0.5em;
}

.interPlat-resizer .r {
  cursor: e-resize;
  top: 50%;
  right: -0.5em;
  margin-top: -0.5em;
}

.interPlat-resizer .l {
  cursor: w-resize;
  top: 50%;
  left: -0.5em;
  margin-top: -0.5em;
}

.interPlat-resizer .tr {
  cursor: ne-resize;
  top: -0.5em;
  right: -0.5em;
}

.interPlat-resizer .tl {
  cursor: nw-resize;
  left: -0.5em;
  top: -0.5em;
}

.interPlat-resizer .br {
  cursor: se-resize;
  right: -0.5em;
  bottom: -0.5em;
}

.interPlat-resizer .bl {
  cursor: sw-resize;
  left: -0.5em;
  bottom: -0.5em;
}

.resizable-handle {
  position: absolute;
  width: 1em;
  height: 1em;
}

.resizable-handle:after {
  content: "";
  position: absolute;
  width: 50%;
  height: 50%;
  top: 25%;
  left: 25%;
  background: white;
  border: 1px solid $activeColor;
  border-radius: 50%;
  box-sizing: border-box;
}
</style>
