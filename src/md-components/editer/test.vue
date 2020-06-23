<template>
  <div class="sub-panel">
    <header @click="changExtend">
      <p>测试</p>
      <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
        <path
            d="M6 6.82l2.494-2.555a.867.867 0 0 1 1.248 0 .919.919 0 0 1 0 1.277L6.624 8.735a.867.867 0 0 1-1.248 0L2.258 5.542a.919.919 0 0 1 0-1.277.867.867 0 0 1 1.248 0L6 6.819z"></path>
      </svg>
    </header>
    <div class="sub-panel-body" :style="{height: stretch ? height + 'px': '0'}">
      <div v-if="stretch">
        <div class="panel-horizon">
          <!--一横行数据-->
          <div>阿巴阿巴</div>
        </div>
        <div class="panel-horizon">
          <!--一横行数据-->
          <input type="text" v-model="msgData.text">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator'

  @Component({})

  export default class test extends Vue {
    @Prop() msgData!: any // 元素数据

    private stretch = true // 加载时是折叠还是不折叠
    private height = 100 // 当前组件的高度

    changExtend() {
      this.stretch = !this.stretch
    }
  }
</script>

<style scoped lang="scss">
  $fontColor3: rgb(153, 153, 153);
  .sub-panel-body {
    transition: height 0.3s;
    overflow: hidden;
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
