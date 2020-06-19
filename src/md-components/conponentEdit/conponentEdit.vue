<template>
  <div className="editForm">
    <a-form id="conponentEdit" v-bind="formItemLayout">
      <!-- 动态生成表单 -->
      <a-form-item
        selfUpdate
        v-for="formParams of newParams.attributes"
        :label="formParams.name"
        :key="formParams.code"
      >
        <div
          v-if="formParams.type == 'COLOR' && formParams.code == 'fontColor'"
        >
          <div class="fontChooseBox">
            <section class="colorBox">
              <div
                class="color_con"
                :style="{ background: selectedFontColor.hex }"
                @click="handleShowColor"
              ></div>
              <div v-show="colorShow">
                <sketch-picker
                  v-model="selectedFontColor"
                  @input="updateValue"
                ></sketch-picker>
              </div>
            </section>
            <span
              class="ant-form-text"
              :style="{ color: selectedFontColor.hex }"
            >
              {{ selectedFontColor.hex }}
            </span>
          </div>
        </div>
        <div
          v-if="
            formParams.type == 'COLOR' && formParams.code == 'backgroundColor'
          "
        >
          <div class="fontChooseBox">
            <section class="backColorBox">
              <div
                class="color_con"
                :style="{ background: selectedBackgroundColor.hex }"
                @click="handleShowBackColor"
              ></div>
              <div v-show="backColorShow">
                <sketch-picker
                  v-model="selectedBackgroundColor"
                  @input="updateBackValue"
                ></sketch-picker>
              </div>
            </section>
            <span
              class="ant-form-text"
              :style="{ color: selectedBackgroundColor.hex }"
            >
              {{ selectedBackgroundColor.hex }}
            </span>
          </div>
        </div>
        <div v-if="formParams.type == 'MENU'">
          <a-select
            :default-value="formParams.value"
            style="width: 80px"
            @change="handleFontSizeChange"
            v-model="attribute[formParams.value]"
          >
            <a-select-option
              v-for="(item, index) of formParams.options"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div v-if="formParams.type == 'STRING'">
          {{ attribute[formParams.name] }}
          <a-input
            :placeholder="formParams.name"
            v-model="attribute[formParams.name]"
          />
        </div>
      </a-form-item>

      <!-- <a-form-item label="颜色">
        <div class="fontChooseBox">
          <section class="colorBox">
            <div
              class="color_con"
              :style="{ background: selectedFontColor.hex }"
              @click="handleShowColor"
            ></div>
            <div v-show="colorShow">
              <sketch-picker
                v-model="selectedFontColor"
                @input="updateValue"
              ></sketch-picker>
            </div>
          </section>
          <span class="ant-form-text" :style="{ color: selectedFontColor.hex }">
            {{ selectedFontColor.hex }}
          </span>
        </div>
      </a-form-item>

      <a-form-item label="背景">
        <div class="fontChooseBox">
          <section class="backColorBox">
            <div
              class="color_con"
              :style="{ background: selectedBackgroundColor.hex }"
              @click="handleShowBackColor"
            ></div>
            <div v-show="backColorShow">
              <sketch-picker
                v-model="selectedBackgroundColor"
                @input="updateBackValue"
              ></sketch-picker>
            </div>
          </section>
          <span
            class="ant-form-text"
            :style="{ color: selectedBackgroundColor.hex }"
          >
            {{ selectedBackgroundColor.hex }}
          </span>
        </div>
      </a-form-item>

      <a-form-item label="字号" className="fontSetect">
        <a-select
          default-value="14"
          style="width: 80px"
          @change="handleFontSizeChange"
          dropdownClassName="fontSizeSelect"
        >
          <a-select-option
            v-for="(item, index) of fontSizeGroup"
            :key="index"
            :value="item.fontSize"
          >
            {{ item.fontSize }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="文本" className="fontText">
        <a-input
          placeholder="文本"
          v-model="changeText"
          @change="handleTextChange"
        />
      </a-form-item>

      <a-form-item label="静音">
        <a-switch
          v-model="isMuted"
          checked-children="开"
          un-checked-children="关"
          v-decorator="['switch', { valuePropName: 'checked' }]"
          @change="handleMuted"
        />
      </a-form-item>

      <a-form-item label="间隔">
        <a-select
          default-value="1000"
          style="width: 80px"
          @change="handleIntervalChange"
        >
          <a-select-option
            v-for="(item, index) of intervalGroup"
            :key="index"
            :value="item.interval"
          >
            {{ item.interval }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="切换">
        <a-radio-group
          v-decorator="['radio-group']"
          v-model="transStyle"
          @change="changeEffect"
        >
          <a-radio value="scrollx">
            线状
          </a-radio>
          <a-radio value="fade">
            淡入
          </a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="方向">
        <a-radio-group
          v-decorator="['radio-group']"
          v-model="position"
          @change="changePosition"
        >
          <a-radio value="bottom">
            水平
          </a-radio>
          <a-radio value="right">
            垂直
          </a-radio>
        </a-radio-group>
      </a-form-item> -->
    </a-form>
  </div>
</template>

<script>
import eventVue from "./eventBus";
import { Sketch } from "vue-color";
export default {
  data: () => ({
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    },
    // 选中字体颜色
    selectedFontColor: "",
    // 选中背景颜色
    selectedBackgroundColor: "",
    // 更改的文字
    changeText: "",
    // 选中字号下拉
    fontSizeGroup: [
      {
        fontSize: 12,
      },
      {
        fontSize: 14,
      },
      {
        fontSize: 16,
      },
      {
        fontSize: 18,
      },
      {
        fontSize: 20,
      },
      {
        fontSize: 28,
      },
      {
        fontSize: 36,
      },
      {
        fontSize: 48,
      },
      {
        fontSize: 72,
      },
    ],
    // 毫秒间隔
    intervalGroup: [
      {
        interval: 1000,
      },
      {
        interval: 2000,
      },
      {
        interval: 3000,
      },
      {
        interval: 4000,
      },
      {
        interval: 5000,
      },
    ],
    // 是否静音输出视频
    isMuted: false,

    transStyle: "scrollx",
    position: "botton",

    params: {
      // color: "",
      // backgroundColor: "",
      // fontSize: "",

      name: "bobob",
      // 自动播放
      autoplay: true,
      // 宽度
      width: "200px",
      // 高度（未生效）
      height: "150px",
      // 轮播时间间隔
      interval: 1000,
      // 是否显示面板指示点
      dots: true,
      // 面板指示点位置 top bottom left right
      dotPosition: "bottom",
      // 是否显示左右按钮
      HandleButton: true,
      // 切换特效
      effectStyle: "scrollx",
      // 图片资源
      imageSrc: [
        {
          img:
            "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
          id: 1,
        },
        {
          img:
            "http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658",
          id: 2,
        },
      ],
    },
    newParams: [],
    color: "#000",
    // 颜色选择器
    colorShow: false,
    // 背景选择器
    backColorShow: false,

    // 自定义渲染变量
    attribute: {},
  }),
  watch: {
    attribute() {
      console.log(this.attribute);
      return this.attribute;
    },
  },
  components: {
    "sketch-picker": Sketch,
  },
  beforeCreate() {},
  created() {
    this.getParams();
  },
  mounted() {
    this.hideBox();
  },
  methods: {
    // 获取到舞台回传参数
    getParams() {
      eventVue.$on("changeParams", (message) => {
        this.newParams = message;
        console.log(this.newParams);
        for (var key in this.newParams.attributes) {
          this.attribute[
            this.newParams.attributes[key].code
          ] = this.newParams.attributes[key].value;
        }
        // console.log(this.attribute);
      });
    },

    // 更改字体颜色
    handleShowColor() {
      if (this.colorShow) {
        this.colorShow = false;
      } else {
        this.colorShow = true;
      }
    },

    handleShowBackColor() {
      if (this.backColorShow) {
        this.backColorShow = false;
      } else {
        this.backColorShow = true;
      }
    },

    hideBox() {
      document.addEventListener("click", (e) => {
        if (e.target.closest(".colorBox")) {
          this.colorShow = true;
        } else {
          this.colorShow = false;
        }
        if (e.target.closest(".backColorBox")) {
          this.backColorShow = true;
        } else {
          this.backColorShow = false;
        }
      });
    },

    updateValue(val) {
      this.params.color = this.selectedFontColor.hex;
      console.log(this.params.color);
      this.changeParams();
    },

    updateBackValue(val) {
      this.params.backgroundColor = this.selectedBackgroundColor.hex;
      console.log(this.params.backgroundColor);
      this.changeParams();
    },

    // 更新属性的方法
    changeParams() {
      eventVue.$emit("myFun", this.params); //$emit这个方法会触发一个事件
    },

    // 更改字体大小
    handleFontSizeChange(value) {
      this.params.fontSize = value;
      console.log(`selected ${value}`);
      this.changeParams();
    },

    // 更换切换效果
    changeEffect() {
      console.log(this.transStyle);
      this.params.effectStyle = this.transStyle;
      this.changeParams();
    },
    changePosition() {
      console.log(this.position);
      this.params.dotPosition = this.position;
      this.changeParams();
    },

    handleIntervalChange(value) {
      this.params.interval = value;
      console.log(`selected ${value}`);
      this.changeParams();
    },

    // 手动编辑文字
    handleTextChange() {
      console.log(this.changeText);
      this.params.name = this.changeText;
    },

    // 是否静音输出
    handleMuted() {
      console.log(this.isMuted);
      this.params.muted = this.isMuted;
    },
  },
};
</script>
<style scoped lang="scss">
#conponentEdit .dropbox {
  height: 180px;
  line-height: 1.5;
}
.editForm .ant-form-item label,
.ant-form-item-label > label {
  font-size: 10px !important;
  color: #fff !important;
}
.color_con {
  width: 15px;
  height: 15px;
  position: relative;
}
.fontChooseBox {
  display: inline-flex;
}
.vc-sketch {
  position: absolute !important;

  left: -40px !important;

  z-index: 9999 !important;
  width: 170px !important;
}

.ant-form-item {
  margin-bottom: 10px !important;
}

/deep/ .ant-form {
  font-size: 12px;
}
.ant-radio-group {
  display: inline-flex !important;
}
/* antd样式覆盖 */
/deep/ .ant-form-item label {
  color: #fff !important;
}
.color_con {
  border: 1px solid #fff;
}
</style>
