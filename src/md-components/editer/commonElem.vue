<template>
  <div class="sub-panel">
    <header @click="changExtend">
      <p>通用</p>
      <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
        <path
            d="M6 6.82l2.494-2.555a.867.867 0 0 1 1.248 0 .919.919 0 0 1 0 1.277L6.624 8.735a.867.867 0 0 1-1.248 0L2.258 5.542a.919.919 0 0 1 0-1.277.867.867 0 0 1 1.248 0L6 6.819z"></path>
      </svg>
    </header>
    <div class="sub-panel-body" :style="{height: stretch ? '100px': '0'}">
      <div v-if="stretch">
        <div class="panel-horizon">
          <!--              <div>-->
          <!--                <div>次数</div>-->
          <!--                <input type="text" v-model="msgData.elemTime">-->
          <!--              </div>-->
          <!--              <div>时间</div>-->
          <!--              <input type="text" v-model="msgData.duration">-->
        </div>
        <div class="panel-horizon">
          <div class="insideInputBox">
            <el-input-number v-model="msgData.width" controls-position="right" :min="1" :max="9999" size="mini"/>
            <div class="title">W</div>
          </div>
          <div class="insideInputBox">
            <el-input-number v-model="msgData.height" controls-position="right" :min="1" :max="9999" size="mini"/>
            <div class="title">H</div>
          </div>
          <div class="insideInputBox">
            <div class="title">
              <svg class="svg-icon">
                <circle cx="6" cy="6" r="6" style="fill:rgb(200,205,208)"></circle>
                <circle cx="6" cy="3" r="2" style="fill:rgb(41,141,248)"></circle>
              </svg>
            </div>
            <el-input-number v-model="msgData.rotate" controls-position="right" :min="0" :max="360" size="mini"/>
          </div>
        </div>
        <div class="panel-horizon">
          <div class="insideInputBox">
            <div class="title">X</div>
            <el-input-number v-model="msgData.pointX" controls-position="right" :min="1" :max="9999" size="mini"/>
          </div>
          <div class="insideInputBox">
            <div class="title">Y</div>
            <el-input-number v-model="msgData.pointY" controls-position="right" :min="1" :max="9999" size="mini"/>
          </div>
          <div class="insideInputBox">
            <div class="title">透明度</div>
            <el-input-number v-model="msgData.opacity" controls-position="right" :min="0" :max="100" size="mini"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator'

  @Component({})

  export default class commonElem extends Vue {
    @Prop() msgData!: any

    // private width: number = 0
    // private height: number = 0
    //
    // private offsetX: number = 0
    // private offsetY: number = 0

    // @Watch('width')
    // getWidth(newVal: number, oldVal: number) {
    //   this.msgData.widthHeight = newVal + '*' + this.height
    // }
    //
    // @Watch('height')
    // getHeight(newVal: number, oldVal: number) {
    //   this.msgData.widthHeight = this.width + '*' + newVal
    // }
    //
    // @Watch('offsetX')
    // getOffsetX(newVal: number, oldVal: number) {
    //   this.msgData.coordinate = newVal + '*' + this.offsetY
    // }
    //
    // @Watch('offsetY')
    // getOffsetY(newVal: number, oldVal: number) {
    //   this.msgData.coordinate = this.offsetX + '*' + newVal
    // }

    created(): void {
      // this.width = Number(this.msgData.widthHeight.split('*')[0])
      // this.height = Number(this.msgData.widthHeight.split('*')[1])
      // this.offsetX = Number(this.msgData.coordinate.split('*')[0])
      // this.offsetY = Number(this.msgData.coordinate.split('*')[1])
    }

    private stretch = true

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

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    height: 100%;
    user-select: none;
    color: $fontColor3;
    padding: 0px 3px 0px 5px;
    position: absolute;
    top: 0;
  }


  .insideInputBox {
    position: relative;
    flex: 0 0 66px;
  }

  .svg-icon {
    width: 12px;
    height: 12px;
  }

  .el-input-number--mini {
    width: 66px;
  }
</style>
<style lang="scss">
  $bgColor4: rgb(69, 70, 71);
  $activeColor: rgb(25, 106, 212);
  $gbColor5: rgb(215, 221, 224);
  .sub-panel .el-input-number.is-controls-right .el-input__inner {
    padding-left: 21px !important;
    padding-right: 20px !important;
    background: transparent;
    border-color: transparent;
    color: $gbColor5;
  }

  .sub-panel .el-input-number.is-controls-right .el-input__inner:hover {
    border-color: $bgColor4;
  }

  .sub-panel .el-input-number.is-controls-right .el-input__inner:focus {
    border-color: $activeColor;
  }

  .sub-panel .el-input-number--mini .el-input-number__decrease, .sub-panel .el-input-number--mini .el-input-number__increase {
    background: transparent;
    border-color: transparent !important;
    width: 18px;
  }

  .sub-panel .el-input__inner {
    text-align: left !important;
  }

  .sub-panel .el-input-number > span {
    display: none;
  }

  .sub-panel .insideInputBox:hover .el-input-number span {
    display: block;
  }
</style>
