<template>
  <div class="ht-layer-panel">
    <div class="layer-header">
      <div class="header-left">
        <!--ͷ�������-->
        <slot name="headerLeft"></slot>
      </div>
      <div class="header-right">
        <!--ͷ���Ҳ���-->
        <slot name="headerRight"></slot>
      </div>
    </div>
    <div class="layer-scroll-list">
      <!--�����ݲ��-->
      <slot name="main"></slot>
    </div>
    <!--�������-->
    <slot></slot>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  $fontColor2: rgb(184, 188, 191);
  $fontColor3: rgb(153, 153, 153);
  $bgColor1: rgb(53, 55, 56);
  $bgColor2: rgb(21, 21, 21);
  $activeColor: rgb(25, 106, 212);
  // ͨ������
  // �б�
  .currentList-list:hover .handleButton {
    display: block;
  }

  .currentList-list {
    position: relative;
    cursor: pointer;
  }

  .currentList-list:hover {
    background-color: $bgColor2;
  }

  .currentList-list.active {
    background-color: $activeColor;
  }

  // ͷ��

  .screen-title {
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    color: $fontColor2;
  }

  .screen-title:hover {
    color: $activeColor;
  }

  .add-icon {
    margin-right: 6px;
    font-size: 14px;
  }

  .layer-search {
    position: relative;
    height: 24px;
    width: 170px;
  }

  .textBox {
    width: 75%;
  }

  .searchInput {
    padding-left: 24px;
  }

  .search-icon {
    position: absolute;
    left: 0px;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    color: $fontColor3;
  }

  .handleButton {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0 10px;
    display: none;
    cursor: pointer;
  }

  .screen-item > svg {
    margin-right: 8px;
  }

  .search-enter-active {
    transition: width .3s;
  }

  .search-enter {
    width: 0;
  }
</style>

<style scoped lang="scss">
  $bgColor2: rgb(21, 21, 21);
  $bgColor5: rgb(75, 80, 80);
  $fontColor1: rgb(214, 221, 224);
  .ht-layer-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .layer-header {
    padding-left: 10px;
    padding-right: 5px;
    color: $bgColor5;
    height: 36px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    border-top: 1px solid $bgColor2;
    border-bottom: 1px solid $bgColor2;
  }

  .layer-scroll-list {
    flex: 1 1 0%;
    overflow: auto;
  }

  .header-left {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    transition: flex 0.2s ease-in-out 0s;
  }

  .header-left > p {
    font-weight: 600;
    color: $fontColor1;
  }

  .header-right {
    display: flex;
    align-items: center;
    margin-left: auto;
    transition: flex 0.2s ease-in-out 0s;
  }
</style>
