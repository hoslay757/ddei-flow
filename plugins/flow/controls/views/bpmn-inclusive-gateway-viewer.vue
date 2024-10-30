<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-inclusive-gateway",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-inclusive-gateway" title="包容网关">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use xlink:href="#icon-ddei-flow-gateway-or"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-inclusive-gateway {
  position: absolute;
  pointer-events:none;
  user-select: none;
  display: none;
  .icon-ddei-flow {
    width: 100%;
    height: 100%;
    fill: var(--borderColor);
  }
  
}
</style>