<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-inter-throw-event",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-inter-throw-event" title="中间抛出事件">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use v-if="!model.bpmnSubType || model.bpmnSubType == 1" xlink:href="#icon-ddei-flow-intermediate-event-n"></use>
      <use v-if="model.bpmnSubType == 2" xlink:href="#icon-ddei-flow-intermediate-throw-event-message"></use>
      <use v-if="model.bpmnSubType == 3" xlink:href="#icon-ddei-flow-intermediate-throw-event-signal"></use>
      <use v-if="model.bpmnSubType == 4" xlink:href="#icon-ddei-flow-intermediate-throw-event-compensation">
      </use>
      <use v-if="model.bpmnSubType == 5" xlink:href="#icon-ddei-flow-intermediate-event-t3"></use>
      <use v-if="model.bpmnSubType == 6" xlink:href="#icon-ddei-flow-intermediate-event-t1"></use>
      <use v-if="model.bpmnSubType == 7" xlink:href="#icon-ddei-flow-intermediate-event-t5"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-inter-throw-event {
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