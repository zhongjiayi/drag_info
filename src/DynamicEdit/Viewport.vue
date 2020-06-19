<template>
  <div class="screen-viewport"
       :style="{width:width + 'px',height:height + 'px',minWidth:width + 'px',minHeight:height + 'px',transform:'matrix(1,0,0,1,' + (offsetX * width / 100)  + ',' + (offsetY * height / 100) + ')'}"
       @mousedown="changElemActive"
  >
    <div class="no-zoom-area"
         :style="{top:computeScale / 2 + '%',left:computeScale / 2 + '%',width:(100 - computeScale) + '%',height:(100 - computeScale) + '%'}"></div>
    <div class="playbill-area zoom-area" :style="{transform: 'scale(' + scale + ')',background:playbillBg}">
      <ElemBox :elemList="playbillElemList" :model="model" :elemActive="elemActive"></ElemBox>
    </div>
    <div v-if="program" class="program-area zoom-area"
         :style="{transform: 'scale(' + scale + ')',background: program.progBg}">
      <ElemBox :elemList="program.elemList" :model="model" :elemActive="elemActive"></ElemBox>
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
    @Prop() resolution!: string // �ֱ���
    @Prop() offsetX!: string // x�������
    @Prop() offsetY!: string // y�������
    @Prop() scale!: number // ����
    @Prop() playbillBg!: string // ��Ŀ������ͼ��
    @Prop() program!: Program // ��Ŀ
    @Prop() playbillElemList!: Elem // ��Ŀ����Ԫ���б�
    @Prop() elemActive!: number // �����Ԫ��λ��

    private model = 'edit'  // ��ǰģʽ  �� play he model

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
