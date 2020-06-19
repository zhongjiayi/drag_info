<template>
  <div class="elemBox">
    <div
      class="elemBox-elem"
      v-for="(elem, index) of elemList"
      :key="elem.pIndex"
      :style="{
        width: elem.elemComAttr.widthHeight.split('*')[0] + 'px',
        height: elem.elemComAttr.widthHeight.split('*')[1] + 'px',
        top: elem.elemComAttr.coordinate.split('*')[0] + 'px',
        left: elem.elemComAttr.coordinate.split('*')[1] + 'px',
        zIndex: elemList.length - index,
      }"
    >
      <conponText :params="params"></conponText>
      <!-- <conponImage></conponImage> -->
      <!-- <conponRotate :params="params"></conponRotate> -->
      <!-- <conponVideo></conponVideo> -->
      <!-- <conponTime></conponTime>  -->
      <!-- <div class="elemBox-elem-content">{{ elem }}</div> -->
      <div
        class="elemBox-elem-border"
        v-if="model === 'edit'"
        v-show="!isEdit"
      ></div>
      <div
        class="elemBox-elem-interPlat"
        @mousedown.stop="changeElemActive(elem.pIndex)"
        @dblclick="changeIsEdit"
      ></div>
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

  private isEdit = false;

  private params = {
    name: "文本",
    type: "text",
    scope: "local",
    path: [
      "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z",
    ],
    sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
    attributes: [
      {
        name: "名称",
        code: "name",
        type: "STRING",
        value: "呵呵哒",
      },
      {
        name: "颜色",
        code: "fontColor",
        type: "COLOR",
        value: "red",
      },
      {
        name: "背景颜色",
        code: "backgroundColor",
        type: "COLOR",
        value: "red",
      },
      {
        name: "字体大小",
        code: "fontSize",
        type: "MENU",
        options: [
          {
            label: "12px",
            value: "12",
          },
          {
            label: "14px",
            value: "14",
          },
          {
            label: "28px",
            value: "28",
          },
          {
            label: "32px",
            value: "32",
          },
        ],
        // 默认14
        value: 28,
      },
    ],
  };

  // fontColor: "black",
  // fontSize: 14,
  // name: "编辑文字",
  // backgroundColor: "transparent",

  // name: "bobob",
  // // 自动播放
  // autoplay: true,
  // // 宽度
  // width: "200px",
  // // 高度（未生效）
  // height: "150px",
  // // 轮播时间间隔
  // interval: 1000,
  // // 是否显示面板指示点
  // dots: true,
  // // 面板指示点位置 top bottom left right
  // dotPosition: "bottom",
  // // 是否显示左右按钮
  // HandleButton: true,
  // // 切换特效
  // effectStyle: "scrollx",
  // // 图片资源
  // imageSrc: [
  //   {
  //     img:
  //       "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
  //     id: 1,
  //   },
  //   {
  //     img:
  //       "http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658",
  //     id: 2,
  //   },
  // ],
  // };

  // 更新属性的方法
  // transParams() {
  //   eventVue.$emit("changeParams", this.params); //$emit这个方法会触发一个事件
  // }

  @Watch("elemActive")
  resetIsEdit() {
    if (this.isEdit === true) {
      this.isEdit = false;
    }
  }

  changeElemActive(index: number) {
    // @ts-ignore
    this.$parent.$parent.activeElemIndex = index;
    eventVue.$emit("changeParams", this.params);
  }

  changeIsEdit() {
    this.isEdit = true;
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
.elemBox-elem-border {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.elemBox-elem:hover {
  z-index: 9999 !important;
}

.elemBox-elem:hover > .elemBox-elem-border {
  border: 3px solid $activeColor;
}
</style>
