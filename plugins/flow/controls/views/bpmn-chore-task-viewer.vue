<script lang="ts">
import { DDeiUtil, DDeiEditorUtil } from 'ddei-editor'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-chore-task",
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

  data() {
    return {
      topUsers: null,
      bottomUsers: null,
    }
  },
  methods:{
    refreshView() {
      if (this.model.topUser) {
        let users = this.model.topUser.split(",")
        let topUsers = []
        users?.forEach(user => {
          if (user) {
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
    refreshDragState(type) {
      if (type == 1) {
        this.$refs['divElement'].style.borderColor = "green"
      } else {
        this.$refs['divElement'].style.borderColor = ""
      }
    }
  }

  
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-chore-task">
    <div class="content">
      <div class="top" v-for="user in topUsers">
        <div class="text">{{ user.name }}</div>
      </div>
      <div class="middle">
        <div class="text">
          {{ editor.i18n(model.name ? model.name : "ddei.flow.choretask") }}
        </div>
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
        </div>
      </div>
      <div class="bottom" v-for="user in bottomUsers">
        <div class="text">{{ user.name }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-chore-task {
  
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
          width: 16px;
          height: 16px;
          fill: var(--borderColor);
        }
      }
    }
  }
}
</style>