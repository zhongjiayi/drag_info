<template>
  <div class="screen-viewport"
       :style="{width:width + 'px',height:height + 'px',minWidth:width + 'px',minHeight:height + 'px',transform:'matrix(1,0,0,1,' + (offsetX * width / 100)  + ',' + (offsetY * height / 100) + ')'}"
       @mousedown="changElemActive"
  >
    <div class="no-zoom-area"
         :style="{top:computeScale / 2 + '%',left:computeScale / 2 + '%',width:(100 - computeScale) + '%',height:(100 - computeScale) + '%'}"></div>
    <div class="playbill-area zoom-area" :style="{transform: 'scale(' + scale + ')',background:playbillBg}">
      <ElemBox :elemList="playbillElemList" :model="model" :elemActive="elemActive" :scale="scale" :resolution="resolution"></ElemBox>
    </div>
    <div v-if="program" class="program-area zoom-area"
         :style="{transform: 'scale(' + scale + ')',background: program.progBg}">
      <ElemBox :elemList="program.elemList" :model="model" :elemActive="elemActive" :scale="scale" :resolution="resolution"></ElemBox>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Prop, Component} from 'vue-property-decorator'
  import ElemBox from './ElemBox.vue'

  @Component({
    components: {
      ElemBox
    }
  })

  export default class Viewport extends Vue {
    @Prop() resolution!: string // 分辨率
    @Prop() offsetX!: string // x轴侧移量
    @Prop() offsetY!: string // y轴侧移量
    @Prop() scale!: number // 比例
    @Prop() playbillBg!: string // 节目单背景图案
    @Prop() program!: Program // 节目
    @Prop() playbillElemList!: Elem // 节目单的元素列表
    @Prop() elemActive!: number // 激活的元素位置

    private model = 'edit'  // 当前模式  分 play he model

    get width() {
      return this.resolution.split('*')[0]
    }

    get height() {
      return this.resolution.split('*')[1]
    }

    get computeScale() {
      return Math.round((1 - this.scale) * 100)
    }

    changElemActive(){
      // @ts-ignore
      this.$parent.activeElemIndex = -1
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
    background: transparent;
  }

  .zoom-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center center;
  }
</style>
