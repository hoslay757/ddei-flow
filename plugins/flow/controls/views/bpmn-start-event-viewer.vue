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

  mounted() {
    this.editor.renderViewerIns[this.model.id] = this
    this.editor.renderViewerElements[this.model.id] = this.$refs['divElement']
    this.editor.bus.push("refresh-shape");
    this.editor.bus.executeAll();
  }
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-start-event" title="开始事件">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use v-if="!model.bpmnSubType || model.bpmnSubType == 1" xlink:href="#icon-ddei-flow-start-event-none"></use>
      <use v-if="model.bpmnSubType == 2" xlink:href="#icon-ddei-flow-start-event-message"></use>
      <use v-if="model.bpmnSubType == 3" xlink:href="#icon-ddei-flow-start-event-non-inte3"></use>
      <use v-if="model.bpmnSubType == 4" xlink:href="#icon-ddei-flow-start-event-timer"></use>
      <use v-if="model.bpmnSubType == 5" xlink:href="#icon-ddei-flow-start-event-non-inte2"></use>
      <use v-if="model.bpmnSubType == 6" xlink:href="#icon-ddei-flow-start-event-conditio"></use>
      <use v-if="model.bpmnSubType == 7" xlink:href="#icon-ddei-flow-start-event-non-inte4"></use>
      <use v-if="model.bpmnSubType == 8" xlink:href="#icon-ddei-flow-start-event-signal"></use>
      <use v-if="model.bpmnSubType == 9" xlink:href="#icon-ddei-flow-start-event-non-inte1"></use>
      <use v-if="model.bpmnSubType == 10" xlink:href="#icon-ddei-flow-start-event-multiple"></use>
      <use v-if="model.bpmnSubType == 11" xlink:href="#icon-ddei-flow-start-event-non-inte6"></use>
      <use v-if="model.bpmnSubType == 12" xlink:href="#icon-ddei-flow-start-event-parallel"></use>
      <use v-if="model.bpmnSubType == 13" xlink:href="#icon-ddei-flow-start-event-non-inte5"></use>
      <use v-if="model.bpmnSubType == 14" xlink:href="#icon-ddei-flow-start-event-escalati"></use>
      <use v-if="model.bpmnSubType == 15" xlink:href="#icon-ddei-flow-start-event-non-inte"></use>
      <use v-if="model.bpmnSubType == 16" xlink:href="#icon-ddei-flow-start-event-error"></use>
      <use v-if="model.bpmnSubType == 17" xlink:href="#icon-ddei-flow-start-event-compensa"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-start-event {
  position: absolute;
  pointer-events:none;
  user-select: none;
  .icon-ddei-flow {
    margin-left: 1.5px;
    margin-top: 1.5px;
    width: 100%;
    height: 100%;
  }
  
}
</style>