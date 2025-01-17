<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-start-gateway",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-start-event" title="开始事件">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use v-if="!model.bpmnSubType || model.bpmnSubType == 1" xlink:href="#icon-ddei-flow-start-event-none"></use>
      <use v-if="model.bpmnSubType == 2 && !model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-message">
      </use>
      <use v-if="model.bpmnSubType == 2 && model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-non-inte3">
      </use>
      <use v-if="model.bpmnSubType == 3 && !model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-timer"></use>
      <use v-if="model.bpmnSubType == 3 && model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-non-inte2">
      </use>
      <use v-if="model.bpmnSubType == 4 && !model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-conditio">
      </use>
      <use v-if="model.bpmnSubType == 4 && model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-non-inte4">
      </use>
      <use v-if="model.bpmnSubType == 5 && !model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-signal">
      </use>
      <use v-if="model.bpmnSubType == 5 && model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-non-inte1">
      </use>
      <use v-if="model.bpmnSubType == 6 && !model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-multiple">
      </use>
      <use v-if="model.bpmnSubType == 6 && model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-non-inte6">
      </use>
      <use v-if="model.bpmnSubType == 7 && !model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-parallel">
      </use>
      <use v-if="model.bpmnSubType == 7 && model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-non-inte5">
      </use>
      <use v-if="model.bpmnSubType == 8 && !model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-escalati">
      </use>
      <use v-if="model.bpmnSubType == 8 && model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-non-inte">
      </use>
      <use v-if="model.bpmnSubType == 9" xlink:href="#icon-ddei-flow-start-event-error"></use>
      <use v-if="model.bpmnSubType == 10 && !model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-compensa">
      </use>
      <use v-if="model.bpmnSubType == 10 && model.notInterrupting" xlink:href="#icon-ddei-flow-start-event-compensa-non-inte">
      </use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-start-event {
  position: absolute;
  pointer-events:none;
  user-select: none;
  display:none;
  .icon-ddei-flow {
    margin-left: -3px;
    margin-top: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    fill:var(--borderColor);
  }
  
}
</style>