<script lang="ts">
import { DDeiUtil, DDeiEditorUtil } from 'ddei-editor'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-chore-subprocess",
  props: {
    model: {
      type: Object,
      default: null
    },
    editor: {
      type: Object,
      default: null
    }
  },
  data(){
    return {
      topUsers: null,
      bottomUsers: null,
    }
  },
  
  methods: {
    refreshDragState(type) {
      if (type == 1) {
        this.$refs['content'].style.border = "1px solid green"
      } else {
        this.$refs['content'].style.border = ""
      }
    },
    isInRect(model){
      let contentElement = this.$refs['content']
      let contentPos = DDeiUtil.getDomAbsPosition(contentElement, this.editor)
      let pvs = model.operatePVS;
      let stage = model.stage
      contentPos.left -= stage.wpv.x
      contentPos.top -= stage.wpv.y
      for (let i = 0; i < pvs.length;i++){ 
        let p = pvs[i]
        if (contentPos.left <= p.x && (contentPos.left + contentElement.clientWidth) >= p.x
          && contentPos.top <= p.y && (contentPos.top + contentElement.clientHeight) >= p.y){
          return true;
        }
      }
      
      return false
    },

    refreshView(){
      if (this.model.topUser) {
        let users = this.model.topUser.split(",")
        let topUsers = []
        users?.forEach(user => {
          if (user){
            topUsers.push({ name: user })
          }
        });
        this.topUsers = topUsers
      }
      if (this.model.bottomUser) {
        let users = this.model.bottomUser.split(",")
        let bottomUsers = []
        users?.forEach(user => {
          if (user) {
            bottomUsers.push({ name: user })
          }
        });
        this.bottomUsers = bottomUsers
      }
    },
  }

  
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-chore-subprocess">
    <div class="content">
      <div class="top" v-for="user in topUsers">
        <div class="text">{{ user.name }}</div>
      </div>
      <div class="middle" ref="content">
        <div class="text" v-if="!model.isExpand">
          {{ model.name ? model.name : "编排子流程" }}
        </div>
        <svg class="icon-ddei-flow middle-locked" v-if="model.lock == 1" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-lock"></use>
        </svg>
        <div class="markers">
          <svg class="icon-ddei-flow" v-if="model.isLoop == 1" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-loop-marker"></use>
          </svg>
          <svg class="icon-ddei-flow" v-if="model.multiInstance == 1 && model.isParallel != 1" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-sequential-mi-marker"></use>
          </svg>
          <svg class="icon-ddei-flow" v-if="model.multiInstance == 1 && model.isParallel == 1" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-parallel-mi-marker"></use>
          </svg>
          <svg class="icon-ddei-flow" v-if="model.isCompensation == 1" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-compensation-marker"></use>
          </svg>
          <svg class="icon-ddei-flow" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-sub-process-marker"></use>
          </svg>
          <svg class="icon-ddei-flow" v-if="model.isAdHoc == 1" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-ad-hoc-marker"></use>
          </svg>
        </div>
      </div>
      <div class="bottom" v-for="user in bottomUsers">
        <div class="text">{{ user.name }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-chore-subprocess {
  
  background: var(--fillColor);
  position: absolute;
  color: var(--text);
  font-size: 14px;
  border:var(--borderWidth) var(--borderType) var(--borderColor);
  border-radius: var(--borderRound);
  pointer-events:none;
  user-select: none;
  display: none;

  .content{
    width: 100%;
    height:100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .text {
      flex: 1;
      text-align: center;
      white-space: nowrap;
      padding: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--fontColor);
      font-family: var(--fontFamily);
      font-size: var(--fontSize);
      font-style: var(--fontStyle);
      font-weight: var(--fontWeight);
      text-decoration: var(--textDecoration);
    }
    .top {
      flex: 0 0 20px;
      width: 100%;
      border-bottom: var(--borderWidth) var(--borderType) var(--borderColor);
    }

    .bottom {
      flex: 0 0 20px;
      width: 100%;
      border-top: var(--borderWidth) var(--borderType) var(--borderColor);
    }

    .middle{
      flex: 1;
      height:100%;
      width:100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;


      &-locked {
        width: 12px;
        height: 12px;
        font-size: 12px;
        opacity: 0.5;
        right:10px;
        top:10px;
        position: absolute;
        color: var(--fontColor);
      }

      .markers {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    
        .icon-ddei-flow {
          width: 14px;
          height: 14px;
          fill: var(--borderColor);
        }
      }
    }
  }
}
</style>