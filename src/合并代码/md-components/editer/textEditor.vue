<template>
  <div class="sub-panel">
    <header @click="changExtend">
      <p>文本编辑器</p>
      <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
        <path
          d="M6 6.82l2.494-2.555a.867.867 0 0 1 1.248 0 .919.919 0 0 1 0 1.277L6.624 8.735a.867.867 0 0 1-1.248 0L2.258 5.542a.919.919 0 0 1 0-1.277.867.867 0 0 1 1.248 0L6 6.819z"
        />
      </svg>
    </header>

    <div class="sub-panel-body" :style="{height: stretch ? height + 'px': '0'}">
      <div v-if="stretch">
        <div class="panel-horizon">
          <!--一横行数据-->
          <div class="editForm">
            <a-form id="componentEdit" :form="form" v-bind="formItemLayout">
              <!-- 动态生成表单 -->
              <a-form-item :label="'字体颜色'">
                <div class="fontChooseBox">
                  <section class="colorBox">
                    <componColor
                      ref="color"
                      v-decorator="[
                        'fontColor',
                        {
                          initialValue: attribute.fontColor,
                        },
                      ]"
                    ></componColor>
                  </section>
                </div>
              </a-form-item>
              <a-form-item :label="'背景颜色'">
                <div class="fontChooseBox">
                  <section class="colorBox">
                    <componColor
                      ref="color"
                      v-decorator="[
                        'backgroundColor',
                        {
                          initialValue: attribute.backgroundColor,
                        },
                      ]"
                    ></componColor>
                  </section>
                </div>
              </a-form-item>
              <a-form-item :label="'字号'">
                <a-select
                  style="width: 100px"
                  v-decorator="[
                  'fontSize',
                    {
                      initialValue: attribute.fontSize,
                    },
                  ]"
                >
                  <a-select-option
                    v-for="(item, index) of fontSizeOptions"
                    :key="index"
                    :value="item.value"
                  >{{ item.label }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="'文本'">
                <a-input
                  autocomplete="off"
                  v-decorator="[
                    'textContent',
                    {
                      initialValue: attribute.textContent,
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item :label="'字体粗细'">
                <a-select
                  style="width: 100px"
                  v-decorator="[
                  'fontWeight',
                    {
                      initialValue: attribute.fontWeight,
                    },
                  ]"
                >
                  <a-select-option
                    v-for="(item, index) of fontWeightOptions"
                    :key="index"
                    :value="item.value"
                  >{{ item.label }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="'字体间隔'">
                <a-slider
                  v-decorator="[
                    'fontSpacing',
                    {
                      initialValue: attribute.fontSpacing,
                    }
                  ]"
                />
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import componColor from "../commonTool/componColor.vue";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    componColor
  }
})
export default class textEditor extends Vue {
  @Prop() elemData!: Elem; // 元素数据

  private stretch = true; // 加载时是折叠还是不折叠
  private height = 100; // 当前组件的高度

  form: any;

  attribute: { [key: string]: any } = {};

  formItemLayout = {
    labelCol: { span: 8 },
    labelAlign: "left",
    wrapperCol: { span: 16 }
  };

  fontWeightOptions = [
    {
      label: "normal",
      value: "normal"
    },
    {
      label: "bold",
      value: "bold"
    }
  ];
  fontSizeOptions = [
    {
      label: "12",
      value: "12"
    },
    {
      label: "14",
      value: "14"
    },
    {
      label: "16",
      value: "16"
    },
    {
      label: "18",
      value: "18"
    },
    {
      label: "20",
      value: "20"
    },
    {
      label: "24",
      value: "24"
    },
    {
      label: "28",
      value: "28"
    },
    {
      label: "32",
      value: "32"
    },
    {
      label: "64",
      value: "64"
    }
  ];

  directionOptions = [
    {
      label: "从右往左",
      value: "toLeft"
    },
    {
      label: "从左往右",
      value: "toRight"
    }
  ];
  fontSpeedOptions = [
    {
      label: "默认速度",
      value: 2000
    },
    {
      label: "1.2倍速",
      value: 1600
    },
    {
      label: "1.5倍速",
      value: 1000
    },
    {
      label: "2倍速",
      value: 500
    }
  ];

  changExtend() {
    this.stretch = !this.stretch;
  }

  created() {
    console.log("elemData", this.elemData);
    this.attribute = this.elemData.elemSupAttr || {};
  }

  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "dynamic_rule",
      onValuesChange: (props, values) => {
        this.attribute = this.elemData.elemSupAttr = Object.assign(
          this.attribute,
          values
        );
      }
    });
  }
}
</script>

<style scoped lang="scss">
$fontColor3: rgb(153, 153, 153);
.sub-panel-body {
  transition: height 0.3s;
  // overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.panel-horizon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

$font-size: 10px;

#componentEdit .dropbox {
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
