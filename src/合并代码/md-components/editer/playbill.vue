<template>
  <div class="sub-panel">
    <header class="single">
      <p>节目单</p>
    </header>
    <div>{{elemData}}</div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator'

  @Component({})

  export default class ComponentsList extends Vue {
    @Prop() elemData!: {
      playbillName:string
      playbillBg: string
      resolution: string
    }
  }
</script>

<style scoped>

</style>
