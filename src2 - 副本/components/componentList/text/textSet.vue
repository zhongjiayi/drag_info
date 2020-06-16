<template>
  <div>
    <span v-if="!editing" @dblclick="edit">请对文本框进行编辑</span>
    <input
      type="text"
      class="baseText"
      ref="textInput"
      v-if="editing"
      :value="editValue.text"
      v-model="editValue.text"
      @blur="save"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    dragValue:{
      hot:Object,
      default:()=>{}
    }
  },
  data: function() {
    return {
      editing: false,
      editValue:{}
    };
  },
  created(){
    this.editValue =Object.assign({},this.dragValue)
    console.log(this.editValue)
  },
  methods: {
    // 双击编辑
    edit: function() {
      this.editing = true;
      this.$nextTick(function() {
        this.$els.input.focus();
      });
    },
    // 取消编辑
    save: function() {
      this.editing = false;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
