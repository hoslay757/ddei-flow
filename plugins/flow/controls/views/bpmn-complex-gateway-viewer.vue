<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-complex-gateway",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-complex-gateway" title="复杂网关">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use xlink:href="#icon-ddei-flow-gateway-complex"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-complex-gateway {
  position: absolute;
  pointer-events:none;
  user-select: none;
  display: none;
  .icon-ddei-flow {
    margin-left: 2px;
    margin-top: 2px;
    width: calc(100% - 1px);
    height:calc(100% - 1px);
  }
  
}
</style>