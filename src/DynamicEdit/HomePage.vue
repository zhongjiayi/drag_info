﻿<template>
  <div class="homePage" @wheel.ctrl.exact.prevent>
    <div class="ht-toolbar">
      <div class="toolbar-left"></div>
      <div class="toolbar-center"></div>
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
          :editIndex="editIndex"
        />
      </div>
      <div class="widget"></div>
      <div class="ht-pane leftPane">
        <div
          v-for="(item, index) of leftPane"
          :key="index"
          :class="index === 0 ? 'firstNode' : 'otherNode'"
          :style="{ height: item.height + 'px' }"
        >
          <component
            :is="item.component"
            :components="components"
            :programsList="playbillData.progList"
            :elemList="
              activeProgramIndex === -1
                ? playbillData.elemList
                : programsListObj[activeProgramIndex].elemList
            "
            :programActive="activeProgramIndex"
            :elemActive="activeElemIndex"
            @changeActiveIndex="changeActiveIndex"
          >
            <!--拖动条-->
            <template #operateHor>
              <div
                v-if="index !== 0"
                class="pane-operateHor"
                @mousedown.stop="operateHorClickHandle($event, leftPane, index)"
              ></div>
            </template>
            <!--折叠按钮-->
            <template #stretchButton>
              <div
                v-if="index !== 0"
                class="pane-stretchButton header-icon-box"
                :class="item.height === min ? '' : 'expanded'"
                @click.left.stop="stretchClickHandle($event, leftPane, index)"
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
                :style="{ left: 45 - 0.45 * offsetX + '%' }"
                @mousedown.stop="trackMoveHandle($event, 'X')"
              >
                <div class="thumb" />
              </div>
            </div>
            <div class="track y-track" ref="trackY">
              <div
                class="handler y-handler"
                :style="{ top: 45 - 0.45 * offsetY + '%' }"
                @mousedown.stop="trackMoveHandle($event, 'Y')"
              >
                <div class="thumb" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ht-pane rightPane">
        <div
          v-for="(item, index) of rightPane"
          :key="index"
          :class="index === 0 ? 'firstNode' : 'otherNode'"
          :style="{ height: item.height + 'px' }"
        >
          <component :is="item.component" :components="components" :editArr="editArr">
            <!--拖动条-->
            <template #operateHor>
              <div
                v-if="index !== 0"
                class="pane-operateHor"
                @mousedown.stop="
                  operateHorClickHandle($event, rightPane, index)
                "
              ></div>
            </template>
            <!--折叠按钮-->
            <template #stretchButton>
              <div
                v-if="index !== 0"
                class="pane-stretchButton header-icon-box"
                :class="item.height === min ? '' : 'expanded'"
                @click.left.stop="stretchClickHandle($event, rightPane, index)"
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
      name: "字幕",
      type: "componText",
      scope: "local",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"]
    },
    {
      name: "文本",
      type: "componEditText",
      scope: "local",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"]
    },
    {
      name: "图片",
      type: "componImage",
      scope: "local",
      path: [
        "M26.86 18.433a.995.995 0 0 0 .14-.51V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v12.923a1 1 0 0 0 .038.272l3.625-3.099 2.931 2.255L19.7 11.09l7.16 7.344zM7 2h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm6.25 9.77c-1.243 0-2.25-1.034-2.25-2.308 0-1.275 1.007-2.308 2.25-2.308s2.25 1.033 2.25 2.308c0 1.274-1.007 2.307-2.25 2.307z"
      ],
      sPath: [
        "M0 0h12v12H0V0zm1 1v10h10V1H1zm2 2h2v2H3V3zm-1 7V9l1.778-2 1.778 1.5L8.222 5 10 8v2H2z"
      ]
    },
    {
      scope: "local",
      name: "视频",
      type: "componVideo",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      attributes: [
        {
          name: "静音播放",
          code: "muted",
          type: "BOOLEAN",
          // 默认14
          value: false
        }
      ]
    },
    {
      name: "轮播组",
      type: "componRotate",
      scope: "local",
      path: [
        "M28.5 6.5v1.007l2-.01v10.035h-2v.968H31a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5h-2.5zm-23 0H3a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h2.5v-.968h-2V7.498l2 .009V6.5z",
        "M9 5v15h16V5H9zM8 3h18a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
        "M14 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2.253 7.664l-1.494-1.328 4.787-5.386L17 14.4l3.917-4.897 3.79 3.79-1.414 1.414-2.21-2.21L17 17.601l-2.04-2.55z"
      ],
      sPath: [
        "M1 8H0V2h1v6zm13 0h-1V2h1v6zM3 1v8h8V1H3zm-.167-1h8.334c.46 0 .833.373.833.833v8.334c0 .46-.373.833-.833.833H2.833A.833.833 0 0 1 2 9.167V.833C2 .373 2.373 0 2.833 0zM4 8V7l1.75-2L7 6.5 9 4l1 2v2H4zm0-6h2v2H4V2z"
      ]
    },
    {
      name: "日期",
      type: "componTime",
      scope: "global",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"]
    },
    {
      name: "星期",
      type: "componWeek",
      scope: "global",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"]
    },
    {
      name: "时间",
      type: "time",
      scope: "global",
      path: [
        "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z"
      ],
      sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"]
    }
  ]; // 组件
  private playbillData = {
    playbillName: "节目单1",
    playbillBg: "white",
    resolution: "1980*1080",
    elemList: [
      {
        pIndex: 1,
        elemName: "轮播图",
        elemType: "componRotate",
        content: "",
        elemComAttr: {
          pointX: 700,
          pointY: 500,
          width: 400,
          height: 300,
          rotate: 0,
          opacity: 100,
          elemTime: 1,
          duration: "00:00:30"
        },
        elemSupAttr: {
          displayType: "HH:mm:ss",
          fontSize: "12.5px"
        },
        attributes: [
          {
            name: "间隔",
            code: "interval",
            type: "NUMBER",
            value: 1000
          },
          {
            name: "方向",
            code: "dotPosition",
            type: "ENUM",
            options: [
              {
                label: "上下切换",
                value: "right"
              },
              {
                label: "左右切换",
                value: "bottom"
              }
            ],
            value: "bottom"
          },
          {
            name: "特效",
            code: "effect",
            type: "ENUM",
            options: [
              {
                label: "线性滑动",
                value: "scrollx"
              },
              {
                label: "渐隐渐显",
                value: "fade"
              }
            ],
            value: "scrollx"
          }
        ],
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
      },
      {
        pIndex: 2,
        elemName: "滚动字幕",
        elemType: "componText",
        content: "",
        elemComAttr: {
          pointX: 700,
          pointY: 300,
          width: 300,
          height: 200,
          rotate: 0,
          opacity: 100,
          elemTime: 1,
          duration: "00:00:30"
        },
        elemSupAttr: {
          displayType: "HH:mm:ss",
          fontSize: "12.5px"
        },
        attributes: [
          {
            name: "颜色",
            code: "fontColor",
            type: "COLOR",
            value: "white"
          },
          {
            name: "背景",
            code: "backgroundColor",
            type: "COLOR",
            value: "red"
          },
          {
            name: "文本内容",
            code: "textContent",
            type: "STRING",
            value: "请编辑文字"
          },
          {
            name: "字体大小",
            code: "fontSize",
            type: "ENUM",
            options: [
              {
                label: "12",
                value: "12"
              },
              {
                label: "14",
                value: "14"
              },
              {
                label: "28",
                value: "28"
              },
              {
                label: "32",
                value: "32"
              }
            ],
            value: 28
          },
          {
            name: "字体粗细",
            code: "fontWeight",
            type: "ENUM",
            options: [
              {
                label: "标准",
                value: "normal"
              },
              {
                label: "粗体",
                value: "bold"
              }
            ],
            value: "normal"
          },
          {
            name: "滚动方向",
            code: "direction",
            type: "ENUM",
            options: [
              {
                label: "从左到右",
                value: "toRight"
              },
              {
                label: "从右到左",
                value: "toLeft"
              }
            ],
            value: "toLeft"
          },
          {
            name: "字体间隔",
            code: "fontSpacing",
            type: "SLIDER",
            value: 1
          },
          {
            name: "播放速率",
            code: "fontSpeed",
            type: "ENUM",
            options: [
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
            ],
            value: 2000
          }
        ]
      },
      {
        pIndex: 3,
        elemName: "图片",
        elemType: "componImage",
        content: "",
        elemComAttr: {
          pointX: 800,
          pointY: 800,
          width: 200,
          height: 200,
          rotate: 0,
          opacity: 100,
          elemTime: 1,
          duration: "00:00:30"
        },
        elemSupAttr: {
          displayType: "HH:mm:ss",
          fontSize: "12.5px"
        },
        attributes: [],
        imageSrc: [
          {
            img:
              "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658",
            id: 1
          }
        ]
      },
      {
        pIndex: 4,
        elemName: "视频",
        elemType: "componVideo",
        content: "xxx/xxx/xxx.mp4",
        elemComAttr: {
          pointX: 200,
          pointY: 100,
          width: 400,
          height: 300,
          rotate: 0,
          opacity: 100,
          elemTime: 1, // number
          duration: "00:00:30"
        },
        attributes: [
          {
            name: "静音播放",
            code: "muted",
            type: "BOOLEAN",
            value: false
          }
        ]
      },
      {
        pIndex: 5,
        elemName: "时间",
        elemType: "componTime",
        content: "xxx/xxx/xxx.mp4",
        elemComAttr: {
          pIndex: 1,
          pointX: 300,
          pointY: 500,
          width: 400,
          height: 300,
          rotate: 0,
          opacity: 100,
          elemTime: 1, // number
          duration: "00:00:30"
        },
        attributes: [
          {
            name: "时间颜色",
            code: "TfontColor",
            type: "COLOR",
            value: "white"
          },
          {
            name: "时间背景",
            code: "TbackgroundColor",
            type: "COLOR",
            value: "red"
          },
          {
            name: "时间字体大小",
            code: "TfontSize",
            type: "ENUM",
            options: [
              {
                label: "12",
                value: "12"
              },
              {
                label: "14",
                value: "14"
              },
              {
                label: "28",
                value: "28"
              },
              {
                label: "32",
                value: "32"
              }
            ],
            value: 28
          },
          {
            name: "时间字体粗细",
            code: "TfontWeight",
            type: "ENUM",
            options: [
              {
                label: "标准",
                value: "normal"
              },
              {
                label: "粗体",
                value: "bold"
              }
            ],
            value: "normal"
          },
          {
            name: "时间展示格式",
            code: "TshowContent",
            type: "ENUM",
            options: [
              {
                label: "显示日期",
                value: "YYYY-MM-DD"
              },
              {
                label: "显示时间",
                value: "HH:mm:ss"
              },
              {
                label: "日期时间",
                value: "YYYY-MM-DD HH:mm:ss"
              }
            ],
            value: "YYYY-MM-DD HH:mm:ss"
          }
        ]
      },
      {
        pIndex: 6,
        elemName: "星期",
        elemType: "componWeek",
        content: "xxx/xxx/xxx.mp4",
        elemComAttr: {
          pIndex: 1,
          pointX: 666,
          pointY: 999,
          width: 100,
          height: 100,
          rotate: 0,
          opacity: 100,
          elemTime: 1, // number
          duration: "00:00:30"
        },
        attributes: [
          {
            name: "星期颜色",
            code: "WfontColor",
            type: "COLOR",
            value: "white"
          },
          {
            name: "星期背景",
            code: "WbackgroundColor",
            type: "COLOR",
            value: "red"
          },
          {
            name: "星期字体大小",
            code: "WfontSize",
            type: "ENUM",
            options: [
              {
                label: "12",
                value: "12"
              },
              {
                label: "14",
                value: "14"
              },
              {
                label: "28",
                value: "28"
              },
              {
                label: "32",
                value: "32"
              }
            ],
            value: 28
          },
          {
            name: "星期字体粗细",
            code: "WfontWeight",
            type: "ENUM",
            options: [
              {
                label: "标准",
                value: "normal"
              },
              {
                label: "粗体",
                value: "bold"
              }
            ],
            value: "normal"
          }
        ]
      },
      {
        pIndex: 7,
        elemName: "文字编辑",
        elemType: "componEditText",
        content: "",
        elemComAttr: {
          pointX: 1300,
          pointY: 600,
          width: 300,
          height: 200,
          rotate: 0,
          opacity: 100,
          elemTime: 1,
          duration: "00:00:30"
        },
        elemSupAttr: {
          displayType: "HH:mm:ss",
          fontSize: "12.5px"
        },
        attributes: [
          {
            name: "颜色",
            code: "fontColor",
            type: "COLOR",
            value: "white"
          },
          {
            name: "背景",
            code: "backgroundColor",
            type: "COLOR",
            value: "#8B6A6A"
          },
          {
            name: "文本内容",
            code: "textContent",
            type: "STRING",
            value: "请编辑文字"
          },
          {
            name: "字体大小",
            code: "fontSize",
            type: "ENUM",
            options: [
              {
                label: "12",
                value: "12"
              },
              {
                label: "14",
                value: "14"
              },
              {
                label: "28",
                value: "28"
              },
              {
                label: "32",
                value: "32"
              }
            ],
            value: 28
          },
          {
            name: "字体粗细",
            code: "fontWeight",
            type: "ENUM",
            options: [
              {
                label: "标准",
                value: "normal"
              },
              {
                label: "粗体",
                value: "bold"
              }
            ],
            value: "normal"
          },
          {
            name: "滚动方向",
            code: "direction",
            type: "ENUM",
            options: [
              {
                label: "从左到右",
                value: "toRight"
              },
              {
                label: "从右到左",
                value: "toLeft"
              }
            ],
            value: "toLeft"
          },
          {
            name: "字体间隔",
            code: "fontSpacing",
            type: "SLIDER",
            value: 1
          },
        ]
      }
    ],
    progList: [
      {
        pIndex: 1,
        progName: "节目1",
        progDuration: "00:00:30",
        playTime: 1,
        progBg: "black",
        elemList: [
          {
            pIndex: 1,
            elemName: "视频1",
            elemType: "video",
            content: "xxx/xxx/xxx.mp4",
            elemComAttr: {
              pointX: 300,
              pointY: 500,
              width: 400,
              height: 300,
              rotate: 0,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            }
          },
          {
            pIndex: 2,
            elemName: "视频2",
            elemType: "video",
            content: "xxx/xxx/xxx.mp4",
            elemComAttr: {
              pIndex: 1,
              pointX: 300,
              pointY: 500,
              width: 400,
              height: 300,
              rotate: 0,
              opacity: 100,
              elemTime: 1, // number
              duration: "00:00:30"
            }
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
  };

  // 节目单源数据
  private activeProgramIndex = -1; // 激活的节目编号
  private activeElemIndex = -1; // 激活的元素编号
  public editIndex = -1; // 编辑中的元素位置

  get programsListObj() {
    // @ts-ignore
    return this.playbillData.progList.reduce(
      (o: any, cur) => (o[cur.pIndex] = cur) && o,
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
      // arr.push({
      //   model: elem.elemType,
      //   data: elem.elemSupAttr
      // });
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
        ? (this.$refs.trackX as any).offsetWidth
        : (this.$refs.trackY as any).offsetHeight;
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
      this.scale += 0.05;
    } else if (e.deltaY >= 0 && this.scale > 0.2) {
      this.scale -= 0.05;
    }
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
</style>
