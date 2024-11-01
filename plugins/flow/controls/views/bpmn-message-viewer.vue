<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-message",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-message" title="消息">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use v-if="model.bpmnSubType == 1" xlink:href="#icon-ddei-flow-send"></use>
      <use v-if="model.bpmnSubType == 2" xlink:href="#icon-ddei-flow-receive"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-message {
  position: absolute;
  pointer-events:none;
  user-select: none;
  display: none;
  .icon-ddei-flow {
    margin-top: -10px;
    margin-left: -11px;
    width: calc(100% + 20px);
    height: calc(100% + 18px);
  }
}
</style>