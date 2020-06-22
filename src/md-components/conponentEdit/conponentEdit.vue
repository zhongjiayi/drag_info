<template>
  <div class="editForm">
    <a-form id="conponentEdit" :form="form" v-bind="formItemLayout">
      <!-- 动态生成表单 -->
      <a-form-item
        selfUpdate
        v-for="formParams of newParams.attributes"
        :label="formParams.name"
        :key="formParams.code"
      >
        <div v-if="formParams.type == 'COLOR'">
          <div class="fontChooseBox">
            <section class="colorBox">
              <conponColor
                ref="color"
                v-decorator="[
                  formParams.code,
                  {
                    initialValue: attribute[formParams.code],
                  },
                ]"
              ></conponColor>
            </section>
          </div>
        </div>
        <div v-if="formParams.type == 'ENUM'">
          <a-select
            style="width: 100px"
            v-decorator="[
              formParams.code,
              {
                initialValue: attribute[formParams.code],
              },
            ]"
          >
            <a-select-option
              v-for="(item, index) of formParams.options"
              :key="index"
              :value="item.value"
            >{{ item.label }}</a-select-option>
          </a-select>
        </div>
        <div v-if="formParams.type == 'STRING'">
          <a-input
            style="width:'100px'"
            v-decorator="[
              formParams.code,
              {
                initialValue: attribute[formParams.code],
              },
            ]"
            :placeholder="formParams.name"
          />
        </div>
        <div v-if="formParams.type == 'BOOLEAN'">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            v-decorator="[
              formParams.code,
              {
                initialValue: attribute[formParams.code],
              },
              'switch',
              { valuePropName: 'checked' },
            ]"
          />
        </div>
        <div v-if="formParams.type == 'NUMBER'">
          <a-input-number
            v-decorator="[
              formParams.code,
              {
                initialValue: attribute[formParams.code],
              },
            ]"
          />
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import eventVue from "./eventBus";
import { Sketch } from "vue-color";
import conponColor from "../commonComponents/conponColor.vue/conponColor";
export default {
  data: () => ({
    formItemLayout: {
      labelCol: { span: 8 },
      labelAlign: "left",
      wrapperCol: { span: 12 }
    },
    newParams: [],
    // // 颜色选择器
    colorShow: false,
    // 自定义渲染变量
    attribute: {}
  }),

  components: {
    "sketch-picker": Sketch,
    conponColor: conponColor
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "dynamic_rule",
      onValuesChange: (props, values) => {
        this.attribute = Object.assign({}, this.attribute, values);
        // console.log(this.attribute);
        this.changeParams();
      }
    });
  },
  created() {
    this.getParams();
  },

  mounted() {
    this.hideBox();
  },

  methods: {
    // 获取到舞台回传参数
    getParams() {
      eventVue.$on("changeParams", message => {
        this.newParams = message;
        console.log(this.newParams);
        for (var key in this.newParams.attributes) {
          this.attribute[
            this.newParams.attributes[key].code
          ] = this.newParams.attributes[key].value;
        }
      });
    },

    hideBox() {
      window.addEventListener("click", e => {
        event.stopPropagation();
        var colorBox = document.querySelector(".vc-sketch");
        if (e.target !== colorBox) {
          this.colorShow = false;
        } else {
          this.colorShow = true;
        }
        // console.log(this.colorShow);
      });
    },

    // 更新属性的方法
    changeParams() {
      eventVue.$emit("myFun", this.attribute); //$emit这个方法会触发一个事件
    }
  }
};
</script>
<style scoped lang="scss">
$font-size: 10px;

#conponentEdit .dropbox {
  height: 180px;
  line-height: 1.5;
}
.editForm {
  padding: 0 10px;
}

.fontChooseBox {
  display: inline-flex;
}

/deep/ .ant-form-item {
  margin-bottom: 10px !important;
}
/deep/ .ant-input {
  font-size: $font-size;
  height: 30px;
  width: 100px;
}

/deep/ .ant-form-item label {
  font-size: $font-size;
  color: #fff !important;
}
/deep/ .ant-select-selection--single {
  height: 30px;
  font-size: $font-size;
}
.ant-radio-group {
  display: inline-flex !important;
}
/* antd样式覆盖 */
/deep/ .ant-form-item label {
  color: #fff !important;
}
</style>
