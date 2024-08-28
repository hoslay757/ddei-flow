<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-subprocess",
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

  mounted() {
    this.editor.renderViewerIns[this.model.id] = this
    this.editor.renderViewerElements[this.model.id] = this.$refs['divElement']
    this.editor.bus.push("refresh-shape");
    this.editor.bus.executeAll();
  },

  methods:{
    refreshDragState(type){
      if (type == 1){
        this.$refs['divElement'].style.border = "1px solid green"
      }else{
        this.$refs['divElement'].style.border = ""
      }
    }
  }
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-subprocess">
    <div class="title" v-if="!model.isExpand">
      {{ model.name ? model.name : "嵌入子流程" }}
    </div>
    <div ref="content" class="content" v-if="model.isExpand">
      <div class="content-header">
        <div class="content-header-title">
          {{ model.name ? model.name : "嵌入子流程" }}
        </div>
        <svg class="icon-ddei-flow content-header-locked" v-if="model.lock == 1" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-lock"></use>
        </svg>
      </div>
      <div class="content-elements">

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
      <svg class="icon-ddei-flow" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-sub-process-marker"></use>
      </svg>
      <svg class="icon-ddei-flow" v-if="model.isAdHoc == 1" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-ad-hoc-marker"></use>
      </svg>
    </div>

  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-subprocess {
  
  background: var(--fillColor);
  position: absolute;
  color: var(--text);
  font-size: 14px;
  border:var(--borderWidth) var(--borderType) var(--borderColor);
  border-radius: var(--borderRound);
  pointer-events:none;
  user-select: none;
  display: none;
  .markers{
    height:24px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-ddei-flow {
      width: 18px;
      height: 18px;
    }
  }
  
    .title {
      font-size: 13px;
      height: calc(100% - 24px);
      display: flex;
      border-bottom: var(--borderWidth) var(--borderType) var(--borderColor);
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 0 2px;
      word-break: break-word;
      text-overflow: ellipsis;
      color: var(--fontColor);
      font-family: var(--fontFamily);
      font-size: var(--fontSize);
      font-style: var(--fontStyle);
      font-weight: var(--fontWeight);
      text-decoration: var(--textDecoration);
    }
    .content {
      height: calc(100% - 24px);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &-header {
        padding:2px 5px;
        flex: 0 0 20px;
        height: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &-title {
          flex: 1;
          height: 20px;
          font-size: 12px;
          opacity: 0.5;
          overflow: hidden;
          word-break: break-word;
          text-overflow: ellipsis;
          text-align: left;
          color: var(--fontColor);
          font-family: var(--fontFamily);
          font-style: var(--fontStyle);
          font-weight: var(--fontWeight);
          text-decoration: var(--textDecoration);
        }
      
        &-locked {
          flex: 0 0 12px;
          height: 12px;
          font-size: 12px;
          opacity: 0.5;
          color: var(--fontColor);
        }
      }
      &-elements {
        flex:1; 
      }
    }
    
}
</style>