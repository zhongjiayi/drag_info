<template>
  <div id="app">
    <HomePage></HomePage>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator"
  import HomePage from "@/DynamicEdit/HomePage.vue"

  @Component({
    components: {
      HomePage  
    }
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
  }
</style>

<style>
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
  }

  body {
    background: transparent;
    color: #fafafa;
    box-sizing: border-box
  }

  td, th, caption {
    font-size: 14px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
    font-size: 100%;
  }

  address, caption, cite, code, dfn, em, strong, th, var {
    font-style: normal;
    font-weight: normal;
  }

  a {
    color: #555;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    border: none;
    -webkit-user-drag: none
  }

  ol, ul, li {
    list-style: none;
  }

  table {
    border-collapse: collapse;
  }

  html, body {
    height: 100%;
    width: 100%;
    font-family: 'SimHei';
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
