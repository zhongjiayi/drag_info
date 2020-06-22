<template>
  <basicStyle>
    <!--标题左侧-->
    <template #headerLeft>
      <!--退出收索按钮-->
      <div v-if="isSearchMode" class="header-icon-box" @click.left.stop="changeSearchMode">
        <svg class="svg-icon " viewBox="0 0 12 11" aria-hidden="true">
          <path
              d="M3.578 6.498L6.5 9.493 5.029 11 .305 6.16a1.084 1.084 0 0 1 0-1.508L5.029 0 6.5 1.507 3.437 4.502h7.565a.998.998 0 1 1 0 1.996H3.578z"></path>
        </svg>
      </div>
      <!--添加节目-->
      <div v-else class="screen-title">
        <svg class="svg-icon add-icon" viewBox="0 0 14 14" aria-hidden="true">
          <path
              d="M6.01 6L6 4h2l.01 2H10v2H8.019l.009 1.917h-2L6.018 8H4V6h2.01zM7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zm0-2A5 5 0 10 7 2a5 5 0 0 0 0 10z"></path>
        </svg>
        <p>添加节目</p>
      </div>
    </template>
    <!--标题右侧-->
    <template #headerRight>
      <!--收索输入框-->
      <transition name="search">
        <div v-if="isSearchMode" class="layer-search">
          <div class="search-icon">
            <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
              <path
                  d="M10.077 11.67l-1.99-1.99a5.227 5.227 0 0 1-2.828.837 5.259 5.259 0 1 1 5.259-5.258c0 1.043-.313 2.01-.837 2.828l1.989 1.988a1.128 1.128 0 0 1-1.593 1.595zm-4.84-9.433a3 3 0 1 0 .001 6.001 3 3 0 0 0 0-6.001z"></path>
            </svg>
          </div>
          <input v-if="isSearchMode" class="hzInput searchInput" type="text" placeholder="关键字搜索" v-model="filterKey">
        </div>
      </transition>
      <!--搜索按钮-->
      <div v-if="!isSearchMode" class="pane-searchButton header-icon-box" @click.left.stop="changeSearchMode">
        <svg class="svg-icon" viewBox="0 0 12 12" aria-hidden="true">
          <path
              d="M10.077 11.67l-1.99-1.99a5.227 5.227 0 0 1-2.828.837 5.259 5.259 0 1 1 5.259-5.258c0 1.043-.313 2.01-.837 2.828l1.989 1.988a1.128 1.128 0 0 1-1.593 1.595zm-4.84-9.433a3 3 0 1 0 .001 6.001 3 3 0 0 0 0-6.001z"></path>
        </svg>
      </div>
    </template>
    <!--主要内容-->
    <template #main>
      <div class="layer-sortable-list">
        <!--节目列表-->
        <ul class="currentLists">
          <li v-for="(program,index) of showProgramsList" :key="program.pIndex"
              class="currentList-list" :class="{active: program.pIndex === programActive}"
              :draggable="filterKey === '' && !isEdit && !extend" @dragstart="dragstart(index)"
              @dragover="allowDrop" @drop="dropHandle(index)"
              @click.left.stop="changeActive(program)" @dblclick.stop="startEdit(program)">
            <div class="screen-item">
              <svg class="svg-icon" viewBox="0 0 9 12" aria-hidden="true">
                <path v-if="programActive === program.pIndex"
                      d="M5.279 0H5v3a2 2 0 0 0 2 2h2v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a.996.996 0 0 1 1-1h4.279zM6 .103a1 1 0 0 1 .298.224L8.74 3.014a1 1 0 0 1 .26.673V4H7a1 1 0 0 1-1-1V.103z"></path>
                <path v-else
                      d="M5 1H1v10h7V5H7a2 2 0 0 1-2-2V1zm1 .487V3a1 1 0 0 0 1 1h1v-.313l-2-2.2zM1 0h4.558a1 1 0 0 1 .74.327L8.74 3.014a1 1 0 0 1.26.673V11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a.996.996 0 0 1 1-1z"></path>
              </svg>
              <input v-if="isEdit && programActive===program.pIndex" class="hzInput" type="text" v-model="editName"
                     ref="programInput" placeholder="请输入节目名称"
                     @keyup.enter="endEdit(program)" @blur="endEdit(program)">
              <div v-else class="textBox">{{program.progName}}</div>
            </div>
            <div v-if="!isEdit" class="handleButton"
                 @mouseenter="mouseenterHandle(program)" @mouseleave="mouseleaveHandle(program)">
              <svg class="svg-icon icon-ellipsis" viewBox="0 0 18 18" aria-hidden="true">
                <path
                    d="M16 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </basicStyle>
</template>

<script lang="ts">
  import {Vue, Prop, Component} from 'vue-property-decorator'
  import BasicStyle from "./BasicStyle.vue"

  interface Program {
    progName: string,
    pIndex: number
  }

  @Component({
    components: {
      BasicStyle
    }
  })

  export default class PageList extends Vue {
    @Prop() programsList!: Program[]
    @Prop() programActive!: number

    private isEdit = false // 是否处于编辑模式

    private editName = '' // 存储编辑的文本

    private filterKey = ''

    get showProgramsList() {
      return this.programsList.filter(item => item.progName.indexOf(this.filterKey) > -1)
    }

    changeActive(program: Program): void {
      if (!this.isEdit) {
        if (this.programActive === program.pIndex) {
          this.$emit('changeActiveIndex', 'program', -1)
        } else {
          this.$emit('changeActiveIndex', 'program', program.pIndex)
        }
      }
    }

    // 搜索模式切换
    private isSearchMode = false

    changeSearchMode(): void {
      this.isSearchMode = !this.isSearchMode
      this.filterKey = ''
    }

    /**
     *  文本编辑
     */
    // 开始编辑
    startEdit(program: Program): void {
      this.$emit('changeActiveIndex', 'program', program.pIndex)
      this.isEdit = true
      this.editName = program.progName
      this.$nextTick(() => {
        (this.$refs.programInput as HTMLInputElement[])[0].focus()
      })
    }

    // 结束编辑
    endEdit(program: Program): void {
      if (this.editName !== '') {
        this.isEdit = false
        const res = this.checkString(this.editName) || (this.editName === program.progName ? '' : this.checkDupName(this.editName, this.programsList))
        if (res === '') {
          program.progName = this.editName
        } else {
          alert(res)
        }
        this.editName = ''
      }
    }

    /**
     *  校验
     */
    // 字符串校验
    checkString(target: string, type: string = 'string'): string {
      // 置空判断
      if (target === '') {
        return '文本不能为空'
      }
      // 正则
      let Reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
      let msg = '文本只能由汉字、数字、字母、下划线组成'
      if (type === 'number') {
        Reg = /^\d+(\.\d+)?$/
        msg = '文本只能由数字组成'
      }
      return Reg.test(target) ? '' : msg
    }

    // 重名校验
    checkDupName(target: string, targetArr: { progName: string }[]) {
      let i = 0
      targetArr.map(item => {
        // ts-ignore
        if (item.progName === target) {
          i++
        }
      })
      if (i > 0) {
        return '名称重复'
      }
      return ''
    }

    /**
     *  拖拽
     */
      // 开始拖拽
    private dragIndex = -1

    dragstart(index: number) {
      this.dragIndex = index
    }

    // 允许进入
    allowDrop(e: any) {
      if (this.dragIndex !== -1) {
        e.preventDefault()
      }
    }

    // 完成拖拽
    dropHandle(index: number) {
      if (this.dragIndex !== -1) {
        this.programsList.splice(index, 0, this.programsList.splice(this.dragIndex, 1)[0])
        this.dragIndex = -1
      }
    }

    /**
     * 进入和离开
     */
    private extend = false

    // 进入
    mouseenterHandle() {
      this.extend = true
    }

    //离开
    mouseleaveHandle() {
      this.extend = false
    }
  }
</script>
