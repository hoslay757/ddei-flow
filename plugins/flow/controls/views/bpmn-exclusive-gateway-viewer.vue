<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-exclusive-gateway",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-exclusive-gateway" title="排他网关">
    <svg class="icon-ddei-flow" aria-hidden="true">
      <use xlink:href="#icon-ddei-flow-gateway-xor"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-exclusive-gateway {
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