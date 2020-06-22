<!--右上角的编辑模块-->
<template>
  <basicStyle>
    <template #headerLeft>
      <p>编辑</p>
    </template>
    <template #main>
      <ul class="editList">
        <li v-for="item of editArr" class="editBox">
          <component :is="item.model" :msgData="item.data"></component>
        </li>
      </ul>
      <conponEdit></conponEdit>
    </template>
  </basicStyle>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import BasicStyle from "./BasicStyle.vue";
import commonElem from "../md-components/editer/commonElem.vue";
import playbill from "../md-components/editer/playbill.vue";
import program from "../md-components/editer/program.vue";
import conponEdit from "../md-components/conponentEdit/conponentEdit.vue";

@Component({
  components: {
    BasicStyle,
    commonElem,
    playbill,
    program,
    conponEdit
  }
})
export default class Editor extends Vue {
  @Prop() editArr!: object[];

  @Watch("editArr") editArrWatch() {
    console.log("editArr", this.editArr);
  }

  created() {}
}
</script>

<style lang="scss">
$bgColor2: rgb(21, 21, 21);
$gbColor5: rgb(215, 221, 224);
$fontColor3: rgb(153, 153, 153);
.sub-panel > header {
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 14px;
  border-top: 1px solid $bgColor2;
  transition: all 0.2s ease-in-out 0s;
}

.sub-panel > header p {
  color: $gbColor5;
  font-weight: 600;
}

.sub-panel > .single {
  cursor: default;
}

.sub-panel > header svg {
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: $fontColor3;
}

.sub-panel .sub-panel-body {
  color: $gbColor5;
  padding: 0px 14px;
}
</style>
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
