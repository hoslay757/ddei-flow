<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-eventbased-gateway",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-eventbased-gateway" title="事件网关">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use xlink:href="#icon-ddei-flow-gateway-eventbased"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-eventbased-gateway {
  position: absolute;
  pointer-events:none;
  user-select: none;
  display: none;
  .icon-ddei-flow {
    
    
    width: calc(100% - 1px);
    height:calc(100% - 1px);
    fill:var(--borderColor);
  }
  
}
</style>