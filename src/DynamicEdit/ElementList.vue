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
      <p v-else>元素 </p>
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
      <!--折叠按钮-->
      <slot v-if="!isSearchMode" name="stretchButton"></slot>
    </template>
    <!--主要内容-->
    <template #main>
      <div class="layer-sortable-list">
        <ul class="currentLists">
          <li v-for="(elem,index) of showElemList" :key="elem.pIndex" class="currentList-list"
              :class="{active: elem.pIndex === elemActive}"
              :draggable="filterKey === '' && !isEdit && !extend" @dragstart="dragstart(index)"
              @dragover="allowDrop" @drop="dropHandle(index)"
              @click.left.stop="changeActive(elem)" @dblclick.stop="startEdit(elem)">
            <div class="screen-item">
              <svg class="svg-icon" aria-hidden="true">
                <path v-for="item of componentsList[elem.elemType].sPath" :d="item"></path>
              </svg>
              <input v-if="isEdit && elem.pIndex === elemActive" class="hzInput" type="text"
                     v-model="editName"
                     ref="elemInput" placeholder="请输入元素名称"
                     @keyup.enter="endEdit(elem.index)" @blur="endEdit(elem)">
              <div v-else class="textBox">{{elem.elemName}}</div>
            </div>
            <div v-if="!isEdit" class="handleButton"
                 @mouseenter="mouseenterHandle(elem)" @mouseleave="mouseleaveHandle(elem)">
              <svg class="svg-icon icon-ellipsis" viewBox="0 0 18 18" aria-hidden="true">
                <path
                    d="M16 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </template>
    <!--拖动条插槽-->
    <slot name="operateHor"></slot>
  </basicStyle>
</template>

<script lang="ts">
  import {Vue, Prop, Component} from 'vue-property-decorator'
  import BasicStyle from "./BasicStyle.vue"

  @Component({
    components: {
      BasicStyle
    }
  })
  export default class PageList extends Vue {
    @Prop() elemList!: Elem[]
    @Prop() elemActive!: number
    @Prop() components!: IComponent[]

    private isEdit = false // 是否处于编辑模式

    private editName = '' // 存储编辑的文本

    private filterKey = '' // 过滤关键字

    get showElemList() {
      return this.elemList.filter(item => item.elemName.indexOf(this.filterKey) > -1)
    }

    get componentsList() {
      return this.components.reduce((o: { [x: string]: any }, cur: { type: string | number }) => (o[cur.type] = cur) && o, {})
    }

    changeActive(elem: Elem): void {
      if (!this.isEdit) {
        if (this.elemActive === elem.pIndex) {
          this.$emit('changeActiveIndex', 'elem', -1)
        } else {
          this.$emit('changeActiveIndex', 'elem', elem.pIndex)
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
    startEdit(elem: Elem): void {
      this.$emit('changeActiveIndex', 'elem', elem.pIndex)
      this.isEdit = true
      this.editName = elem.elemName
      console.log()
      this.$nextTick(() => {
        (this.$refs.elemInput as HTMLInputElement[])[0].focus()
      })
    }

    // 结束编辑
    endEdit(elem: Elem): void {
      if (this.editName !== '') {
        this.isEdit = false
        const res = this.checkString(this.editName) || (this.editName === elem.elemName ? '' : this.checkDupName(this.editName, this.elemList))
        if (res === '') {
          elem.elemName = this.editName
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
      let Reg = /^[a-zA-Z0-9_ \u4e00-\u9fa5]+$/
      let msg = '文本只能由汉字、数字、字母、空格、下划线组成'
      if (type === 'number') {
        Reg = /^\d+(\.\d+)?$/
        msg = '文本只能由数字组成'
      }
      return Reg.test(target) ? '' : msg
    }

    // 重名校验
    checkDupName(target: string, targetArr: { elemName: string }[]) {
      let i = 0
      targetArr.map(item => {
        // ts-ignore
        if (item.elemName === target) {
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
        this.elemList.splice(index, 0, this.elemList.splice(this.dragIndex, 1)[0])
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
