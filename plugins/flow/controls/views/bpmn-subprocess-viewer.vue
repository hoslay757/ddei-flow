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

  data(){
    return {
  
    }
  },



  methods:{
    refreshDragState(type){
      if (type == 1){
        this.$refs['divElement'].style.borderColor = "green"
        if (this.$refs['transactionBorderElement']){
          this.$refs['transactionBorderElement'].style.borderColor = "green"
        }
      }else{
        this.$refs['divElement'].style.borderColor = ""
        if (this.$refs['transactionBorderElement']){
          this.$refs['transactionBorderElement'].style.borderColor = ""
        }
      }
    }
  }
};
</script>
<template>
  <div ref="divElement"
    :class="{ 'ddei-flow-bpmn-viewer-subprocess': true, 'ddei-flow-bpmn-viewer-subprocess-event':model.bpmnSubType == 2 }">
    <div ref="transactionBorderElement" v-if="model.bpmnSubType == 3" class="trans">
    </div>
    <div :class="{ 'title': true, 'title-transaction': model?.bpmnSubType == 3 }" v-if="!model.isExpand">
      {{ editor.i18n(model.name ? model.name : model.bpmnSubType == 3 ? "ddei.flow.transsubprocess" : model.bpmnSubType
      == 2 ?
      "ddei.flow.eventsubprocess" : "ddei.flow.subprocess") }}
    </div>
    <div ref="content" class="content" v-if="model.isExpand">
      <div class="content-header">
        <div class="content-header-title">
          {{ editor.i18n(model.name ? model.name : model?.bpmnSubType == 3 ? "ddei.flow.transsubprocess" :
          model.bpmnSubType == 2 ?
          "ddei.flow.eventsubprocess" : "ddei.flow.subprocess") }}
        </div>
        <svg class="icon-ddei-flow content-header-locked" v-if="model.lock == 1" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-lock"></use>
        </svg>
      </div>
      <div class="content-elements">

      </div>
    </div>
    <div :class="{ 'markers': true, 'markers-transaction': model.bpmnSubType == 3 }">
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
      <svg class="icon-ddei-flow" v-if="model.bpmnSubType == 4" aria-hidden="true">
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

  &-event{
    border-style:dashed !important;
    .trans {
      border-style: dashed !important;
    }
  }

  .trans{
    width:calc(100% - 10px);
    height:calc(100% - 10px);
    position: absolute;
    border: var(--borderWidth) var(--borderType) var(--borderColor);
    border-radius: var(--borderRound);
    left:5px;
    top:5px;
  }
  .markers{
    height:24px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: start;
    padding-top:4px;
    &-transaction{
      padding-top: 2px !important;
    }
    .icon-ddei-flow {
      width: 14px;
      height: 14px;
    }
  }
  
    .title {
      font-size: 13px;
      height: calc(100% - 24px);
      width:100%;
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

      &-transaction{
        width: calc(100% - 10px) !important;
        margin-left: 5px !important;  
      }
    }
    .content {
      height: calc(100% - 24px);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &-header {
        padding:10px;
        flex: 0 0 30px;
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