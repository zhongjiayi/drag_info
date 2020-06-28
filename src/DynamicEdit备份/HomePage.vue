<template>
  <div class="homePage" @wheel.ctrl.exact.prevent @keyup.enter="deleteElem">
    <div class="ht-toolbar">
      <div class="toolbar-left"></div>
      <div class="toolbar-center">
        <div class="toolbar-center-l">
          <div class="toolbar-box">
            <div class="toolbar-box-icon">
              <svg
                class="svg-icon"
                style="width:18px;height: 16px"
                viewBox="0 0 18 16"
                aria-hidden="true"
              >
                <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-2A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                <path style="color: red" d="M6.4 11.2V4.8L11.2 8z" />
              </svg>
            </div>
            <p class="toolbar-box-text">预览</p>
          </div>
          <div class="toolbar-box">
            <div class="toolbar-box-icon">
              <svg
                class="svg-icon cloud"
                style="width:18px;height: 16px"
                viewBox="0 0 18 16"
                aria-hidden="true"
              >
                <path
                  class="cloud-arrow"
                  d="M8.4 10.5C8.5 10.3 8.8 10.2 9 10.2 9.2 10.2 9.5 10.3 9.6 10.5L12.2 13.2C12.3 13.4 12.4 13.6 12.4 13.8 12.4 13.8 12.4 13.8 12.4 14 12.4 14.3 12 14.6 11.7 14.6 11.7 14.6 11.1 14.6 9.9 14.6L9.9 19.1C9.9 19.6 9.5 20 9 20L9 20C8.5 20 8.1 19.6 8.1 19.1L8.1 14.6C6.9 14.6 6.3 14.6 6.3 14.6 6.1 14.6 5.6 14.3 5.6 14 5.6 13.9 5.6 13.8 5.6 13.8 5.6 13.5 5.7 13.4 5.8 13.2 5.8 13.2 6.7 12.3 8.4 10.5Z"
                />
                <path
                  class="cloud-arrow"
                  d="M8.4 20.5C8.5 20.3 8.8 20.2 9 20.2 9.2 20.2 9.5 20.3 9.6 20.5L12.2 23.2C12.3 23.4 12.4 23.6 12.4 23.8 12.4 23.8 12.4 23.8 12.4 24 12.4 24.3 12 24.6 11.7 24.6 11.7 24.6 11.1 24.6 9.9 24.6L9.9 29.1C9.9 29.6 9.5 30 9 30L9 30C8.5 30 8.1 29.6 8.1 29.1L8.1 24.6C6.9 24.6 6.3 24.6 6.3 24.6 6.1 24.6 5.6 24.3 5.6 24 5.6 23.9 5.6 23.8 5.6 23.8 5.6 23.5 5.7 23.4 5.8 23.2 5.8 23.2 6.7 22.3 8.4 20.5Z"
                />
                <path
                  d="M12.9 11.2C12.9 10.8 13.3 10.4 13.8 10.4 15.2 10.4 16.2 9.3 16.2 7.9 16.2 7.2 16 6.6 15.5 6.1 15.4 6.1 15.3 6 15.3 6 15.2 5.9 15.2 5.9 15.1 5.9 15 5.8 15 5.8 14.9 5.7 14.9 5.7 14.9 5.7 14.9 5.7 14.8 5.7 14.8 5.7 14.7 5.7 14.7 5.6 14.7 5.6 14.6 5.6 14.6 5.6 14.5 5.6 14.5 5.6 14.5 5.6 14.4 5.6 14.4 5.6 14.4 5.5 14.3 5.5 14.3 5.5 14.2 5.5 14.2 5.5 14.1 5.5 14.1 5.5 14.1 5.5 14 5.5 13.9 5.5 13.9 5.5 13.8 5.5 13.8 5.5 13.7 5.5 13.7 5.5 13.7 5.3 13.6 5.2 13.6 5.1 13.6 5 13.6 5 13.6 5 13.5 4.9 13.5 4.8 13.5 4.7 13.5 4.6 13.4 4.6 13.4 4.6 13.4 4.5 13.3 4.4 13.3 4.3 13.3 4.3 13.3 4.2 13.3 4.2 13.2 4.1 13.2 4 13.1 3.9 12.3 2.6 10.7 1.8 9 1.8 7.3 1.8 5.7 2.6 4.9 3.9 4.8 4 4.8 4.1 4.7 4.2 4.7 4.2 4.7 4.3 4.7 4.3 4.7 4.4 4.6 4.5 4.6 4.6 4.6 4.6 4.5 4.6 4.5 4.7 4.5 4.8 4.5 4.9 4.4 5 4.4 5 4.4 5 4.4 5.1 4.4 5.2 4.3 5.3 4.3 5.5 4.3 5.5 4.2 5.5 4.2 5.5 4.1 5.5 4.1 5.5 4 5.5 3.9 5.5 3.9 5.5 3.9 5.5 3.8 5.5 3.8 5.5 3.7 5.5 3.7 5.5 3.6 5.5 3.6 5.6 3.6 5.6 3.5 5.6 3.5 5.6 3.5 5.6 3.4 5.6 3.4 5.6 3.3 5.6 3.3 5.6 3.3 5.7 3.2 5.7 3.2 5.7 3.1 5.7 3.1 5.7 3.1 5.7 3.1 5.7 3 5.8 3 5.8 2.9 5.8 2.8 5.9 2.8 5.9 2.7 6 2.7 6 2.6 6.1 2.5 6.1 2 6.6 1.8 7.2 1.8 7.9 1.8 9.3 2.8 10.4 4.2 10.4 4.7 10.4 5.1 10.8 5.1 11.2 5.1 11.7 4.7 12 4.2 12 1.9 12 0 10.2 0 7.9 0 6.1 1.3 4.5 3 4 3.9 1.7 6.3 0 9 0 11.7 0 14.1 1.7 15 4 16.7 4.5 18 6.1 18 7.9 18 10.2 16.1 12 13.8 12 13.3 12 12.9 11.7 12.9 11.2Z"
                />
              </svg>
            </div>
            <p class="toolbar-box-text">保存</p>
          </div>
        </div>
        <div class="toolbar-center-c">
          <div class="scaleBox">
            <div class="toolbar-box scale-icon" @click="changeScale({deltaY: 1})">
              <div class="toolbar-box-icon">
                <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 7h8a1 1 0 0 0 0-2H2a1 1 0 1 0 0 2z" />
                </svg>
              </div>
            </div>
            <div class="toolbar-box">
              <div>{{Math.round(scale * 100)}}%</div>
              <p class="toolbar-box-text">缩放</p>
            </div>
            <div class="toolbar-box scale-icon" @click="changeScale({deltaY: -1})">
              <div class="toolbar-box-icon">
                <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M5 5V2a1 1 0 1 1 2 0v3h3a1 1 0 0 1 0 2H7v3a1 1 0 0 1-2 0V7H2a1 1 0 1 1 0-2h3z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="toolbar-box">
            <div class="toolbar-box-icon">
              <svg
                class="svg-icon"
                style="width: 16px;height: 16px"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M4 9h11v4H4V9zm0-6h6v4H4V3zM2 0h1v16H2V0z" />
              </svg>
            </div>
            <p class="toolbar-box-text">对齐</p>
          </div>
          <div class="toolbar-box">
            <div class="toolbar-box-icon">
              <svg
                class="svg-icon"
                style="width: 16px;height: 16px"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M15 2H5v1H4V1h12v12h-2v-1h1V2zM1 4h12v12H1V4zm2 2v8h8V6H3z" />
              </svg>
            </div>
            <p class="toolbar-box-text">图层</p>
          </div>
        </div>
        <div class="toolbar-center-r">
          <div class="toolbar-box">
            <div class="toolbar-box-icon">
              <svg
                class="svg-icon"
                style="width: 16px;height: 16px"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M0 3C0 2.5 0.5 2 1 2L14 2C14 2 14 2 14 2 14.6 2 15 2.4 15 3L15 13C15 13.6 14.6 14 14 14L1 14C1 14 1 14 1 14 0.4 14 0 13.6 0 13L0 3ZM10 7L13 11.6 13 4 2 4 2 12 4.6 9.3 5.9 11.6 10 7ZM4.5 8C3.7 8 3 7.3 3 6.5 3 5.7 3.7 5 4.5 5 5.3 5 6 5.7 6 6.5 6 7.3 5.3 8 4.5 8ZM3 16L3 15 12 15 12 16 3 16ZM3 1L3 0 12 0 12 1 3 1Z"
                />
              </svg>
            </div>
            <p class="toolbar-box-text">素材库</p>
          </div>
          <div class="toolbar-box">
            <div class="toolbar-box-icon">
              <svg
                class="svg-icon"
                style="width: 16px;height: 16px"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M0 3C0 2.5 0.5 2 1 2L14 2C14 2 14 2 14 2 14.6 2 15 2.4 15 3L15 13C15 13.6 14.6 14 14 14L1 14C1 14 1 14 1 14 0.4 14 0 13.6 0 13L0 3ZM10 7L13 11.6 13 4 2 4 2 12 4.6 9.3 5.9 11.6 10 7ZM4.5 8C3.7 8 3 7.3 3 6.5 3 5.7 3.7 5 4.5 5 5.3 5 6 5.7 6 6.5 6 7.3 5.3 8 4.5 8ZM3 16L3 15 12 15 12 16 3 16ZM3 1L3 0 12 0 12 1 3 1Z"
                />
              </svg>
            </div>
            <p class="toolbar-box-text">组件库</p>
          </div>
          <div class="toolbar-box">
            <div class="toolbar-box-icon">
              <svg
                class="svg-icon"
                style="width: 16px;height: 16px"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M0 3C0 2.5 0.5 2 1 2L14 2C14 2 14 2 14 2 14.6 2 15 2.4 15 3L15 13C15 13.6 14.6 14 14 14L1 14C1 14 1 14 1 14 0.4 14 0 13.6 0 13L0 3ZM10 7L13 11.6 13 4 2 4 2 12 4.6 9.3 5.9 11.6 10 7ZM4.5 8C3.7 8 3 7.3 3 6.5 3 5.7 3.7 5 4.5 5 5.3 5 6 5.7 6 6.5 6 7.3 5.3 8 4.5 8ZM3 16L3 15 12 15 12 16 3 16ZM3 1L3 0 12 0 12 1 3 1Z"
                />
              </svg>
            </div>
            <p class="toolbar-box-text">节目库</p>
          </div>
        </div>
      </div>
      <div class="toolbar-right"></div>
    </div>
    <div class="main-content">
      <div
        class="screen-container"
        @wheel.ctrl.exact.prevent="changeScale"
        @wheel.exact="mousewheelHandle"
      >
        <Viewport
          :resolution="playbillData.resolution"
          :playbillBg="playbillData.playbillBg"
          :program="programsListObj[activeProgramIndex]"
          :scale="scale"
          :offsetX="offsetX"
          :offsetY="offsetY"
          :playbillElemList="playbillData.elemList"
          :elemActive="activeElemIndex"
        />
      </div>
      <div class="widget"></div>
      <div class="ht-pane leftPane">
        <div
          v-for="(item,index) of leftPane"
          :key="index"
          :class="index === 0 ? 'firstNode' : 'otherNode'"
          :style="{height:item.height + 'px'}"
        >
          <component
            :is="item.component"
            :components="components"
            :programsList="playbillData.progList"
            :elemList="activeProgramIndex === -1 ? playbillData.elemList : programsListObj[activeProgramIndex].elemList"
            :programActive="activeProgramIndex"
            :elemActive="activeElemIndex"
            @changeActiveIndex="changeActiveIndex"
          >
            <!--拖动条-->
            <template #operateHor>
              <div
                v-if="index !== 0"
                class="pane-operateHor"
                @mousedown.stop="operateHorClickHandle($event,leftPane,index)"
              ></div>
            </template>
            <!--折叠按钮-->
            <template #stretchButton>
              <div
                v-if="index !== 0"
                class="pane-stretchButton header-icon-box"
                :class="item.height === min ? '' : 'expanded'"
                @click.left.stop="stretchClickHandle($event,leftPane,index)"
              >
                <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M6 6.82l2.494-2.555a.867.867 0 0 1 1.248 0 .919.919 0 0 1 0 1.277L6.624 8.735a.867.867 0 0 1-1.248 0L2.258 5.542a.919.919 0 0 1 0-1.277.867.867 0 0 1 1.248 0L6 6.819z"
                  />
                </svg>
              </div>
            </template>
          </component>
        </div>
      </div>
      <div class="ht-viewport">
        <div class="artBoard">
          <div class="trackBox">
            <div class="track x-track" ref="trackX">
              <div
                class="handler x-handler"
                :style="{left: 45 - 0.45 * offsetX + '%'}"
                @mousedown.stop="trackMoveHandle($event,'X')"
              >
                <div class="thumb" />
              </div>
            </div>
            <div class="track y-track" ref="trackY">
              <div
                class="handler y-handler"
                :style="{top: 45 - 0.45 * offsetY + '%'}"
                @mousedown.stop="trackMoveHandle($event,'Y')"
              >
                <div class="thumb" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--右侧平台数据-->
      <div class="ht-pane rightPane">
        <div
          v-for="(item,index) of rightPane"
          :key="index"
          :class="index === 0 ? 'firstNode' : 'otherNode'"
          :style="{height:item.height + 'px'}"
        >
          <component
            :is="item.component"
            :components="components"
            :editArr="editArr"
            :resolution="playbillData.resolution"
            :model="activeProgramIndex === -1 ? 'global':'local'"
          >
            <!--拖动条-->
            <template #operateHor>
              <div
                v-if="index !== 0"
                class="pane-operateHor"
                @mousedown.stop="operateHorClickHandle($event,rightPane,index)"
              ></div>
            </template>
            <!--折叠按钮-->
            <template #stretchButton>
              <div
                v-if="index !== 0"
                class="pane-stretchButton header-icon-box"
                :class="item.height === min ? '' : 'expanded'"
                @click.left.stop="stretchClickHandle($event,rightPane,index)"
              >
                <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M6 6.82l2.494-2.555a.867.867 0 0 1 1.248 0 .919.919 0 0 1 0 1.277L6.624 8.735a.867.867 0 0 1-1.248 0L2.258 5.542a.919.919 0 0 1 0-1.277.867.867 0 0 1 1.248 0L6 6.819z"
                  />
                </svg>
              </div>
            </template>
          </component>
        </div>
      </div>
    </div>
    <div class="handleMenu"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ComponentsList from "./ComponentsList.vue"; // 组件列表
import PageList from "./PageList.vue"; // 页面列表
import Editor from "./Editor.vue"; // 编辑页
import ElementList from "./ElementList.vue"; // 元素列
import Viewport from "./Viewport.vue"; // 背景页

@Component({
  components: {
    ComponentsList,
    PageList,
    Editor,
    ElementList,
    Viewport
  }
})
export default class HomePage extends Vue {
  /**
   * 全局数据
   */
  private components = [
    {
      name: "图片",
      type: "images",
      scope: "global",
      path: [
        "M26.86 18.433a.995.995 0 0 0 .14-.51V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v12.923a1 1 0 0 0 .038.272l3.625-3.099 2.931 2.255L19.7 11.09l7.16 7.344zM7 2h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm6.25 9.77c-1.243 0-2.25-1.034-2.25-2.308 0-1.275 1.007-2.308 2.25-2.308s2.25 1.033 2.25 2.308c0 1.274-1.007 2.307-2.25 2.307z"
      ],
      sPath: [
        "M0 0h12v12H0V0zm1 1v10h10V1H1zm2 2h2v2H3V3zm-1 7V9l1.778-2 1.778 1.5L8.222 5 10 8v2H2z"
      ],
      initCom: {
        width: "0.5", // 数字类型，传数字为赋值，传字符串为相对于整个分辨率的比例
        height: 300
      },
      initData: {
        // brightness: 1, //亮度
        // contrast: 100, //对比度 单位%
        // dropShadow: "", //阴影
        // invert: 100, //反转色 %
        imageSrc:
          "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658"
      }
    },
    {
      scope: "global",
      name: "视频",
      type: "videos",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      initCom: {
        width: "0.5", // 数字类型，传数字为赋值，传字符串为相对于整个分辨率的比例
        height: 300
      },
      initData: {
        muted: true, //静音播放
        videoSource: "https://www.w3school.com.cn/i/movie.ogg"
      }
    },
    {
      name: "轮播组",
      type: "rotationGroup",
      scope: "global",
      path: [
        "M28.5 6.5v1.007l2-.01v10.035h-2v.968H31a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5h-2.5zm-23 0H3a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h2.5v-.968h-2V7.498l2 .009V6.5z",
        "M9 5v15h16V5H9zM8 3h18a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
        "M14 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2.253 7.664l-1.494-1.328 4.787-5.386L17 14.4l3.917-4.897 3.79 3.79-1.414 1.414-2.21-2.21L17 17.601l-2.04-2.55z"
      ],
      sPath: [
        "M1 8H0V2h1v6zm13 0h-1V2h1v6zM3 1v8h8V1H3zm-.167-1h8.334c.46 0 .833.373.833.833v8.334c0 .46-.373.833-.833.833H2.833A.833.833 0 0 1 2 9.167V.833C2 .373 2.373 0 2.833 0zM4 8V7l1.75-2L7 6.5 9 4l1 2v2H4zm0-6h2v2H4V2z"
      ],
      initCom: {
        width: "0.5", // 数字类型，传数字为赋值，传字符串为相对于整个分辨率的比例
        height: 300
      },
      initData: {
        interval: 1000, //播放间隔
        dotPosition: "bottom", //切换方向
        effect: "scrollx", //切换特效
        imageSrc: [
          {
            img:
              "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
            id: 1
          },
          {
            img:
              "http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658",
            id: 2
          }
        ]
      }
    },
    {
      name: "日期时间",
      type: "dateTime",
      scope: "global",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      initCom: {
        width: "0.5", // 数字类型，传数字为赋值，传字符串为相对于整个分辨率的比例
        height: 300
      },
      initData: {
        fontColor: "#666c7a", //字体颜色
        backgroundColor: "#3390ff", //背景颜色
        fontSize: 12, //字号
        fontWeight: "normal", //字体粗细
        showContent: "YYYY-MM-DD HH:mm:ss" //时间格式
      }
    },
    {
      name: "星期",
      type: "week",
      scope: "global",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      initCom: {
        width: "0.2", // 数字类型，传数字为赋值，传字符串为相对于整个分辨率的比例
        height: 100
      },
      initData: {
        fontColor: "#666c7a", //字体颜色
        backgroundColor: "#3390ff", //背景颜色
        fontSize: 18, //字号
        fontWeight: "normal" //字体粗细
      }
    },
    {
      name: "文本编辑器",
      type: "textEditor",
      scope: "global",
      path: [
        "M26.86 18.433a.995.995 0 0 0 .14-.51V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v12.923a1 1 0 0 0 .038.272l3.625-3.099 2.931 2.255L19.7 11.09l7.16 7.344zM7 2h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm6.25 9.77c-1.243 0-2.25-1.034-2.25-2.308 0-1.275 1.007-2.308 2.25-2.308s2.25 1.033 2.25 2.308c0 1.274-1.007 2.307-2.25 2.307z"
      ],
      sPath: [
        "M0 0h12v12H0V0zm1 1v10h10V1H1zm2 2h2v2H3V3zm-1 7V9l1.778-2 1.778 1.5L8.222 5 10 8v2H2z"
      ],
      initCom: {
        width: "0.8", // 数字类型，传数字为赋值，传字符串为相对于整个分辨率的比例
        height: 300
      },
      initData: {
        fontColor: "#666c7a", //字体颜色
        backgroundColor: "#3390ff", //背景颜色
        fontSize: 28, //字号
        textContent: "请编辑文字2", //文本内容
        fontWeight: "normal", //字体粗细
        direction: "toLeft", //滚动方向
        fontSpacing: 1, //字体间隔
        fontSpeed: 16 //默认速度
      }
    },
    {
      name: "滚动字幕",
      type: "scrollingText",
      scope: "global",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      initCom: {
        width: "0.5", // 数字类型，传数字为赋值，传字符串为相对于整个分辨率的比例
        height: 300
      },
      initData: {
        fontColor: "#666c7a", //字体颜色
        backgroundColor: "#3390ff", //背景颜色
        fontSize: 28, //字号
        textContent: "请编辑文字1", //文本内容
        fontWeight: "normal", //字体粗细
        direction: "toLeft", //滚动方向
        fontSpacing: 1, //字体间隔
        fontSpeed: 16 //默认速度
      }
    },
    {
      name: "富文本编辑器",
      type: "richEditor",
      scope: "global",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      initCom: {
        width: "0.5", // 数字类型，传数字为赋值，传字符串为相对于整个分辨率的比例
        height: 500
      },
      initData: {}
    },
    {
      name: "滚动",
      type: "rollingBarrage",
      scope: "global",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      initCom: {
        width: "0.5", // 数字类型，传数字为赋值，传字符串为相对于整个分辨率的比例
        height: 300
      },
      initData: {
        fontColor: "#666c7a", //字体颜色
        backgroundColor: "#3390ff", //背景颜色
        fontSize: 28, //字号
        textContent: "请编辑文字", //文本内容
        fontWeight: "normal", //字体粗细
        direction: "toLeft", //滚动方向
        fontSpacing: 1, //字体间隔
        fontSpeed: 16 //默认速度
      }
    }
  ]; // 组件
  private playbillData = {
    playbillName: "节目单1",
    playbillBg: "white",
    resolution: "1980*1080",
    elemList: [
      {
        pIndex: 1,
        elemName: "日期1",
        elemType: "time",
        content: "",
        elemComAttr: {
          pointX: 300,
          pointY: 500,
          width: 400,
          height: 300,
          opacity: 100,
          elemTime: 1,
          duration: "00:00:30"
        },
        elemSupAttr: {
          displayType: "HH:mm:ss",
          fontSize: "12.5px"
        }
      }
    ],
    progList: [
      {
        pIndex: 1,
        progName: "节目 1",
        progDuration: "00:00:30",
        playTime: 1,
        progBg: "black",
        elemList: [
          {
            pIndex: 1,
            elemName: "文本编辑器",
            elemType: "textEditor",
            content: "",
            elemComAttr: {
              pointX: 300,
              pointY: 500,
              width: 400,
              height: 300,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            },
            elemSupAttr: {
              fontColor: "#666c7a", //字体颜色
              backgroundColor: "#3390ff", //背景颜色
              fontSize: 28, //字号
              textContent: "请编辑文字2", //文本内容
              fontWeight: "normal", //字体粗细
              direction: "toLeft", //滚动方向
              fontSpacing: 1, //字体间隔
              fontSpeed: 16 //默认速度
            }
          },
          {
            pIndex: 1,
            elemName: "视频",
            elemType: "videos",
            content: "xxx/xxx/xxx.mp4",
            elemComAttr: {
              pointX: 300,
              pointY: 500,
              width: 400,
              height: 300,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            },
            elemSupAttr: {
              muted: true, //静音播放
              videoSource: "https://www.w3school.com.cn/i/movie.ogg"
            }
          },
          {
            pIndex: 2,
            elemName: "日期时间",
            elemType: "dateTime",
            content: "",
            elemComAttr: {
              pointX: 500,
              pointY: 300,
              width: 200,
              height: 100,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            },
            elemSupAttr: {
              fontColor: "#666c7a", //字体颜色
              backgroundColor: "#3390ff", //背景颜色
              fontSize: 28, //字号
              fontWeight: "normal", //字体粗细
              showContent: "YYYY-MM-DD HH:mm:ss" //时间格式
            }
          },
          {
            pIndex: 4,
            elemName: "星期",
            elemType: "week",
            content: "",
            elemComAttr: {
              pointX: 700,
              pointY: 700,
              width: 200,
              height: 100,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            },
            elemSupAttr: {
              fontColor: "#666c7a", //字体颜色
              backgroundColor: "#3390ff", //背景颜色
              fontSize: 14, //字号
              fontWeight: "normal" //字体粗细
            }
          },
          {
            pIndex: 5,
            elemName: "图片",
            elemType: "images",
            content:
              "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
            elemComAttr: {
              pointX: 300,
              pointY: 500,
              width: 400,
              height: 300,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            },
            elemSupAttr: {
              // brightness: 1, //亮度
              // contrast: 100, //对比度 单位%
              // dropShadow: "", //阴影
              // invert: 100 //反转色 %
            }
          },
          {
            pIndex: 3,
            elemName: "滚动字幕",
            elemType: "scrollingText",
            content: "",
            elemComAttr: {
              pointX: 300,
              pointY: 500,
              width: 400,
              height: 300,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            },
            elemSupAttr: {
              fontColor: "#666c7a", //字体颜色
              backgroundColor: "#3390ff", //背景颜色
              fontSize: 28, //字号
              textContent: "请编辑文字2", //文本内容
              fontWeight: "normal", //字体粗细
              direction: "toLeft", //滚动方向
              fontSpacing: 1, //字体间隔
              fontSpeed: 16 //默认速度
            }
          },
          {
            pIndex: 7,
            elemName: "轮播组",
            elemType: "rotationGroup",
            content: "",
            elemComAttr: {
              pointX: 300,
              pointY: 500,
              width: 400,
              height: 300,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            },
            elemSupAttr: {
              interval: 1000, //播放间隔
              dotPosition: "bottom", //切换方向
              effect: "scrollx", //切换特效
              imageSrc: [
                {
                  img:
                    "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
                  id: 1
                },
                {
                  /*  */
                  img:
                    "http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658",
                  id: 2
                }
              ]
            }
          },
          {
            pIndex: 1,
            elemName: "富文本编辑器",
            elemType: "richEditor",
            content: "",
            elemComAttr: {
              pointX: 600,
              pointY: 600,
              width: 400,
              height: 300,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            },
            elemSupAttr: {}
          }
        ]
      },
      {
        pIndex: 2,
        progName: "节目2",
        progDuration: "00:00:30",
        playTime: 1,
        progBg: "red",
        elemList: []
      },
      {
        pIndex: 3,
        progName: "节目3",
        progDuration: "00:00:30",
        playTime: 1,
        progBg: "blue",
        elemList: []
      },
      {
        pIndex: 4,
        progName: "节目4",
        progDuration: "00:00:30",
        playTime: 1,
        progBg: "yellow",
        elemList: []
      }
    ]
  }; // 节目单源数据
  private activeProgramIndex = -1; // 激活的节目编号
  private activeElemIndex = -1; // 激活的元素编号

  deleteElem() {
    console.log(321);
  }

  get programsListObj() {
    // @ts-ignore
    return this.playbillData.progList.reduce(
      (o, cur) => (o[cur.pIndex] = cur) && o,
      {}
    );
  } // 节目列表对象

  get editArr() {
    let arr = [];
    if (this.activeProgramIndex === -1 && this.activeElemIndex === -1) {
      arr.push({
        model: "playbill",
        data: this.playbillData
      });
    } else if (this.activeProgramIndex !== -1 && this.activeElemIndex === -1) {
      arr.push({
        model: "program",
        // @ts-ignore
        data: this.programsListObj[this.activeProgramIndex]
      });
    } else {
      // @ts-ignore
      const elemList =
        this.activeProgramIndex === -1
          ? this.playbillData.elemList
          : this.programsListObj[this.activeProgramIndex].elemList;
      let elem;
      for (const item of elemList) {
        if (item.pIndex === this.activeElemIndex) {
          elem = item;
          break;
        }
      }
      arr.push({
        model: "commonElem",
        data: elem.elemComAttr
      });
      arr.push({
        model: elem.elemType,
        data: elem
      });
    }
    return arr;
  }

  // 修改激活的编号
  changeActiveIndex(type: string, value: number) {
    if (type === "elem") {
      this.activeElemIndex = value;
    } else if (type === "program") {
      this.activeProgramIndex = value;
      this.activeElemIndex = -1;
    }
  }

  /**
   * 左右盘数据
   */
  private leftPane = [
    { component: "PageList" },
    { component: "ElementList", height: 400 }
  ];
  private rightPane = [
    { component: "Editor" },
    { component: "ComponentsList", height: 400 }
  ];
  private min = 36;
  private max = 500;

  //操作条
  operateHorClickHandle(
    e: any,
    arr: { height: number }[],
    index: number
  ): void {
    const max = this.max; // 最大值
    const min = this.min; // 最小值
    const clickY = e.clientY;
    const origData = arr[index].height; // 初始高度
    const preData = index > 1 ? arr[index - 1].height : -1; // 上一个的初始高度
    const cMax =
      preData < 0 || preData > max - origData ? max : origData + preData - min; // 当前最大高度
    const cMin =
      preData < 0 || origData < max - preData ? min : origData - max + preData;

    function moveHandle(e: any) {
      const sub = clickY - e.clientY; // 偏移量
      const add = origData + sub; // 偏移后高度
      if (add > cMax || add < cMin) {
        if (add < cMin) {
          arr[index].height = cMin;
          arr[index - 1].height = cMin > min ? max : arr[index - 1].height;
        } else {
          arr[index].height = cMax;
          arr[index - 1].height = cMax < max ? min : arr[index - 1].height;
        }
      } else {
        if (preData > -1) {
          const preSub = preData - sub;
          if (preSub >= max || preSub <= min) {
            arr[index - 1].height = preSub <= min ? min : max;
          } else {
            arr[index - 1].height = preSub;
            arr[index].height = add;
          }
        } else {
          arr[index].height = add;
        }
      }
    }

    document.addEventListener("mousemove", moveHandle);
    document.addEventListener("mouseup", function clickHandle() {
      document.removeEventListener("mousemove", moveHandle);
      document.removeEventListener("mouseup", clickHandle);
    });
  }

  // 折叠按钮
  stretchClickHandle(e: any, arr: { height: number }[], index: number): void {
    if (arr[index].height === this.min) {
      arr[index].height = this.max;
    } else {
      arr[index].height = this.min;
    }
  }

  /**
   * 视图数据
   */
  private offsetX = 0; // x偏移量
  private offsetY = 0; // y偏移量
  private scale = 0.6; // 缩放比例

  // 滚动事件
  mousewheelHandle(e: { deltaY: number }) {
    if (e.deltaY < 0) {
      this.offsetY += 10;
    } else {
      this.offsetY -= 10;
    }
    this.offsetY =
      this.offsetY > 100 ? 100 : this.offsetY < -100 ? -100 : this.offsetY;
  }

  // 侧边条移动事件
  trackMoveHandle(e: any, type: string) {
    const oriData = e["client" + type];
    // @ts-ignore
    var oriOffset = this["offset" + type];
    // @ts-ignore
    const length =
      type === "X"
        ? this.$refs.trackX.offsetWidth
        : this.$refs.trackY.offsetHeight;
    const that = this;

    function moveHandle(e: any) {
      let offset =
        Number(((oriData - e["client" + type]) / length).toFixed(2)) / 0.0045 +
        oriOffset;
      // @ts-ignore
      that["offset" + type] =
        offset > 100 ? 100 : offset < -100 ? -100 : offset;
    }

    document.addEventListener("mousemove", moveHandle);
    document.addEventListener("mouseup", function clickHandle() {
      document.removeEventListener("mousemove", moveHandle);
      document.removeEventListener("mouseup", clickHandle);
    });
  }

  changeScale(e: { deltaY: number }) {
    if (e.deltaY < 0 && this.scale < 1) {
      this.scale = Number((this.scale + 0.05).toFixed(2));
    } else if (e.deltaY >= 0 && this.scale > 0.2) {
      this.scale = Number((this.scale - 0.05).toFixed(2));
    }
    console.log(this.scale);
  }
}
</script>

<style lang="scss">
$bgColor1: rgb(53, 55, 56);
$bgColor3: rgb(37, 38, 38);
$bgColor4: rgb(69, 70, 71);
$fontColor1: rgb(214, 221, 224);
$fontColor2: rgb(184, 188, 191);
$activeColor: rgb(25, 106, 212);
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: $bgColor4;
  border-radius: 4px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

.svg-icon {
  fill: currentColor;
  width: 1em;
  height: 100%;
}

.header-icon-box {
  width: 22px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-content: center;
  color: $fontColor2;
  cursor: pointer;
}

.header-icon-box:hover {
  color: $activeColor;
}

.layer-sortable-list {
  position: relative;
}

.screen-item .svg-icon {
  width: 15px;
  height: 12px;
  color: $fontColor1;
}

.screen-item {
  position: relative;
  height: 32px;
  display: flex;
  align-items: center;
  color: $fontColor1;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  padding-left: 14px;
}

.hzInput {
  resize: none;
  width: 100%;
  height: 100%;
  color: $fontColor1;
  white-space: nowrap;
  border-image: initial;
  border-style: none;
  border-width: initial;
  background: $bgColor1;
  overflow: hidden;
  font-size: 12px;
}

.textBox {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>

<style scoped lang="scss">
$toolbarH: 52px;
$bgColor1: rgb(53, 55, 56);
$bgColor2: rgb(21, 21, 21);
$bgColor3: rgb(37, 38, 38);
$bgColor4: rgb(69, 70, 71);
$gbColor5: rgb(215, 221, 224);
$gbColor5: rgb(89, 90, 92);
$activeColor: rgb(25, 106, 212);
$toolbarNormalColor: rgb(217, 217, 217);
$toolbarActiveColor: rgb(242, 244, 245);
$toolbarActiveBg: rgb(23, 38, 38);

.homePage {
  // 初始化css
  color: $gbColor5;
  font-size: 12px;
  font-height: 18px;
  font-weight: normal;
  // 隔离
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

// 头部的css
.ht-toolbar {
  position: relative;
  height: $toolbarH;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 107;
  background: $bgColor1;
  border-bottom: 1px solid $bgColor2;
}

.toolbar-left {
  padding-right: 10px;
  display: flex;
  align-items: center;
  height: 100%;
  flex: 0 0 248px;
}

.toolbar-center {
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex: 1 1 0%;
  padding: 0px 27px;
}

.toolbar-right {
  flex-basis: 230px;
  display: flex;
  padding-left: 39px;
  height: 100%;
}

// 主体的css
.main-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex: 1 1 0%;
  overflow: hidden;
}

//屏幕
.screen-container {
  position: fixed;
  left: 0px;
  top: $toolbarH;
  right: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $bgColor2;
}

// 左侧小物件
.widget {
  position: relative;
  z-index: 13;
  flex-shrink: 0;
  width: 41px;
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: $bgColor1;
  border-right: 1px solid $bgColor2;
}

.ht-pane {
  width: 209px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 4;
  background: $bgColor3;
}

.leftPane {
  border-right: 1px solid $bgColor4;
}

.rightPane {
  border-left: 1px solid $bgColor4;
}

.ht-viewport {
  display: flex;
  flex-direction: column;
  min-width: 400px;
  flex: 1 1 0%;
}

// 滚动条
.artBoard {
  flex: 1 1 0%;
  position: relative;
  pointer-events: none;
}

.trackBox {
  position: absolute;
  top: 17px;
  left: 17px;
  right: 0;
  bottom: 0;
  z-index: 4;
  pointer-events: none;
}

.track {
  position: absolute;
  background: transparent none repeat scroll 0% 0%;
  pointer-events: auto;
}

.x-track {
  left: 0px;
  right: 11px;
  bottom: 0px;
  height: 12px;
}

.y-track {
  top: 0;
  bottom: 11px;
  right: 0px;
  width: 12px;
}

.handler {
  position: absolute;
  cursor: pointer;
}

.x-handler {
  bottom: 2px;
  height: 10px;
  width: 10%;
}

.y-handler {
  right: 2px;
  width: 10px;
  height: 10%;
}

.thumb {
  position: absolute;
  pointer-events: none;
  border-radius: 4px;
  transition: background 0.2s ease-in-out 0s;
  background: $bgColor4;
}

.handler:hover .thumb {
  background: $gbColor5;
}

.x-handler .thumb {
  bottom: 0;
  width: 100%;
  height: 6px;
}

.y-handler .thumb {
  right: 0;
  height: 100%;
  width: 6px;
}

// 滚动条结束

.ht-pane > div {
  position: relative;
  overflow: hidden;
  flex-direction: column;
  display: flex;
  background: $bgColor3;
}

.ht-pane .firstNode {
  flex: 1 1 0%;
}

.pane-operateHor {
  width: 100%;
  height: 2px;
  background: transparent;
  position: absolute;
  top: 1px;
}

.pane-operateHor:hover {
  cursor: ns-resize;
  background: #f56c6c;
}

.pane-stretchButton > svg {
  transform: rotate(-180deg);
}

.expanded.pane-stretchButton > svg {
  transform: rotate(0deg);
}

.toolbar-box {
  position: relative;
  height: 100%;
  width: 44px;
  color: $toolbarNormalColor;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 2px solid transparent;
  cursor: pointer;
}

.toolbar-box:hover {
  color: $toolbarActiveColor;
  background: $toolbarActiveBg;
}

.toolbar-center > div,
.toolbar-box-icon {
  display: flex;
}

.toolbar-box-text {
  margin-top: 8px;
  font-size: 12px;
  white-space: nowrap;
  /*color: rgb();*/
}

.scaleBox {
  flex-direction: row;
  display: flex;
}

.scale-icon {
  width: 22px;
}

.scaleBox > .toolbar-box > div {
  font-weight: 600;
}

.cloud-arrow {
  transform: translateY(-5px);
}

.toolbar-box:hover .cloud-arrow {
  color: $activeColor;
  animation: cloud-arrow-run 2s infinite;
}

@keyframes cloud-arrow-run {
  0% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(-17px);
  }
}
</style>
