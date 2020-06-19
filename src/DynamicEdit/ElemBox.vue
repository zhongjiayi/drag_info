<template>
  <div class="elemBox">
    <div
      class="elemBox-elem"
      v-for="(elem, index) of elemList"
      :key="elem.pIndex"
      :style="{
        width: elem.elemComAttr.width + 'px',
        height: elem.elemComAttr.height + 'px',
        top: elem.elemComAttr.pointY + 'px',
        left:
          (elem.elemComAttr.pointX > 0
            ? elem.elemComAttr.pointX
            : '-' + Math.abs(elem.elemComAttr.pointX)) + 'px',
        zIndex: elemList.length - index,
        transform: 'rotate(' + elem.elemComAttr.rotate + 'deg)',
      }"
    >
      <conponText :params="params"></conponText>
      <conponRotate :params="params"></conponRotate>
      <!--Ԫ��չʾ���-->
      <div
        class="elemBox-elem-content"
        :style="{ opacity: elem.elemComAttr.opacity / 100 }"
      >
        <components
          :is="elem.elemType"
          :elemData="elem"
          :isActive="isActive"
        ></components>
      </div>
      <div
        class="elemBox-elem-border"
        v-if="model === 'edit'"
        v-show="!(elemActive === elem.pIndex)"
      ></div>
      <div
        class="elemBox-elem-interPlat"
        v-if="model === 'edit'"
        :class="{ activePlat: !isActive && elemActive === elem.pIndex }"
        @mousedown.stop="changeElemActive($event, elem)"
        @dblclick="changeIsEdit"
      >
        <div
          class="interPlat-resizer"
          v-show="elemActive === elem.pIndex"
          :style="{ fontSize: 14 / scale + 'px' }"
        >
          <div
            class="rotate"
            :style="{ fontSize: 18 / scale + 'px' }"
            @mousedown.stop="rotateElem($event, elem)"
          ></div>
          <div
            class="t resizable-handle"
            @mousedown.stop="getStartPoint($event, 't', elem)"
          ></div>
          <div
            class="b resizable-handle"
            @mousedown.stop="getStartPoint($event, 'b', elem)"
          ></div>
          <div
            class="r resizable-handle"
            @mousedown.stop="getStartPoint($event, 'r', elem)"
          ></div>
          <div
            class="l resizable-handle"
            @mousedown.stop="getStartPoint($event, 'l', elem)"
          ></div>
          <div
            class="tr resizable-handle"
            @mousedown.stop="getStartPoint($event, 'tr', elem)"
          ></div>
          <div
            class="tl resizable-handle"
            @mousedown.stop="getStartPoint($event, 'tl', elem)"
          ></div>
          <div
            class="br resizable-handle"
            @mousedown.stop="getStartPoint($event, 'br', elem)"
          ></div>
          <div
            class="bl resizable-handle"
            @mousedown.stop="getStartPoint($event, 'bl', elem)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from "vue-property-decorator";
import conponText from "../md-components/commonComponents/compon_text"; //文本
import conponImage from "../md-components/commonComponents/compon_image"; //图片
import conponVideo from "../md-components/commonComponents/compon_video"; //视频
import conponRotate from "../md-components/commonComponents/compon_rotate"; //轮播图
import conponTime from "../md-components/commonComponents/compon_time"; //时间
import eventVue from "../md-components/conponentEdit/eventBus";

@Component({
  components: {
    conponText,
    conponImage,
    conponVideo,
    conponRotate,
    conponTime,
  },
})
export default class ElemBox extends Vue {
  @Prop() elemList!: Elem[];
  @Prop() model!: string;
  @Prop() elemActive!: number;
  @Prop() scale!: number;
  @Prop() resolution!: string;

  private isActive = false;

  // private params = {
  //   name: "编辑文本",
  //   type: "text",
  //   scope: "local",
  //   path: [
  //     "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z",
  //   ],
  //   sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
  //   attributes: [
  //     {
  //       name: "名称",
  //       code: "name",
  //       type: "STRING",
  //       value: "",
  //     },
  //     {
  //       name: "颜色",
  //       code: "fontColor",
  //       type: "COLOR",
  //       value: "red",
  //     },
  //     {
  //       name: "背景",
  //       code: "backgroundColor",
  //       type: "COLOR",
  //       value: "red",
  //     },
  //     {
  //       name: "字体大小",
  //       code: "fontSize",
  //       type: "ENUM",
  //       options: [
  //         {
  //           label: "12px",
  //           value: "12",
  //         },
  //         {
  //           label: "14px",
  //           value: "14",
  //         },
  //         {
  //           label: "28px",
  //           value: "28",
  //         },
  //         {
  //           label: "32px",
  //           value: "32",
  //         },
  //       ],
  //       // 默认14
  //       value: 28,
  //     },
  //   ],
  // };
  private params = {
    name: "轮播组",
    type: "carousel",
    scope: "local",
    path: [
      "M28.5 6.5v1.007l2-.01v10.035h-2v.968H31a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5h-2.5zm-23 0H3a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h2.5v-.968h-2V7.498l2 .009V6.5z",
      "M9 5v15h16V5H9zM8 3h18a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
      "M14 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2.253 7.664l-1.494-1.328 4.787-5.386L17 14.4l3.917-4.897 3.79 3.79-1.414 1.414-2.21-2.21L17 17.601l-2.04-2.55z",
    ],
    sPath: [
      "M1 8H0V2h1v6zm13 0h-1V2h1v6zM3 1v8h8V1H3zm-.167-1h8.334c.46 0 .833.373.833.833v8.334c0 .46-.373.833-.833.833H2.833A.833.833 0 0 1 2 9.167V.833C2 .373 2.373 0 2.833 0zM4 8V7l1.75-2L7 6.5 9 4l1 2v2H4zm0-6h2v2H4V2z",
    ],
    attributes: [
      {
        name: "间隔",
        code: "interval",
        type: "ENUM",
        options: [
          {
            label: "1000ms",
            value: "1000",
          },
          {
            label: "2000ms",
            value: "2000",
          },
          {
            label: "3000ms",
            value: "3000",
          },
          {
            label: "4000ms",
            value: "4000",
          },
          {
            label: "5000ms",
            value: "5000",
          },
        ],
        value: "1000",
      },
      {
        name: "方向",
        code: "dotPosition",
        type: "ENUM",
        options: [
          {
            label: "上下切换",
            value: "right",
          },
          {
            label: "左右切换",
            value: "bottom",
          },
        ],
        value: "bottom",
      },
      {
        name: "特效",
        code: "effectStyle",
        type: "ENUM",
        options: [
          {
            label: "线性滑动",
            value: "scrollx",
          },
          {
            label: "渐隐渐显",
            value: "fade",
          },
        ],
        value: "scrollx",
      },
    ],
  };

  @Watch("elemActive")
  resetIsEdit() {
    if (this.isActive === true) {
      this.isActive = false;
    }
  }

  changeIsEdit() {
    this.isActive = true;
  }

  // Ԫ���ƶ� && ѡ��
  changeElemActive(e: any, elem: Elem) {
    // @ts-ignore
    this.$parent.$parent.activeElemIndex = elem.pIndex;
    eventVue.$emit("changeParams", this.params);
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

  // ��תԪ��
  rotateElem(e: any, elem: Elem) {
    const startX = e.clientX;
    const startY = e.clientY;
    const startAngle = elem.elemComAttr.rotate;
    const startCentreX =
      e.target.parentNode.getBoundingClientRect().left +
      (elem.elemComAttr.width / 2) * this.scale;
    const startCentreY =
      e.target.parentNode.getBoundingClientRect().top +
      (elem.elemComAttr.height / 2) * this.scale;

    function moveHandle(e: any) {
      const l1 = Math.sqrt(
        Math.pow(Math.abs(startX - startCentreX), 2) +
          Math.pow(Math.abs(startY - startCentreY), 2)
      );
      const l2 = Math.sqrt(
        Math.pow(Math.abs(e.clientX - startCentreX), 2) +
          Math.pow(Math.abs(e.clientY - startCentreY), 2)
      );
      const l3 = Math.sqrt(
        Math.pow(Math.abs(startX - e.clientX), 2) +
          Math.pow(Math.abs(startY - e.clientY), 2)
      );
      let angle = Math.round(
        (Math.acos(
          (Math.pow(l2, 2) + Math.pow(l1, 2) - Math.pow(l3, 2)) / (2 * l2 * l1)
        ) /
          Math.PI) *
          180
      );

      const l1Y = Math.sqrt(Math.abs(Math.pow(l1, 2) - Math.pow(startX, 2)));
      const l1Angle =
        (Math.pow(l1, 2) + Math.pow(startX, 2) - Math.pow(l1Y, 2)) /
        (2 * l1 * startX);
      const l2Y = Math.sqrt(Math.abs(Math.pow(l2, 2) - Math.pow(e.clientX, 2)));
      const l2Angle =
        (Math.pow(l2, 2) + Math.pow(e.clientX, 2) - Math.pow(l2Y, 2)) /
        (2 * l2 * e.clientX);
      console.log(l2Angle > l1Angle);
      // if (e.clientX < startCentreX) {
      //   angle = -angle
      // }
      // console.log(angle)
      // console.log(startAngle)
      elem.elemComAttr.rotate =
        startAngle + angle > 360
          ? startAngle + angle - 360
          : startAngle + angle < 0
          ? startAngle + angle + 360
          : startAngle + angle;
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
          direction.indexOf("l") !== -1 ? maxX - pointX + width : maxX - pointX;
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
          direction.indexOf("t") !== -1
            ? maxY - pointY + height
            : maxY - pointY;
        console.log(max);
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

.interPlat-resizer .rotate {
  position: absolute;
  left: 50%;
  top: -1.44em;
  width: 1em;
  height: 1em;
  margin-left: -0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: red;
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
