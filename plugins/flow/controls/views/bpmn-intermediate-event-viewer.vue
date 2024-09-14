<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-intermediate-gateway",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-intermediate-event" title="中间事件">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use v-if="!model.bpmnSubType || model.bpmnSubType == 1" xlink:href="#icon-ddei-flow-intermediate-event-n"></use>
      <use v-if="model.bpmnSubType == 2" xlink:href="#icon-ddei-flow-intermediate-event-c5"></use>
      <use v-if="model.bpmnSubType == 3" xlink:href="#icon-ddei-flow-intermediate-event-c5"></use>
      <use v-if="model.bpmnSubType == 4" xlink:href="#icon-ddei-flow-intermediate-event-c17"></use>
      <use v-if="model.bpmnSubType == 5" xlink:href="#icon-ddei-flow-intermediate-event-t2"></use>
      <use v-if="model.bpmnSubType == 6" xlink:href="#icon-ddei-flow-intermediate-event-c13"></use>
      <use v-if="model.bpmnSubType == 7" xlink:href="#icon-ddei-flow-intermediate-event-c13"></use>
      <use v-if="model.bpmnSubType == 8" xlink:href="#icon-ddei-flow-intermediate-event-c16"></use>
      <use v-if="model.bpmnSubType == 9" xlink:href="#icon-ddei-flow-intermediate-event-c9"></use>
      <use v-if="model.bpmnSubType == 10" xlink:href="#icon-ddei-flow-intermediate-event-c9"></use>
      <use v-if="model.bpmnSubType == 11" xlink:href="#icon-ddei-flow-intermediate-event-c15"></use>
      <use v-if="model.bpmnSubType == 12" xlink:href="#icon-ddei-flow-intermediate-event-c6"></use>
      <use v-if="model.bpmnSubType == 13" xlink:href="#icon-ddei-flow-intermediate-event-c6"></use>
      <use v-if="model.bpmnSubType == 14" xlink:href="#icon-ddei-flow-intermediate-event-c4"></use>
      <use v-if="model.bpmnSubType == 15" xlink:href="#icon-ddei-flow-intermediate-event-t4"></use>
      <use v-if="model.bpmnSubType == 16" xlink:href="#icon-ddei-flow-intermediate-event-c3"></use>
      <use v-if="model.bpmnSubType == 17" xlink:href="#icon-ddei-flow-intermediate-event-c3"></use>
      <use v-if="model.bpmnSubType == 18" xlink:href="#icon-ddei-flow-intermediate-event-c11"></use>
      <use v-if="model.bpmnSubType == 19" xlink:href="#icon-ddei-flow-intermediate-event-t3"></use>
      <use v-if="model.bpmnSubType == 20" xlink:href="#icon-ddei-flow-intermediate-event-c7"></use>
      <use v-if="model.bpmnSubType == 21" xlink:href="#icon-ddei-flow-intermediate-event-c7"></use>
      <use v-if="model.bpmnSubType == 22" xlink:href="#icon-ddei-flow-intermediate-event-c14"></use>
      <use v-if="model.bpmnSubType == 23" xlink:href="#icon-ddei-flow-intermediate-event-c1"></use>
      <use v-if="model.bpmnSubType == 24" xlink:href="#icon-ddei-flow-intermediate-event-c1"></use>
      <use v-if="model.bpmnSubType == 25" xlink:href="#icon-ddei-flow-intermediate-event-c12"></use>
      <use v-if="model.bpmnSubType == 26" xlink:href="#icon-ddei-flow-intermediate-event-t1"></use>
      <use v-if="model.bpmnSubType == 27" xlink:href="#icon-ddei-flow-intermediate-event-c8"></use>
      <use v-if="model.bpmnSubType == 28" xlink:href="#icon-ddei-flow-intermediate-event-c"></use>
      <use v-if="model.bpmnSubType == 29" xlink:href="#icon-ddei-flow-intermediate-event-t"></use>
      <use v-if="model.bpmnSubType == 30" xlink:href="#icon-ddei-flow-intermediate-event-c2"></use>
      <use v-if="model.bpmnSubType == 31" xlink:href="#icon-ddei-flow-intermediate-event-t5"></use>
      <use v-if="model.bpmnSubType == 32" xlink:href="#icon-ddei-flow-intermediate-event-c10"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-intermediate-event {
  position: absolute;
  pointer-events: none;
  user-select: none;
  display: none;

  .icon-ddei-flow {
    width: 100%;
    height: 100%;
  }

}
</style>