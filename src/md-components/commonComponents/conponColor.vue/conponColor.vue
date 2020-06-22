<template>
  <div class="chooseColor">
    <div @click="handleShowColor" class="colorBox">
      <span class="color_con" :style="{ background: color.hex }"></span>
      <a-input placeholder="选择颜色" :style="{ color: color.hex,width:'75px' }" v-model="color.hex" />
    </div>
    <div @click="handleClick" v-if="colorShow">
      <sketch-picker v-model="color" @input="triggerChange"></sketch-picker>
    </div>
  </div>
</template>


<script>
import { Sketch } from "vue-color";
export default {
  props: {
    value: {
      hot: String,
      default: null
    }
  },

  components: {
    "sketch-picker": Sketch
  },

  data() {
    return {
      color: this.value,
      colorShow: false
    };
  },
    watch: {
    colorShow(value){
      if(value){
        setTimeout(() => {
          window.addEventListener("click", this.hide);
        });
      }else{
        window.removeEventListener("click", this.hide);
      }
    }
  },

  created() {
    this.hide = this.hide.bind(this);
  },

  methods: {
    triggerChange(color) {
      this.$emit("change", color.hex);
    },
    // 更改字体颜色
    handleShowColor() {
      if (this.colorShow) {
        this.colorShow = false;
      } else {
        this.colorShow = true;
        setTimeout(() => {
        console.log(this.$refs) 
      });
      }
    },
    hide(event){
      this.colorShow = false;
    },
    handleClick(event){
      console.log('禁止冒泡');
      event.stopPropagation();
    }
  }
};
</script>
<style scoped lang="scss">
.color_con {
  width: 15px;
  height: 15px;
  position: relative;
  border: 1px solid #fff;
  margin-right: 10px;
  margin-top: 6px;
}

.colorBox {
  display: flex;
}

/deep/ .vc-sketch {
  position: absolute !important;
  left: -65px !important;
  z-index: 9999 !important;
  width: 170px !important;
  padding: 5px 5px 0;
}

/deep/ .vc-sketch .vc-sketch-field .vc-input__input {
  height: 20px !important;
}

/deep/ .vc-sketch .vc-sketch-presets-color {
  margin: 0 5px 5px 0;
}

/deep/ .vc-sketch-field .vc-input__label {
  height: 40px;
}
</style>
