<template>
  <div>
    <p :style="{ fontSize: fontSize + 'px', width: width }">{{ name }}</p>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ComponentText extends Vue {
  /**
   * 通过装饰器标题 name属性是一个props
   */
  @Prop() name!: string;
  @Prop() fontSize!: number;
  @Prop() width!: string;
}
</script>
<style lang="Sass"></style>
