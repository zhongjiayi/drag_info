import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // modules:{}
  state: {
    components: [
      {
        name: "文本",
        type: "text",
        id:"text",
        scope: "local",
        path: [
          "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z",
        ],
        sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      },
      {
        name: "图片",
        type: "picture",
        id:"picture",
        scope: "local",
        path: [
          "M26.86 18.433a.995.995 0 0 0 .14-.51V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v12.923a1 1 0 0 0 .038.272l3.625-3.099 2.931 2.255L19.7 11.09l7.16 7.344zM7 2h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm6.25 9.77c-1.243 0-2.25-1.034-2.25-2.308 0-1.275 1.007-2.308 2.25-2.308s2.25 1.033 2.25 2.308c0 1.274-1.007 2.307-2.25 2.307z",
        ],
        sPath: [
          "M0 0h12v12H0V0zm1 1v10h10V1H1zm2 2h2v2H3V3zm-1 7V9l1.778-2 1.778 1.5L8.222 5 10 8v2H2z",
        ],
      },
      {
        scope: "local",
        name: "视频",
        id:"video",
        type: "video",
        path: [
          "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z",
        ],
        sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      },
      {
        name: "轮播组",
        type: "carousel",
        id:"carousel",
        scope: "local",
        path: [
          "M28.5 6.5v1.007l2-.01v10.035h-2v.968H31a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5h-2.5zm-23 0H3a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h2.5v-.968h-2V7.498l2 .009V6.5z",
          "M9 5v15h16V5H9zM8 3h18a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
          "M14 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2.253 7.664l-1.494-1.328 4.787-5.386L17 14.4l3.917-4.897 3.79 3.79-1.414 1.414-2.21-2.21L17 17.601l-2.04-2.55z",
        ],
        sPath: [
          "M1 8H0V2h1v6zm13 0h-1V2h1v6zM3 1v8h8V1H3zm-.167-1h8.334c.46 0 .833.373.833.833v8.334c0 .46-.373.833-.833.833H2.833A.833.833 0 0 1 2 9.167V.833C2 .373 2.373 0 2.833 0zM4 8V7l1.75-2L7 6.5 9 4l1 2v2H4zm0-6h2v2H4V2z",
        ],
      },
      {
        name: "日期",
        type: "date",
        id:"date",
        scope: "global",
        path: [
          "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z",
        ],
        sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      },
      {
        name: "星期",
        type: "week",
        id:"week",
        scope: "global",
        path: [
          "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z",
        ],
        sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      },
      {
        name: "时间",
        type: "time",
        id:"time",
        scope: "global",
        path: [
          "M24 4h-6l-.042 15h2a1 1 0 1 1 0 2H14a1 1 0 0 1 0-2h1.958L16 4h-6v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4z",
        ],
        sPath: ["M5 10V1H1v2H0V0h11v3h-1V1H6v9h2v1H3v-1h2z"],
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
