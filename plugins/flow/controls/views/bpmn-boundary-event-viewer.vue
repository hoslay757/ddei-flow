<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-boundary-event",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-boundary-event" title="边界事件">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use v-if="(!model.bpmnSubType || model.bpmnSubType == 1) && !model.notInterrupting"
        xlink:href="#icon-ddei-flow-boundary-event-message"></use>
      <use v-if="(!model.bpmnSubType || model.bpmnSubType == 1) && model.notInterrupting"
        xlink:href="#icon-ddei-flow-boundary-event-message-inte"></use>
      <use v-if="model.bpmnSubType == 2 && !model.notInterrupting" xlink:href="#icon-ddei-flow-boundary-event-time">
      </use>
      <use v-if="model.bpmnSubType == 2 && model.notInterrupting" xlink:href="#icon-ddei-flow-boundary-event-time-inte">
      </use>
      <use v-if="model.bpmnSubType == 3" xlink:href="#icon-ddei-flow-boundary-event-signal"></use>
      <use v-if="model.bpmnSubType == 4" xlink:href="#icon-ddei-flow-boundary-event-error"></use>
      <use v-if="model.bpmnSubType == 5" xlink:href="#icon-ddei-flow-boundary-event-compensation"></use>
      <use v-if="model.bpmnSubType == 6" xlink:href="#icon-ddei-flow-boundary-event-cancel"></use>
      <use v-if="model.bpmnSubType == 7 && !model.notInterrupting" xlink:href="#icon-ddei-flow-intermediate-event-c1">
      </use>
      <use v-if="model.bpmnSubType == 7 && model.notInterrupting" xlink:href="#icon-ddei-flow-intermediate-event-c12">
      </use>
      <use v-if="model.bpmnSubType == 8 && !model.notInterrupting" xlink:href="#icon-ddei-flow-intermediate-event-c7">
      </use>
      <use v-if="model.bpmnSubType == 8 && model.notInterrupting" xlink:href="#icon-ddei-flow-intermediate-event-c14">
      </use>
      <use v-if="model.bpmnSubType == 9 && !model.notInterrupting" xlink:href="#icon-ddei-flow-intermediate-event-c3">
      </use>
      <use v-if="model.bpmnSubType == 9 && model.notInterrupting" xlink:href="#icon-ddei-flow-intermediate-event-c11">
      </use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-boundary-event {
  position: absolute;
  pointer-events: none;
  user-select: none;
  display: none;

  .icon-ddei-flow {
    margin-left: -3px;
    margin-top: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    fill: var(--borderColor);
  }

}
</style>