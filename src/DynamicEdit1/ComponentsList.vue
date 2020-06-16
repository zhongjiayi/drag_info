<template>
  <BasicStyle>
    <template #headerLeft>
      <!--退出收索按钮-->
      <div
        v-if="isSearchMode"
        class="header-icon-box"
        @click.left.stop="changeSearchMode"
      >
        <svg class="svg-icon " viewBox="0 0 12 11" aria-hidden="true">
          <path
            d="M3.578 6.498L6.5 9.493 5.029 11 .305 6.16a1.084 1.084 0 0 1 0-1.508L5.029 0 6.5 1.507 3.437 4.502h7.565a.998.998 0 1 1 0 1.996H3.578z"
          ></path>
        </svg>
      </div>
      <!--添加节目-->
      <p v-else>组件列表</p>
    </template>
    <template #headerRight>
      <!--收索输入框-->
      <transition name="search">
        <div v-if="isSearchMode" class="layer-search">
          <div class="search-icon">
            <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M10.077 11.67l-1.99-1.99a5.227 5.227 0 0 1-2.828.837 5.259 5.259 0 1 1 5.259-5.258c0 1.043-.313 2.01-.837 2.828l1.989 1.988a1.128 1.128 0 0 1-1.593 1.595zm-4.84-9.433a3 3 0 1 0 .001 6.001 3 3 0 0 0 0-6.001z"
              ></path>
            </svg>
          </div>
          <input
            v-if="isSearchMode"
            class="hzInput searchInput"
            type="text"
            placeholder="关键字搜索"
            v-model="filterKey"
          />
        </div>
      </transition>
      <!--搜索按钮-->
      <div
        v-if="!isSearchMode"
        class="pane-searchButton header-icon-box"
        @click.left.stop="changeSearchMode"
      >
        <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M10.077 11.67l-1.99-1.99a5.227 5.227 0 0 1-2.828.837 5.259 5.259 0 1 1 5.259-5.258c0 1.043-.313 2.01-.837 2.828l1.989 1.988a1.128 1.128 0 0 1-1.593 1.595zm-4.84-9.433a3 3 0 1 0 .001 6.001 3 3 0 0 0 0-6.001z"
          ></path>
        </svg>
      </div>
      <!--折叠按钮-->
      <slot v-if="!isSearchMode" name="stretchButton"></slot>
    </template>
    <template #main>
      <div class="layer-sortable-list">
        <ul class="components-list">
          <li
            class="component"
            v-for="component of componentsList"
            :key="component.type"
            draggable="true"
            @dragstart="dragstart_handler($event,component)"
            ref="dragComponent"
          >
            <div class="component-icon-wrapper">
              <svg class="svg-icon">
                <path v-for="item of component.path" :d="item"></path>
              </svg>
            </div>
            <span>{{ component.name }}</span>
          </li>
        </ul>
      </div>
    </template>
    <!--拖动条插槽-->
    <slot name="operateHor"></slot>
  </BasicStyle>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import BasicStyle from "./BasicStyle.vue";

@Component({
  components: {
    BasicStyle,
  },
})
export default class ComponentsList extends Vue {
  @Prop() components!: { scope: string; name: string }[];

  private filterKey = "";

  private isModel = "local";

  get componentsList() {
    return this.components.filter(
      (item) =>
        item.scope.indexOf(this.isModel) !== -1 &&
        item.name.indexOf(this.filterKey) !== -1
    );
  }

  // 搜索模式切换
  private isSearchMode = false;

  changeSearchMode(): void {
    this.isSearchMode = !this.isSearchMode;
    this.filterKey = "";
  }

  dragstart_handler(ev: any, componentData: any) {
    console.log("开始拖动", ev);
    ev.dataTransfer.setData("data", JSON.stringify(componentData));
    // Change the source element's background color to signify drag has started
    // ev.currentTarget.style.border = "dashed";
    // Add the id of the drag source element to the drag data payload so
    // it is available when the drop event is fired
    // ev.dataTransfer.setData("text", ev.target.id);
    // Tell the browser both copy and move are possible
    // ev.effectAllowed = "copyMove";
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
