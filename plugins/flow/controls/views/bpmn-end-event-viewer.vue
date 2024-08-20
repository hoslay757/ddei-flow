<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-end-gateway",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-start-event" title="结束事件">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use v-if="!model.bpmnSubType || model.bpmnSubType == 1" xlink:href="#icon-ddei-flow-end-event-none"></use>
      <use v-if="model.bpmnSubType == 2" xlink:href="#icon-ddei-flow-end-event-message"></use>
      <use v-if="model.bpmnSubType == 3" xlink:href="#icon-ddei-flow-end-event-signal"></use>
      <use v-if="model.bpmnSubType == 4" xlink:href="#icon-ddei-flow-end-event-multiple"></use>
      <use v-if="model.bpmnSubType == 5" xlink:href="#icon-ddei-flow-end-event-escalation"></use>
      <use v-if="model.bpmnSubType == 6" xlink:href="#icon-ddei-flow-end-event-error"></use>
      <use v-if="model.bpmnSubType == 7" xlink:href="#icon-ddei-flow-end-event-compensati"></use>
      <use v-if="model.bpmnSubType == 8" xlink:href="#icon-ddei-flow-end-event-cancel"></use>
      <use v-if="model.bpmnSubType == 9" xlink:href="#icon-ddei-flow-end-event-terminate"></use>
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