<script lang="ts">
import { DDeiUtil, DDeiEditorUtil } from 'ddei-editor'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-user-task",
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

  
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-user-task">
    <div class="title">
      <svg class="icon-ddei-flow" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-user"></use>
      </svg>
      <div class="text">
        {{ editor.i18n(model.name ? model.name : "ddei.flow.usertask") }}
      </div>

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
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-user-task {
  
  background: var(--fillColor);
  position: absolute;
  color: var(--text);
  font-size: 14px;
  border:var(--borderWidth) var(--borderType) var(--borderColor);
  border-radius: var(--borderRound);
  pointer-events:none;
  user-select: none;
  display: none;
  .title{
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--fontColor);
    font-family: var(--fontFamily);
    font-size: var(--fontSize);
    font-style: var(--fontStyle);
    font-weight: var(--fontWeight);
    text-decoration: var(--textDecoration);
    .icon-ddei-flow {
      position: absolute;
      left:0px;
      top:0px;
      width: 24px;
      height:24px;
    }

    .text {
      flex: 1;
      text-align: center;
      white-space: nowrap;
      padding:2px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    

  }
  .markers {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
    .icon-ddei-flow {
      width: 14px;
      height: 14px;
    }
  }
}
</style>