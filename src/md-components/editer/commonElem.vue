<template>
  <div class="sub-panel">
    <header>
      <p>通用</p>
      <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
        <path
            d="M6 6.82l2.494-2.555a.867.867 0 0 1 1.248 0 .919.919 0 0 1 0 1.277L6.624 8.735a.867.867 0 0 1-1.248 0L2.258 5.542a.919.919 0 0 1 0-1.277.867.867 0 0 1 1.248 0L6 6.819z"></path>
      </svg>
    </header>
    <div class="sub-panel-body">
      <div>次数</div>
      <input type="text" v-model="msgData.elemTime">
      <div>宽高</div>
      <input type="text" v-model="width">
      <div>{{width}}</div>
      <input type="text" v-model="height">
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator'

  @Component({})

  export default class ComponentsList extends Vue {
    @Prop() msgData!: {
      widthHeight: string
      elemTime: number
      duration: string
    }

    private width: string = '0'
    private height: string = '0'

    @Watch('width')
    getWidth(newVal: string) {
      this.msgData.widthHeight = newVal + '*' + this.height
    }

    @Watch('height')
    getHeight(newVal: string) {
      this.msgData.widthHeight = this.width + '*' + newVal
    }

    created(): void {
      this.width = this.msgData.widthHeight.split('*')[0]
      this.height = this.msgData.widthHeight.split('*')[1]
    }
  }
</script>

<style scoped>

</style>
