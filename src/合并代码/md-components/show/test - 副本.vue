<template>
  <div class="sub-panel">
    <div>{{model === 'play' ?'播放中': isEdit ? '编辑中': '没人理我'}}</div>
    <div>{{elemData.elemSupAttr.text}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      elemData: {
        type: Object
      }, // 元素数据
      model: {
        type: String
      } // 播放模式  edit or play
    },
    data() {
      return {
        isEdit: false
      }
    }
  }
</script>

<style scoped lang="scss">
  $fontColor3: rgb(153, 153, 153);
  .sub-panel-body {
    transition: height 0.3s;
    // overflow: hidden;
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
