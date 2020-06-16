<template>
  <div class="screen-viewport"
       :style="{width:width + 'px',height:height + 'px',minWidth:width + 'px',minHeight:height + 'px',transform:'matrix(1,0,0,1,' + (offsetX * width / 100)  + ',' + (offsetY * height / 100) + ')'}"
  >
    <div class="no-zoom-area"
         :style="{top:computeScale / 2 + '%',left:computeScale / 2 + '%',width:(100 - computeScale) + '%',height:(100 - computeScale) + '%'}"></div>
  </div>
</template>

<script lang="ts">
  import {Vue, Prop, Component} from 'vue-property-decorator'

  @Component({})

  export default class HomePage extends Vue {
    @Prop() resolution!: string // �ֱ���
    @Prop() offsetX!: string // x�������
    @Prop() offsetY!: string // y�������
    @Prop() scale!: number // ����
    @Prop() playbillBg!: string // ��Ŀ������ͼ��
    @Prop() program!: Program // ��Ŀ

    get width() {
      return this.resolution.split('*')[0]
    }

    get height() {
      return this.resolution.split('*')[1]
    }

    get computeScale() {
      return Math.round((1 - this.scale) * 100)
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
