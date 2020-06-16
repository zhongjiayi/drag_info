<template>
  <basicStyle>
    <template #headerLeft>
      <p>编辑</p>
    </template>
    <template #main>
      123
    </template>
  </basicStyle>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import BasicStyle from "./BasicStyle.vue"

  @Component({
    components: {
      BasicStyle
    }
  })
  export default class ComponentsList extends Vue {
    private isSearchMode = false
    private componentsList = [
      {
        name: '文本',
        type: 'text',
        icon: 'M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z'
      },
      {name: '图片', type: 'picture', icon: ''},
      {name: '视频', type: 'video', icon: ''},
      {name: '轮播图', type: 'carousel', icon: ''},
    ]

    changeSearchMode(): void {

    }
  }
</script>

<style scoped lang="scss">
  $fontColor2: rgb(184, 188, 191);
  $bgColor3: rgb(37, 38, 38);
  $bgColor4: rgb(69, 70, 71);
  $activeColor: rgb(25, 106, 212);

  .components-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1px;
    margin-left: 1px;
    padding: 2px 0px 2px 10px;
  }

  .component {
    width: 95px;
    height: 80px;
    margin-top: -1px;
    margin-left: -1px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $fontColor2;
    background: $bgColor3;
    border-width: 1px;
    border-style: solid;
    border-color: $bgColor4;
    border-image: initial;
    cursor: pointer;
  }

  .component:hover {
    z-index: 1;
    border-color: $activeColor;
    border-width: 2px;
  }

  .component-icon-wrapper {
    height: 30px;
    font-size: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
